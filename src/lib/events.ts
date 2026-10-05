import fs from "fs/promises"
import path from "path"
import { EventItem, CreateEventInput, UpdateEventInput } from "@/types/event"

const DATA_FILE = path.join(process.cwd(), "src", "data", "events.json")

const DEFAULT_EVENTS: EventItem[] = [
  {
    id: "evt-teen-2025",
    title: "AS A TEEN Conference 2025: Unleashing The Extraordinary",
    subtitle: "Raising Generational Champions, Visionaries & Future World Leaders",
    badge: "ANNUAL FLAGSHIP YOUTH CONGRESS",
    startDate: "2025-11-15",
    endDate: "2025-11-17",
    dateDisplay: "November 15–17, 2025",
    timeDisplay: "9:00 AM – 4:00 PM WAT",
    countdownTarget: "2025-11-15T09:00:00Z",
    venue: "Landmark Centre, Lagos & Virtual Worldwide",
    attendeeBadge: "2,500+ Registered Teens",
    description: "Our biggest annual conference gathering teenagers, educators, industry titans, and visionary mentors for 3 transformative days of keynote sessions, leadership labs, career discovery workshops, and networking.",
    registrationUrl: "/programs",
    registrationBtnText: "Register Free Now",
    agendaBtnText: "View Conference Agenda",
    programDocumentUrl: "",
    programDocumentName: "",
    bannerImageUrl: "",
    isActive: true,
    isArchived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function getEvents(): Promise<EventItem[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8")
    const parsed = JSON.parse(data)
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed
    }
  } catch (err) {
    // If file doesn't exist, create it with default events
    await saveEvents(DEFAULT_EVENTS)
    return DEFAULT_EVENTS
  }
  return DEFAULT_EVENTS
}

export async function saveEvents(events: EventItem[]): Promise<void> {
  const dir = path.dirname(DATA_FILE)
  try {
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(DATA_FILE, JSON.stringify(events, null, 2), "utf-8")
  } catch (err) {
    console.error("Failed to save events to JSON:", err)
  }
}

export async function getActiveEvent(): Promise<EventItem | null> {
  const events = await getEvents()
  const active = events.find((e) => e.isActive && !e.isArchived)
  return active || events[0] || null
}

export async function getEventById(id: string): Promise<EventItem | null> {
  const events = await getEvents()
  return events.find((e) => e.id === id) || null
}

export async function createEvent(input: CreateEventInput): Promise<EventItem> {
  const events = await getEvents()
  const newEvent: EventItem = {
    ...input,
    id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  // If this new event is marked active, deactivate other events
  if (newEvent.isActive) {
    events.forEach((e) => {
      e.isActive = false
    })
  }

  const updatedList = [newEvent, ...events]
  await saveEvents(updatedList)

  // Sync notification
  try {
    const { addNotificationForEvent } = await import("./notifications")
    await addNotificationForEvent(newEvent)
  } catch (err) {
    console.error("Could not sync notification for event:", err)
  }

  return newEvent
}

export async function updateEvent(id: string, input: UpdateEventInput): Promise<EventItem | null> {
  const events = await getEvents()
  const index = events.findIndex((e) => e.id === id)
  if (index === -1) return null

  // If setting to active, unset others
  if (input.isActive) {
    events.forEach((e) => {
      if (e.id !== id) {
        e.isActive = false
      }
    })
  }

  const updated: EventItem = {
    ...events[index],
    ...input,
    updatedAt: new Date().toISOString(),
  }

  events[index] = updated
  await saveEvents(events)

  // Sync notification
  try {
    const { addNotificationForEvent } = await import("./notifications")
    await addNotificationForEvent(updated)
  } catch (err) {
    console.error("Could not sync notification for event:", err)
  }

  return updated
}

export async function deleteEvent(id: string): Promise<boolean> {
  const events = await getEvents()
  const index = events.findIndex((e) => e.id === id)
  if (index === -1) return false

  const deletedIsActive = events[index].isActive
  const updatedList = events.filter((e) => e.id !== id)

  // If deleted event was active, set the first available non-archived event as active
  if (deletedIsActive && updatedList.length > 0) {
    const nextActive = updatedList.find((e) => !e.isArchived)
    if (nextActive) {
      nextActive.isActive = true
    }
  }

  await saveEvents(updatedList)

  // Remove notification
  try {
    const { deleteNotificationBySourceId } = await import("./notifications")
    await deleteNotificationBySourceId(id)
  } catch (err) {
    console.error("Could not delete notification for event:", err)
  }

  return true
}

export async function setActiveEvent(id: string): Promise<EventItem | null> {
  const events = await getEvents()
  let activated: EventItem | null = null

  events.forEach((e) => {
    if (e.id === id) {
      e.isActive = true
      e.isArchived = false
      e.updatedAt = new Date().toISOString()
      activated = e
    } else {
      e.isActive = false
    }
  })

  if (activated) {
    await saveEvents(events)
  }

  return activated
}
