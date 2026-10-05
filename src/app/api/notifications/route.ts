import { NextRequest, NextResponse } from "next/server"
import { getNotifications, createNotification, deleteNotification } from "@/lib/notifications"
import { CreateNotificationInput } from "@/types/notification"

export async function GET() {
  try {
    const notifications = await getNotifications()
    return NextResponse.json({
      success: true,
      notifications,
      totalCount: notifications.length,
    })
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch notifications" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateNotificationInput = await request.json()

    if (!body.title || !body.description) {
      return NextResponse.json(
        { success: false, error: "Title and description are required" },
        { status: 400 }
      )
    }

    const newNotif = await createNotification({
      title: body.title,
      type: body.type || "announcement",
      category: body.category || "Announcement",
      description: body.description,
      href: body.href || "/notifications",
      sourceId: body.sourceId,
      dueDate: body.dueDate,
    })

    return NextResponse.json({ success: true, notification: newNotif }, { status: 201 })
  } catch (error) {
    console.error("Error creating notification:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create notification" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Notification ID is required" },
        { status: 400 }
      )
    }

    const success = await deleteNotification(id)
    if (!success) {
      return NextResponse.json(
        { success: false, error: "Notification not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, message: "Notification deleted" })
  } catch (error) {
    console.error("Error deleting notification:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete notification" },
      { status: 500 }
    )
  }
}
