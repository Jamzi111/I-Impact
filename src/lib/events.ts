import connectDB from "@/lib/mongodb"
import EventModel, { IEvent } from "@/models/Event"
import { EventItem, CreateEventInput, UpdateEventInput } from "@/types/event"

function formatEventDoc(doc: any): EventItem {
  return {
    id: doc._id.toString(),
    title: doc.title,
    subtitle: doc.subtitle || "",
    badge: doc.badge || "UPCOMING EVENT",
    startDate: doc.startDate || "",
    endDate: doc.endDate || "",
    dateDisplay: doc.dateDisplay,
    timeDisplay: doc.timeDisplay || "",
    countdownTarget: doc.countdownTarget,
    venue: doc.venue,
    attendeeBadge: doc.attendeeBadge || "",
    description: doc.description || "",
    registrationUrl: doc.registrationUrl || "/programs",
    registrationBtnText: doc.registrationBtnText || "Register Free Now",
    agendaBtnText: doc.agendaBtnText || "View Conference Agenda",
    programDocumentUrl: doc.programDocumentUrl || "",
    programDocumentName: doc.programDocumentName || "",
    bannerImageUrl: doc.bannerImageUrl || "",
    isActive: doc.isActive ?? false,
    isArchived: doc.isArchived ?? false,
    createdAt: doc.createdAt ? doc.createdAt.toISOString() : new Date().toISOString(),
    updatedAt: doc.updatedAt ? doc.updatedAt.toISOString() : new Date().toISOString(),
  }
}

export async function getEvents(): Promise<EventItem[]> {
  try {
    await connectDB()
    const docs = await EventModel.find({ isArchived: false }).sort({ createdAt: -1 }).lean()
    return docs.map(formatEventDoc)
  } catch (err) {
    console.error("Error loading events from MongoDB:", err)
    return []
  }
}

export async function getActiveEvent(): Promise<EventItem | null> {
  try {
    await connectDB()
    // Look for explicitly active event first
    let doc = await EventModel.findOne({ isActive: true, isArchived: false }).lean()
    
    // If none marked active, get the newest event
    if (!doc) {
      doc = await EventModel.findOne({ isArchived: false }).sort({ createdAt: -1 }).lean()
    }
    
    return doc ? formatEventDoc(doc) : null
  } catch (err) {
    console.error("Error loading active event from MongoDB:", err)
    return null
  }
}

export async function getEventById(id: string): Promise<EventItem | null> {
  try {
    await connectDB()
    const doc = await EventModel.findById(id).lean()
    return doc ? formatEventDoc(doc) : null
  } catch (err) {
    console.error(`Error loading event ${id} from MongoDB:`, err)
    return null
  }
}

export async function createEvent(input: CreateEventInput): Promise<EventItem> {
  await connectDB()

  // If this new event is marked active, deactivate any currently active events
  if (input.isActive) {
    await EventModel.updateMany({ isActive: true }, { $set: { isActive: false } })
  }

  const doc = await EventModel.create({
    ...input,
    badge: input.badge || "UPCOMING EVENT",
    countdownTarget: input.countdownTarget || `${input.startDate || new Date().toISOString().split("T")[0]}T09:00:00Z`,
    registrationUrl: input.registrationUrl || "/programs",
    registrationBtnText: input.registrationBtnText || "Register Free Now",
    agendaBtnText: input.agendaBtnText || "View Conference Agenda",
    isActive: input.isActive ?? false,
    isArchived: false,
  })

  const newEvent = formatEventDoc(doc)

  // Sync notification if applicable
  try {
    const { addNotificationForEvent } = await import("./notifications")
    await addNotificationForEvent(newEvent)
  } catch (err) {
    console.error("Could not sync notification for event:", err)
  }

  return newEvent
}

export async function updateEvent(id: string, input: UpdateEventInput): Promise<EventItem | null> {
  await connectDB()

  // If setting to active, unset all others
  if (input.isActive) {
    await EventModel.updateMany({ _id: { $ne: id }, isActive: true }, { $set: { isActive: false } })
  }

  const doc = await EventModel.findByIdAndUpdate(
    id,
    { ...input, updatedAt: new Date() },
    { new: true }
  ).lean()

  if (!doc) return null
  const updated = formatEventDoc(doc)

  try {
    const { addNotificationForEvent } = await import("./notifications")
    await addNotificationForEvent(updated)
  } catch (err) {
    console.error("Could not sync notification for event:", err)
  }

  return updated
}

export async function deleteEvent(id: string): Promise<boolean> {
  await connectDB()
  const doc = await EventModel.findById(id)
  if (!doc) return false

  const wasActive = doc.isActive
  await EventModel.findByIdAndDelete(id)

  // If deleted event was active, set the most recent event as active
  if (wasActive) {
    const nextEvent = await EventModel.findOne({ isArchived: false }).sort({ createdAt: -1 })
    if (nextEvent) {
      nextEvent.isActive = true
      await nextEvent.save()
    }
  }

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
  await connectDB()

  // Deactivate all
  await EventModel.updateMany({}, { $set: { isActive: false } })

  // Activate specified event
  const doc = await EventModel.findByIdAndUpdate(
    id,
    { $set: { isActive: true, isArchived: false } },
    { new: true }
  ).lean()

  return doc ? formatEventDoc(doc) : null
}
