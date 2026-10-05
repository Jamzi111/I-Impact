export interface AssignmentItem {
  id: string
  title: string
  track: string // e.g. "Leadership & Civic Action", "STEM Innovation Lab", "Mentorship Cohort 2026", "Career Foundations"
  description: string
  instructions?: string
  dueDate: string // YYYY-MM-DD or readable string
  deadlineTime?: string // e.g. "11:59 PM WAT"
  points?: number
  submissionUrl?: string
  resourceLink?: string
  status: "active" | "completed" | "archived"
  createdAt: string
  updatedAt: string
}

export type CreateAssignmentInput = Omit<AssignmentItem, "id" | "createdAt" | "updatedAt">
export type UpdateAssignmentInput = Partial<CreateAssignmentInput>
