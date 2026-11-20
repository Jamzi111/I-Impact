import mongoose, { Schema, Model, Document } from "mongoose"

export interface INotification extends Document {
  title: string
  description: string
  category: "Group Call" | "Announcement" | "Event" | "Cohort"
  type: "group_call" | "announcement" | "event" | "cohort"
  href?: string
  actionLabel?: string
  emailBroadcastSent: boolean
  emailRecipientCount: number
  sentAt?: Date
  createdAt: Date
  updatedAt: Date
}

const NotificationSchema = new Schema<INotification>(
  {
    title: {
      type: String,
      required: [true, "Notification title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Notification description is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: ["Group Call", "Announcement", "Event", "Cohort"],
      default: "Announcement",
      index: true,
    },
    type: {
      type: String,
      enum: ["group_call", "announcement", "event", "cohort"],
      default: "announcement",
      index: true,
    },
    href: {
      type: String,
      trim: true,
      default: "",
    },
    actionLabel: {
      type: String,
      trim: true,
      default: "View Details",
    },
    emailBroadcastSent: {
      type: Boolean,
      default: false,
    },
    emailRecipientCount: {
      type: Number,
      default: 0,
    },
    sentAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "notifications",
    timestamps: true,
  }
)

NotificationSchema.index({ createdAt: -1 })

const Notification: Model<INotification> =
  mongoose.models.Notification || mongoose.model<INotification>("Notification", NotificationSchema)

export default Notification

