import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Subscriber from "@/models/Subscriber"
import { sendEmailBroadcast } from "@/lib/email"

export const dynamic = "force-dynamic"
export const revalidate = 0

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const rawEmail = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""
    const source = typeof body.source === "string" ? body.source.trim() : "footer_newsletter"

    if (!rawEmail) {
      return NextResponse.json(
        { success: false, error: "Please enter an email address." },
        { status: 400 }
      )
    }

    if (!EMAIL_REGEX.test(rawEmail) || rawEmail.length > 254) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address (e.g. name@example.com)." },
        { status: 400 }
      )
    }

    // Connect to MongoDB Atlas
    try {
      await connectDB()
    } catch (dbConnectErr: any) {
      console.error("[MongoDB Connection Error - Newsletter]:", dbConnectErr)
      const isServerSelection =
        dbConnectErr?.name === "MongooseServerSelectionError" ||
        dbConnectErr?.message?.includes("buffering timed out") ||
        dbConnectErr?.message?.includes("timed out") ||
        dbConnectErr?.message?.includes("whitelist")

      return NextResponse.json(
        {
          success: false,
          error: isServerSelection
            ? "Database connection temporarily unavailable. Please verify MongoDB Atlas IP whitelist."
            : "Database connection failed. Please try again shortly.",
        },
        { status: 503 }
      )
    }

    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      undefined
    const userAgent = request.headers.get("user-agent") || undefined

    // Check if subscriber already exists
    const existingSubscriber = await Subscriber.findOne({ email: rawEmail })

    if (existingSubscriber) {
      if (existingSubscriber.status === "unsubscribed") {
        existingSubscriber.status = "active"
        existingSubscriber.subscribedAt = new Date()
        await existingSubscriber.save()
        return NextResponse.json(
          {
            success: true,
            message: "Welcome back! Your subscription to I-IMPACT updates is now active.",
          },
          { status: 200 }
        )
      }

      return NextResponse.json(
        {
          success: true,
          message: "You are already subscribed to I-IMPACT updates! Thank you for staying connected.",
        },
        { status: 200 }
      )
    }

    // Create new subscriber
    await Subscriber.create({
      email: rawEmail,
      source,
      status: "active",
      subscribedAt: new Date(),
      ipAddress,
      userAgent,
    })

    // Dispatch welcome confirmation email
    const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://i-impact.org"
    sendEmailBroadcast({
      to: [rawEmail],
      subject: "Welcome to I-IMPACT: Subscription Confirmed",
      title: "Welcome to the I-IMPACT Community!",
      message: `Thank you for subscribing to I-IMPACT updates.\n\nYou are now on our official notification list. You will receive direct announcements about our upcoming cohort openings, mentorship programs, community events, and transformative youth initiatives.\n\nTogether, we are raising champions everyday and inspiring generational transformation.`,
      actionUrl: siteUrl,
      actionLabel: "Visit I-IMPACT Website",
      category: "Welcome",
    }).catch((err) => console.error("[Newsletter Welcome Email Error]:", err))

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for subscribing to I-IMPACT updates!",
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("[Newsletter API Error]:", error)

    if (error?.code === 11000) {
      return NextResponse.json(
        {
          success: true,
          message: "You are already subscribed to I-IMPACT updates!",
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: "Unable to process subscription right now. Please try again later.",
      },
      { status: 500 }
    )
  }
}

// GET endpoint to query subscriber count or verify connection
export async function GET(request: NextRequest) {
  try {
    const adminKey = request.headers.get("x-admin-key")
    const validKey = process.env.ADMIN_API_KEY || "iimpact-dev-admin-key"

    if (adminKey !== validKey) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access" },
        { status: 401 }
      )
    }

    await connectDB()
    const count = await Subscriber.countDocuments({ status: "active" })
    return NextResponse.json({ success: true, activeSubscribers: count })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to retrieve subscribers" },
      { status: 500 }
    )
  }
}

