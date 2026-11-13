import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Application from "@/models/Application"
import {
  APPROVED_PATHWAYS,
  normalizePathwayId,
  PATHWAY_CONFIGS,
} from "@/config/pathways"
import { PathwayId } from "@/types/application"

// Helper to sanitize strings (trim, remove control chars / script injection tags)
function sanitizeString(val: any): string {
  if (typeof val !== "string") return ""
  return val
    .trim()
    .replace(/[<>]/g, "") // remove < and > to prevent basic XSS
}

// Generate unique, collision-resistant reference code: e.g. IIMP-MNT-K8X9Y2
function generateApplicationReference(pathway: PathwayId): string {
  const prefixes: Record<PathwayId, string> = {
    mentorship: "MNT",
    volunteering: "VOL",
    partnerships: "PTR",
    sponsorship: "SPN",
    speaking: "SPK",
    ambassadors: "AMB",
  }
  const prefix = prefixes[pathway] || "APP"
  const timestampPart = Date.now().toString(36).toUpperCase().slice(-4)
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `IIMP-${prefix}-${timestampPart}${randomPart}`
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
const PHONE_REGEX = /^[+0-9\s\-().]{7,25}$/

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { pathway: rawPathway, applicantDetails, pathwayDetails, safeguardingAcknowledged } = body

    // 1. Validate Pathway against approved list
    const pathway = normalizePathwayId(rawPathway)
    if (!APPROVED_PATHWAYS.includes(pathway)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid participation pathway selected. Please choose a valid pathway.",
        },
        { status: 400 }
      )
    }

    const pathwayConfig = PATHWAY_CONFIGS[pathway]

    // 2. Validate Safeguarding Acknowledgement
    if (!safeguardingAcknowledged) {
      return NextResponse.json(
        {
          success: false,
          error: "You must acknowledge the safeguarding and application review notice before submitting.",
        },
        { status: 400 }
      )
    }

    // 3. Validate Shared Personal Information
    if (!applicantDetails || typeof applicantDetails !== "object") {
      return NextResponse.json(
        { success: false, error: "Applicant personal details are required." },
        { status: 400 }
      )
    }

    const fullName = sanitizeString(applicantDetails.fullName)
    const email = sanitizeString(applicantDetails.email).toLowerCase()
    const phone = sanitizeString(applicantDetails.phone)
    const city = sanitizeString(applicantDetails.city)
    const state = sanitizeString(applicantDetails.state)
    const country = sanitizeString(applicantDetails.country) || "Nigeria"

    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide your valid full name (at least 2 characters)." },
        { status: 400 }
      )
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      )
    }

    if (!phone || !PHONE_REGEX.test(phone)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid phone or WhatsApp number (minimum 7 digits)." },
        { status: 400 }
      )
    }

    if (!city || city.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter your city of residence." },
        { status: 400 }
      )
    }

    if (!state || state.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter your state or province." },
        { status: 400 }
      )
    }

    // 4. Validate Pathway-Specific Required Fields
    const sanitizedPathwayDetails: Record<string, any> = {}
    const rawDetails = pathwayDetails && typeof pathwayDetails === "object" ? pathwayDetails : {}

    for (const section of pathwayConfig.sections) {
      for (const field of section.fields) {
        // Check if conditional field applies
        if (field.condition) {
          const depValue = rawDetails[field.condition.field]
          const isConditionMet = Array.isArray(depValue)
            ? depValue.includes(field.condition.value)
            : depValue === field.condition.value
          if (!isConditionMet) {
            continue
          }
        }

        const rawVal = rawDetails[field.name]

        if (field.type === "checkbox-group") {
          const list = Array.isArray(rawVal) ? rawVal.map((v) => sanitizeString(v)).filter(Boolean) : []
          if (field.required && list.length === 0) {
            return NextResponse.json(
              { success: false, error: `Please select at least one option for: ${field.label}` },
              { status: 400 }
            )
          }
          sanitizedPathwayDetails[field.name] = list
        } else if (field.type === "file") {
          const fileUrl = typeof rawVal === "string" ? rawVal.trim() : ""
          const fileName = typeof rawDetails[`${field.name}Name`] === "string" ? rawDetails[`${field.name}Name`].trim() : ""
          sanitizedPathwayDetails[field.name] = fileUrl
          if (fileName) {
            sanitizedPathwayDetails[`${field.name}Name`] = fileName
          }
        } else {
          const cleaned = sanitizeString(rawVal)
          if (field.required && (!cleaned || cleaned.length === 0)) {
            return NextResponse.json(
              { success: false, error: `Please fill in the required field: ${field.label}` },
              { status: 400 }
            )
          }
          sanitizedPathwayDetails[field.name] = cleaned
        }
      }
    }

    // 5. Connect to MongoDB Atlas
    await connectDB()

    // 6. Duplicate Submission Protection: check if submitted within last 5 minutes from same email & pathway
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
    const existingRecent = await Application.findOne({
      "applicantDetails.email": email,
      pathway,
      submittedAt: { $gte: fiveMinutesAgo },
    })

    if (existingRecent) {
      return NextResponse.json(
        {
          success: false,
          error: "An application for this pathway was already submitted recently from this email. Please allow a few minutes before submitting again or check your email for confirmation.",
          reference: existingRecent.applicationReference,
        },
        { status: 429 }
      )
    }

    // 7. Generate Reference and Insert
    let applicationReference = generateApplicationReference(pathway)
    // Ensure uniqueness
    let collisionCheck = await Application.findOne({ applicationReference })
    while (collisionCheck) {
      applicationReference = generateApplicationReference(pathway)
      collisionCheck = await Application.findOne({ applicationReference })
    }

    // Extract client IP and user agent safely
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown"
    const userAgent = request.headers.get("user-agent")?.slice(0, 200) || "unknown"

    const newApplication = new Application({
      applicationReference,
      pathway,
      pathwayTitle: pathwayConfig.title,
      applicantDetails: {
        fullName,
        email,
        phone,
        city,
        state,
        country,
      },
      pathwayDetails: sanitizedPathwayDetails,
      status: "pending",
      safeguardingAcknowledged: true,
      submittedAt: new Date(),
      internalNotes: "",
      ipAddress,
      userAgent,
    })

    await newApplication.save()

    return NextResponse.json(
      {
        success: true,
        message: "Your application has been received.",
        applicationReference,
        pathway,
        pathwayTitle: pathwayConfig.title,
        applicantName: fullName,
        submittedAt: newApplication.submittedAt,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Application submission server error:", error)

    if (error.name === "MongooseServerSelectionError" || error.message?.includes("whitelist")) {
      return NextResponse.json(
        {
          success: false,
          error: "Database connection failed: The server could not connect to MongoDB Atlas because the current IP address is not whitelisted in your Atlas cluster's Network Access settings. Please whitelist your current IP (or 0.0.0.0/0) in MongoDB Atlas.",
          isDbConfigurationError: true,
        },
        { status: 503 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: error.message || "An error occurred while processing your application. Please check your connection and try again.",
      },
      { status: 500 }
    )
  }
}

// Protected GET endpoint for future admin dashboard (strictly requires ADMIN_API_KEY)
export async function GET(request: NextRequest) {
  try {
    const adminKey = request.headers.get("x-admin-key")
    const configuredKey = process.env.ADMIN_API_KEY

    // Secure authentication check: Do not expose applicant information without valid admin key
    if (!configuredKey || adminKey !== configuredKey) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access to application records." },
        { status: 401 }
      )
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const pathway = searchParams.get("pathway")
    const status = searchParams.get("status")
    const search = searchParams.get("search")
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10", 10)))
    const skip = (page - 1) * limit

    const query: Record<string, any> = {}

    if (pathway && APPROVED_PATHWAYS.includes(pathway as PathwayId)) {
      query.pathway = pathway
    }

    if (status && ["pending", "reviewing", "accepted", "rejected"].includes(status)) {
      query.status = status
    }

    if (search) {
      const searchClean = sanitizeString(search)
      query.$or = [
        { applicationReference: { $regex: searchClean, $options: "i" } },
        { "applicantDetails.fullName": { $regex: searchClean, $options: "i" } },
        { "applicantDetails.email": { $regex: searchClean, $options: "i" } },
      ]
    }

    const [total, applications] = await Promise.all([
      Application.countDocuments(query),
      Application.find(query)
        .sort({ submittedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
    ])

    return NextResponse.json({
      success: true,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      applications,
    })
  } catch (error: any) {
    console.error("Admin applications query error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to retrieve application records." },
      { status: 500 }
    )
  }
}
