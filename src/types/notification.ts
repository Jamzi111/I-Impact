export interface NotificationItem {
  id: string
  title: string
  time?: string // relative time calculated dynamically ("2m ago", "1h ago", etc.)
  type: "event" | "assignment" | "cohort" | "announcement"
  category: "Event" | "Assignment" | "Cohort" | "Announcement"
  description: string
  href: string
  unread?: boolean
  sourceId?: string // event id or assignment id
  dueDate?: string
  createdAt: string
  updatedAt?: string
}

export type CreateNotificationInput = Omit<NotificationItem, "id" | "createdAt" | "time">
