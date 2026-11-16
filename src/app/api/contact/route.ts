import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import ContactMessage from "@/models/ContactMessage"

export const dynamic = "force-dynamic"
export const revalidate = 0

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

const CATEGORY_LABELS: Record<string, string> = {
  partnerships: "Schools & Hubs",
  mentorship: "Youth Mentorship",
  donors: "Donors & Grants",
  media: "Media & Speaking",
  general: "General Inquiry",
}

function sanitize(val: any): string {
  if (typeof val !== "string") return ""
  return val.trim().replace(/[<>]/g, "")
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, phone, organization, category, message, honeypot } = body

    // 1. Bot honeypot check
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Message received." }, { status: 200 })
    }

    // 2. Validate required fields
    const cleanName = sanitize(fullName)
    const cleanEmail = sanitize(email).toLowerCase()
    const cleanPhone = sanitize(phone)
    const cleanOrg = sanitize(organization)
    const cleanCategory = sanitize(category) || "general"
    const cleanMessage = sanitize(message)

    if (!cleanName || cleanName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter your full name." },
        { status: 400 }
      )
    }

    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      )
    }

    if (!cleanMessage || cleanMessage.length < 5) {
      return NextResponse.json(
        { success: false, error: "Please provide a message with at least 5 characters." },
        { status: 400 }
      )
    }

    // 3. Connect to MongoDB
    await connectDB()

    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown"
    const userAgent = request.headers.get("user-agent")?.slice(0, 200) || "unknown"

    const newMessage = new ContactMessage({
      fullName: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      organization: cleanOrg,
      category: cleanCategory,
      categoryLabel: CATEGORY_LABELS[cleanCategory] || "General Inquiry",
      message: cleanMessage,
      status: "unread",
      submittedAt: new Date(),
      ipAddress,
      userAgent,
    })

    await newMessage.save()

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully. An I-IMPACT coordinator will be in touch shortly.",
        id: newMessage._id,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("[Contact API Error]:", error)

    const isWhitelistError =
      error?.name === "MongooseServerSelectionError" ||
      error?.message?.includes("timed out") ||
      error?.message?.includes("whitelist")

    return NextResponse.json(
      {
        success: false,
        error: isWhitelistError
          ? "Database connection temporarily pending authorization. Please try again shortly."
          : error.message || "Failed to deliver message.",
      },
      { status: 500 }
    )
  }
}

