import mongoose, { Schema, Model, Document } from "mongoose"

export interface IContactMessage extends Document {
  fullName: string
  email: string
  phone?: string
  organization?: string
  category: "partnerships" | "mentorship" | "donors" | "media" | "general"
  categoryLabel?: string
  message: string
  status: "unread" | "read" | "replied" | "archived"
  submittedAt: Date
  internalNotes?: string
  repliedAt?: Date
  repliedBy?: string
  ipAddress?: string
  userAgent?: string
}

const ContactMessageSchema = new Schema<IContactMessage>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    organization: {
      type: String,
      trim: true,
      default: "",
    },
    category: {
      type: String,
      required: true,
      enum: ["partnerships", "mentorship", "donors", "media", "general"],
      default: "general",
      index: true,
    },
    categoryLabel: {
      type: String,
      trim: true,
      default: "General Inquiry",
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["unread", "read", "replied", "archived"],
      default: "unread",
      index: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    internalNotes: {
      type: String,
      trim: true,
      default: "",
    },
    repliedAt: {
      type: Date,
    },
    repliedBy: {
      type: String,
      trim: true,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
  },
  {
    collection: "contact_messages",
    timestamps: true,
  }
)

const ContactMessage: Model<IContactMessage> =
  mongoose.models.ContactMessage ||
  mongoose.model<IContactMessage>("ContactMessage", ContactMessageSchema)

export default ContactMessage

