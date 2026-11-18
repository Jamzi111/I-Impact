"use client"

import React, { useState, useEffect } from "react"
import { Box, Flex, Text, VStack, HStack, Badge, Button } from "@chakra-ui/react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  ClipboardCheckIcon,
  FileTextIcon,
  UsersIcon,
  CalendarIcon,
  MailIcon,
  GraduationCapIcon,
  BarChartSquareIcon,
  BanknoteIcon,
  SettingsIcon,
  CloseIcon,
  ShieldCheckIcon,
  LogOutIcon,
} from "@/components/icons"

export interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: string
  badgeColor?: string
}

const MAIN_MENU: NavItem[] = [
  {
    label: "Overview",
    href: "/admin",
    icon: <ClipboardCheckIcon size={18} />,
  },
  {
    label: "Applications",
    href: "/admin/applications",
    icon: <FileTextIcon size={18} />,
    badge: "Active",
    badgeColor: "#10B981",
  },
  {
    label: "Volunteers",
    href: "/admin/volunteers",
    icon: <UsersIcon size={18} />,
  },
  {
    label: "Programs & Events",
    href: "/admin/events",
    icon: <CalendarIcon size={18} />,
  },
  {
    label: "Contact Messages",
    href: "/admin/messages",
    icon: <MailIcon size={18} />,
  },
  {
    label: "Campus Ambassadors",
    href: "/admin/ambassadors",
    icon: <GraduationCapIcon size={18} />,
  },
]

const INSIGHTS_MANAGEMENT: NavItem[] = [
  {
    label: "Impact & Reports",
    href: "/admin/reports",
    icon: <BarChartSquareIcon size={18} />,
  },
  {
    label: "Donations & Finance",
    href: "/admin/donations",
    icon: <BanknoteIcon size={18} />,
  },
  {
    label: "Settings & Audit Logs",
    href: "/admin/settings",
    icon: <SettingsIcon size={18} />,
  },
]

interface AdminSidebarProps {
  onCloseMobile?: () => void
}

