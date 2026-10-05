"use client"

import React, { useState, useEffect } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  HStack,
  VStack,
  Badge,
  Spinner,
} from "@chakra-ui/react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  BellIcon,
  CalendarIcon,
  GraduationCapIcon,
  SparklesIcon,
  CheckIcon,
  ArrowRightIcon,
  MegaphoneIcon,
} from "@/components/icons"
import { NotificationItem } from "@/types/notification"

const NOTIF_STORAGE_KEY = "iimpact_read_notifications_v1"

const FILTER_TABS = ["All Notifications", "Events", "Assignments", "Cohorts"]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [readIds, setReadIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("All Notifications")

  const fetchNotifications = async () => {
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
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
    try {
      const stored = localStorage.getItem(NOTIF_STORAGE_KEY)
      if (stored) {
        setReadIds(JSON.parse(stored))
      }
    } catch {}
  }, [])

  const markAllRead = () => {
    const allIds = notifications.map((n) => n.id)
    const updated = Array.from(new Set([...readIds, ...allIds]))
    setReadIds(updated)
    try {
      localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(updated))
    } catch {}
  }

  const markAsRead = (id: string) => {
    if (!readIds.includes(id)) {
      const updated = [...readIds, id]
      setReadIds(updated)
      try {
        localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(updated))
      } catch {}
    }
  }

  const filteredItems = notifications.filter((item) => {
    if (activeTab === "All Notifications") return true
    if (activeTab === "Events") return item.type === "event" || item.category === "Event"
    if (activeTab === "Assignments") return item.type === "assignment" || item.category === "Assignment"
    if (activeTab === "Cohorts") return item.type === "cohort" || item.category === "Cohort"
    return true
  })

  const unreadCount = notifications.filter((i) => !readIds.includes(i.id)).length

  const getCategoryIcon = (category: string, type: string) => {
    if (type === "event" || category?.toLowerCase().includes("event")) {
      return <CalendarIcon size={18} color="#D97706" />
    }
    if (type === "assignment" || category?.toLowerCase().includes("assignment")) {
      return <GraduationCapIcon size={18} color="#149191" />
    }
    if (category?.toLowerCase().includes("cohort") || category?.toLowerCase().includes("mentorship")) {
      return <SparklesIcon size={18} color="#7C3AED" />
    }
    return <MegaphoneIcon size={18} color="#051B64" />
  }

  return (
    <Box minH="100vh" bg="#F8FAFC" display="flex" flexDirection="column">
      <Header />

      <Box pt={{ base: "24", md: "28" }} pb="20" flex="1">
        <Container maxW="1000px" px={{ base: "4", md: "8" }}>
          {/* Header */}
          <Box mb="8">
            <Flex
              direction={{ base: "column", sm: "row" }}
              justify="space-between"
              align={{ base: "flex-start", sm: "center" }}
              gap="4"
            >
              <Box>
                <HStack gap="2" mb="2">
                  <Badge bg="rgba(20, 145, 145, 0.1)" color="#149191" px="2.5" py="1" borderRadius="full" fontSize="xs" fontWeight="bold">
                    COMMUNITY FEED
                  </Badge>
                  {unreadCount > 0 && (
                    <Badge bg="#EF4444" color="white" px="2" py="0.5" borderRadius="full" fontSize="xs" fontWeight="bold">
                      {unreadCount} Unread
                    </Badge>
                  )}
                </HStack>
                <Heading as="h1" fontSize={{ base: "2xl", sm: "3xl" }} fontWeight="900" color="#051B64">
                  Updates & Live Alerts
                </Heading>
                <Text fontSize="sm" color="gray.600" mt="1">
                  Stay updated on new conference announcements, cohort deliverables, and program registrations.
                </Text>
              </Box>

              {unreadCount > 0 && (
                <Button
                  size="sm"
                  bg="#149191"
                  color="white"
                  _hover={{ bg: "#0d6d6d" }}
                  borderRadius="xl"
                  fontWeight="bold"
                  fontSize="xs"
                  onClick={markAllRead}
                >
                  <HStack gap="1.5">
                    <CheckIcon size={13} color="white" />
                    <Text>Mark All as Read</Text>
                  </HStack>
                </Button>
              )}
            </Flex>
          </Box>

          {/* Filter Tabs */}
          <Flex
            mb="6"
            gap="2"
            overflowX="auto"
            pb="2"
            css={{
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
            }}
          >
            {FILTER_TABS.map((tab) => {
              const isActive = activeTab === tab
              return (
                <Button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  size="sm"
                  borderRadius="full"
                  px="4"
                  py="2"
                  fontWeight="bold"
                  fontSize="xs"
                  bg={isActive ? "#051B64" : "white"}
                  color={isActive ? "white" : "gray.700"}
                  border="1px solid"
                  borderColor={isActive ? "#051B64" : "gray.200"}
                  _hover={{
                    bg: isActive ? "#0A2E8A" : "gray.50",
                    borderColor: isActive ? "#0A2E8A" : "#149191",
                  }}
                  boxShadow={isActive ? "0 4px 12px rgba(5, 27, 100, 0.15)" : "none"}
                  flexShrink={0}
                >
                  {tab}
                </Button>
              )
            })}
          </Flex>

          {/* Content Feed */}
          {loading ? (
            <Flex justify="center" align="center" minH="250px" direction="column" gap="3">
              <Spinner color="#149191" size="lg" />
              <Text color="gray.500" fontSize="sm">
                Loading notifications...
              </Text>
            </Flex>
          ) : filteredItems.length === 0 ? (
            <Box
              bg="white"
              borderRadius="2xl"
              p="12"
              textAlign="center"
              border="1px dashed"
              borderColor="gray.300"
            >
              <Box
                w="56px"
                h="56px"
                borderRadius="full"
                bg="rgba(5, 27, 100, 0.05)"
                color="#051B64"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mx="auto"
                mb="3"
              >
                <BellIcon size={24} />
              </Box>
              <Heading as="h3" fontSize="md" color="#051B64" mb="1">
                No Notifications in this Category
              </Heading>
              <Text fontSize="xs" color="gray.500" maxW="360px" mx="auto">
                Check back soon or switch tabs to see all latest updates.
              </Text>
            </Box>
          ) : (
            <VStack align="stretch" gap="3">
              {filteredItems.map((item) => {
                const isUnread = !readIds.includes(item.id)

                return (
                  <Link
                    key={item.id}
                    href={item.href || "/"}
                    onClick={() => markAsRead(item.id)}
                  >
                    <Box
                      bg="white"
                      p={{ base: "4", sm: "5" }}
                      borderRadius="2xl"
                      border="1px solid"
                      borderColor={isUnread ? "rgba(20, 145, 145, 0.25)" : "gray.100"}
                      boxShadow={
                        isUnread
                          ? "0 4px 20px rgba(20, 145, 145, 0.08)"
                          : "0 2px 10px rgba(0, 0, 0, 0.02)"
                      }
                      transition="all 0.2s ease"
                      _hover={{
                        transform: "translateY(-1px)",
                        boxShadow: "0 10px 25px -5px rgba(5, 27, 100, 0.1)",
                        borderColor: "#149191",
                      }}
                      position="relative"
                    >
                      <Flex align="flex-start" gap="3.5">
                        <Box
                          p="2.5"
                          borderRadius="xl"
                          bg={
                            item.type === "event"
                              ? "rgba(245, 158, 11, 0.1)"
                              : item.type === "assignment"
                              ? "rgba(20, 145, 145, 0.1)"
                              : "rgba(5, 27, 100, 0.07)"
                          }
                          flexShrink={0}
                          mt="0.5"
                        >
                          {getCategoryIcon(item.category, item.type)}
                        </Box>

                        <Box flex="1" minW="0">
                          <Flex justify="space-between" align="center" mb="1" gap="2" flexWrap="wrap">
                            <HStack gap="2">
                              <Badge
                                bg={
                                  item.type === "event"
                                    ? "rgba(245, 158, 11, 0.12)"
                                    : item.type === "assignment"
                                    ? "rgba(20, 145, 145, 0.12)"
                                    : "rgba(5, 27, 100, 0.08)"
                                }
                                color={
                                  item.type === "event"
                                    ? "#B45309"
                                    : item.type === "assignment"
                                    ? "#149191"
                                    : "#051B64"
                                }
                                fontSize="10px"
                                px="2"
                                py="0.2"
                                borderRadius="md"
                                fontWeight="bold"
                                textTransform="uppercase"
                              >
                                {item.category || item.type}
                              </Badge>

                              {isUnread && (
                                <Badge bg="#EF4444" color="white" fontSize="9px" px="1.5" py="0.1" borderRadius="full">
                                  NEW
                                </Badge>
                              )}
                            </HStack>

                            <Text fontSize="xs" color="gray.400" fontWeight="semibold">
                              {item.time || "Recently"}
                            </Text>
                          </Flex>

                          <Text
                            fontSize="sm"
                            fontWeight={isUnread ? "800" : "700"}
                            color="#051B64"
                            mb="1"
                          >
                            {item.title}
                          </Text>

                          <Text fontSize="xs" color="gray.600" lineHeight="1.5" mb="3">
                            {item.description}
                          </Text>

                          <HStack gap="1" fontSize="xs" color="#149191" fontWeight="bold">
                            <Text>Open Link</Text>
                            <ArrowRightIcon size={12} color="#149191" />
                          </HStack>
                        </Box>
                      </Flex>
                    </Box>
                  </Link>
                )
              })}
            </VStack>
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
