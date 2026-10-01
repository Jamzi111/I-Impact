"use client"

import React, { useState, useRef, useEffect } from "react"
import { Box, Flex, Text, VStack, HStack, Badge } from "@chakra-ui/react"
import Link from "next/link"
import { BellIcon, SparklesIcon, CalendarIcon, TrophyIcon, ArrowRightIcon } from "../icons"

interface NotificationItem {
  id: string
  title: string
  time: string
  category: "Cohort" | "Event" | "Award"
  description: string
  href: string
  unread: boolean
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title: "2026 Leadership Mentorship Open",
    time: "10m ago",
    category: "Cohort",
    description: "Applications are now live for the high school champion cohort.",
    href: "/programs/mentorship",
    unread: true,
  },
  {
    id: "2",
    title: "Annual Impact Gala Registration",
    time: "2h ago",
    category: "Event",
    description: "Early-bird tickets and sponsorships now available.",
    href: "/events/gala",
    unread: true,
  },
  {
    id: "3",
    title: "Champion Spotlight: Maya Lin",
    time: "1d ago",
    category: "Award",
    description: "Read how Maya led the community STEM innovation drive.",
    href: "/stories",
    unread: false,
  },
]

export function NotificationsPopover() {
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState<NotificationItem[]>(NOTIFICATIONS)
  const popoverRef = useRef<HTMLDivElement>(null)

  const unreadCount = items.filter((i) => i.unread).length

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const markAllRead = () => {
    setItems(items.map((i) => ({ ...i, unread: false })))
  }

  return (
    <Box position="relative" ref={popoverRef}>
      {/* Bell Button */}
      <Box
        as="button"
        aria-label="View notifications"
        onClick={() => setIsOpen(!isOpen)}
        p="2"
        borderRadius="lg"
        color="gray.600"
        _hover={{ bg: "gray.100", color: "#149191" }}
        position="relative"
        cursor="pointer"
        display="flex"
        alignItems="center"
        justifyContent="center"
        transition="all 0.2s"
      >
        <BellIcon size={19} />
        {unreadCount > 0 && (
          <Box
            position="absolute"
            top="1.5"
            right="1.5"
            w="8px"
            h="8px"
            bg="#EF4444"
            borderRadius="full"
            boxShadow="0 0 0 2px white"
          />
        )}
      </Box>

      {/* Popover Card */}
      {isOpen && (
        <Box
          position="absolute"
          top="100%"
          right="0"
          mt="2"
          w={{ base: "300px", sm: "340px" }}
          bg="white"
          borderRadius="2xl"
          boxShadow="0 20px 40px -15px rgba(5, 27, 100, 0.2), 0 0 0 1px rgba(5, 27, 100, 0.08)"
          p="3"
          zIndex={200}
          animation="fadeIn 0.2s ease"
        >
          <Flex justify="space-between" align="center" px="2" py="1.5" mb="2">
            <HStack gap="2">
              <Text fontSize="sm" fontWeight="bold" color="#051B64">
                Notifications
              </Text>
              {unreadCount > 0 && (
                <Badge
                  bg="rgba(20, 145, 145, 0.15)"
                  color="#149191"
                  fontSize="10px"
                  px="1.5"
                  borderRadius="full"
                  fontWeight="bold"
                >
                  {unreadCount} New
                </Badge>
              )}
            </HStack>
            {unreadCount > 0 && (
              <Text
                as="button"
                fontSize="xs"
                color="#149191"
                fontWeight="semibold"
                cursor="pointer"
                _hover={{ textDecoration: "underline" }}
                onClick={markAllRead}
              >
                Mark read
              </Text>
            )}
          </Flex>

          <VStack align="stretch" gap="1.5">
            {items.map((item) => (
              <Link key={item.id} href={item.href} onClick={() => setIsOpen(false)}>
                <Box
                  p="2.5"
                  borderRadius="xl"
                  bg={item.unread ? "rgba(20, 145, 145, 0.05)" : "transparent"}
                  _hover={{ bg: "gray.50" }}
                  transition="all 0.15s"
                  cursor="pointer"
                >
                  <Flex justify="space-between" align="center" mb="1">
                    <HStack gap="1.5">
                      {item.category === "Cohort" && <SparklesIcon size={13} color="#149191" />}
                      {item.category === "Event" && <CalendarIcon size={13} color="#F59E0B" />}
                      {item.category === "Award" && <TrophyIcon size={13} color="#051B64" />}
                      <Text fontSize="xs" fontWeight="bold" color="gray.800">
                        {item.title}
                      </Text>
                    </HStack>
                    <Text fontSize="10px" color="gray.400">
                      {item.time}
                    </Text>
                  </Flex>
                  <Text fontSize="11px" color="gray.600" lineHeight="1.3">
                    {item.description}
                  </Text>
                </Box>
              </Link>
            ))}
          </VStack>

          <Box mt="2" pt="2" borderTop="1px solid" borderColor="gray.100" textAlign="center">
            <Link href="/notifications" onClick={() => setIsOpen(false)}>
              <HStack
                justify="center"
                gap="1"
                fontSize="xs"
                fontWeight="semibold"
                color="#051B64"
                _hover={{ color: "#149191" }}
              >
                <Text>View all updates</Text>
                <ArrowRightIcon size={12} />
              </HStack>
            </Link>
          </Box>
        </Box>
      )}
    </Box>
  )
}
