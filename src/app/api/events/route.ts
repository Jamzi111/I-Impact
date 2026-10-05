import { NextRequest, NextResponse } from "next/server"
import { getEvents, getActiveEvent, createEvent } from "@/lib/events"
import { CreateEventInput } from "@/types/event"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const activeOnly = searchParams.get("active") === "true"

    if (activeOnly) {
      const activeEvent = await getActiveEvent()
      return NextResponse.json({ success: true, event: activeEvent })
    }

    const events = await getEvents()
    const activeEvent = events.find((e) => e.isActive) || events[0] || null

    return NextResponse.json({
      success: true,
      events,
      activeEvent,
    })
  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch events" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateEventInput = await request.json()

    if (!body.title || !body.dateDisplay || !body.venue) {
      return NextResponse.json(
        { success: false, error: "Title, date display, and venue are required fields" },
        { status: 400 }
      )
    }

    const newEvent = await createEvent({
      ...body,
      badge: body.badge || "UPCOMING EVENT",
      countdownTarget: body.countdownTarget || `${body.startDate || new Date().toISOString().split("T")[0]}T09:00:00Z`,
      registrationUrl: body.registrationUrl || "/programs",
      registrationBtnText: body.registrationBtnText || "Register Free Now",
      agendaBtnText: body.agendaBtnText || "View Conference Agenda",
      isActive: body.isActive ?? false,
      isArchived: false,
    })

    return NextResponse.json({ success: true, event: newEvent }, { status: 201 })
  } catch (error) {
    console.error("Error creating event:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create event" },
      { status: 500 }
    )
  }
}
