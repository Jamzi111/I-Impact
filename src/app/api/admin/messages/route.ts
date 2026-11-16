import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import ContactMessage from "@/models/ContactMessage"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const status = searchParams.get("status")
    const search = searchParams.get("search")?.trim()
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10", 10)))
    const skip = (page - 1) * limit

    const baseQuery: Record<string, any> = {}

    if (category && ["partnerships", "mentorship", "donors", "media", "general"].includes(category)) {
      baseQuery.category = category
    }

    if (search) {
      const sanitized = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      baseQuery.$or = [
        { fullName: { $regex: sanitized, $options: "i" } },
        { email: { $regex: sanitized, $options: "i" } },
        { organization: { $regex: sanitized, $options: "i" } },
        { message: { $regex: sanitized, $options: "i" } },
      ]
    }

    // Status counts
    const [allCount, unreadCount, readCount, repliedCount, archivedCount] = await Promise.all([
      ContactMessage.countDocuments(baseQuery),
      ContactMessage.countDocuments({ ...baseQuery, status: "unread" }),
      ContactMessage.countDocuments({ ...baseQuery, status: "read" }),
      ContactMessage.countDocuments({ ...baseQuery, status: "replied" }),
      ContactMessage.countDocuments({ ...baseQuery, status: "archived" }),
    ])

    const query: Record<string, any> = { ...baseQuery }
    if (status && ["unread", "read", "replied", "archived"].includes(status)) {
      query.status = status
    }

    const [total, messages] = await Promise.all([
      ContactMessage.countDocuments(query),
      ContactMessage.find(query)
        .sort({ submittedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
    ])

    return NextResponse.json({
      success: true,
      messages,
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
      statusCounts: {
        all: allCount,
        unread: unreadCount,
        read: readCount,
        replied: repliedCount,
        archived: archivedCount,
      },
    })
  } catch (error: any) {
    console.error("[Admin Messages API Error]:", error)

    const isWhitelistError =
      error?.name === "MongooseServerSelectionError" ||
      error?.message?.includes("timed out") ||
      error?.message?.includes("whitelist")

    return NextResponse.json({
      success: false,
      isDatabaseOffline: isWhitelistError,
      error: isWhitelistError
        ? "MongoDB Atlas IP whitelist pending. Inbound messages will appear once authorized."
        : error.message || "Failed to retrieve contact messages.",
      messages: [],
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 1,
      statusCounts: { all: 0, unread: 0, read: 0, replied: 0, archived: 0 },
    })
  }
}

