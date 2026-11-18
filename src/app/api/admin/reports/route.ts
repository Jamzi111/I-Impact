import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Application from "@/models/Application"
import Subscriber from "@/models/Subscriber"
import ContactMessage from "@/models/ContactMessage"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const now = new Date()
    const startOfYear = new Date(now.getFullYear(), 0, 1)
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const last90Days = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)

    // --- Run all aggregations in parallel ---
    const [
      totalApplications,
      pendingCount,
      reviewingCount,
      acceptedCount,
      rejectedCount,
      last30DaysCount,
      last90DaysCount,
      totalSubscribers,
      totalMessages,
      pathwayBreakdown,
      monthlyTrend,
      stateDistribution,
      countryDistribution,
    ] = await Promise.all([
      // Status counts
      Application.countDocuments(),
      Application.countDocuments({ status: "pending" }),
      Application.countDocuments({ status: "reviewing" }),
      Application.countDocuments({ status: "accepted" }),
      Application.countDocuments({ status: "rejected" }),
      Application.countDocuments({ submittedAt: { $gte: last30Days } }),
      Application.countDocuments({ submittedAt: { $gte: last90Days } }),
      Subscriber.countDocuments({ status: "active" }),
      ContactMessage.countDocuments(),

      // Pathway breakdown
      Application.aggregate([
        {
          $group: {
            _id: "$pathway",
            count: { $sum: 1 },
            accepted: {
              $sum: { $cond: [{ $eq: ["$status", "accepted"] }, 1, 0] },
            },
            pending: {
              $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
            },
          },
        },
        { $sort: { count: -1 } },
      ]),

      // Monthly submissions trend (last 12 months)
      Application.aggregate([
        {
          $match: {
            submittedAt: { $gte: new Date(now.getFullYear() - 1, now.getMonth(), 1) },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$submittedAt" },
              month: { $month: "$submittedAt" },
            },
            total: { $sum: 1 },
            accepted: {
              $sum: { $cond: [{ $eq: ["$status", "accepted"] }, 1, 0] },
            },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
        { $limit: 12 },
      ]),

      // Top states
      Application.aggregate([
        { $match: { "applicantDetails.state": { $exists: true, $ne: "" } } },
        {
          $group: {
            _id: "$applicantDetails.state",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),

      // Country distribution
      Application.aggregate([
        { $match: { "applicantDetails.country": { $exists: true, $ne: "" } } },
        {
          $group: {
            _id: "$applicantDetails.country",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 8 },
      ]),
    ])

    const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const formattedMonthlyTrend = monthlyTrend.map((m: any) => ({
      label: `${MONTH_NAMES[m._id.month - 1]} ${m._id.year}`,
      total: m.total,
      accepted: m.accepted,
    }))

    const formattedPathways = pathwayBreakdown.map((p: any) => ({
      pathway: p._id,
      count: p.count,
      accepted: p.accepted,
      pending: p.pending,
      acceptanceRate: p.count > 0 ? Math.round((p.accepted / p.count) * 100) : 0,
    }))

    const overallAcceptanceRate =
      totalApplications > 0 ? Math.round((acceptedCount / totalApplications) * 100) : 0

    return NextResponse.json({
      success: true,
      summary: {
        totalApplications,
        pendingCount,
        reviewingCount,
        acceptedCount,
        rejectedCount,
        last30DaysCount,
        last90DaysCount,
        totalSubscribers,
        totalMessages,
        overallAcceptanceRate,
        generatedAt: new Date().toISOString(),
      },
      pathwayBreakdown: formattedPathways,
      monthlyTrend: formattedMonthlyTrend,
      geographic: {
        states: stateDistribution.map((s: any) => ({ name: s._id, count: s.count })),
        countries: countryDistribution.map((c: any) => ({ name: c._id, count: c.count })),
      },
    })
  } catch (error: any) {
    console.error("[Admin Reports API Error]:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to load reports data.",
        summary: null,
      },
      { status: 500 }
    )
  }
}

