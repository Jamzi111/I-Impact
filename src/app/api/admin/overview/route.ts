import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Application from "@/models/Application"
import Subscriber from "@/models/Subscriber"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const [
      totalApplications,
      pendingApplications,
      approvedApplications,
      totalVolunteers,
      totalSubscribers,
      recentApplications,
      mentorshipCount,
      volunteerCount,
      partnershipCount,
      sponsorshipCount,
      speakerCount,
      ambassadorCount,
    ] = await Promise.all([
      Application.countDocuments(),
      Application.countDocuments({ status: "pending" }),
      Application.countDocuments({ status: "accepted" }),
      Application.countDocuments({ pathway: "volunteering" }),
      Subscriber.countDocuments({ status: "active" }),
      Application.find()
        .sort({ submittedAt: -1 })
        .limit(6)
        .select("applicationReference pathway pathwayTitle applicantDetails status submittedAt")
        .lean(),
      Application.countDocuments({ pathway: "mentorship" }),
      Application.countDocuments({ pathway: "volunteering" }),
      Application.countDocuments({ pathway: "partnerships" }),
      Application.countDocuments({ pathway: "sponsorship" }),
      Application.countDocuments({ pathway: "speaking" }),
      Application.countDocuments({ pathway: "ambassadors" }),
    ])

    return NextResponse.json({
      success: true,
      stats: {
        totalApplications,
        pendingApplications,
        approvedApplications,
        totalVolunteers,
        totalSubscribers,
      },
      pathwayBreakdown: {
        mentorship: mentorshipCount,
        volunteering: volunteerCount,
        partnerships: partnershipCount,
        sponsorship: sponsorshipCount,
        speaking: speakerCount,
        ambassadors: ambassadorCount,
      },
      recentApplications,
    })
  } catch (error: any) {
    console.error("[Admin Overview API Error]:", error)

    const isWhitelistError =
      error?.name === "MongooseServerSelectionError" ||
      error?.message?.includes("timed out") ||
      error?.message?.includes("whitelist")

    return NextResponse.json({
      success: false,
      isDatabaseOffline: isWhitelistError,
      error: isWhitelistError
        ? "MongoDB Atlas IP whitelist pending. Submissions will appear as soon as the cluster allows connection."
        : error.message || "Failed to load overview data.",
      stats: {
        totalApplications: 0,
        pendingApplications: 0,
        approvedApplications: 0,
        totalVolunteers: 0,
        totalSubscribers: 0,
      },
      pathwayBreakdown: {
        mentorship: 0,
        volunteering: 0,
        partnerships: 0,
        sponsorship: 0,
        speaking: 0,
        ambassadors: 0,
      },
      recentApplications: [],
    })
  }
}

