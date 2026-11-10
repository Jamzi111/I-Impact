"use client"

import React, { useState, useRef, useEffect } from "react"
import { Box, Flex, Text, HStack, VStack, Badge } from "@chakra-ui/react"
import Link from "next/link"
import {
  ChevronDownIcon,
  TrophyIcon,
  UsersIcon,
  HeartHandshakeIcon,
  BookOpenIcon,
  CalendarIcon,
  SparklesIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  VideoIcon,
  BuildingIcon,
  HeadphonesIcon,
  CameraIcon,
  NewspaperIcon,
} from "../icons"
import { jumpToElement, setTargetHash } from "@/lib/scrollUtils"
import { IMPACT_NAV_ITEM } from "@/components/impact"

export interface NavItemChild {
  title: string
  description: string
  href: string
  icon?: React.ReactNode
  badge?: string
}

export interface NavItem {
  label: string
  href?: string
  badge?: string
  isHighlight?: boolean
  children?: NavItemChild[]
  featuredSection?: {
    title: string
    description: string
    ctaText: string
    href: string
    badge?: string
  }
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
    children: [
      {
        title: "Our Origin Story",
        description: "The spark, conviction, and journey behind the movement.",
        href: "/about#story",
        icon: <BookOpenIcon size={18} color="#149191" />,
      },
      {
        title: "Mission, Vision & Values",
        description: "Core convictions, guiding principles, and continental vision.",
        href: "/about#mission-vision",
        icon: <TrophyIcon size={18} color="#051B64" />,
      },
      {
        title: "The 4-Pillar Approach",
        description: "Discover, Equip, Mentor, and Launch emerging champions.",
        href: "/about#approach",
        icon: <SparklesIcon size={18} color="#149191" />,
      },
      {
        title: "About The Founder",
        description: "Samuel Joseph — Convener & youth development strategist.",
        href: "/about#founder",
        icon: <UsersIcon size={18} color="#051B64" />,
      },
    ],
    featuredSection: {
      title: "Raising Champions Everyday",
      description: "Discover our full journey, convictions, and how we are equipping youth across Africa.",
      ctaText: "Explore Full Story",
      href: "/about",
      badge: "About Us",
    },
  },
  {
    label: "Programs",
    children: [
      {
        title: "Youth Leadership Academy",
        description: "Transformative executive & ethical leadership workshops for youth.",
        href: "/programs/leadership",
        icon: <TrophyIcon size={18} color="#149191" />,
        badge: "Popular",
      },
      {
        title: "Champion Mentorship Circles",
        description: "One-on-one and small group mentorship with top industry professionals.",
        href: "/programs/mentorship",
        icon: <HeartHandshakeIcon size={18} color="#051B64" />,
      },
      {
        title: "Community Outreach & Service",
        description: "Hands-on grassroots projects making immediate social change.",
        href: "/programs/community",
        icon: <UsersIcon size={18} color="#3B82F6" />,
      },
      {
        title: "Innovation & Digital Skills",
        description: "Equipping young talents with future-proof tech and creative skills.",
        href: "/programs/innovation",
        icon: <SparklesIcon size={18} color="#EC4899" />,
        badge: "New",
      },
    ],
    featuredSection: {
      title: "Scholarships Available",
      description: "Full tuition assistance for ambitious students in high-need districts.",
      ctaText: "Explore Scholarships",
      href: "/programs/scholarships",
      badge: "Financial Aid",
    },
  },
  IMPACT_NAV_ITEM,
  {
    label: "Events",
    children: [
      {
        title: "Upcoming Summits & Workshops",
        description: "Interactive seminars, speaker panels, and youth masterclasses.",
        href: "/events",
        icon: <CalendarIcon size={18} color="#149191" />,
      },
      {
        title: "Annual Impact Gala",
        description: "Celebrating champions, community leaders, and our partners.",
        href: "/events/gala",
        icon: <SparklesIcon size={18} color="#F59E0B" />,
        badge: "Oct 2026",
      },
      {
        title: "Past Summits & Archives",
        description: "Browse highlights, keynote recordings, and photo galleries.",
        href: "/events#past-events",
        icon: <VideoIcon size={18} color="#10B981" />,
      },
      {
        title: "Organizer Console",
        description: "Add or manage upcoming events and upload program soft copies.",
        href: "/admin/events",
        icon: <TrophyIcon size={18} color="#051B64" />,
        badge: "Admin",
      },
    ],
    featuredSection: {
      title: "AS A TEEN Flagship Congress",
      description: "Our continental flagship summit empowering high school leaders and youth champions.",
      ctaText: "Explore Gatherings",
      href: "/events",
      badge: "Flagship Event",
    },
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      {
        title: "Guides & E-Books",
        description: "Practical manuals on leadership, discipline, and personal growth.",
        href: "/resources",
        icon: <BookOpenIcon size={18} color="#149191" />,
      },
      {
        title: "Podcasts & Audio Sessions",
        description: "Masterclasses, founder interviews, and youth audio stories.",
        href: "/resources",
        icon: <HeadphonesIcon size={18} color="#7C3AED" />,
        badge: "Audio",
      },
      {
        title: "Daily Youth Devotionals",
        description: "Spiritual and moral anchors for daily reflection and character.",
        href: "/resources",
        icon: <SparklesIcon size={18} color="#059669" />,
      },
      {
        title: "Secondary School STEM Toolkits",
        description: "Low-cost science prototyping blueprints and lab project guides.",
        href: "/resources",
        icon: <TrophyIcon size={18} color="#D97706" />,
      },
    ],
    featuredSection: {
      title: "The Champion's Mindset",
      description: "Download Samuel Joseph's flagship 72-page youth leadership handbook free.",
      ctaText: "Access Library",
      href: "/resources",
      badge: "Featured Guide",
    },
  },
  {
    label: "Media",
    href: "/media",
    children: [
      {
        title: "Photo Albums & Moments",
        description: "Visual chronicles across our conference halls and maker clusters.",
        href: "/media",
        icon: <CameraIcon size={18} color="#149191" />,
      },
      {
        title: "Video Keynotes & Replays",
        description: "Watch stirring keynote challenges, panels, and speech clinics.",
        href: "/media",
        icon: <VideoIcon size={18} color="#051B64" />,
      },
      {
        title: "Conferences & Summits",
        description: "Photo archives from AS A TEEN Continental Congress editions.",
        href: "/media",
        icon: <TrophyIcon size={18} color="#F59E0B" />,
      },
      {
        title: "Delegate Testimonials",
        description: "Watch and read first-hand transformation stories from scholars.",
        href: "/media",
        icon: <UsersIcon size={18} color="#10B981" />,
      },
    ],
    featuredSection: {
      title: "AS A TEEN 2025 Documentary",
      description: "Experience 1,500 emerging champions gathered in purpose and celebration.",
      ctaText: "Watch Highlight Reel",
      href: "/media",
      badge: "Video Archive",
    },
  },
  {
    label: "News",
    href: "/blog",
    children: [
      {
        title: "Program Announcements",
        description: "Official releases on new cohorts, summit dates, and venues.",
        href: "/blog",
        icon: <NewspaperIcon size={18} color="#149191" />,
        badge: "Fresh",
      },
      {
        title: "Youth Impact Stories",
        description: "Inspiring profiles of scholars creating change in local communities.",
        href: "/blog",
        icon: <SparklesIcon size={18} color="#3B82F6" />,
      },
      {
        title: "Event & Outreach Recaps",
        description: "Reports from recent NEEDY NEEDS YOU and summit outreaches.",
        href: "/blog",
        icon: <CalendarIcon size={18} color="#059669" />,
      },
      {
        title: "Volunteer & Scholar Calls",
        description: "Applications for mentor fellowships and student delegations.",
        href: "/blog",
        icon: <TrophyIcon size={18} color="#D97706" />,
      },
    ],
    featuredSection: {
      title: "Stay Connected With I IMPACT",
      description: "Subscribe to our ongoing dispatches and community updates.",
      ctaText: "Read All News",
      href: "/blog",
      badge: "Dispatches",
    },
  },
  {
    label: "Get Involved",
    href: "/get-involved",
    children: [
      {
        title: "Volunteer as a Mentor",
        description: "Invest 1-2 hours weekly to coach and guide an emerging teen champion.",
        href: "/get-involved?role=mentor",
        icon: <HeartHandshakeIcon size={18} color="#149191" />,
        badge: "Mentorship",
      },
      {
        title: "Community & Event Volunteer",
        description: "Join our on-ground logistics, media, and summit operations teams.",
        href: "/get-involved?role=volunteer",
        icon: <UsersIcon size={18} color="#051B64" />,
        badge: "Volunteers",
      },
      {
        title: "Institutional Partner & Sponsor",
        description: "Corporate CSR alliances, secondary school clubs, and institutional grants.",
        href: "/get-involved?role=partner",
        icon: <BuildingIcon size={18} color="#7C3AED" />,
        badge: "Partners",
      },
      {
        title: "Donate & Student Support",
        description: "Directly sponsor learning materials, device kits, and event passes.",
        href: "/donate",
        icon: <TrophyIcon size={18} color="#10B981" />,
        badge: "Giving",
      },
    ],
    featuredSection: {
      title: "Become a Champion Ally",
      description: "Join 350+ mentors, partners, and volunteers raising leaders across Africa.",
      ctaText: "Join The Movement",
      href: "/get-involved",
      badge: "Get Involved",
    },
  },
  {
    label: "Contact",
    href: "/contact",
  },
]

