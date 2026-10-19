export interface EventData {
  id: string
  title: string
  subtitle?: string
  theme?: string
  badge: string
  category: "Flagship Summit" | "Code & Innovation" | "Leadership Masterclass" | "Regional Gathering"
  startDate: string
  endDate?: string
  dateDisplay: string
  timeDisplay: string
  venue: string
  venueAddress?: string
  mode: "In-Person & Virtual" | "Virtual Only" | "In-Person Only"
  attendeeBadge: string
  description: string
  fullOverview?: string
  speakers?: {
    name: string
    role: string
    organization: string
    avatar?: string
    country: string
  }[]
  highlights?: string[]
  registrationUrl?: string
  registrationBtnText?: string
  status: "Featured" | "Registration Open" | "Filling Fast" | "Virtual Access Only" | "Completed"
  isHeroFeatured?: boolean
  bannerImageUrl?: string
  programDocumentName?: string
}

export const INITIAL_UPCOMING_EVENTS: EventData[] = [
  {
    id: "as-a-teen-2026",
    title: "AS A TEEN Conference 2026",
    subtitle: "Convening the Next Generation of African Champions",
    theme: "YOUNG & RULING",
    badge: "NEXT MAJOR GATHERING",
    category: "Flagship Summit",
    startDate: "2026-11-06",
    endDate: "2026-11-08",
    dateDisplay: "Nov 6–8, 2026",
    timeDisplay: "4:30 PM WAT (Hybrid Broadcast) & 9:00 AM Daily",
    venue: "Landmark Centre, Victoria Island, Lagos & Google Meet",
    venueAddress: "Plot 2 & 3, Water Corporation Dr, Victoria Island, Lagos, Nigeria",
    mode: "In-Person & Virtual",
    attendeeBadge: "3,500+ Expected Delegates",
    description: "The premier gathering ground for young African pioneers. Three transformative days of keynote addresses, high-octane leadership labs, code challenges, and peer networking.",
    fullOverview: "AS A TEEN Conference 2026 is our flagship continental summit engineered to ignite purpose, executive leadership skills, and technological competence in secondary students, teen innovators, and collegiate fellows across Africa.",
    speakers: [
      {
        name: "Samuel Joseph",
        role: "Convener & Founder",
        organization: "I IMPACT INITIATIVE",
        country: "Nigeria",
        avatar: "/public/The-founder.png",
      },
      {
        name: "Alan Daylee Yealu",
        role: "CEO & African Mind Builder",
        organization: "Mind Builders Africa",
        country: "Liberia",
      },
      {
        name: "Abigail Mbatu",
        role: "Founder",
        organization: "Girls for Global Impact",
        country: "Cameroon",
      },
    ],
    highlights: [
      "Official Certificate of Participation for all registered delegates",
      "Keynote addresses from continental youth change-makers",
      "Teen Innovation Pitch Lab with seed mentorship vouchers",
      "Interactive Q&A and breakout circles with certified mentors",
      "Global Live Broadcast reaching 20+ African countries",
    ],
    registrationBtnText: "Register Free as Delegate",
    status: "Featured",
    isHeroFeatured: true,
    bannerImageUrl: "/images/events-hero-summit.jpg",
    programDocumentName: "AS_A_TEEN_2026_Official_Brochure.pdf",
  },
  {
    id: "teen-code-lab-lagos-2026",
    title: "Pan-African Teen Code & AI Challenge",
    subtitle: "Hands-on software development, ethical AI & product design sprint",
    theme: "BUILD FOR AFRICA",
    badge: "TECH & INNOVATION",
    category: "Code & Innovation",
    startDate: "2026-12-05",
    endDate: "2026-12-06",
    dateDisplay: "Dec 5–6, 2026",
    timeDisplay: "10:00 AM – 3:30 PM WAT",
    venue: "Yaba Tech District Innovation Hub, Lagos & Discord Live",
    venueAddress: "Herbert Macaulay Way, Yaba, Lagos",
    mode: "In-Person & Virtual",
    attendeeBadge: "800+ Teen Coders",
    description: "A fast-paced weekend code lab where high-schoolers and young devs collaborate to build real-world software prototypes addressing health, education, and climate resilience in Africa.",
    highlights: [
      "Mentor-guided full-stack coding & generative AI workshops",
      "Live product pitch session in front of tech startup executives",
      "Prizes, tech equipment grants, and internship pathways",
    ],
    registrationBtnText: "Apply for Code Lab",
    status: "Registration Open",
  },
  {
    id: "nairobi-leadership-summit-2027",
    title: "East Africa Youth Leadership Masterclass",
    subtitle: "Ethical Governance, Public Speaking & Community Transformation",
    theme: "VOICE OF TOMORROW",
    badge: "REGIONAL SUMMIT",
    category: "Leadership Masterclass",
    startDate: "2027-01-23",
    endDate: "2027-01-24",
    dateDisplay: "Jan 23–24, 2027",
    timeDisplay: "9:00 AM – 2:00 PM EAT",
    venue: "Nairobi National Youth Centre, Kenya & Zoom Broadcast",
    mode: "In-Person & Virtual",
    attendeeBadge: "1,200+ Regional Leaders",
    description: "Empowering teen student council heads, fellowship leaders, and youth activists with practical diplomatic, organizational, and communications prowess.",
    highlights: [
      "Bespoke curriculum on emotional intelligence & team mobilization",
      "Panel session with young East African parliamentarians and founders",
      "Group action projects funded through micro-community seed awards",
    ],
    registrationBtnText: "Register for Nairobi Session",
    status: "Filling Fast",
  },
  {
    id: "girls-in-stem-accra-2027",
    title: "Girls for Global Impact STEM Summit",
    subtitle: "Bridging the digital divide for female innovators across West Africa",
    theme: "SHE CODES & LEADS",
    badge: "SPECIAL INITIATIVE",
    category: "Code & Innovation",
    startDate: "2027-02-14",
    dateDisplay: "Feb 14, 2027",
    timeDisplay: "11:00 AM – 4:00 PM GMT",
    venue: "Accra Digital Centre, Ghana & Hybrid Stream",
    mode: "In-Person & Virtual",
    attendeeBadge: "950+ Young Women",
    description: "A high-impact symposium hosted in collaboration with Girls for Global Impact, offering female students masterclasses in data science, robotics, and creative leadership.",
    highlights: [
      "Hands-on robotics & web engineering workshops",
      "Executive mentorship matchmaking with female engineers & tech VCs",
      "Empowerment grants for girls' school technology clubs",
    ],
    registrationBtnText: "Register for STEM Summit",
    status: "Registration Open",
  },
  {
    id: "regional-watch-party-convene",
    title: "Global Watch Party Hubs: Pan-Africa Network",
    subtitle: "Community-driven event pods hosted in schools, churches & tech spaces",
    theme: "UNITED IN EXCELLENCE",
    badge: "GRASSROOTS HUBS",
    category: "Regional Gathering",
    startDate: "2026-11-06",
    endDate: "2026-11-08",
    dateDisplay: "Nov 6–8, 2026 (Simultaneous)",
    timeDisplay: "Broadcast Aligned (WAT / CAT / EAT)",
    venue: "Over 60+ Registered Hubs across Nigeria, Ghana, Kenya, Liberia & Cameroon",
    mode: "In-Person Only",
    attendeeBadge: "5,000+ Distributed Attendees",
    description: "Can't travel to Lagos? Join or host an authorized I-Impact Watch Party in your school hall, community center, or regional youth club with full broadcast streaming and event packs.",
    highlights: [
      "Complete event pack: physical delegate badges, banners & discussion guides",
      "Live interactive Q&A connection with the main Landmark Centre stage",
      "Local breakout discussions guided by certified community coordinators",
    ],
    registrationBtnText: "Host or Find a Hub",
    status: "Registration Open",
  },
]

