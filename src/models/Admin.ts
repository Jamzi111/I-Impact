import mongoose, { Schema, Model, Document } from "mongoose"

export interface IAdmin extends Document {
  name: string
  email: string
  passwordHash: string
  salt: string
  role: "superadmin" | "admin" | "coordinator"
  isActive: boolean
  lastLogin?: Date
}

const AdminSchema = new Schema<IAdmin>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    salt: { type: String, required: true },
    role: { type: String, enum: ["superadmin", "admin", "coordinator"], default: "superadmin" },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
  },
  {
    collection: "admins",
    timestamps: true,
  }
)

const Admin: Model<IAdmin> =
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema)

export default Admin

