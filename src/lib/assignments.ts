import fs from "fs/promises"
import path from "path"
import { AssignmentItem, CreateAssignmentInput, UpdateAssignmentInput } from "@/types/assignment"

const DATA_FILE = path.join(process.cwd(), "src", "data", "assignments.json")

const DEFAULT_ASSIGNMENTS: AssignmentItem[] = [
  {
    "id": "asg-lead-01",
    "title": "Module 1: Generational Vision Reflection & Goal Blueprint",
    "track": "Leadership & Civic Action",
    "description": "Craft your personal 5-year leadership impact roadmap and identify one core community challenge to address.",
    "instructions": "Submit a 2-page reflection PDF covering: (1) Core vision statement, (2) Target demographic, (3) 3 actionable milestones for the upcoming quarter.",
    "dueDate": "2025-11-20",
    "deadlineTime": "11:59 PM WAT",
    "points": 100,
    "submissionUrl": "/assignments",
    "resourceLink": "https://drive.google.com",
    "status": "active",
    "createdAt": new Date().toISOString(),
    "updatedAt": new Date().toISOString(),
  },
  {
    "id": "asg-stem-01",
    "title": "Community STEM Innovation Lab: Problem Discovery Pitch",
    "track": "STEM Innovation Lab",
    "description": "Outline an engineering or software prototype solving a local environmental, educational, or health challenge.",
    "instructions": "Prepare a 5-slide pitch deck or 3-minute video walk-through detailing the problem statement, proposed technical architecture, and expected community impact.",
    "dueDate": "2025-11-28",
    "deadlineTime": "6:00 PM WAT",
    "points": 150,
    "submissionUrl": "/assignments",
    "resourceLink": "https://drive.google.com",
    "status": "active",
    "createdAt": new Date().toISOString(),
    "updatedAt": new Date().toISOString(),
  },
]

export async function getAssignments(): Promise<AssignmentItem[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8")
    const parsed = JSON.parse(data)
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed
    }
  } catch {
    await saveAssignments(DEFAULT_ASSIGNMENTS)
    return DEFAULT_ASSIGNMENTS
  }
  return DEFAULT_ASSIGNMENTS
}

export async function saveAssignments(assignments: AssignmentItem[]): Promise<void> {
  const dir = path.dirname(DATA_FILE)
  try {
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(DATA_FILE, JSON.stringify(assignments, null, 2), "utf-8")
  } catch (err) {
    console.error("Failed to save assignments to JSON:", err)
  }
}

export async function getAssignmentById(id: string): Promise<AssignmentItem | null> {
  const assignments = await getAssignments()
  return assignments.find((a) => a.id === id) || null
}

export async function createAssignment(input: CreateAssignmentInput): Promise<AssignmentItem> {
  const assignments = await getAssignments()
  const newAssignment: AssignmentItem = {
    ...input,
    id: `asg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    status: input.status || "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const updatedList = [newAssignment, ...assignments]
  await saveAssignments(updatedList)

  // Dynamically record into notifications
  try {
    const { addNotificationForAssignment } = await import("./notifications")
    await addNotificationForAssignment(newAssignment)
  } catch (err) {
    console.error("Could not sync notification for assignment:", err)
  }

  return newAssignment
}

export async function updateAssignment(id: string, input: UpdateAssignmentInput): Promise<AssignmentItem | null> {
  const assignments = await getAssignments()
  const index = assignments.findIndex((a) => a.id === id)
  if (index === -1) return null

  const updated: AssignmentItem = {
    ...assignments[index],
    ...input,
    updatedAt: new Date().toISOString(),
  }

  assignments[index] = updated
  await saveAssignments(assignments)
  return updated
}

export async function deleteAssignment(id: string): Promise<boolean> {
  const assignments = await getAssignments()
  const index = assignments.findIndex((a) => a.id === id)
  if (index === -1) return false

  const updatedList = assignments.filter((a) => a.id !== id)
  await saveAssignments(updatedList)

  try {
    const { deleteNotificationBySourceId } = await import("./notifications")
    await deleteNotificationBySourceId(id)
  } catch (err) {
    console.error("Could not delete notification for assignment:", err)
  }

  return true
}