export interface PastEventItem {
  id: string
  title: string
  year: string
  dates: string
  venue: string
  delegates: string
  reach: string
  keynote: string
  summary: string
  tags: string[]
  image: string
}

export const PAST_EVENTS_ARCHIVE: PastEventItem[] = [
  {
    id: "past-as-a-teen-2025",
    title: "AS A TEEN Conference 2025: Unleashing The Extraordinary",
    year: "2025",
    dates: "October 24–26, 2025",
    venue: "Landmark Centre, Victoria Island, Lagos",
    delegates: "2,840 Delegates",
    reach: "48,000+ Online Stream Viewers",
    keynote: "Samuel Joseph & Continental Guests",
    summary: "Our largest in-person gathering to date, uniting students from 120+ secondary schools and 15 tertiary institutions for 3 days of life-altering sessions and mentor circles.",
    tags: ["Landmark Centre", "2,840 In-Person", "15 Countries", "Flagship"],
    image: "/images/events-hero-summit.jpg",
  },
  {
    id: "past-west-africa-tour-2024",
    title: "Pan-African Youth Leadership Boot Camp & School Tour",
    year: "2024",
    dates: "August 10–18, 2024",
    venue: "Lagos, Abuja & Monrovia (Multi-City Tour)",
    delegates: "3,200 High Schoolers",
    reach: "35 Secondary Schools Visited",
    keynote: "Executive Mentors & Industry Leaders",
    summary: "A high-octane school visitation tour equipping students directly in their school auditoriums with career planning tools, ethical integrity frameworks, and digital skills.",
    tags: ["Multi-City", "School Tour", "Direct Mentorship", "West Africa"],
    image: "/About-iimpact.png",
  },
  {
    id: "past-teen-pitch-2024",
    title: "Teens Innovation & Social Venture Pitch Day",
    year: "2024",
    dates: "May 27, 2024",
    venue: "Virtual Continental Broadcast & Regional Pods",
    delegates: "1,150 Participants",
    reach: "62 Student Projects Pitched",
    keynote: "Tech Founders & Angel Investors",
    summary: "Celebrating Children's Day with an intensive tech showcase where teen builders pitched social impact solutions, winning over ₦5,000,000 in scholarships and equipment grants.",
    tags: ["Innovation", "Pitch Competition", "Micro-Grants", "Continental"],
    image: "/jay-young-people.jpeg",
  },
]
