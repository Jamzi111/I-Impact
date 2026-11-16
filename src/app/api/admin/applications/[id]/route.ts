import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import connectDB from "@/lib/mongodb"
import Application from "@/models/Application"

export const dynamic = "force-dynamic"
export const revalidate = 0

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    await connectDB()

    let application = null

    if (mongoose.Types.ObjectId.isValid(id)) {
      application = await Application.findById(id).lean()
    }

    if (!application) {
      application = await Application.findOne({
        applicationReference: id.toUpperCase().trim(),
      }).lean()
    }

    if (!application) {
      return NextResponse.json(
        { success: false, error: "Application not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, application })
  } catch (error: any) {
    console.error("[Admin Application GET Error]:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch application" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const body = await request.json()
    const { status, internalNotes, reviewedBy } = body

    await connectDB()

    const updateFields: Record<string, any> = {}

    if (status && ["pending", "reviewing", "accepted", "rejected"].includes(status)) {
      updateFields.status = status
      updateFields.reviewedAt = new Date()
      if (reviewedBy) {
        updateFields.reviewedBy = reviewedBy
      }
    }

    if (typeof internalNotes === "string") {
      updateFields.internalNotes = internalNotes.trim()
    }

    let updatedApplication = null

    if (mongoose.Types.ObjectId.isValid(id)) {
      updatedApplication = await Application.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { new: true, runValidators: true }
      ).lean()
    }

    if (!updatedApplication) {
      updatedApplication = await Application.findOneAndUpdate(
        { applicationReference: id.toUpperCase().trim() },
        { $set: updateFields },
        { new: true, runValidators: true }
      ).lean()
    }

    if (!updatedApplication) {
      return NextResponse.json(
        { success: false, error: "Application not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `Application ${updatedApplication.applicationReference} updated successfully.`,
      application: updatedApplication,
    })
  } catch (error: any) {
    console.error("[Admin Application PATCH Error]:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update application" },
      { status: 500 }
    )
  }
}

