export interface EventItem {
  id: string
  title: string
  subtitle?: string
  badge: string
  startDate: string
  endDate?: string
  dateDisplay: string
  timeDisplay?: string
  countdownTarget: string // ISO string format (e.g. 2025-11-15T09:00:00Z)
  venue: string
  attendeeBadge?: string
  description?: string
  registrationUrl: string
  registrationBtnText: string
  agendaBtnText: string
  programDocumentUrl?: string
  programDocumentName?: string
  bannerImageUrl?: string
  isActive: boolean
  isArchived?: boolean
  createdAt: string
  updatedAt: string
}

export type CreateEventInput = Omit<EventItem, "id" | "createdAt" | "updatedAt">
export type UpdateEventInput = Partial<CreateEventInput>
