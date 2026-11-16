import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Application from "@/models/Application"
import { APPROVED_PATHWAYS } from "@/config/pathways"
import { PathwayId } from "@/types/application"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const pathway = searchParams.get("pathway")
    const status = searchParams.get("status")
    const search = searchParams.get("search")?.trim()
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10", 10)))
    const skip = (page - 1) * limit

    // Base query without status filter (to compute status counts for tabs)
    const baseQuery: Record<string, any> = {}

    if (pathway && APPROVED_PATHWAYS.includes(pathway as PathwayId)) {
      baseQuery.pathway = pathway
    }

    if (search) {
      const sanitized = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      baseQuery.$or = [
        { applicationReference: { $regex: sanitized, $options: "i" } },
        { "applicantDetails.fullName": { $regex: sanitized, $options: "i" } },
        { "applicantDetails.email": { $regex: sanitized, $options: "i" } },
        { "applicantDetails.phone": { $regex: sanitized, $options: "i" } },
      ]
    }

    // Status counts for the tabs
    const [allCount, pendingCount, reviewingCount, acceptedCount, rejectedCount] =
      await Promise.all([
        Application.countDocuments(baseQuery),
        Application.countDocuments({ ...baseQuery, status: "pending" }),
        Application.countDocuments({ ...baseQuery, status: "reviewing" }),
        Application.countDocuments({ ...baseQuery, status: "accepted" }),
        Application.countDocuments({ ...baseQuery, status: "rejected" }),
      ])

    // Query with status filter applied
    const query: Record<string, any> = { ...baseQuery }
    if (status && ["pending", "reviewing", "accepted", "rejected"].includes(status)) {
      query.status = status
    }

    const [total, applications] = await Promise.all([
      Application.countDocuments(query),
      Application.find(query)
        .sort({ submittedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
    ])

    return NextResponse.json({
      success: true,
      applications,
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
      statusCounts: {
        all: allCount,
        pending: pendingCount,
        reviewing: reviewingCount,
        accepted: acceptedCount,
        rejected: rejectedCount,
      },
    })
  } catch (error: any) {
    console.error("[Admin Applications API Error]:", error)

    const isWhitelistError =
      error?.name === "MongooseServerSelectionError" ||
      error?.message?.includes("timed out") ||
      error?.message?.includes("whitelist")

    return NextResponse.json({
      success: false,
      isDatabaseOffline: isWhitelistError,
      error: isWhitelistError
        ? "MongoDB Atlas connection pending IP authorization."
        : error.message || "Failed to retrieve applications.",
      applications: [],
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 1,
      statusCounts: { all: 0, pending: 0, reviewing: 0, accepted: 0, rejected: 0 },
    })
  }
}

