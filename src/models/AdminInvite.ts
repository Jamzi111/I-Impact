import mongoose, { Schema, Model, Document } from "mongoose"

export interface IAdminInvite extends Document {
  email: string
  name: string
  role: "superadmin" | "admin" | "reviewer" | "content_manager"
  token: string
  invitedBy: string
  expiresAt: Date
  status: "pending" | "accepted" | "revoked" | "expired"
  acceptedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const AdminInviteSchema = new Schema<IAdminInvite>(
  {
    email: { type: String, required: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    role: {
      type: String,
      enum: ["superadmin", "admin", "reviewer", "content_manager"],
      default: "admin",
      required: true,
    },
    token: { type: String, required: true, unique: true, index: true },
    invitedBy: { type: String, default: "Super Admin" },
    expiresAt: { type: Date, required: true, index: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "revoked", "expired"],
      default: "pending",
      index: true,
    },
    acceptedAt: { type: Date },
  },
  {
    collection: "admin_invites",
    timestamps: true,
  }
)

const AdminInvite: Model<IAdminInvite> =
  mongoose.models.AdminInvite || mongoose.model<IAdminInvite>("AdminInvite", AdminInviteSchema)

export default AdminInvite

