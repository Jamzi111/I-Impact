import mongoose, { Schema, Model, Document } from "mongoose"

export interface ISubscriber extends Document {
  email: string
  source: string
  status: "active" | "unsubscribed"
  subscribedAt: Date
  ipAddress?: string
  userAgent?: string
}

const SubscriberSchema = new Schema<ISubscriber>(
  {
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    source: {
      type: String,
      default: "footer_newsletter",
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "unsubscribed"],
      default: "active",
      index: true,
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
  },
  {
    collection: "subscribers",
    timestamps: true,
  }
)

const Subscriber: Model<ISubscriber> =
  mongoose.models.Subscriber || mongoose.model<ISubscriber>("Subscriber", SubscriberSchema)

export default Subscriber

