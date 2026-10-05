import { NextRequest, NextResponse } from "next/server"
import { getEventById, updateEvent, deleteEvent, setActiveEvent } from "@/lib/events"
import { UpdateEventInput } from "@/types/event"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const event = await getEventById(id)
    if (!event) {
      return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, event })
  } catch (error) {
    console.error("Error fetching single event:", error)
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body: UpdateEventInput & { action?: "set-active" } = await request.json()

    if (body.action === "set-active") {
      const active = await setActiveEvent(id)
      if (!active) {
        return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 })
      }
      return NextResponse.json({ success: true, event: active })
    }

    const updated = await updateEvent(id, body)
    if (!updated) {
      return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, event: updated })
  } catch (error) {
    console.error("Error updating event:", error)
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const deleted = await deleteEvent(id)
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, message: "Event deleted successfully" })
  } catch (error) {
    console.error("Error deleting event:", error)
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}
