import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import connectDB from "@/lib/mongodb"
import Admin from "@/models/Admin"
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/auth"

export const dynamic = "force-dynamic"
export const revalidate = 0

interface RouteContext {
  params: Promise<{ id: string }>
}

async function getAuthenticatedAdmin(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value
  if (!token) return null
  return await verifySessionToken(token)
}

// PATCH: Update admin role or active status (Super Admin only)
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const session = await getAuthenticatedAdmin(request)
    if (!session || session.role !== "superadmin") {
      return NextResponse.json(
        { success: false, error: "Only Super Administrators can modify administrator roles." },
        { status: 403 }
      )
    }

    const { id } = await context.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid admin ID" }, { status: 400 })
    }

    const body = await request.json()
    const { role, isActive } = body

    await connectDB()

    const targetAdmin = await Admin.findById(id)
    if (!targetAdmin) {
      return NextResponse.json({ success: false, error: "Admin not found" }, { status: 404 })
    }

    // Protect self from deactivation or demotion
    if (targetAdmin._id.toString() === session.adminId) {
      if (isActive === false) {
        return NextResponse.json(
          { success: false, error: "You cannot deactivate your own Super Admin account." },
          { status: 400 }
        )
      }
    }

    if (role && ["superadmin", "admin", "reviewer", "content_manager"].includes(role)) {
      targetAdmin.role = role
    }

    if (typeof isActive === "boolean") {
      targetAdmin.isActive = isActive
    }

    await targetAdmin.save()

    return NextResponse.json({
      success: true,
      message: "Administrator updated successfully",
      admin: {
        _id: targetAdmin._id.toString(),
        name: targetAdmin.name,
        email: targetAdmin.email,
        role: targetAdmin.role,
        isActive: targetAdmin.isActive,
      },
    })
  } catch (error: any) {
    console.error("[Admin Update Error]:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update administrator" },
      { status: 500 }
    )
  }
}

// DELETE: Remove an admin account (Super Admin only)
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const session = await getAuthenticatedAdmin(request)
    if (!session || session.role !== "superadmin") {
      return NextResponse.json(
        { success: false, error: "Only Super Administrators can delete administrator accounts." },
        { status: 403 }
      )
    }

    const { id } = await context.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid admin ID" }, { status: 400 })
    }

    // Cannot delete self
    if (id === session.adminId) {
      return NextResponse.json(
        { success: false, error: "You cannot delete your own account." },
        { status: 400 }
      )
    }

    await connectDB()

    const deleted = await Admin.findByIdAndDelete(id)
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Admin not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: `Administrator ${deleted.email} removed successfully`,
    })
  } catch (error: any) {
    console.error("[Admin Delete Error]:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete administrator" },
      { status: 500 }
    )
  }
}

