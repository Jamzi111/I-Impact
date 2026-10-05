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
} from "../icons"

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
    children: [
      {
        title: "Our Mission & Vision",
        description: "Empowering the next generation to become champions.",
        href: "/about",
        icon: <TrophyIcon size={18} color="#149191" />,
      },
      {
        title: "Leadership & Team",
        description: "Visionary leaders and mentors committed to youth empowerment.",
        href: "/about/team",
        icon: <UsersIcon size={18} color="#051B64" />,
      },
      {
        title: "Impact & Transparency",
        description: "Measurable growth and stories from over 10,000+ lives touched.",
        href: "/about/impact",
        icon: <CheckCircleIcon size={18} color="#10B981" />,
        badge: "Updated",
      },
    ],
    featuredSection: {
      title: "Our 2026 Vision",
      description: "Discover how we are scaling our impact across 25+ regional communities.",
      ctaText: "Read Impact Report",
      href: "/about/impact",
      badge: "Annual Report",
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
  {
    label: "Impact",
    children: [
      {
        title: "2026 Annual Impact Report",
        description: "Verified outcomes, scholarship distribution, and milestones.",
        href: "/about/impact",
        icon: <CheckCircleIcon size={18} color="#10B981" />,
        badge: "2026",
      },
      {
        title: "Champion Stories & Alumni",
        description: "Real journeys from graduates excelling across industries.",
        href: "/stories",
        icon: <SparklesIcon size={18} color="#149191" />,
      },
      {
        title: "Community Reach & Data",
        description: "Over 10,000+ students and 25+ partner regional hubs.",
        href: "/about/impact",
        icon: <TrophyIcon size={18} color="#051B64" />,
      },
    ],
  },
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
        title: "Organizer Console",
        description: "Add or manage upcoming events and upload program soft copies.",
        href: "/admin/events",
        icon: <TrophyIcon size={18} color="#051B64" />,
        badge: "Admin",
      },
    ],
  },
  {
    label: "Get Involved",
    children: [
      {
        title: "Volunteer as a Mentor",
        description: "Share your wisdom and guide an aspiring young champion.",
        href: "/get-involved/volunteer",
        icon: <HeartHandshakeIcon size={18} color="#149191" />,
        badge: "Urgent",
      },
      {
        title: "Partner With Us",
        description: "Corporate sponsorship, school alliances, and joint initiatives.",
        href: "/get-involved/partner",
        icon: <UsersIcon size={18} color="#051B64" />,
      },
      {
        title: "Donate & Support",
        description: "Directly sponsor a youth's journey towards excellence.",
        href: "/donate",
        icon: <TrophyIcon size={18} color="#10B981" />,
      },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
  },
]

interface NavDropdownItemProps {
  item: NavItem
}

export function NavDropdownItem({ item }: NavDropdownItemProps) {
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

  if (!item.children) {
    return (
      <Link href={item.href || "#"}>
        <Box
          px="1"
          py="0.5"
          borderRadius="md"
          fontSize="11px"
          fontWeight="600"
          color="gray.700"
          _hover={{
            color: "#149191",
            bg: "rgba(20, 145, 145, 0.08)",
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
        px="1"
        py="0.5"
        borderRadius="md"
        fontSize="11px"
        fontWeight="600"
        color={isOpen ? "#149191" : "gray.700"}
        bg={isOpen ? "rgba(20, 145, 145, 0.08)" : "transparent"}
        _hover={{
          color: "#149191",
          bg: "rgba(20, 145, 145, 0.08)",
        }}
        transition="all 0.2s"
        cursor="pointer"
        whiteSpace="nowrap"
      >
        <Text>{item.label}</Text>
        <Box
          transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
          transition="transform 0.2s ease"
          display="flex"
          alignItems="center"
        >
          <ChevronDownIcon size={12} />
        </Box>
      </Flex>

      {/* Flyout Menu */}
      {isOpen && (
        <Box
          position="absolute"
          top="100%"
          left={item.featuredSection ? "-120px" : "0"}
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
                  <Link key={idx} href={child.href}>
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

                  <Link href={item.featuredSection.href}>
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
