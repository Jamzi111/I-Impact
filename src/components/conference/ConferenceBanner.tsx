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
  Container,
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

export function ConferenceBanner({ initialEvent }: { initialEvent?: EventItem | null }) {
  const [event, setEvent] = useState<EventItem | null>(initialEvent || null)
  const [loaded, setLoaded] = useState(false)
  const [isExpired, setIsExpired] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
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
          } else {
            setEvent(null)
          }
        }
      } catch (err) {
        console.error("Error fetching active event for banner:", err)
      } finally {
        setLoaded(true)
      }
    }
    fetchActiveEvent()
  }, [])

  // Dynamic countdown timer based on active event countdownTarget
  useEffect(() => {
    if (!event) return

    const targetTimeStr = event.countdownTarget || `${event.startDate}T09:00:00Z`
    const targetTimestamp = new Date(targetTimeStr).getTime()

    if (isNaN(targetTimestamp)) {
      setIsExpired(true)
      return
    }

    const updateTimer = () => {
      const now = new Date().getTime()
      const diff = targetTimestamp - now

      // Real countdown accuracy: If event time has passed, stop at 0
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setIsExpired(true)
        return
      }

      setIsExpired(false)
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
  }, [event?.countdownTarget, event?.startDate, event])

  const formatNum = (n: number) => n.toString().padStart(2, "0")

  // If no event exists or none is active, return null so the entire section does not render
  if (loaded && !event) {
    return null
  }

  // Before loaded, don't flash default or leave empty gap
  if (!event) {
    return null
  }

  return (
    <Box
      as="section"
      position="relative"
      overflow="hidden"
      bg="linear-gradient(180deg, #FBFDFF 0%, #F5F9FE 100%)"
      py={{ base: "6", sm: "8", md: "10" }}
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor="rgba(14, 165, 233, 0.05)"
    >
      {/* Subtle decorative ambient glow */}
      <Box
        position="absolute"
        top="-20%"
        left="50%"
        transform="translateX(-50%)"
        w="800px"
        h="400px"
        bg="radial-gradient(ellipse, rgba(14, 165, 233, 0.08) 0%, transparent 70%)"
        filter="blur(50px)"
        pointerEvents="none"
      />

      <Container maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1160px", xl: "1200px" }} px={{ base: "4", sm: "6", md: "8", lg: "8" }} position="relative" zIndex={1}>
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
              <HStack gap="2.5" wrap="wrap">
                <HStack
                  gap="1.5"
                  px="3"
                  py="1"
                  borderRadius="full"
                  bg="rgba(16, 185, 129, 0.15)"
                  border="1px solid rgba(16, 185, 129, 0.35)"
                >
                  <MegaphoneIcon size={13} color="#34D399" />
                  <Text
                    fontSize={{ base: "10.5px", md: "11px" }}
                    fontWeight="800"
                    color="#34D399"
                    letterSpacing="0.08em"
                    textTransform="uppercase"
                  >
                    {event.badge || "UPCOMING EVENT"}
                  </Text>
                </HStack>

                {event.attendeeBadge && (
                  <HStack
                    gap="1.5"
                    px="3"
                    py="1"
                    borderRadius="full"
                    bg="rgba(255, 255, 255, 0.08)"
                    border="1px solid rgba(255, 255, 255, 0.15)"
                  >
                    <UsersIcon size={12} color="#A7F3D0" />
                    <Text
                      fontSize={{ base: "10.5px", md: "11px" }}
                      fontWeight="700"
                      color="#A7F3D0"
                      letterSpacing="0.04em"
                    >
                      {event.attendeeBadge}
                    </Text>
                  </HStack>
                )}
              </HStack>

              {/* Conference Title */}
              <Heading
                fontSize={{ base: "20px", sm: "24px", md: "28px", lg: "26px", xl: "30px" }}
                fontWeight="900"
                color="#FFFFFF"
                lineHeight={{ base: "1.25", md: "1.2" }}
                letterSpacing="-0.02em"
              >
                {event.title}
              </Heading>

              {/* Subtitle / Theme */}
              {event.subtitle && (
                <Text
                  fontSize={{ base: "13px", sm: "14px", md: "15px" }}
                  fontWeight="600"
                  color="#2DD4BF"
                  lineHeight="1.4"
                >
                  {event.subtitle}
                </Text>
              )}

              {/* Key Event Metadata (Date, Time, Location) */}
              <Flex
                wrap="wrap"
                gap={{ base: "3", sm: "4", md: "5" }}
                pt="1"
                color="#E2E8F0"
                fontSize={{ base: "12px", sm: "13px" }}
              >
                <HStack gap="1.5">
                  <CalendarIcon size={15} color="#2DD4BF" />
                  <Text fontWeight="600">{event.dateDisplay}</Text>
                </HStack>

                {event.timeDisplay && (
                  <HStack gap="1.5">
                    <Box as="span" color="#2DD4BF" fontWeight="bold">
                      •
                    </Box>
                    <Text color="#CBD5E1">{event.timeDisplay}</Text>
                  </HStack>
                )}

                <HStack gap="1.5">
                  <MapPinIcon size={15} color="#2DD4BF" />
                  <Text fontWeight="600">{event.venue}</Text>
                </HStack>
              </Flex>

              {/* Soft Copy Document Notice if uploaded */}
              {event.programDocumentUrl && (
                <HStack
                  gap="2"
                  bg="rgba(16, 185, 129, 0.12)"
                  border="1px solid rgba(52, 211, 153, 0.3)"
                  px="3"
                  py="1.5"
                  borderRadius="lg"
                  mt="1"
                >
                  <FileTextIcon size={14} color="#34D399" />
                  <Text fontSize="12px" color="#A7F3D0" fontWeight="600">
                    Official program soft copy available for download
                  </Text>
                </HStack>
              )}
            </VStack>

            {/* Right Content: Accurate Real-time Countdown Timer & CTAs */}
            <VStack
              align={{ base: "flex-start", sm: "center", lg: "flex-end" }}
              gap="4"
              w={{ base: "100%", lg: "auto" }}
              minW={{ lg: "340px" }}
            >
              {/* Countdown Clock Label */}
              <HStack gap="2" align="center">
                <Box
                  w="8px"
                  h="8px"
                  borderRadius="full"
                  bg={isExpired ? "#EF4444" : "#10B981"}
                  boxShadow={isExpired ? "0 0 8px #EF4444" : "0 0 8px #10B981"}
                />
                <Text
                  fontSize={{ base: "11px", md: "11.5px" }}
                  fontWeight="800"
                  color={isExpired ? "#FCA5A5" : "#34D399"}
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                >
                  {isExpired ? "EVENT COMPLETED / IN SESSION" : "CONFERENCE COUNTDOWN"}
                </Text>
              </HStack>

              {/* Accurate 4-Unit Countdown Box */}
              <HStack
                gap={{ base: "2", sm: "2.5", md: "3" }}
                justify="center"
                w={{ base: "100%", sm: "auto" }}
              >
                {/* Days */}
                <Box
                  bg="rgba(255, 255, 255, 0.06)"
                  border="1px solid rgba(255, 255, 255, 0.12)"
                  borderRadius="xl"
                  px={{ base: "3", sm: "3.5", md: "4" }}
                  py={{ base: "2", sm: "2.5", md: "3" }}
                  minW={{ base: "58px", sm: "64px", md: "68px" }}
                  textAlign="center"
                  backdropFilter="blur(10px)"
                >
                  <Text
                    fontSize={{ base: "20px", sm: "24px", md: "26px" }}
                    fontWeight="900"
                    color="#FFFFFF"
                    lineHeight="1"
                    fontFamily="monospace"
                  >
                    {formatNum(timeLeft.days)}
                  </Text>
                  <Text
                    fontSize="9.5px"
                    fontWeight="700"
                    color="#94A3B8"
                    mt="1"
                    letterSpacing="0.08em"
                    textTransform="uppercase"
                  >
                    DAYS
                  </Text>
                </Box>

                <Text fontSize="20px" fontWeight="700" color="rgba(255, 255, 255, 0.4)" alignSelf="center">
                  :
                </Text>

                {/* Hours */}
                <Box
                  bg="rgba(255, 255, 255, 0.06)"
                  border="1px solid rgba(255, 255, 255, 0.12)"
                  borderRadius="xl"
                  px={{ base: "3", sm: "3.5", md: "4" }}
                  py={{ base: "2", sm: "2.5", md: "3" }}
                  minW={{ base: "58px", sm: "64px", md: "68px" }}
                  textAlign="center"
                  backdropFilter="blur(10px)"
                >
                  <Text
                    fontSize={{ base: "20px", sm: "24px", md: "26px" }}
                    fontWeight="900"
                    color="#FFFFFF"
                    lineHeight="1"
                    fontFamily="monospace"
                  >
                    {formatNum(timeLeft.hours)}
                  </Text>
                  <Text
                    fontSize="9.5px"
                    fontWeight="700"
                    color="#94A3B8"
                    mt="1"
                    letterSpacing="0.08em"
                    textTransform="uppercase"
                  >
                    HOURS
                  </Text>
                </Box>

                <Text fontSize="20px" fontWeight="700" color="rgba(255, 255, 255, 0.4)" alignSelf="center">
                  :
                </Text>

                {/* Minutes */}
                <Box
                  bg="rgba(255, 255, 255, 0.06)"
                  border="1px solid rgba(255, 255, 255, 0.12)"
                  borderRadius="xl"
                  px={{ base: "3", sm: "3.5", md: "4" }}
                  py={{ base: "2", sm: "2.5", md: "3" }}
                  minW={{ base: "58px", sm: "64px", md: "68px" }}
                  textAlign="center"
                  backdropFilter="blur(10px)"
                >
                  <Text
                    fontSize={{ base: "20px", sm: "24px", md: "26px" }}
                    fontWeight="900"
                    color="#FFFFFF"
                    lineHeight="1"
                    fontFamily="monospace"
                  >
                    {formatNum(timeLeft.minutes)}
                  </Text>
                  <Text
                    fontSize="9.5px"
                    fontWeight="700"
                    color="#94A3B8"
                    mt="1"
                    letterSpacing="0.08em"
                    textTransform="uppercase"
                  >
                    MINS
                  </Text>
                </Box>

                <Text fontSize="20px" fontWeight="700" color="rgba(255, 255, 255, 0.4)" alignSelf="center">
                  :
                </Text>

                {/* Seconds */}
                <Box
                  bg="rgba(255, 255, 255, 0.06)"
                  border="1px solid rgba(255, 255, 255, 0.12)"
                  borderRadius="xl"
                  px={{ base: "3", sm: "3.5", md: "4" }}
                  py={{ base: "2", sm: "2.5", md: "3" }}
                  minW={{ base: "58px", sm: "64px", md: "68px" }}
                  textAlign="center"
                  backdropFilter="blur(10px)"
                >
                  <Text
                    fontSize={{ base: "20px", sm: "24px", md: "26px" }}
                    fontWeight="900"
                    color="#2DD4BF"
                    lineHeight="1"
                    fontFamily="monospace"
                  >
                    {formatNum(timeLeft.seconds)}
                  </Text>
                  <Text
                    fontSize="9.5px"
                    fontWeight="700"
                    color="#94A3B8"
                    mt="1"
                    letterSpacing="0.08em"
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
                      <HStack gap="1.5">
                        <Text>{event.agendaBtnText || "View Conference Agenda"}</Text>
                        <ExternalLinkIcon size={12} color="currentColor" />
                      </HStack>
                    </Button>
                  </Link>
                )}
              </HStack>
            </VStack>
          </Flex>
        </Box>
      </Container>
    </Box>
  )
}
