import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import connectDB from "@/lib/mongodb"
import ContactMessage from "@/models/ContactMessage"

export const dynamic = "force-dynamic"
export const revalidate = 0

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    await connectDB()

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid message ID" }, { status: 400 })
    }

    const message = await ContactMessage.findById(id).lean()
    if (!message) {
      return NextResponse.json({ success: false, error: "Message not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message })
  } catch (error: any) {
    console.error("[Admin Message GET Error]:", error)
    return NextResponse.json({ success: false, error: error.message || "Failed to load message" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const body = await request.json()
    const { status, internalNotes, repliedBy } = body

    await connectDB()

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid message ID" }, { status: 400 })
    }

    const updateFields: Record<string, any> = {}

    if (status && ["unread", "read", "replied", "archived"].includes(status)) {
      updateFields.status = status
      if (status === "replied") {
        updateFields.repliedAt = new Date()
        updateFields.repliedBy = repliedBy || "I-IMPACT Admin"
      }
    }

    if (typeof internalNotes === "string") {
      updateFields.internalNotes = internalNotes.trim()
    }

    const updated = await ContactMessage.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    ).lean()

    if (!updated) {
      return NextResponse.json({ success: false, error: "Message not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Message updated successfully",
      updated,
    })
  } catch (error: any) {
    console.error("[Admin Message PATCH Error]:", error)
    return NextResponse.json({ success: false, error: error.message || "Failed to update message" }, { status: 500 })
  }
}

