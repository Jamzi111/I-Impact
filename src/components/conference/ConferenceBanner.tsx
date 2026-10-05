"use client"

import React, { useState, useEffect } from "react"
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  HStack,
  VStack,
} from "@chakra-ui/react"
import Link from "next/link"
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  MegaphoneIcon,
  DownloadIcon,
  ExternalLinkIcon,
  FileTextIcon,
} from "../icons"
import { EventItem } from "@/types/event"

const DEFAULT_BANNER_EVENT: EventItem = {
  id: "evt-teen-2025",
  title: "AS A TEEN Conference 2025: Unleashing The Extraordinary",
  subtitle: "Raising Generational Champions, Visionaries & Future World Leaders",
  badge: "ANNUAL FLAGSHIP YOUTH CONGRESS",
  startDate: "2025-11-15",
  endDate: "2025-11-17",
  dateDisplay: "November 15–17, 2025",
  timeDisplay: "9:00 AM – 4:00 PM WAT",
  countdownTarget: "2025-11-15T09:00:00Z",
  venue: "Landmark Centre, Lagos & Virtual Worldwide",
  attendeeBadge: "2,500+ Registered Teens",
  description: "Our biggest annual conference gathering teenagers, educators, industry titans, and visionary mentors for 3 transformative days of keynote sessions, leadership labs, career discovery workshops, and networking.",
  registrationUrl: "/programs",
  registrationBtnText: "Register Free Now",
  agendaBtnText: "View Conference Agenda",
  programDocumentUrl: "",
  programDocumentName: "",
  bannerImageUrl: "",
  isActive: true,
  isArchived: false,
  createdAt: "2025-01-01T00:00:00.000Z",
  updatedAt: "2025-01-01T00:00:00.000Z",
}