export function AdminSidebar({ onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname()
  const [adminUser, setAdminUser] = useState<{ name: string; email: string; role: string } | null>(null)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    fetch("/api/admin/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.admin) {
          setAdminUser(data.admin)
        }
      })
      .catch((e) => console.error("Session check error:", e))
  }, [])

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await fetch("/api/admin/auth/logout", { method: "POST" })
    } catch (e) {
      console.error("Logout error:", e)
    } finally {
      window.location.href = "/admin/login"
    }
  }

  const isActiveRoute = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin"
    }
    return pathname.startsWith(href)
  }

  const renderNavGroup = (title: string, items: NavItem[]) => (
    <Box mb="6">
      <Text
        fontSize="10px"
        fontWeight="800"
        letterSpacing="0.12em"
        color="#64748B"
        textTransform="uppercase"
        px="3"
        mb="2"
      >
        {title}
      </Text>
      <VStack align="stretch" gap="1">
        {items.map((item) => {
          const active = isActiveRoute(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              style={{ textDecoration: "none" }}
            >
              <Flex
                align="center"
                justify="space-between"
                px="3"
                py="2.5"
                borderRadius="10px"
                bg={active ? "rgba(20, 145, 145, 0.22)" : "transparent"}
                color={active ? "#2DD4BF" : "#94A3B8"}
                borderLeft={active ? "3px solid #149191" : "3px solid transparent"}
                transition="all 0.18s ease"
                _hover={{
                  bg: active ? "rgba(20, 145, 145, 0.28)" : "rgba(255, 255, 255, 0.06)",
                  color: active ? "#5EEAD4" : "#F8FAFC",
                  transform: "translateX(2px)",
                }}
              >
                <HStack gap="3">
                  <Box color={active ? "#2DD4BF" : "#64748B"} display="flex" alignItems="center">
                    {item.icon}
                  </Box>
                  <Text
                    fontSize="13px"
                    fontWeight={active ? "700" : "500"}
                    letterSpacing="-0.01em"
                  >
                    {item.label}
                  </Text>
                </HStack>
                {item.badge && (
                  <Badge
                    bg="rgba(16, 185, 129, 0.18)"
                    color={item.badgeColor || "#10B981"}
                    fontSize="9.5px"
                    fontWeight="800"
                    px="1.5"
                    py="0.2"
                    borderRadius="full"
                    letterSpacing="wider"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Flex>
            </Link>
          )
        })}
      </VStack>
    </Box>
  )

  return (
    <Box
      w="264px"
      h="100vh"
      bg="linear-gradient(180deg, #051B64 0%, #030F38 100%)"
      color="#FFFFFF"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      borderRight="1px solid rgba(255, 255, 255, 0.08)"
      boxShadow="4px 0 24px rgba(0, 0, 0, 0.15)"
      position="relative"
    >
      {/* Top Header: Logo & Branding */}
      <Box p="5" pb="4" borderBottom="1px solid rgba(255, 255, 255, 0.08)" bg="white">
        <Flex justify="space-between" align="center">
          <Link href="/admin" style={{ display: "inline-block" }}>
            <HStack gap="2.5" align="center">
              <Box
                position="relative"
                w="125px"
                h="32px"
                p="1.5"
                borderRadius="8px"
              >
                <Image
                  src="/iimpact-logo2.png"
                  alt="I IMPACT"
                  fill
                  sizes="125px"
                  style={{ objectFit: "contain" }}
                  priority
                />
              </Box>
              <Badge
                bg="rgba(20, 145, 145, 0.15)"
                color="#149191"
                fontSize="9.5px"
                fontWeight="800"
                px="1.5"
                py="0.5"
                borderRadius="md"
                letterSpacing="0.08em"
              >
                ADMIN
              </Badge>
            </HStack>
          </Link>

          {/* Close button on mobile drawer */}
          {onCloseMobile && (
            <Box
              as="button"
              onClick={onCloseMobile}
              display={{ base: "flex", lg: "none" }}
              p="1.5"
              borderRadius="md"
              color="#64748B"
              _hover={{ bg: "rgba(5, 27, 100, 0.08)", color: "#051B64" }}
              aria-label="Close admin menu"
            >
              <CloseIcon size={18} />
            </Box>
          )}
        </Flex>
      </Box>

      {/* Center Nav Groups (Scrollable if height constrained) */}
      <Box
        flex="1"
        overflowY="auto"
        px="3.5"
        py="4"
        css={{
          "&::-webkit-scrollbar": { width: "4px" },
          "&::-webkit-scrollbar-thumb": { background: "rgba(255, 255, 255, 0.1)", borderRadius: "4px" },
        }}
      >
        {renderNavGroup("Main Menu", MAIN_MENU)}
        {renderNavGroup("Insights & Management", INSIGHTS_MANAGEMENT)}
      </Box>

      {/* Bottom Footer: Admin Profile, Sign Out, & Public Site Link */}
      <Box p="4" borderTop="1px solid rgba(255, 255, 255, 0.08)" bg="rgba(0, 0, 0, 0.2)">
        {/* Administrator Info Pill */}
        <Flex align="center" justify="space-between" mb="3">
          <HStack gap="2.5">
            <Box
              w="34px"
              h="34px"
              borderRadius="full"
              bg="linear-gradient(135deg, #149191 0%, #10B981 100%)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontWeight="800"
              fontSize="12px"
              color="#FFFFFF"
              boxShadow="0 2px 6px rgba(16, 185, 129, 0.3)"
            >
              {adminUser?.name
                ? adminUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()
                : "AD"}
            </Box>
            <VStack align="flex-start" gap="0">
              <Text fontSize="12.5px" fontWeight="700" color="#FFFFFF" lineHeight="1.2">
                {adminUser?.name || "Administrator"}
              </Text>
              <Text fontSize="10.5px" color="#94A3B8" textTransform="capitalize">
                {adminUser?.role || "System Admin"}
              </Text>
            </VStack>
          </HStack>
          <Box color="#10B981" title="Security Verified">
            <ShieldCheckIcon size={16} />
          </Box>
        </Flex>

        {/* Sign Out Button */}
        <Button
          w="full"
          size="sm"
          variant="ghost"
          h="34px"
          borderRadius="8px"
          color="#F87171"
          bg="rgba(239, 68, 68, 0.08)"
          border="1px solid rgba(239, 68, 68, 0.2)"
          _hover={{ bg: "rgba(239, 68, 68, 0.18)", color: "#FECACA" }}
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          <HStack gap="2">
            <LogOutIcon size={14} color="#F87171" />
            <Text fontSize="12px" fontWeight="700">
              {isLoggingOut ? "Signing Out..." : "Sign Out"}
            </Text>
          </HStack>
        </Button>
      </Box>
    </Box>
  )
}

