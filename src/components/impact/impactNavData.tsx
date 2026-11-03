import React from "react"
import {
  BarChartSquareIcon,
  TrendingUpIcon,
  GraduationCapIcon,
  ShieldCheckIcon,
} from "@/components/icons"

export interface ImpactSectionNav {
  id: string
  title: string
  description: string
  href: string
  icon: React.ReactNode
  badge?: string
}

// Exactly 4 Core Impact Sections matching the 4-item dropdown layout across all menus
export const IMPACT_PAGE_SECTIONS: ImpactSectionNav[] = [
  {
    id: "impact-scorecard",
    title: "Accountability Scorecard",
    description: "Longitudinal reach, 1,200+ mentorship hours, and safeguarding metrics.",
    href: "/impact#impact-scorecard",
    icon: <BarChartSquareIcon size={18} color="#059669" />,
    badge: "Scorecard",
  },
  {
    id: "impact-explorer",
    title: "Impact Over Time",
    description: "Multi-year progression towards our confirmed 10,000+ youth milestone.",
    href: "/impact#impact-explorer",
    icon: <TrendingUpIcon size={18} color="#10B981" />,
    badge: "10,000+",
  },
  {
    id: "areas-of-impact",
    title: "Three Impact Pillars",
    description: "Skills labs, 1-on-1 mentorship, and community leadership.",
    href: "/impact#areas-of-impact",
    icon: <GraduationCapIcon size={18} color="#2563EB" />,
    badge: "Pillars",
  },
  {
    id: "transparency-accountability",
    title: "Transparency & Standards",
    description: "How we measure, document, protect, and listen responsibly.",
    href: "/impact#transparency-accountability",
    icon: <ShieldCheckIcon size={18} color="#0D9488" />,
    badge: "Standards",
  },
]

export const IMPACT_FEATURED_NAV = {
  title: "10,000+ Champions Reached",
  description: "Explore our verified longitudinal outcomes, growth milestones, and accountability framework.",
  ctaText: "Explore Full Impact",
  href: "/impact",
  badge: "Verified Impact",
}

export const IMPACT_NAV_ITEM = {
  label: "Impact",
  href: "/impact",
  children: IMPACT_PAGE_SECTIONS.map((sec) => ({
    title: sec.title,
    description: sec.description,
    href: sec.href,
    icon: sec.icon,
    badge: sec.badge,
  })),
  featuredSection: IMPACT_FEATURED_NAV,
}