interface NavDropdownItemProps {
  item: NavItem
  isDarkNav?: boolean
}

export function NavDropdownItem({ item, isDarkNav = false }: NavDropdownItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 150)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleChildClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false)
    if (href.includes("#")) {
      const [path, hash] = href.split("#")
      const currentPath = typeof window !== "undefined" ? window.location.pathname : ""
      const isSamePage =
        currentPath === path ||
        (path === "" && currentPath === "/") ||
        (currentPath === "/about/impact" && path === "/impact")

      if (isSamePage && hash) {
        e.preventDefault()
        jumpToElement(hash)
        window.history.pushState(null, "", href)
      } else if (hash) {
        setTargetHash(hash)
      }
    }
  }

  if (!item.children) {
    return (
      <Link href={item.href || "#"}>
        <Box
          px={{ base: "1", xl: "1.5" }}
          py="0.5"
          borderRadius="md"
          fontSize={{ base: "10.5px", xl: "11.5px" }}
          fontWeight="600"
          color={isDarkNav ? "#FFFFFF" : "gray.700"}
          _hover={{
            color: isDarkNav ? "#34D399" : "#149191",
            bg: isDarkNav ? "rgba(52, 211, 153, 0.14)" : "rgba(20, 145, 145, 0.08)",
          }}
          transition="all 0.2s"
          cursor="pointer"
          whiteSpace="nowrap"
        >
          {item.label}
        </Box>
      </Link>
    )
  }

  return (
    <Box
      position="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Flex
        align="center"
        gap="0.5"
        px={{ base: "1", xl: "1.5" }}
        py="0.5"
        borderRadius="md"
        fontSize={{ base: "10.5px", xl: "11.5px" }}
        fontWeight="600"
        color={isOpen ? "#149191" : isDarkNav ? "#FFFFFF" : "gray.700"}
        bg={isOpen ? (isDarkNav ? "rgba(20, 145, 145, 0.2)" : "rgba(20, 145, 145, 0.08)") : "transparent"}
        _hover={{
          color: isDarkNav ? "#34D399" : "#149191",
          bg: isDarkNav ? "rgba(52, 211, 153, 0.14)" : "rgba(20, 145, 145, 0.08)",
        }}
        transition="all 0.2s"
        cursor="pointer"
        whiteSpace="nowrap"
      >
        {item.href ? (
          <Link href={item.href} onClick={() => setIsOpen(false)}>
            <Text>{item.label}</Text>
          </Link>
        ) : (
          <Text>{item.label}</Text>
        )}
        <Box
          transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
          transition="transform 0.2s ease"
          display="flex"
          alignItems="center"
          color={isOpen ? "#149191" : isDarkNav ? "rgba(255, 255, 255, 0.85)" : "#9CA3AF"}
        >
          <ChevronDownIcon size={12} color="currentColor" />
        </Box>
      </Flex>

      {/* Flyout Menu */}
      {isOpen && (
        <Box
          position="absolute"
          top="100%"
          left={item.label === "About" ? "-40px" : item.featuredSection ? "-120px" : "0"}
          pt="2"
          zIndex={100}
        >
          <Box
            bg="white"
            borderRadius="xl"
            boxShadow="0 20px 40px -15px rgba(5, 27, 100, 0.15), 0 0 0 1px rgba(5, 27, 100, 0.06)"
            p="3"
            minW={item.featuredSection ? "560px" : "320px"}
            animation="fadeIn 0.2s ease-in-out"
          >
            <Flex gap="4">
              {/* Main Children List */}
              <VStack align="stretch" gap="1" flex="1">
                {item.children.map((child, idx) => (
                  <Link
                    key={idx}
                    href={child.href}
                    onClick={(e) => handleChildClick(e, child.href)}
                  >
                    <Flex
                      p="2.5"
                      borderRadius="lg"
                      gap="3"
                      align="flex-start"
                      _hover={{
                        bg: "rgba(20, 145, 145, 0.06)",
                        transform: "translateX(3px)",
                      }}
                      transition="all 0.2s"
                      cursor="pointer"
                    >
                      {child.icon && (
                        <Box
                          p="2"
                          borderRadius="md"
                          bg="gray.50"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mt="0.5"
                        >
                          {child.icon}
                        </Box>
                      )}
                      <Box flex="1">
                        <HStack gap="2" mb="0.5">
                          <Text
                            fontSize="sm"
                            fontWeight="600"
                            color="gray.800"
                            _hover={{ color: "#149191" }}
                          >
                            {child.title}
                          </Text>
                          {child.badge && (
                            <Badge
                              bg="rgba(20, 145, 145, 0.15)"
                              color="#149191"
                              fontSize="10px"
                              px="1.5"
                              py="0.2"
                              borderRadius="full"
                              fontWeight="bold"
                            >
                              {child.badge}
                            </Badge>
                          )}
                        </HStack>
                        <Text fontSize="xs" color="gray.500" lineHeight="1.4">
                          {child.description}
                        </Text>
                      </Box>
                    </Flex>
                  </Link>
                ))}
              </VStack>

              {/* Optional Featured Section */}
              {item.featuredSection && (
                <Box
                  w="220px"
                  bg="linear-gradient(145deg, #051B64 0%, #0c3898 100%)"
                  color="white"
                  borderRadius="lg"
                  p="4"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Box>
                    {item.featuredSection.badge && (
                      <Badge
                        bg="rgba(255, 255, 255, 0.2)"
                        color="yellow.300"
                        fontSize="10px"
                        px="2"
                        py="0.5"
                        borderRadius="full"
                        mb="2"
                      >
                        {item.featuredSection.badge}
                      </Badge>
                    )}
                    <Text fontSize="sm" fontWeight="bold" mb="1">
                      {item.featuredSection.title}
                    </Text>
                    <Text fontSize="xs" color="whiteAlpha.800" lineHeight="1.4">
                      {item.featuredSection.description}
                    </Text>
                  </Box>

                  <Link href={item.featuredSection.href} onClick={() => setIsOpen(false)}>
                    <HStack
                      gap="1"
                      color="yellow.300"
                      fontSize="xs"
                      fontWeight="bold"
                      mt="3"
                      cursor="pointer"
                      _hover={{ color: "yellow.200", textDecoration: "underline" }}
                    >
                      <Text>{item.featuredSection.ctaText}</Text>
                      <ArrowRightIcon size={12} />
                    </HStack>
                  </Link>
                </Box>
              )}
            </Flex>
          </Box>
        </Box>
      )}
    </Box>
  )
}
