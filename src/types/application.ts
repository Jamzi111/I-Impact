export type PathwayId =
  | "mentorship"
  | "volunteering"
  | "partnerships"
  | "sponsorship"
  | "speaking"
  | "ambassadors"

export type ShortTrackId =
  | "mentor"
  | "volunteer"
  | "partner"
  | "sponsor"
  | "speaker"
  | "community"

export interface ApplicantDetails {
  fullName: string
  email: string
  phone: string
  city: string
  state: string
  country: string
}

export interface MentorshipDetails {
  currentOccupation: string
  organization?: string
  industry: string
  highestQualification?: string
  yearsOfExperience: string
  mentorshipAreas: string[]
  otherMentorshipArea?: string
  previousMentoringExperience: string
  preferredAgeGroups: string[]
  mentorshipFormat: "Online" | "In-person" | "Either"
  availabilityFrequency: string
  motivation: string
  linkedinUrl?: string
  cvFileUrl?: string
  cvFileName?: string
}

export interface VolunteeringDetails {
  areasOfInterest: string[]
  previousVolunteeringExperience: string
  availabilitySchedule: "Weekdays" | "Weekends" | "Both" | "Depends on the event"
  availabilityFrequency: string
  physicalEventAttendance: "Yes" | "No" | "Depends on location"
  virtualActivitiesAvailability: "Yes" | "No" | "Occasionally"
  relevantSkills: string
  motivation: string
  portfolioOrSocialUrl?: string
}

export interface PartnershipsDetails {
  institutionName: string
  institutionType: string
  institutionAddress: string
  institutionWebsite?: string
  contactPersonName: string
  officialPosition: string
  contactEmail: string
  contactPhone: string
  partnershipInterests: string[]
  otherPartnershipInterest?: string
  institutionIntroduction: string
  proposedCollaboration: string
  intendedBeneficiaries: string
  estimatedParticipants?: string
  availableResources?: string
  proposalFileUrl?: string
  proposalFileName?: string
}

export interface SponsorshipDetails {
  applicantType: "Individual" | "Organisation"
  entityName: string
  contactPersonName?: string
  websiteUrl?: string
  supportTypes: string[]
  otherSupportType?: string
  programmeOfInterest?: string
  supportDescription: string
  supportPreference: "One-time" | "Ongoing"
  conditionsOrExpectations?: string
  proposalFileUrl?: string
  proposalFileName?: string
}

export interface SpeakingDetails {
  jobTitle: string
  organization: string
  industry: string
  professionalBio: string
  yearsOfExperience: string
  speakingTopics: string[]
  otherSpeakingTopic?: string
  preferredParticipation: string[]
  preferredFormat: "Physical" | "Virtual" | "Either"
  preferredAudience: string
  futureEventAvailability: string
  linkedinUrl?: string
  websiteOrPortfolioUrl?: string
  previousSpeakingEngagements?: string
  speakerProfileFileUrl?: string
  speakerProfileFileName?: string
}

export interface AmbassadorsDetails {
  affiliation?: string
  preferredRepresentation: "Secondary school" | "University or campus" | "Local community" | "Online community" | "Other"
  otherRepresentation?: string
  outreachInterests: string[]
  previousLeadershipExperience: string
  socialMediaPlatforms?: string
  motivation: string
  connectionStrategy: string
  relevantSkills?: string
}

export type PathwayDetailsMap = {
  mentorship: MentorshipDetails
  volunteering: VolunteeringDetails
  partnerships: PartnershipsDetails
  sponsorship: SponsorshipDetails
  speaking: SpeakingDetails
  ambassadors: AmbassadorsDetails
}

export type ApplicationStatus = "pending" | "reviewing" | "accepted" | "rejected"

export interface ApplicationSubmissionPayload {
  pathway: PathwayId
  applicantDetails: ApplicantDetails
  pathwayDetails: Record<string, any>
  safeguardingAcknowledged: boolean
}

export interface ApplicationDocument {
  _id?: string
  applicationReference: string
  pathway: PathwayId
  pathwayTitle: string
  applicantDetails: ApplicantDetails
  pathwayDetails: Record<string, any>
  status: ApplicationStatus
  submittedAt: string | Date
  safeguardingAcknowledged: boolean
  internalNotes?: string
  reviewedAt?: string | Date
  reviewedBy?: string
  ipAddress?: string
  userAgent?: string
}

