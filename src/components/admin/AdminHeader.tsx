"use client"

import React from "react"
import { Box, Flex, HStack, Text, Button, Badge } from "@chakra-ui/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon, ExternalLinkIcon, ShieldCheckIcon } from "@/components/icons"
import { LiveDot } from "@/components/LiveDot"

interface AdminHeaderProps {
  onOpenMobile: () => void
}

const ROUTE_TITLES: Record<string, { title: string; subtitle: string }> = {
  "/admin": {
    title: "Executive Overview",
    subtitle: "Real-time records, application volume, and community operations",
  },
  "/admin/applications": {
    title: "Applications Management",
    subtitle: "Review, filter, and process submissions across all 6 participation pathways",
  },
  "/admin/volunteers": {
    title: "Volunteer Network",
    subtitle: "Verified volunteer roster, deployment availability, and track assignments",
  },
  "/admin/events": {
    title: "Programs & Events Manager",
    subtitle: "Publish conferences, summits, agendas, and manage delegate registration",
  },
  "/admin/messages": {
    title: "Contact Messages & Inquiries",
    subtitle: "Inbound communications from the public contact portal",
  },
  "/admin/ambassadors": {
    title: "Campus Representatives",
    subtitle: "Secondary and university campus ambassador network tracking",
  },
  "/admin/reports": {
    title: "Impact & Longitudinal Reports",
    subtitle: "Aggregated reach analytics and verified community metric benchmarks",
  },
  "/admin/donations": {
    title: "Donations & Financial Records",
    subtitle: "Sponsorship interest pipeline and donor contributions",
  },
  "/admin/settings": {
    title: "Settings & Audit Logs",
    subtitle: "Administrative access controls, system logs, and security parameters",
  },
  "/admin/assignments": {
    title: "Assignment Portal Console",
    subtitle: "Manage cohort homework and student submissions",
  },
}

export function AdminHeader({ onOpenMobile }: AdminHeaderProps) {
  const pathname = usePathname()

  const currentRouteInfo = ROUTE_TITLES[pathname] || {
    title: "Admin Console",
    subtitle: "Manage I IMPACT platform data and submissions",
  }

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <Box
      as="header"
      bg="#FFFFFF"
      borderBottom="1px solid #E2E8F0"
      px={{ base: "4", sm: "6", lg: "8" }}
      py="3.5"
      boxShadow="0 1px 3px rgba(0, 0, 0, 0.02)"
      position="sticky"
      top="0"
      zIndex={100}
    >
      <Flex align="center" justify="space-between" gap="4">
        {/* Left: Mobile Toggle & Page Title */}
        <HStack gap="3" align="center">
          <Box
            as="button"
            onClick={onOpenMobile}
            display={{ base: "flex", lg: "none" }}
            p="2"
            borderRadius="md"
            border="1px solid #E2E8F0"
            color="#051B64"
            _hover={{ bg: "#F8FAFC" }}
            aria-label="Open sidebar menu"
          >
            <MenuIcon size={20} />
          </Box>

          <Box>
            <HStack gap="2" align="center">
              <Text fontSize="10.5px" fontWeight="700" color="#64748B" letterSpacing="0.05em" textTransform="uppercase">
                Admin Console
              </Text>
              <Text fontSize="10.5px" color="#CBD5E1">
                /
              </Text>
              <Text fontSize="10.5px" fontWeight="700" color="#149191">
                {currentRouteInfo.title}
              </Text>
            </HStack>
            <Text
              fontSize={{ base: "15px", sm: "17px" }}
              fontWeight="800"
              color="#051B64"
              lineHeight="1.2"
              mt="0.5"
            >
              {currentRouteInfo.title}
            </Text>
          </Box>
        </HStack>

        {/* Right: Live Atlas Status & Date */}
        <HStack gap={{ base: "2", sm: "3" }} align="center">
          {/* Live System Status Pill */}
          <HStack
            bg="#F0FDF4"
            border="1px solid rgba(16, 185, 129, 0.3)"
            px="3"
            py="1"
            borderRadius="full"
            gap="2"
            display={{ base: "none", sm: "flex" }}
          >
            <LiveDot color="#10B981" size={7} />
            <Text fontSize="11px" fontWeight="700" color="#047857">
              Atlas Live
            </Text>
          </HStack>

          {/* Current Date Badge */}
          <Box
            bg="#F8FAFC"
            border="1px solid #E2E8F0"
            px="3"
            py="1"
            borderRadius="md"
            fontSize="11.5px"
            fontWeight="600"
            color="#475569"
            display={{ base: "none", md: "block" }}
          >
            {currentDate}
          </Box>

          {/* Quick link to live public site */}
          <Link href="/" target="_blank" style={{ textDecoration: "none" }}>
            <Button
              size="xs"
              h="30px"
              px="3"
              variant="outline"
              borderColor="#CBD5E1"
              color="#051B64"
              fontSize="11px"
              fontWeight="700"
              borderRadius="8px"
              _hover={{ bg: "#F1F5F9", borderColor: "#94A3B8" }}
            >
              <HStack gap="1.5">
                <Text>Public Site</Text>
                <ExternalLinkIcon size={12} />
              </HStack>
            </Button>
          </Link>
        </HStack>
      </Flex>
    </Box>
  )
}

