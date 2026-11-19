import mongoose, { Schema, Model, Document } from "mongoose"

export interface IEvent extends Document {
  title: string
  subtitle?: string
  badge: string
  startDate: string
  endDate?: string
  dateDisplay: string
  timeDisplay?: string
  countdownTarget: string
  venue: string
  attendeeBadge?: string
  description?: string
  registrationUrl?: string
  registrationBtnText?: string
  agendaBtnText?: string
  programDocumentUrl?: string
  programDocumentName?: string
  bannerImageUrl?: string
  isActive: boolean
  isArchived: boolean
  createdAt: Date
  updatedAt: Date
}

const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
      default: "",
    },
    badge: {
      type: String,
      default: "UPCOMING EVENT",
      trim: true,
    },
    startDate: {
      type: String,
      default: "",
      trim: true,
    },
    endDate: {
      type: String,
      default: "",
      trim: true,
    },
    dateDisplay: {
      type: String,
      required: [true, "Date display text is required"],
      trim: true,
    },
    timeDisplay: {
      type: String,
      default: "",
      trim: true,
    },
    countdownTarget: {
      type: String,
      required: [true, "Countdown target is required"],
      trim: true,
    },
    venue: {
      type: String,
      required: [true, "Venue/Location is required"],
      trim: true,
    },
    attendeeBadge: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    registrationUrl: {
      type: String,
      default: "/programs",
      trim: true,
    },
    registrationBtnText: {
      type: String,
      default: "Register Free Now",
      trim: true,
    },
    agendaBtnText: {
      type: String,
      default: "View Conference Agenda",
      trim: true,
    },
    programDocumentUrl: {
      type: String,
      default: "",
      trim: true,
    },
    programDocumentName: {
      type: String,
      default: "",
      trim: true,
    },
    bannerImageUrl: {
      type: String,
      default: "",
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: false,
      index: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    collection: "events",
    timestamps: true,
  }
)

EventSchema.index({ createdAt: -1 })

const EventModel: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema)

export default EventModel