export function ConferenceBanner({ initialEvent }: { initialEvent?: EventItem | null }) {
  const [event, setEvent] = useState<EventItem>(initialEvent || DEFAULT_BANNER_EVENT)
  const [timeLeft, setTimeLeft] = useState({
    days: 64,
    hours: 18,
    minutes: 25,
    seconds: 34,
  })

  // Fetch active event from API on mount
  useEffect(() => {
    async function fetchActiveEvent() {
      try {
        const res = await fetch("/api/events?active=true")
        if (res.ok) {
          const data = await res.json()
          if (data.success && data.event) {
            setEvent(data.event)
          }
        }
      } catch (err) {
        console.error("Error fetching active event for banner:", err)
      }
    }
    fetchActiveEvent()
  }, [])

  // Dynamic countdown timer based on active event countdownTarget
  useEffect(() => {
    const targetTimeStr = event.countdownTarget || `${event.startDate || "2025-11-15"}T09:00:00Z`
    let targetTimestamp = new Date(targetTimeStr).getTime()
    if (isNaN(targetTimestamp)) {
      targetTimestamp = new Date("2025-11-15T09:00:00Z").getTime()
    }

    const updateTimer = () => {
      const now = new Date().getTime()
      let diff = targetTimestamp - now

      // If in past relative to current clock, simulate active loop to keep timer alive
      if (diff <= 0) {
        const cycle = 64 * 86400000 + 18 * 3600000 + 25 * 60000 + 34000
        const elapsed = now % cycle
        diff = cycle - elapsed
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      })
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [event.countdownTarget, event.startDate])

  const formatNum = (n: number) => n.toString().padStart(2, "0")

  return (
    <Box
      w="100%"
      borderRadius={{ base: "20px", md: "24px", lg: "24px" }}
      bg="linear-gradient(135deg, #030826 0%, #051347 50%, #030a2e 100%)"
      p={{ base: "6", sm: "7", md: "8", lg: "7", xl: "8" }}
      position="relative"
      overflow="hidden"
      border="1px solid rgba(255, 255, 255, 0.1)"
      boxShadow="0 20px 40px -15px rgba(3, 8, 38, 0.5)"
    >
      {/* Ambient background glow accents */}
      <Box
        position="absolute"
        top="-40%"
        right="-15%"
        w="400px"
        h="400px"
        bg="radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)"
        filter="blur(50px)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="-40%"
        left="-10%"
        w="400px"
        h="400px"
        bg="radial-gradient(circle, rgba(20, 145, 145, 0.15) 0%, transparent 70%)"
        filter="blur(60px)"
        pointerEvents="none"
      />

      <Flex
        direction={{ base: "column", lg: "row" }}
        align={{ base: "flex-start", lg: "center" }}
        justify="space-between"
        gap={{ base: "7", lg: "8" }}
        position="relative"
        zIndex={1}
      >
        {/* Left Content */}
        <VStack align="flex-start" gap={{ base: "3", md: "3.5" }} maxW={{ base: "100%", lg: "580px" }}>
          {/* Badge */}
          <HStack
            bg="#FEF3C7"
            px="3"
            py="1"
            borderRadius="full"
            gap="1.5"
            border="1px solid rgba(245, 158, 11, 0.3)"
          >
            <MegaphoneIcon size={13} color="#92400E" />
            <Text
              fontSize="10px"
              fontWeight="800"
              color="#92400E"
              letterSpacing="0.05em"
              textTransform="uppercase"
              lineHeight="1"
            >
              {event.badge || "ANNUAL FLAGSHIP YOUTH CONGRESS"}
            </Text>
          </HStack>

          {/* Conference Title */}
          <Heading
            as="h2"
            color="white"
            fontSize={{ base: "22px", sm: "26px", md: "28px", lg: "24px", xl: "27px" }}
            fontWeight="900"
            lineHeight="1.2"
            letterSpacing="-0.02em"
          >
            {event.title}
          </Heading>

          {/* Subtitle / Theme description if available */}
          {event.subtitle && (
            <Text fontSize={{ base: "13px", md: "14px" }} color="whiteAlpha.800" fontWeight="500" lineHeight="1.4">
              {event.subtitle}
            </Text>
          )}

          {/* Metadata Row with icons */}
          <Flex
            wrap="wrap"
            align="center"
            gap={{ base: "3", sm: "4", md: "5" }}
            pt="0.5"
          >
            {/* Date */}
            <HStack gap="1.5" color="#E2E8F0">
              <CalendarIcon size={14} color="#10B981" />
              <Text fontSize={{ base: "12px", sm: "12.5px" }} fontWeight="600">
                {event.dateDisplay || "Date TBA"}
              </Text>
            </HStack>

            {/* Venue / Location */}
            <HStack gap="1.5" color="#E2E8F0">
              <MapPinIcon size={14} color="#10B981" />
              <Text fontSize={{ base: "12px", sm: "12.5px" }} fontWeight="600">
                {event.venue || "Landmark Centre, Lagos"}
              </Text>
            </HStack>

            {/* Registered Attendees */}
            {event.attendeeBadge && (
              <HStack gap="1.5" color="#E2E8F0">
                <UsersIcon size={14} color="#10B981" />
                <Text fontSize={{ base: "12px", sm: "12.5px" }} fontWeight="600">
                  {event.attendeeBadge}
                </Text>
              </HStack>
            )}

            {/* Program Document Soft Copy indicator if uploaded */}
            {event.programDocumentUrl && (
              <HStack gap="1.5" color="#34D399" bg="rgba(16, 185, 129, 0.15)" px="2" py="0.5" borderRadius="md">
                <FileTextIcon size={13} color="#34D399" />
                <Text fontSize="11px" fontWeight="700">
                  Soft Copy Available
                </Text>
              </HStack>
            )}
          </Flex>
        </VStack>

        {/* Right Side: Live Countdown & Action Buttons */}
        <VStack
          align={{ base: "flex-start", sm: "flex-start", lg: "flex-end" }}
          gap="3.5"
          w={{ base: "100%", lg: "auto" }}
          flexShrink={0}
        >
          {/* 4-Unit Countdown Timer Tiles */}
          <HStack gap={{ base: "2", sm: "2.5", lg: "2", xl: "2.5" }} w={{ base: "100%", sm: "auto" }} justify={{ base: "space-between", sm: "flex-start" }}>
            {/* DAYS */}
            <Box
              bg="rgba(255, 255, 255, 0.08)"
              backdropFilter="blur(8px)"
              border="1px solid rgba(255, 255, 255, 0.14)"
              borderRadius="xl"
              minW={{ base: "64px", sm: "74px", md: "76px", lg: "64px", xl: "70px" }}
              py={{ base: "2.5", sm: "3", lg: "2", xl: "2.5" }}
              px={{ base: "3", lg: "2", xl: "2.5" }}
              textAlign="center"
              boxShadow="inset 0 1px 1px rgba(255, 255, 255, 0.1)"
            >
              <Text
                fontSize={{ base: "22px", sm: "26px", md: "28px", lg: "21px", xl: "24px" }}
                fontWeight="900"
                color="white"
                lineHeight="1"
                fontVariantNumeric="tabular-nums"
              >
                {timeLeft.days}
              </Text>
              <Text
                fontSize="9px"
                fontWeight="800"
                color="whiteAlpha.700"
                letterSpacing="0.08em"
                mt="1"
                textTransform="uppercase"
              >
                DAYS
              </Text>
            </Box>

            {/* HOURS */}
            <Box
              bg="rgba(255, 255, 255, 0.08)"
              backdropFilter="blur(8px)"
              border="1px solid rgba(255, 255, 255, 0.14)"
              borderRadius="xl"
              minW={{ base: "64px", sm: "74px", md: "76px", lg: "64px", xl: "70px" }}
              py={{ base: "2.5", sm: "3", lg: "2", xl: "2.5" }}
              px={{ base: "3", lg: "2", xl: "2.5" }}
              textAlign="center"
              boxShadow="inset 0 1px 1px rgba(255, 255, 255, 0.1)"
            >
              <Text
                fontSize={{ base: "22px", sm: "26px", md: "28px", lg: "21px", xl: "24px" }}
                fontWeight="900"
                color="white"
                lineHeight="1"
                fontVariantNumeric="tabular-nums"
              >
                {formatNum(timeLeft.hours)}
              </Text>
              <Text
                fontSize="9px"
                fontWeight="800"
                color="whiteAlpha.700"
                letterSpacing="0.08em"
                mt="1"
                textTransform="uppercase"
              >
                HOURS
              </Text>
            </Box>

            {/* MINS */}
            <Box
              bg="rgba(255, 255, 255, 0.08)"
              backdropFilter="blur(8px)"
              border="1px solid rgba(255, 255, 255, 0.14)"
              borderRadius="xl"
              minW={{ base: "64px", sm: "74px", md: "76px", lg: "64px", xl: "70px" }}
              py={{ base: "2.5", sm: "3", lg: "2", xl: "2.5" }}
              px={{ base: "3", lg: "2", xl: "2.5" }}
              textAlign="center"
              boxShadow="inset 0 1px 1px rgba(255, 255, 255, 0.1)"
            >
              <Text
                fontSize={{ base: "22px", sm: "26px", md: "28px", lg: "21px", xl: "24px" }}
                fontWeight="900"
                color="white"
                lineHeight="1"
                fontVariantNumeric="tabular-nums"
              >
                {formatNum(timeLeft.minutes)}
              </Text>
              <Text
                fontSize="9px"
                fontWeight="800"
                color="whiteAlpha.700"
                letterSpacing="0.08em"
                mt="1"
                textTransform="uppercase"
              >
                MINS
              </Text>
            </Box>

            {/* SECS */}
            <Box
              bg="rgba(255, 255, 255, 0.08)"
              backdropFilter="blur(8px)"
              border="1px solid rgba(255, 255, 255, 0.14)"
              borderRadius="xl"
              minW={{ base: "64px", sm: "74px", md: "76px", lg: "64px", xl: "70px" }}
              py={{ base: "2.5", sm: "3", lg: "2", xl: "2.5" }}
              px={{ base: "3", lg: "2", xl: "2.5" }}
              textAlign="center"
              boxShadow="inset 0 1px 1px rgba(255, 255, 255, 0.1)"
            >
              <Text
                fontSize={{ base: "22px", sm: "26px", md: "28px", lg: "21px", xl: "24px" }}
                fontWeight="900"
                color="#34D399"
                lineHeight="1"
                fontVariantNumeric="tabular-nums"
              >
                {formatNum(timeLeft.seconds)}
              </Text>
              <Text
                fontSize="9px"
                fontWeight="800"
                color="whiteAlpha.700"
                letterSpacing="0.08em"
                mt="1"
                textTransform="uppercase"
              >
                SECS
              </Text>
            </Box>
          </HStack>

          {/* Action CTA Buttons */}
          <HStack gap="2.5" wrap="wrap" w={{ base: "100%", sm: "auto" }}>
            {/* Primary Register Free Button */}
            {event.registrationUrl?.startsWith("http") ? (
              <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  size={{ base: "md", lg: "sm", xl: "md" }}
                  bg="#059669"
                  color="white"
                  fontWeight="700"
                  fontSize={{ base: "13.5px", lg: "12.5px", xl: "13px" }}
                  px={{ base: "5", lg: "4", xl: "4.5" }}
                  py={{ base: "5", lg: "4", xl: "4.5" }}
                  borderRadius="lg"
                  boxShadow="0 4px 15px rgba(5, 150, 105, 0.35)"
                  _hover={{
                    bg: "#047857",
                    transform: "translateY(-1px)",
                    boxShadow: "0 6px 20px rgba(5, 150, 105, 0.45)",
                  }}
                  _active={{ transform: "translateY(0)" }}
                  transition="all 0.2s ease"
                >
                  {event.registrationBtnText || "Register Free Now"}
                </Button>
              </a>
            ) : (
              <Link href={event.registrationUrl || "/programs"}>
                <Button
                  size={{ base: "md", lg: "sm", xl: "md" }}
                  bg="#059669"
                  color="white"
                  fontWeight="700"
                  fontSize={{ base: "13.5px", lg: "12.5px", xl: "13px" }}
                  px={{ base: "5", lg: "4", xl: "4.5" }}
                  py={{ base: "5", lg: "4", xl: "4.5" }}
                  borderRadius="lg"
                  boxShadow="0 4px 15px rgba(5, 150, 105, 0.35)"
                  _hover={{
                    bg: "#047857",
                    transform: "translateY(-1px)",
                    boxShadow: "0 6px 20px rgba(5, 150, 105, 0.45)",
                  }}
                  _active={{ transform: "translateY(0)" }}
                  transition="all 0.2s ease"
                >
                  {event.registrationBtnText || "Register Free Now"}
                </Button>
              </Link>
            )}

            {/* View Agenda / Soft Copy Download Button */}
            {event.programDocumentUrl ? (
              <a
                href={event.programDocumentUrl}
                target="_blank"
                rel="noopener noreferrer"
                download={event.programDocumentName || "I-Impact_Program_Schedule"}
              >
                <Button
                  size={{ base: "md", lg: "sm", xl: "md" }}
                  bg="rgba(16, 185, 129, 0.2)"
                  color="#A7F3D0"
                  fontWeight="600"
                  fontSize={{ base: "13.5px", lg: "12.5px", xl: "13px" }}
                  px={{ base: "4.5", lg: "3.5", xl: "4" }}
                  py={{ base: "5", lg: "4", xl: "4.5" }}
                  borderRadius="lg"
                  border="1px solid rgba(52, 211, 153, 0.4)"
                  backdropFilter="blur(8px)"
                  _hover={{
                    bg: "rgba(16, 185, 129, 0.3)",
                    borderColor: "rgba(52, 211, 153, 0.7)",
                    color: "white",
                    transform: "translateY(-1px)",
                  }}
                  _active={{ transform: "translateY(0)" }}
                  transition="all 0.2s ease"
                >
                  <HStack gap="1.5">
                    <DownloadIcon size={14} color="currentColor" />
                    <Text>{event.agendaBtnText || "Download Program Soft Copy"}</Text>
                  </HStack>
                </Button>
              </a>
            ) : (
              <Link href="/programs">
                <Button
                  size={{ base: "md", lg: "sm", xl: "md" }}
                  bg="rgba(255, 255, 255, 0.12)"
                  color="white"
                  fontWeight="600"
                  fontSize={{ base: "13.5px", lg: "12.5px", xl: "13px" }}
                  px={{ base: "4.5", lg: "3.5", xl: "4" }}
                  py={{ base: "5", lg: "4", xl: "4.5" }}
                  borderRadius="lg"
                  border="1px solid rgba(255, 255, 255, 0.2)"
                  backdropFilter="blur(8px)"
                  _hover={{
                    bg: "rgba(255, 255, 255, 0.2)",
                    borderColor: "rgba(255, 255, 255, 0.35)",
                    transform: "translateY(-1px)",
                  }}
                  _active={{ transform: "translateY(0)" }}
                  transition="all 0.2s ease"
                >
                  {event.agendaBtnText || "View Conference Agenda"}
                </Button>
              </Link>
            )}
          </HStack>
        </VStack>
      </Flex>
    </Box>
  )
}
