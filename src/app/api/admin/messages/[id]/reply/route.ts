import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import connectDB from "@/lib/mongodb"
import ContactMessage from "@/models/ContactMessage"
import { sendEmailBroadcast } from "@/lib/email"

export const dynamic = "force-dynamic"
export const revalidate = 0

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const body = await request.json()
    const { subject, replyText, repliedBy = "I-IMPACT Team" } = body

    if (!subject || !subject.trim()) {
      return NextResponse.json({ success: false, error: "Subject is required" }, { status: 400 })
    }

    if (!replyText || !replyText.trim()) {
      return NextResponse.json({ success: false, error: "Reply message body is required" }, { status: 400 })
    }

    await connectDB()

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid message ID" }, { status: 400 })
    }

    const contactMsg = await ContactMessage.findById(id)
    if (!contactMsg) {
      return NextResponse.json({ success: false, error: "Message not found" }, { status: 404 })
    }

    // Send the reply email to the recipient
    const emailResult = await sendEmailBroadcast({
      to: [contactMsg.email],
      subject: subject.trim(),
      title: subject.trim(),
      message: replyText.trim(),
      category: "Enquiry Response",
    })

    // Update message status in MongoDB
    contactMsg.status = "replied"
    contactMsg.repliedAt = new Date()
    contactMsg.repliedBy = repliedBy

    // Append reply note to internalNotes for tracking
    const timestampStr = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    })
    const existingNotes = contactMsg.internalNotes ? contactMsg.internalNotes + "\n\n" : ""
    contactMsg.internalNotes = `${existingNotes}[Replied to ${contactMsg.email} on ${timestampStr}]:\n"${replyText.trim()}"`
    
    await contactMsg.save()

    return NextResponse.json({
      success: true,
      message: "Reply sent successfully to recipient",
      updated: contactMsg.toObject(),
      emailResult,
    })
  } catch (error: any) {
    console.error("[Admin Message Reply POST Error]:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to dispatch email reply" },
      { status: 500 }
    )
  }
}
