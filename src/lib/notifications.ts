import fs from "fs/promises"
import path from "path"
import { NotificationItem, CreateNotificationInput } from "@/types/notification"
import { EventItem } from "@/types/event"
import { AssignmentItem } from "@/types/assignment"
import { getEvents } from "./events"
import { getAssignments } from "./assignments"

const DATA_FILE = path.join(process.cwd(), "src", "data", "notifications.json")

export function formatRelativeTime(dateString: string): string {
  try {
    const now = new Date().getTime()
    const past = new Date(dateString).getTime()
    if (isNaN(past)) return "Recently"

    const diffSeconds = Math.floor((now - past) / 1000)

    if (diffSeconds < 60) {
      return "Just now"
    }
    const diffMinutes = Math.floor(diffSeconds / 60)
    if (diffMinutes < 60) {
      return `${diffMinutes}m ago`
    }
    const diffHours = Math.floor(diffMinutes / 60)
    if (diffHours < 24) {
      return `${diffHours}h ago`
    }
    const diffDays = Math.floor(diffHours / 24)
    if (diffDays < 7) {
      return `${diffDays}d ago`
    }
    const diffWeeks = Math.floor(diffDays / 7)
    if (diffWeeks < 4) {
      return `${diffWeeks}w ago`
    }

    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  } catch {
    return "Recently"
  }
}

export async function readStoredNotifications(): Promise<NotificationItem[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8")
    const parsed = JSON.parse(data)
    if (Array.isArray(parsed)) {
      return parsed
    }
  } catch {
    return []
  }
  return []
}

export async function saveNotifications(items: NotificationItem[]): Promise<void> {
  const dir = path.dirname(DATA_FILE)
  try {
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf-8")
  } catch (err) {
    console.error("Failed to save notifications to JSON:", err)
  }
}

/**
 * Dynamically aggregates and reconciles notifications from:
 * 1. Stored custom / announcement notifications
 * 2. Active & upcoming Events (from events store)
 * 3. Active Assignments (from assignments store)
 */
export async function getNotifications(): Promise<NotificationItem[]> {
  let stored = await readStoredNotifications()
  const events = await getEvents()
  const assignments = await getAssignments()

  let hasChanges = false

  // 1. Ensure all events have a corresponding notification
  for (const event of events) {
    const existingIndex = stored.findIndex(
      (n) => n.sourceId === event.id || n.id === `notif-${event.id}`
    )
    const expectedNotif: NotificationItem = {
      id: `notif-${event.id}`,
      title: event.badge ? `[${event.badge}] ${event.title}` : `New Event: ${event.title}`,
      type: "event",
      category: "Event",
      description: `${event.dateDisplay} • ${event.venue || "Virtual Worldwide"}. Registration is live.`,
      href: event.registrationUrl || "/programs",
      sourceId: event.id,
      createdAt: event.createdAt || new Date().toISOString(),
      updatedAt: event.updatedAt || new Date().toISOString(),
    }

    if (existingIndex === -1) {
      stored.unshift(expectedNotif)
      hasChanges = true
    } else {
      // Keep title and description in sync with event updates
      if (
        stored[existingIndex].title !== expectedNotif.title ||
        stored[existingIndex].description !== expectedNotif.description ||
        stored[existingIndex].href !== expectedNotif.href
      ) {
        stored[existingIndex] = {
          ...stored[existingIndex],
          title: expectedNotif.title,
          description: expectedNotif.description,
          href: expectedNotif.href,
          updatedAt: expectedNotif.updatedAt,
        }
        hasChanges = true
      }
    }
  }

  // 2. Ensure all assignments have a corresponding notification
  for (const asg of assignments) {
    const existingIndex = stored.findIndex(
      (n) => n.sourceId === asg.id || n.id === `notif-${asg.id}`
    )
    const expectedNotif: NotificationItem = {
      id: `notif-${asg.id}`,
      title: `Assignment: ${asg.title}`,
      type: "assignment",
      category: "Assignment",
      description: `${asg.track} • Due: ${asg.dueDate}${asg.deadlineTime ? ` (${asg.deadlineTime})` : ""}`,
      href: asg.submissionUrl || "/assignments",
      dueDate: asg.dueDate,
      sourceId: asg.id,
      createdAt: asg.createdAt || new Date().toISOString(),
      updatedAt: asg.updatedAt || new Date().toISOString(),
    }

    if (existingIndex === -1) {
      stored.unshift(expectedNotif)
      hasChanges = true
    } else {
      if (
        stored[existingIndex].title !== expectedNotif.title ||
        stored[existingIndex].description !== expectedNotif.description ||
        stored[existingIndex].href !== expectedNotif.href
      ) {
        stored[existingIndex] = {
          ...stored[existingIndex],
          title: expectedNotif.title,
          description: expectedNotif.description,
          href: expectedNotif.href,
          dueDate: expectedNotif.dueDate,
          updatedAt: expectedNotif.updatedAt,
        }
        hasChanges = true
      }
    }
  }

  if (hasChanges) {
    await saveNotifications(stored)
  }

  // Sort by newest createdAt timestamp
  stored.sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime() || 0
    const timeB = new Date(b.createdAt).getTime() || 0
    return timeB - timeA
  })

  // Attach dynamic relative time formatting
  return stored.map((item) => ({
    ...item,
    time: formatRelativeTime(item.createdAt),
  }))
}

