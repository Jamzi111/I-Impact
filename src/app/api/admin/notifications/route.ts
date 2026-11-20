import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Notification from "@/models/Notification"
import Subscriber from "@/models/Subscriber"
import { sendEmailBroadcast } from "@/lib/email"

export const dynamic = "force-dynamic"
export const revalidate = 0

// GET: Fetch all notifications from MongoDB + get subscriber count
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const [notifications, totalSubscribers] = await Promise.all([
      Notification.find().sort({ createdAt: -1 }).lean(),
      Subscriber.countDocuments({ status: "active" }),
    ])

    return NextResponse.json({
      success: true,
      notifications,
      totalCount: notifications.length,
      activeSubscribersCount: totalSubscribers,
    })
  } catch (error: any) {
    console.error("Error loading admin notifications:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch notifications" },
      { status: 500 }
    )
  }
}

// POST: Create a notification and optionally broadcast to subscribers
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { title, description, category, href, actionLabel, broadcastEmail } = body

    if (!title || !description) {
      return NextResponse.json(
        { success: false, error: "Title and description are required" },
        { status: 400 }
      )
    }

    // Determine type from category
    const categoryTypeMap: Record<string, "group_call" | "announcement" | "event" | "cohort"> = {
      "Group Call": "group_call",
      "Announcement": "announcement",
      "Event": "event",
      "Cohort": "cohort",
    }

    const type = categoryTypeMap[category] || "announcement"

    let emailRecipientCount = 0
    let emailBroadcastSent = false
    let broadcastNote = ""

    // Handle email broadcast to active subscribers if requested
    if (broadcastEmail) {
      const activeSubscribers = await Subscriber.find({ status: "active" })
        .select("email")
        .lean()

      const subscriberEmails = activeSubscribers
        .map((sub: any) => sub.email)
        .filter(Boolean)

      if (subscriberEmails.length > 0) {
        const emailResult = await sendEmailBroadcast({
          to: subscriberEmails,
          subject: `[I-IMPACT] ${title}`,
          title,
          message: description,
          actionUrl: href ? (href.startsWith("http") ? href : `https://i-impact.org${href}`) : undefined,
          actionLabel: actionLabel || "View Details",
          category: category || "Announcement",
        })

        emailRecipientCount = emailResult.deliveredCount
        emailBroadcastSent = true
        broadcastNote = emailResult.note || ""
      }
    }

    // Create the notification record in MongoDB
    const newNotif = await Notification.create({
      title,
      description,
      category: category || "Announcement",
      type,
      href: href || "",
      actionLabel: actionLabel || "View Details",
      emailBroadcastSent,
      emailRecipientCount,
      sentAt: new Date(),
    })

    return NextResponse.json({
      success: true,
      notification: newNotif,
      broadcastNote,
    })
  } catch (error: any) {
    console.error("Error creating notification:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create notification" },
      { status: 500 }
    )
  }
}

// DELETE: Delete notification
export async function DELETE(request: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, error: "Notification ID is required" }, { status: 400 })
    }

    await Notification.findByIdAndDelete(id)

    return NextResponse.json({ success: true, message: "Notification deleted" })
  } catch (error: any) {
    console.error("Error deleting notification:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete notification" },
      { status: 500 }
    )
  }
}

