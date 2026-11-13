import { PathwayId, ShortTrackId } from "@/types/application"

export interface PathwayOption {
  value: string
  label: string
}

export interface PathwayConfig {
  id: PathwayId
  shortId: ShortTrackId
  title: string
  badge: string
  category: string
  badgeBg: string
  badgeColor: string
  iconColor: string
  description: string
  formIntro: string
  sections: FormSectionConfig[]
}

export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "url"
  | "number"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox-group"
  | "file"

export interface FormFieldConfig {
  name: string
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  helperText?: string
  options?: PathwayOption[]
  accept?: string
  maxSizeMB?: number
  condition?: {
    field: string
    value: any
  }
}

export interface FormSectionConfig {
  id: string
  title: string
  description?: string
  fields: FormFieldConfig[]
}

export const PATHWAY_CONFIGS: Record<PathwayId, PathwayConfig> = {
  mentorship: {
    id: "mentorship",
    shortId: "mentor",
    title: "Youth Mentorship & Guidance",
    badge: "Mentorship",
    category: "Personal Guidance",
    badgeBg: "#ECFDF5",
    badgeColor: "#059669",
    iconColor: "#149191",
    description: "Guide and inspire emerging young African leaders through personal, career, and academic mentorship.",
    formIntro: "Please provide your professional background and mentoring preferences so we can pair you with young changemakers who will benefit most from your experience.",
    sections: [
      {
        id: "professional-background",
        title: "Professional Background & Expertise",
        description: "Tell us about your career and areas of strength.",
        fields: [
          {
            name: "currentOccupation",
            label: "Current Occupation / Job Title",
            type: "text",
            required: true,
            placeholder: "e.g., Software Engineering Lead, Senior Financial Analyst, Educator",
          },
          {
            name: "organization",
            label: "Organisation or Company",
            type: "text",
            required: false,
            placeholder: "e.g., Google, Lagos State University, Self-Employed",
            helperText: "Optional",
          },
          {
            name: "industry",
            label: "Industry or Area of Expertise",
            type: "text",
            required: true,
            placeholder: "e.g., Technology, Healthcare, Renewable Energy, Creative Arts",
          },
          {
            name: "highestQualification",
            label: "Highest Educational Qualification",
            type: "select",
            required: false,
            placeholder: "Select your qualification level",
            options: [
              { value: "Secondary School / High School", label: "Secondary School / High School" },
              { value: "Diploma / Associate Degree", label: "Diploma / Associate Degree" },
              { value: "Bachelor's Degree (BSc, BA, BTech)", label: "Bachelor's Degree (BSc, BA, BTech)" },
              { value: "Master's Degree (MSc, MBA, MA)", label: "Master's Degree (MSc, MBA, MA)" },
              { value: "Doctorate (PhD) or Post-Doctorate", label: "Doctorate (PhD) or Post-Doctorate" },
              { value: "Professional Certification / Other", label: "Professional Certification / Other" },
            ],
            helperText: "Optional",
          },
          {
            name: "yearsOfExperience",
            label: "Years of Professional Experience",
            type: "select",
            required: true,
            placeholder: "Select experience range",
            options: [
              { value: "1 - 2 years", label: "1 – 2 years" },
              { value: "3 - 5 years", label: "3 – 5 years" },
              { value: "6 - 10 years", label: "6 – 10 years" },
              { value: "10+ years", label: "10+ years" },
            ],
          },
        ],
      },
      {
        id: "mentorship-focus",
        title: "Mentorship Focus & Preferences",
        description: "Specify where you can create the greatest impact.",
        fields: [
          {
            name: "mentorshipAreas",
            label: "Areas of Mentorship",
            type: "checkbox-group",
            required: true,
            helperText: "Select all that you feel comfortable advising on (at least one).",
            options: [
              { value: "Career development", label: "Career development" },
              { value: "Technology and digital skills", label: "Technology and digital skills" },
              { value: "Entrepreneurship", label: "Entrepreneurship" },
              { value: "Leadership", label: "Leadership" },
              { value: "Personal development", label: "Personal development" },
              { value: "Education and academics", label: "Education and academics" },
              { value: "Other", label: "Other" },
            ],
          },
          {
            name: "otherMentorshipArea",
            label: "Specify Other Mentorship Area",
            type: "text",
            required: false,
            placeholder: "Describe your other focus area",
            condition: { field: "mentorshipAreas", value: "Other" },
          },
          {
            name: "previousMentoringExperience",
            label: "Previous Mentoring Experience",
            type: "textarea",
            required: true,
            placeholder: "Briefly describe any past experience mentoring youth, students, or colleagues (if none, describe your approach to guidance).",
          },
          {
            name: "preferredAgeGroups",
            label: "Preferred Age Groups",
            type: "checkbox-group",
            required: true,
            helperText: "Select all that apply.",
            options: [
              { value: "Early Teens (13-15 years)", label: "Early Teens (13–15 years)" },
              { value: "Older Teens (16-19 years)", label: "Older Teens (16–19 years)" },
              { value: "Young Adults (20-25 years)", label: "Young Adults (20–25 years)" },
            ],
          },
          {
            name: "mentorshipFormat",
            label: "Preferred Mentorship Format",
            type: "radio",
            required: true,
            options: [
              { value: "Online", label: "Online (Virtual calls & messaging)" },
              { value: "In-person", label: "In-person (Physical sessions where applicable)" },
              { value: "Either", label: "Either (Flexible hybrid)" },
            ],
          },
          {
            name: "availabilityFrequency",
            label: "Availability and Frequency",
            type: "select",
            required: true,
            placeholder: "Select your expected commitment",
            options: [
              { value: "1 - 2 hours per week", label: "1 – 2 hours per week" },
              { value: "2 - 4 hours every two weeks", label: "2 – 4 hours every two weeks" },
              { value: "2 - 3 hours once a month", label: "2 – 3 hours once a month" },
              { value: "Flexible / Programme-based cohort", label: "Flexible / Programme-based cohort" },
            ],
          },
        ],
      },
      {
        id: "motivation-documents",
        title: "Motivation & Professional Profile",
        fields: [
          {
            name: "motivation",
            label: "Motivation for Becoming a Mentor",
            type: "textarea",
            required: true,
            placeholder: "Why do you want to mentor young people with I IMPACT INITIATIVE? What do you hope to impart to them?",
          },
          {
            name: "linkedinUrl",
            label: "LinkedIn Profile URL",
            type: "url",
            required: false,
            placeholder: "https://www.linkedin.com/in/username",
            helperText: "Optional",
          },
          {
            name: "cvFileUrl",
            label: "CV or Professional Profile (PDF / DOCX)",
            type: "file",
            required: false,
            accept: ".pdf,.doc,.docx",
            maxSizeMB: 5,
            helperText: "Optional (Max 5MB, PDF or DOCX). Uploading helps us better understand your career background.",
          },
        ],
      },
    ],
  },

  volunteering: {
    id: "volunteering",
    shortId: "volunteer",
    title: "Community & Event Volunteering",
    badge: "Volunteers",
    category: "Hands-On Support",
    badgeBg: "#EFF6FF",
    badgeColor: "#2563EB",
    iconColor: "#051B64",
    description: "Support our events, summits, workshops, and community outreaches on the ground and behind the scenes.",
    formIntro: "Volunteers make our conferences and youth outreaches memorable and impactful. Tell us where your energy and skills shine most.",
    sections: [
      {
        id: "volunteer-interests",
        title: "Areas of Volunteer Interest",
        fields: [
          {
            name: "areasOfInterest",
            label: "Areas of Interest",
            type: "checkbox-group",
            required: true,
            helperText: "Select all areas where you would like to contribute.",
            options: [
              { value: "Event planning and coordination", label: "Event planning and coordination" },
              { value: "Registration and attendee support", label: "Registration and attendee support" },
              { value: "Media, photography and videography", label: "Media, photography and videography" },
              { value: "Social media and communications", label: "Social media and communications" },
              { value: "Logistics and operations", label: "Logistics and operations" },
              { value: "Technical support", label: "Technical support" },
              { value: "Community outreach", label: "Community outreach" },
              { value: "General volunteering", label: "General volunteering" },
            ],
          },
          {
            name: "previousVolunteeringExperience",
            label: "Previous Volunteering Experience",
            type: "textarea",
            required: true,
            placeholder: "Describe any previous volunteer work, community roles, or event experience you have had.",
          },
        ],
      },
      {
        id: "volunteer-availability",
        title: "Availability & Logistics",
        fields: [
          {
            name: "availabilitySchedule",
            label: "General Availability",
            type: "radio",
            required: true,
            options: [
              { value: "Weekdays", label: "Weekdays" },
              { value: "Weekends", label: "Weekends" },
              { value: "Both", label: "Both Weekdays and Weekends" },
              { value: "Depends on the event", label: "Depends on the event schedule" },
            ],
          },
          {
            name: "availabilityFrequency",
            label: "Frequency of Availability",
            type: "select",
            required: true,
            placeholder: "Select your availability frequency",
            options: [
              { value: "Regular weekly / bi-weekly participation", label: "Regular weekly / bi-weekly participation" },
              { value: "Monthly activities", label: "Monthly activities" },
              { value: "Major summit / conference days only", label: "Major summit / conference days only" },
              { value: "On-call / as needed", label: "On-call / as needed" },
            ],
          },
          {
            name: "physicalEventAttendance",
            label: "Ability to Attend Physical Events",
            type: "radio",
            required: true,
            options: [
              { value: "Yes", label: "Yes (Available for on-ground venues)" },
              { value: "No", label: "No (Virtual / Remote support only)" },
              { value: "Depends on location", label: "Depends on location and transport" },
            ],
          },
          {
            name: "virtualActivitiesAvailability",
            label: "Availability for Virtual Activities",
            type: "radio",
            required: true,
            options: [
              { value: "Yes", label: "Yes (Reliable internet & device available)" },
              { value: "No", label: "No" },
              { value: "Occasionally", label: "Occasionally" },
            ],
          },
        ],
      },
      {
        id: "volunteer-skills-motivation",
        title: "Skills, Motivation & Portfolio",
        fields: [
          {
            name: "relevantSkills",
            label: "Relevant Skills",
            type: "textarea",
            required: true,
            placeholder: "e.g., Public speaking, crowd management, graphic design, sound engineering, First Aid, administrative skills.",
          },
          {
            name: "motivation",
            label: "Motivation for Volunteering",
            type: "textarea",
            required: true,
            placeholder: "What drives you to volunteer with I IMPACT INITIATIVE? What do you hope to gain and give?",
          },
          {
            name: "portfolioOrSocialUrl",
            label: "Portfolio or Social Media Profile URL",
            type: "url",
            required: false,
            placeholder: "https://instagram.com/username or LinkedIn / Behance",
            helperText: "Optional (especially helpful for media, design, or social media volunteers).",
          },
        ],
      },
    ],
  },

  partnerships: {
    id: "partnerships",
    shortId: "partner",
    title: "School & Institutional Partnerships",
    badge: "Partnerships",
    category: "Collaborative Alliances",
    badgeBg: "#F5F3FF",
    badgeColor: "#7C3AED",
    iconColor: "#7C3AED",
    description: "Partner your secondary school, tertiary institution, NGO, or educational body with I IMPACT.",
    formIntro: "Collaborate with us to bring transformative youth leadership programmes, skills workshops, and delegation opportunities to your students.",
    sections: [
      {
        id: "institution-details",
        title: "Institution Information",
        fields: [
          {
            name: "institutionName",
            label: "Institution Name",
            type: "text",
            required: true,
            placeholder: "e.g., King's College Lagos, University of Ibadan, Youth Forward NGO",
          },
          {
            name: "institutionType",
            label: "Institution Type",
            type: "select",
            required: true,
            placeholder: "Select institution type",
            options: [
              { value: "Secondary School / High School", label: "Secondary School / High School" },
              { value: "Tertiary Institution / University / Polytechnic", label: "Tertiary Institution / University / Polytechnic" },
              { value: "Non-Governmental Organisation (NGO)", label: "Non-Governmental Organisation (NGO)" },
              { value: "Government Agency / Education Board", label: "Government Agency / Education Board" },
              { value: "Faith-Based / Community Centre", label: "Faith-Based / Community Centre" },
              { value: "Corporate CSR / Other Institution", label: "Corporate CSR / Other Institution" },
            ],
          },
          {
            name: "institutionAddress",
            label: "Institution Physical Address",
            type: "text",
            required: true,
            placeholder: "Street address, area, or campus location",
          },
          {
            name: "institutionWebsite",
            label: "Institution Website URL",
            type: "url",
            required: false,
            placeholder: "https://www.yourschool.edu.ng",
            helperText: "Optional",
          },
        ],
      },
      {
        id: "contact-officer",
        title: "Official Contact Person Details",
        description: "Official representative responsible for coordinating this partnership.",
        fields: [
          {
            name: "contactPersonName",
            label: "Contact Person's Full Name",
            type: "text",
            required: true,
            placeholder: "e.g., Dr. Folake Adeleke",
          },
          {
            name: "officialPosition",
            label: "Official Position / Title",
            type: "text",
            required: true,
            placeholder: "e.g., Principal, Dean of Student Affairs, Head of Guidance & Counselling",
          },
          {
            name: "contactEmail",
            label: "Official Contact Email",
            type: "email",
            required: true,
            placeholder: "official.email@institution.edu.ng",
          },
          {
            name: "contactPhone",
            label: "Official Contact Phone / WhatsApp",
            type: "tel",
            required: true,
            placeholder: "+234 800 000 0000",
          },
        ],
      },
      {
        id: "partnership-scope",
        title: "Partnership Interests & Scope",
        fields: [
          {
            name: "partnershipInterests",
            label: "Partnership Interests",
            type: "checkbox-group",
            required: true,
            helperText: "Select all collaboration tracks that interest your institution.",
            options: [
              { value: "Youth leadership programmes", label: "Youth leadership programmes" },
              { value: "Student mentorship", label: "Student mentorship" },
              { value: "Educational workshops", label: "Educational workshops" },
              { value: "Youth conferences and events", label: "Youth conferences and events (e.g., AS A TEEN)" },
              { value: "Skills development", label: "Skills development (STEM & Digital skills)" },
              { value: "Student engagement and outreach", label: "Student engagement and outreach" },
              { value: "Other", label: "Other" },
            ],
          },
          {
            name: "otherPartnershipInterest",
            label: "Specify Other Partnership Interest",
            type: "text",
            required: false,
            placeholder: "Describe other desired partnership goals",
            condition: { field: "partnershipInterests", value: "Other" },
          },
          {
            name: "institutionIntroduction",
            label: "Brief Institution Introduction",
            type: "textarea",
            required: true,
            placeholder: "Provide a brief summary of your institution, student body, and educational mission.",
          },
          {
            name: "proposedCollaboration",
            label: "Proposed Collaboration",
            type: "textarea",
            required: true,
            placeholder: "How would you like I IMPACT INITIATIVE to partner with your institution? What specific initiatives or events are you proposing?",
          },
          {
            name: "intendedBeneficiaries",
            label: "Intended Beneficiaries",
            type: "text",
            required: true,
            placeholder: "e.g., SS1 - SS3 students, STEM club members, all undergraduate students",
          },
          {
            name: "estimatedParticipants",
            label: "Estimated Number of Potential Participants",
            type: "select",
            required: false,
            placeholder: "Select participant range",
            options: [
              { value: "Under 50 participants", label: "Under 50 participants" },
              { value: "50 - 150 participants", label: "50 – 150 participants" },
              { value: "150 - 500 participants", label: "150 – 500 participants" },
              { value: "500 - 1,000+ participants", label: "500 – 1,000+ participants" },
            ],
            helperText: "Optional estimate",
          },
          {
            name: "availableResources",
            label: "Available Resources or Institutional Support",
            type: "textarea",
            required: false,
            placeholder: "e.g., Hall/auditorium venue, computer lab access, administrative support, staff chaperones.",
            helperText: "Optional",
          },
          {
            name: "proposalFileUrl",
            label: "Institutional Profile or Proposal Document (PDF / DOCX)",
            type: "file",
            required: false,
            accept: ".pdf,.doc,.docx",
            maxSizeMB: 5,
            helperText: "Optional (Max 5MB). Upload an introductory letter, school profile, or formal partnership proposal.",
          },
        ],
      },
    ],
  },

  sponsorship: {
    id: "sponsorship",
    shortId: "sponsor",
    title: "Programme Sponsorship & Support",
    badge: "Support",
    category: "Financial & In-Kind Giving",
    badgeBg: "#FFFBEB",
    badgeColor: "#D97706",
    iconColor: "#D97706",
    description: "Support youth development through programme sponsorship, equipment provision, or corporate CSR partnerships.",
    formIntro: "Thank you for considering supporting I IMPACT INITIATIVE. Please share your expression of interest below so our team can discuss collaborative opportunities that match your mission.",
    sections: [
      {
        id: "sponsor-identity",
        title: "Sponsor Identity",
        fields: [
          {
            name: "applicantType",
            label: "Applicant Type",
            type: "radio",
            required: true,
            options: [
              { value: "Individual", label: "Individual Supporter / Philanthropist" },
              { value: "Organisation", label: "Organisation / Corporate / Foundation" },
            ],
          },
          {
            name: "entityName",
            label: "Individual or Organisation Name",
            type: "text",
            required: true,
            placeholder: "Your personal name or official company/foundation name",
          },
          {
            name: "contactPersonName",
            label: "Contact Person's Name (if Organisation)",
            type: "text",
            required: false,
            placeholder: "e.g., Chief Sustainability Officer, CSR Manager",
            condition: { field: "applicantType", value: "Organisation" },
          },
          {
            name: "websiteUrl",
            label: "Organisation Website URL",
            type: "url",
            required: false,
            placeholder: "https://www.company.com",
            helperText: "Optional",
          },
        ],
      },
      {
        id: "support-details",
        title: "Nature of Support",
        fields: [
          {
            name: "supportTypes",
            label: "Type of Support",
            type: "checkbox-group",
            required: true,
            helperText: "Select all categories of support you would like to discuss.",
            options: [
              { value: "Financial support", label: "Financial support (programme grants & cohort sponsorships)" },
              { value: "Learning materials", label: "Learning materials (books, stationery, learning kits)" },
              { value: "Equipment and resources", label: "Equipment and resources (laptops, Maker kits, tech)" },
              { value: "Event sponsorship", label: "Event sponsorship (summit branding, delegate passes)" },
              { value: "Venue or logistics support", label: "Venue or logistics support" },
              { value: "Technical expertise", label: "Technical expertise / Pro-bono professional services" },
              { value: "Other", label: "Other" },
            ],
          },
          {
            name: "otherSupportType",
            label: "Specify Other Support Type",
            type: "text",
            required: false,
            placeholder: "Describe other ways you wish to support",
            condition: { field: "supportTypes", value: "Other" },
          },
          {
            name: "programmeOfInterest",
            label: "Programme of Interest",
            type: "select",
            required: false,
            placeholder: "Select specific programme or general support",
            options: [
              { value: "General Youth Development Fund", label: "General Youth Development Fund" },
              { value: "AS A TEEN Annual Youth Conference", label: "AS A TEEN Annual Youth Conference" },
              { value: "STEM Innovation Lab & Robotics Kit Fund", label: "STEM Innovation Lab & Robotics Kit Fund" },
              { value: "Youth Leadership Accelerator Cohort", label: "Youth Leadership Accelerator Cohort" },
              { value: "Student Mentorship & Character Coaching", label: "Student Mentorship & Character Coaching" },
              { value: "Underserved School Outreach Drive", label: "Underserved School Outreach Drive" },
            ],
            helperText: "Optional",
          },
          {
            name: "supportDescription",
            label: "Description of Proposed Support",
            type: "textarea",
            required: true,
            placeholder: "Describe the scope, value, or details of the contribution you are considering.",
          },
          {
            name: "supportPreference",
            label: "Support Preference",
            type: "radio",
            required: true,
            options: [
              { value: "One-time", label: "One-time contribution or event sponsorship" },
              { value: "Ongoing", label: "Ongoing partnership / recurring support" },
            ],
          },
          {
            name: "conditionsOrExpectations",
            label: "Conditions, Expectations or CSR Objectives",
            type: "textarea",
            required: false,
            placeholder: "Any specific reporting requirements, branding guidelines, or CSR milestones you require.",
            helperText: "Optional",
          },
          {
            name: "proposalFileUrl",
            label: "Company Profile or Partnership Proposal (PDF / DOCX)",
            type: "file",
            required: false,
            accept: ".pdf,.doc,.docx",
            maxSizeMB: 5,
            helperText: "Optional (Max 5MB). Attach your organisation's CSR portfolio or sponsorship overview.",
          },
        ],
      },
    ],
  },

  speaking: {
    id: "speaking",
    shortId: "speaker",
    title: "Keynote Speakers & Facilitators",
    badge: "Speakers",
    category: "Knowledge Sharing",
    badgeBg: "#ECFDF5",
    badgeColor: "#059669",
    iconColor: "#059669",
    description: "Inspire thousands of youth as a conference keynote speaker, panelist, workshop lead, or masterclass facilitator.",
    formIntro: "Share your knowledge and life journey with forward-looking youth at our summits and learning sessions.",
    sections: [
      {
        id: "speaker-bio",
        title: "Professional Bio & Experience",
        fields: [
          {
            name: "jobTitle",
            label: "Current Job Title",
            type: "text",
            required: true,
            placeholder: "e.g., Executive Director, Founder, Lead AI Researcher",
          },
          {
            name: "organization",
            label: "Organisation or Business",
            type: "text",
            required: true,
            placeholder: "e.g., Vanguard Innovations, First Bank, African Leadership Institute",
          },
          {
            name: "industry",
            label: "Industry",
            type: "text",
            required: true,
            placeholder: "e.g., Technology, Law, Finance, Media, Social Enterprise",
          },
          {
            name: "professionalBio",
            label: "Professional Biography",
            type: "textarea",
            required: true,
            placeholder: "Provide a 2-3 paragraph biography summarizing your professional achievements, background, and public speaking experience.",
          },
          {
            name: "yearsOfExperience",
            label: "Years of Professional Experience",
            type: "select",
            required: true,
            placeholder: "Select your years of experience",
            options: [
              { value: "3 - 5 years", label: "3 – 5 years" },
              { value: "6 - 10 years", label: "6 – 10 years" },
              { value: "11 - 15 years", label: "11 – 15 years" },
              { value: "15+ years", label: "15+ years" },
            ],
          },
        ],
      },
      {
        id: "speaking-details",
        title: "Speaking Topics & Participation Preferences",
        fields: [
          {
            name: "speakingTopics",
            label: "Speaking Topics",
            type: "checkbox-group",
            required: true,
            helperText: "Select all subject areas you are passionate about addressing.",
            options: [
              { value: "Leadership", label: "Leadership" },
              { value: "Technology", label: "Technology" },
              { value: "Entrepreneurship", label: "Entrepreneurship" },
              { value: "Career development", label: "Career development" },
              { value: "Education", label: "Education" },
              { value: "Personal development", label: "Personal development" },
              { value: "Innovation", label: "Innovation" },
              { value: "Other", label: "Other" },
            ],
          },
          {
            name: "otherSpeakingTopic",
            label: "Specify Other Topic",
            type: "text",
            required: false,
            placeholder: "e.g., Creative arts, Mental resilience, Civic participation",
            condition: { field: "speakingTopics", value: "Other" },
          },
          {
            name: "preferredParticipation",
            label: "Preferred Format of Participation",
            type: "checkbox-group",
            required: true,
            helperText: "Select all formats you are open to.",
            options: [
              { value: "Keynote", label: "Keynote Address (20-30 min main stage)" },
              { value: "Panel discussion", label: "Panel Discussion (Moderated interactive discussion)" },
              { value: "Workshop", label: "Practical Workshop (Hands-on group exercise)" },
              { value: "Masterclass", label: "Masterclass (In-depth specialized skill class)" },
            ],
          },
          {
            name: "preferredFormat",
            label: "Delivery Format",
            type: "radio",
            required: true,
            options: [
              { value: "Physical", label: "Physical (In-person attendance at event venue)" },
              { value: "Virtual", label: "Virtual (Live stream or recorded session)" },
              { value: "Either", label: "Either (Open to both)" },
            ],
          },
          {
            name: "preferredAudience",
            label: "Preferred Audience / Age Group",
            type: "select",
            required: true,
            placeholder: "Select target demographic",
            options: [
              { value: "Teens (13 - 17 years)", label: "Teens (13 – 17 years)" },
              { value: "Young Adults (18 - 25 years)", label: "Young Adults (18 – 25 years)" },
              { value: "Educators and Youth Workers", label: "Educators and Youth Workers" },
              { value: "All Youth Audiences", label: "All Youth Audiences" },
            ],
          },
          {
            name: "futureEventAvailability",
            label: "Future Event Availability",
            type: "text",
            required: true,
            placeholder: "e.g., Weekend availability, requires 3 weeks advance notice, available quarterly",
          },
        ],
      },
      {
        id: "speaker-profiles",
        title: "Links & Speaker Profile",
        fields: [
          {
            name: "linkedinUrl",
            label: "LinkedIn Profile URL",
            type: "url",
            required: false,
            placeholder: "https://www.linkedin.com/in/username",
            helperText: "Optional",
          },
          {
            name: "websiteOrPortfolioUrl",
            label: "Website or Portfolio URL",
            type: "url",
            required: false,
            placeholder: "https://www.yourname.com or YouTube speaking link",
            helperText: "Optional",
          },
          {
            name: "previousSpeakingEngagements",
            label: "Previous Speaking Engagements",
            type: "textarea",
            required: false,
            placeholder: "List 2-3 past conferences, webinars, or events where you have spoken.",
            helperText: "Optional",
          },
          {
            name: "speakerProfileFileUrl",
            label: "Speaker Profile / One-Pager (PDF / DOCX)",
            type: "file",
            required: false,
            accept: ".pdf,.doc,.docx",
            maxSizeMB: 5,
            helperText: "Optional (Max 5MB). Attach your official speaker one-sheet or media kit.",
          },
        ],
      },
    ],
  },

  ambassadors: {
    id: "ambassadors",
    shortId: "community",
    title: "Community Advocates & Ambassadors",
    badge: "Community",
    category: "Grassroots Advocates",
    badgeBg: "#CCFBF1",
    badgeColor: "#0D9488",
    iconColor: "#0D9488",
    description: "Champion the mission of I IMPACT in your school, university campus, or local neighborhood.",
    formIntro: "Ambassadors are the pulse of our movement. Mobilise your peers, spread opportunities, and build community wherever you are.",
    sections: [
      {
        id: "ambassador-affiliation",
        title: "Community Affiliation & Representation",
        fields: [
          {
            name: "affiliation",
            label: "School, University, or Community Affiliation",
            type: "text",
            required: false,
            placeholder: "e.g., University of Lagos, Queens College Yaba, Ikeja Youth Forum",
            helperText: "Optional",
          },
          {
            name: "preferredRepresentation",
            label: "Preferred Representation Sphere",
            type: "radio",
            required: true,
            options: [
              { value: "Secondary school", label: "Secondary school" },
              { value: "University or campus", label: "University or campus" },
              { value: "Local community", label: "Local community / Neighborhood" },
              { value: "Online community", label: "Online community / Digital networks" },
              { value: "Other", label: "Other" },
            ],
          },
          {
            name: "otherRepresentation",
            label: "Specify Other Sphere",
            type: "text",
            required: false,
            placeholder: "Describe your representation area",
            condition: { field: "preferredRepresentation", value: "Other" },
          },
        ],
      },
      {
        id: "ambassador-activities",
        title: "Outreach Interests & Strategy",
        fields: [
          {
            name: "outreachInterests",
            label: "Outreach Interests",
            type: "checkbox-group",
            required: true,
            helperText: "Select all activities you would like to lead or support.",
            options: [
              { value: "Sharing programme announcements", label: "Sharing programme announcements" },
              { value: "Promoting events and opportunities", label: "Promoting events and opportunities" },
              { value: "Mobilising young people", label: "Mobilising young people for summits and cohorts" },
              { value: "Community awareness campaigns", label: "Community awareness campaigns" },
              { value: "Supporting local activities", label: "Supporting local activities and campus meetups" },
            ],
          },
          {
            name: "previousLeadershipExperience",
            label: "Previous Leadership or Community Engagement Experience",
            type: "textarea",
            required: true,
            placeholder: "Describe any roles you have held in school clubs, student unions, volunteer groups, or online communities.",
          },
          {
            name: "motivation",
            label: "Motivation for Becoming an Ambassador",
            type: "textarea",
            required: true,
            placeholder: "Why do you want to represent I IMPACT INITIATIVE in your circle?",
          },
          {
            name: "connectionStrategy",
            label: "How Would You Connect Young People to Our Initiatives?",
            type: "textarea",
            required: true,
            placeholder: "Share practical ideas you have for engaging peers, organizing info sessions, or spreading the word.",
          },
          {
            name: "relevantSkills",
            label: "Relevant Skills and Experience",
            type: "textarea",
            required: false,
            placeholder: "e.g., Social media creation, public speaking, event organizing, WhatsApp community management.",
            helperText: "Optional",
          },
          {
            name: "socialMediaPlatforms",
            label: "Social Media Handles or Active Platforms",
            type: "text",
            required: false,
            placeholder: "e.g., Twitter/X: @handle, Instagram: @handle, TikTok: @handle",
            helperText: "Optional",
          },
        ],
      },
    ],
  },
}

// Helper to normalize pathway ID whether from short ID (e.g. "mentor") or full ID (e.g. "mentorship")
export function normalizePathwayId(id: string | null | undefined): PathwayId {
  if (!id) return "mentorship"
  const clean = id.toLowerCase().trim()
  if (clean === "mentor" || clean === "mentorship") return "mentorship"
  if (clean === "volunteer" || clean === "volunteering") return "volunteering"
  if (clean === "partner" || clean === "partnerships" || clean === "partnership") return "partnerships"
  if (clean === "sponsor" || clean === "sponsorship") return "sponsorship"
  if (clean === "speaker" || clean === "speaking") return "speaking"
  if (clean === "community" || clean === "ambassadors" || clean === "ambassador") return "ambassadors"
  return "mentorship"
}

export function getShortTrackId(pathway: PathwayId): ShortTrackId {
  return PATHWAY_CONFIGS[pathway].shortId
}

export const APPROVED_PATHWAYS: PathwayId[] = [
  "mentorship",
  "volunteering",
  "partnerships",
  "sponsorship",
  "speaking",
  "ambassadors",
]

