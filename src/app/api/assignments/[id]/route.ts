import { NextRequest, NextResponse } from "next/server"
import { getAssignmentById, updateAssignment, deleteAssignment } from "@/lib/assignments"
import { UpdateAssignmentInput } from "@/types/assignment"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const assignment = await getAssignmentById(id)
    if (!assignment) {
      return NextResponse.json(
        { success: false, error: "Assignment not found" },
        { status: 404 }
      )
    }
    return NextResponse.json({ success: true, assignment })
  } catch (error) {
    console.error("Error fetching assignment:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch assignment" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body: UpdateAssignmentInput = await request.json()
    const updated = await updateAssignment(id, body)

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Assignment not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, assignment: updated })
  } catch (error) {
    console.error("Error updating assignment:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update assignment" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const deleted = await deleteAssignment(id)

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Assignment not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, message: "Assignment deleted" })
  } catch (error) {
    console.error("Error deleting assignment:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete assignment" },
      { status: 500 }
    )
  }
}