export async function createNotification(input: CreateNotificationInput): Promise<NotificationItem> {
  const stored = await readStoredNotifications()
  const newNotif: NotificationItem = {
    ...input,
    id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const updatedList = [newNotif, ...stored]
  await saveNotifications(updatedList)

  return {
    ...newNotif,
    time: formatRelativeTime(newNotif.createdAt),
  }
}

export async function addNotificationForEvent(event: EventItem): Promise<NotificationItem> {
  const stored = await readStoredNotifications()
  const notifId = `notif-${event.id}`

  const newNotif: NotificationItem = {
    id: notifId,
    title: event.badge ? `[${event.badge}] ${event.title}` : `New Event: ${event.title}`,
    type: "event",
    category: "Event",
    description: `${event.dateDisplay} • ${event.venue || "Virtual Worldwide"}. Registration is live.`,
    href: event.registrationUrl || "/programs",
    sourceId: event.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const filtered = stored.filter((n) => n.id !== notifId && n.sourceId !== event.id)
  await saveNotifications([newNotif, ...filtered])
  return newNotif
}

export async function addNotificationForAssignment(assignment: AssignmentItem): Promise<NotificationItem> {
  const stored = await readStoredNotifications()
  const notifId = `notif-${assignment.id}`

  const newNotif: NotificationItem = {
    id: notifId,
    title: `Assignment: ${assignment.title}`,
    type: "assignment",
    category: "Assignment",
    description: `${assignment.track} • Due: ${assignment.dueDate}${assignment.deadlineTime ? ` (${assignment.deadlineTime})` : ""}`,
    href: assignment.submissionUrl || "/assignments",
    dueDate: assignment.dueDate,
    sourceId: assignment.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const filtered = stored.filter((n) => n.id !== notifId && n.sourceId !== assignment.id)
  await saveNotifications([newNotif, ...filtered])
  return newNotif
}

export async function deleteNotification(id: string): Promise<boolean> {
  const stored = await readStoredNotifications()
  const filtered = stored.filter((n) => n.id !== id)
  if (filtered.length === stored.length) return false
  await saveNotifications(filtered)
  return true
}

export async function deleteNotificationBySourceId(sourceId: string): Promise<void> {
  const stored = await readStoredNotifications()
  const filtered = stored.filter((n) => n.sourceId !== sourceId && n.id !== `notif-${sourceId}`)
  await saveNotifications(filtered)
}
