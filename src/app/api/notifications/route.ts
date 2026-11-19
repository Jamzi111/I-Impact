import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Notification from "@/models/Notification"
import { formatRelativeTime } from "@/lib/notifications"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  try {
    await connectDB()
    const mongoNotifs = await Notification.find().sort({ createdAt: -1 }).lean()

    // Format MongoDB notifications exclusively
    const notifications = mongoNotifs.map((doc: any) => ({
      id: doc._id.toString(),
      title: doc.title,
      description: doc.description,
      category: doc.category,
      type: doc.type,
      href: doc.href || "/notifications",
      time: formatRelativeTime(doc.createdAt ? doc.createdAt.toISOString() : new Date().toISOString()),
      createdAt: doc.createdAt ? doc.createdAt.toISOString() : new Date().toISOString(),
      updatedAt: doc.updatedAt ? doc.updatedAt.toISOString() : new Date().toISOString(),
      actionLabel: doc.actionLabel || "View Details",
    }))

    return NextResponse.json({
      success: true,
      notifications,
      totalCount: notifications.length,
    })
  } catch (error) {
    console.error("Error fetching public notifications:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch notifications", notifications: [], totalCount: 0 },
      { status: 500 }
    )
  }
}
