import mongoose, { Schema, Model, Document } from "mongoose"

export interface IAdmin extends Document {
  name: string
  email: string
  passwordHash: string
  salt: string
  role: "superadmin" | "admin" | "reviewer" | "content_manager" | "coordinator"
  isActive: boolean
  lastLogin?: Date
  resetPasswordToken?: string
  resetPasswordExpires?: Date
}

const AdminSchema = new Schema<IAdmin>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    salt: { type: String, required: true },
    role: {
      type: String,
      enum: ["superadmin", "admin", "reviewer", "content_manager", "coordinator"],
      default: "admin",
    },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  {
    collection: "admins",
    timestamps: true,
  }
)

const Admin: Model<IAdmin> =
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema)

export default Admin

