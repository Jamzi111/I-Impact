import { NextRequest, NextResponse } from "next/server"
import { getAssignments, createAssignment } from "@/lib/assignments"
import { CreateAssignmentInput } from "@/types/assignment"

export async function GET() {
  try {
    const assignments = await getAssignments()
    return NextResponse.json({
      success: true,
      assignments,
      totalCount: assignments.length,
    })
  } catch (error) {
    console.error("Error fetching assignments:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch assignments" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateAssignmentInput = await request.json()

    if (!body.title || !body.track || !body.dueDate) {
      return NextResponse.json(
        { success: false, error: "Title, track, and due date are required fields" },
        { status: 400 }
      )
    }

    const newAssignment = await createAssignment({
      title: body.title,
      track: body.track,
      description: body.description || "",
      instructions: body.instructions || "",
      dueDate: body.dueDate,
      deadlineTime: body.deadlineTime || "11:59 PM WAT",
      points: body.points || 100,
      submissionUrl: body.submissionUrl || "/assignments",
      resourceLink: body.resourceLink || "",
      status: body.status || "active",
    })

    return NextResponse.json({ success: true, assignment: newAssignment }, { status: 201 })
  } catch (error) {
    console.error("Error creating assignment:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create assignment" },
      { status: 500 }
    )
  }
}
