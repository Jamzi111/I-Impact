"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import { Box, Flex, Text, VStack, HStack, Badge, Spinner } from "@chakra-ui/react"
import Link from "next/link"
import {
  BellIcon,
  SparklesIcon,
  CalendarIcon,
  GraduationCapIcon,
  BookOpenIcon,
  ArrowRightIcon,
  CheckIcon,
  MegaphoneIcon,
} from "../icons"
import { NotificationItem } from "@/types/notification"

const STORAGE_KEY = "iimpact_read_notifications_v1"

export function NotificationsPopover() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [readIds, setReadIds] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  // Initialize read IDs from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setReadIds(JSON.parse(stored))
      }
    } catch {
      // Ignore storage errors in private browsing
    }
  }, [])

  // Fetch dynamic notifications from the API
  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch("/api/notifications", { cache: "no-store" })
      if (res.ok) {
        const data = await res.json()
        if (data.success && Array.isArray(data.notifications)) {
          setNotifications(data.notifications)
        }
      }
    } catch (err) {
      console.error("Failed to load notifications:", err)
    }
  }, [])

  // Initial fetch and auto-polling every 25 seconds
  useEffect(() => {
    fetchNotifications()
    const interval = setInterval(fetchNotifications, 25000)

    // Also re-fetch on window focus
    const onFocus = () => fetchNotifications()
    window.addEventListener("focus", onFocus)

    return () => {
      clearInterval(interval)
      window.removeEventListener("focus", onFocus)
    }
  }, [fetchNotifications])

  // Refetch whenever popover is opened
  useEffect(() => {
    if (isOpen) {
      fetchNotifications()
    }
  }, [isOpen, fetchNotifications])

  // Handle click outside to close popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Calculate unread items based on stored read IDs
  const unreadCount = notifications.filter((item) => !readIds.includes(item.id)).length

  const markAllRead = () => {
    const allIds = notifications.map((n) => n.id)
    const updated = Array.from(new Set([...readIds, ...allIds]))
    setReadIds(updated)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch (e) {
      console.error("Storage save failed:", e)
    }
  }

  const markAsRead = (id: string) => {
    if (!readIds.includes(id)) {
      const updated = [...readIds, id]
      setReadIds(updated)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch (e) {
        console.error("Storage save failed:", e)
      }
    }
  }

  const getCategoryIcon = (category: string, type: string) => {
    if (type === "event" || category?.toLowerCase().includes("event")) {
      return <CalendarIcon size={14} color="#D97706" />
    }
    if (type === "assignment" || category?.toLowerCase().includes("assignment")) {
      return <GraduationCapIcon size={14} color="#149191" />
    }
    if (category?.toLowerCase().includes("cohort") || category?.toLowerCase().includes("mentorship")) {
      return <SparklesIcon size={14} color="#7C3AED" />
    }
    return <MegaphoneIcon size={14} color="#051B64" />
  }

  const getCategoryBadgeColor = (category: string, type: string) => {
    if (type === "event" || category?.toLowerCase().includes("event")) {
      return { bg: "rgba(245, 158, 11, 0.12)", color: "#B45309", border: "rgba(245, 158, 11, 0.3)" }
    }
    if (type === "assignment" || category?.toLowerCase().includes("assignment")) {
      return { bg: "rgba(20, 145, 145, 0.12)", color: "#149191", border: "rgba(20, 145, 145, 0.3)" }
    }
    if (category?.toLowerCase().includes("cohort")) {
      return { bg: "rgba(124, 58, 237, 0.12)", color: "#7C3AED", border: "rgba(124, 58, 237, 0.3)" }
    }
    return { bg: "rgba(5, 27, 100, 0.08)", color: "#051B64", border: "rgba(5, 27, 100, 0.2)" }
  }

  return (
    <Box position="relative" ref={popoverRef}>
      {/* Bell Button */}
      <Box
        as="button"
        aria-label="View live notifications"
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
            minW="9px"
            h="9px"
            bg="#EF4444"
            borderRadius="full"
            boxShadow="0 0 0 2px white"
            animation="pulse 2s infinite"
          />
        )}
      </Box>

      {/* Popover Card */}
      {isOpen && (
        <Box
          position="absolute"
          top="calc(100% + 8px)"
          right={{ base: "-60px", sm: "0" }}
          w={{ base: "320px", sm: "380px" }}
          maxH="85vh"
          bg="white"
          borderRadius="2xl"
          boxShadow="0 24px 50px -12px rgba(5, 27, 100, 0.22), 0 0 0 1px rgba(5, 27, 100, 0.08)"
          p="3.5"
          zIndex={1000}
          animation="fadeIn 0.2s ease"
          overflowY="auto"
        >
          {/* Header */}
          <Flex justify="space-between" align="center" px="1" pb="2.5" mb="2" borderBottom="1px solid" borderColor="gray.100">
            <HStack gap="2">
              <Text fontSize="sm" fontWeight="800" color="#051B64" letterSpacing="-0.01em">
                Notifications & Updates
              </Text>
              {unreadCount > 0 ? (
                <Badge
                  bg="rgba(20, 145, 145, 0.15)"
                  color="#149191"
                  fontSize="11px"
                  px="2"
                  py="0.5"
                  borderRadius="full"
                  fontWeight="bold"
                >
                  {unreadCount} New
                </Badge>
              ) : (
                <Badge bg="gray.100" color="gray.500" fontSize="10px" px="1.5" borderRadius="full">
                  All Caught Up
                </Badge>
              )}
            </HStack>
            {unreadCount > 0 && (
              <Text
                as="button"
                fontSize="xs"
                color="#149191"
                fontWeight="700"
                cursor="pointer"
                _hover={{ textDecoration: "underline", color: "#0d6d6d" }}
                onClick={markAllRead}
              >
                Mark all read
              </Text>
            )}
          </Flex>

          {/* List of Dynamic Notifications */}
          <VStack align="stretch" gap="2" maxH="380px" overflowY="auto" pr="1">
            {notifications.length === 0 ? (
              <Box py="6" textAlign="center">
                <Text fontSize="xs" color="gray.500">
                  No active notifications at this time.
                </Text>
              </Box>
            ) : (
              notifications.map((item) => {
                const isUnread = !readIds.includes(item.id)
                const badgeStyle = getCategoryBadgeColor(item.category, item.type)

                return (
                  <Link
                    key={item.id}
                    href={item.href || "/notifications"}
                    onClick={() => {
                      markAsRead(item.id)
                      setIsOpen(false)
                    }}
                  >
                    <Box
                      p="3"
                      borderRadius="xl"
                      bg={isUnread ? "rgba(20, 145, 145, 0.05)" : "gray.50"}
                      border="1px solid"
                      borderColor={isUnread ? "rgba(20, 145, 145, 0.2)" : "transparent"}
                      _hover={{
                        bg: isUnread ? "rgba(20, 145, 145, 0.1)" : "gray.100",
                        transform: "translateY(-1px)",
                        borderColor: "#149191",
                      }}
                      transition="all 0.15s ease"
                      cursor="pointer"
                      position="relative"
                    >
                      <Flex justify="space-between" align="center" mb="1.5" gap="2">
                        <HStack gap="1.5" flex="1" minW="0">
                          {getCategoryIcon(item.category, item.type)}
                          <Badge
                            bg={badgeStyle.bg}
                            color={badgeStyle.color}
                            border="1px solid"
                            borderColor={badgeStyle.border}
                            fontSize="9.5px"
                            px="1.5"
                            py="0.2"
                            borderRadius="md"
                            fontWeight="bold"
                            textTransform="uppercase"
                            letterSpacing="0.03em"
                          >
                            {item.category || (item.type === "event" ? "Event" : "Assignment")}
                          </Badge>
                          {isUnread && (
                            <Box
                              w="6px"
                              h="6px"
                              borderRadius="full"
                              bg="#149191"
                              flexShrink={0}
                            />
                          )}
                        </HStack>
                        <Text fontSize="10.5px" color="gray.400" fontWeight="semibold" flexShrink={0}>
                          {item.time || "Recently"}
                        </Text>
                      </Flex>

                      <Text
                        fontSize="12px"
                        fontWeight={isUnread ? "700" : "600"}
                        color={isUnread ? "#051B64" : "gray.800"}
                        lineHeight="1.3"
                        mb="1"
                        lineClamp={2}
                      >
                        {item.title}
                      </Text>

                      <Text fontSize="11px" color="gray.600" lineHeight="1.35" lineClamp={2}>
                        {item.description}
                      </Text>
                    </Box>
                  </Link>
                )
              })
            )}
          </VStack>

          {/* Footer Actions */}
          <Box mt="2.5" pt="2" borderTop="1px solid" borderColor="gray.100">
            <Flex justify="space-between" align="center" px="1">
              <Link href="/assignments" onClick={() => setIsOpen(false)}>
                <HStack gap="1" fontSize="11px" fontWeight="700" color="#149191" _hover={{ textDecoration: "underline" }}>
                  <GraduationCapIcon size={12} color="#149191" />
                  <Text>Assignments</Text>
                </HStack>
              </Link>
              <Link href="/notifications" onClick={() => setIsOpen(false)}>
                <HStack
                  gap="1"
                  fontSize="11px"
                  fontWeight="700"
                  color="#051B64"
                  _hover={{ color: "#149191", textDecoration: "underline" }}
                >
                  <Text>View all updates</Text>
                  <ArrowRightIcon size={11} />
                </HStack>
              </Link>
            </Flex>
          </Box>
        </Box>
      )}
    </Box>
  )
}
