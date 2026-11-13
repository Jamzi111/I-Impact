import mongoose, { Schema, Model, Document } from "mongoose"
import { ApplicationDocument, ApplicationStatus, PathwayId } from "@/types/application"

export interface IApplicationModel extends Document, Omit<ApplicationDocument, "_id"> {}

const ApplicantDetailsSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true, default: "Nigeria" },
  },
  { _id: false }
)

const ApplicationSchema = new Schema<IApplicationModel>(
  {
    applicationReference: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      index: true,
    },
    pathway: {
      type: String,
      required: true,
      enum: [
        "mentorship",
        "volunteering",
        "partnerships",
        "sponsorship",
        "speaking",
        "ambassadors",
      ],
      index: true,
    },
    pathwayTitle: {
      type: String,
      required: true,
    },
    applicantDetails: {
      type: ApplicantDetailsSchema,
      required: true,
    },
    pathwayDetails: {
      type: Schema.Types.Mixed,
      required: true,
      default: {},
    },
    status: {
      type: String,
      enum: ["pending", "reviewing", "accepted", "rejected"],
      default: "pending",
      index: true,
    },
    safeguardingAcknowledged: {
      type: Boolean,
      required: true,
      default: false,
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
    reviewedAt: {
      type: Date,
    },
    reviewedBy: {
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
    collection: "applications",
    timestamps: true,
  }
)

// Compound index for querying recent duplicate submissions efficiently
ApplicationSchema.index({ "applicantDetails.email": 1, pathway: 1, submittedAt: -1 })

// Prevent model overwrite in development HMR
const Application: Model<IApplicationModel> =
  mongoose.models.Application || mongoose.model<IApplicationModel>("Application", ApplicationSchema)

export default Application

