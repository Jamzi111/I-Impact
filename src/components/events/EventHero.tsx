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
} from "@chakra-ui/react"
import Image from "next/image"
import {
  CalendarIcon,
  ArrowRightIcon,
  SparklesIcon,
  RibbonBadgeIcon,
  TicketPassIcon,
  MapPinIcon,
  ClockIcon,
} from "@/components/icons"
import { EventItem } from "@/types/event"
import { EventData, INITIAL_UPCOMING_EVENTS } from "./eventsData"

interface EventHeroProps {
  onOpenRegisterModal?: (event?: EventData) => void
  onOpenWatchPartyModal?: () => void
  onOpenDetailModal?: (event?: EventData) => void
}

export function EventHero({
  onOpenRegisterModal,
  onOpenWatchPartyModal,
  onOpenDetailModal,
}: EventHeroProps) {
  const defaultEvent = INITIAL_UPCOMING_EVENTS[0]
  const [activeEvent, setActiveEvent] = useState<EventData>(defaultEvent)

  // Dynamically load active event from API if available from the admin dashboard
  useEffect(() => {
    let isMounted = true
    async function fetchActive() {
      try {
        const res = await fetch("/api/events?active=true")
        if (!res.ok) return
        const json = await res.json()
        if (isMounted && json.success && json.event) {
          const apiEvt: EventItem = json.event
          setActiveEvent((prev) => ({
            ...prev,
            id: apiEvt.id,
            title: apiEvt.title,
            subtitle: apiEvt.subtitle || prev.subtitle,
            badge: apiEvt.badge || "NEXT MAJOR GATHERING",
            dateDisplay: apiEvt.dateDisplay || prev.dateDisplay,
            timeDisplay: apiEvt.timeDisplay || prev.timeDisplay,
            venue: apiEvt.venue || prev.venue,
            attendeeBadge: apiEvt.attendeeBadge || prev.attendeeBadge,
            description: apiEvt.description || prev.description,
            registrationUrl: apiEvt.registrationUrl,
            registrationBtnText: apiEvt.registrationBtnText,
            bannerImageUrl: apiEvt.bannerImageUrl || prev.bannerImageUrl,
            programDocumentName: apiEvt.programDocumentName,
          }))
        }
      } catch (e) {
        // Fallback to curated default safely without throwing
      }
    }
    fetchActive()
    return () => {
      isMounted = false
    }
  }, [])

  const scrollToCalendar = () => {
    const el = document.getElementById("upcoming-events")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <Box
      as="section"
      position="relative"
      overflow="hidden"
      bg="#060B19"
      color="#FFFFFF"
      pt={{ base: "24", sm: "26", md: "28", lg: "32" }}
      pb={{ base: "8", sm: "10", md: "12", lg: "14" }}
    >
      {/* Background Subtle Radial Glow */}
      <Box
        position="absolute"
        top="-10%"
        left="-5%"
        w={{ base: "260px", md: "460px" }}
        h={{ base: "260px", md: "460px" }}
        borderRadius="full"
        bg="radial-gradient(circle, rgba(20, 145, 145, 0.18) 0%, rgba(5, 27, 100, 0) 70%)"
        filter="blur(50px)"
        pointerEvents="none"
        zIndex={1}
      />
      <Box
        position="absolute"
        top="20%"
        right="-5%"
        w={{ base: "220px", md: "400px" }}
        h={{ base: "220px", md: "400px" }}
        borderRadius="full"
        bg="radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(5, 27, 100, 0) 70%)"
        filter="blur(50px)"
        pointerEvents="none"
        zIndex={1}
      />

      <Container maxW="1360px" px={{ base: "4", sm: "6", lg: "8" }} position="relative" zIndex={2}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          align="stretch"
          justify="space-between"
          gap={{ base: "8", md: "9", lg: "8", xl: "10" }}
        >
          {/* LEFT COLUMN: Hero Copy, Clearer Event Information & Action Buttons */}
          <Box flex={{ base: "1", lg: "1.15" }} maxW={{ lg: "620px" }}>
            <VStack align="flex-start" gap={{ base: "3.5", md: "4" }}>
              {/* Category Micro-Badge */}
              <HStack
                gap="1.5"
                px="3"
                py="1"
                borderRadius="full"
                bg="rgba(16, 185, 129, 0.1)"
                border="1px solid"
                borderColor="rgba(16, 185, 129, 0.35)"
              >
                <SparklesIcon size={13} color="#34D399" />
                <Text
                  fontSize={{ base: "10.5px", sm: "11px" }}
                  fontWeight="600"
                  color="#A7F3D0"
                  letterSpacing="0.02em"
                >
                  The Gathering Ground for Young African Pioneers
                </Text>
              </HStack>

              {/* Reduced Headline Size */}
              <Heading
                as="h1"
                fontSize={{ base: "24px", sm: "28px", md: "34px", lg: "38px", xl: "40px" }}
                fontWeight="800"
                lineHeight={{ base: "1.18", sm: "1.15" }}
                letterSpacing="-0.02em"
                color="#FFFFFF"
              >
                Convening the Next Generation of African Champions.
              </Heading>

              {/* Reduced Writeup / Subtitle Size */}
              <Text
                fontSize={{ base: "13px", sm: "13.5px", md: "14px" }}
                lineHeight="1.6"
                color="#94A3B8"
                fontWeight="400"
                maxW="540px"
              >
                Where vision turns into execution. I IMPACT INITIATIVE convenes thousands of
                secondary students, teen tech innovators, collegiate fellows, and visionary mentors
                across high-octane flagship summits, local code labs, and hybrid international broadcasts.
              </Text>

              {/* Fully Data-Driven & Accessible Event Information Panel */}
              <Box
                as="button"
                role="button"
                tabIndex={0}
                aria-label={`Explore event details for ${activeEvent.title}`}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    onOpenDetailModal?.(activeEvent)
                  }
                }}
                onClick={() => onOpenDetailModal?.(activeEvent)}
                textAlign="left"
                w="100%"
                p={{ base: "3", sm: "3.5" }}
                borderRadius="xl"
                bg="rgba(15, 23, 42, 0.85)"
                border="1px solid"
                borderColor="rgba(255, 255, 255, 0.12)"
                boxShadow="0 10px 25px -5px rgba(0, 0, 0, 0.4)"
                transition="all 0.2s ease"
                _hover={{
                  borderColor: "rgba(16, 185, 129, 0.45)",
                  bg: "rgba(15, 23, 42, 0.95)",
                  transform: "translateY(-1px)",
                }}
                _focusVisible={{
                  outline: "2px solid #10B981",
                  outlineOffset: "2px",
                }}
                cursor="pointer"
              >
                <Flex
                  direction={{ base: "column", sm: "row" }}
                  align={{ base: "flex-start", sm: "center" }}
                  justify="space-between"
                  gap="3"
                >
                  <HStack gap="3" align="center" flex="1">
                    {/* Emerald Square Icon Box */}
                    <Box
                      w="38px"
                      h="38px"
                      borderRadius="lg"
                      bg="rgba(16, 185, 129, 0.18)"
                      border="1px solid rgba(16, 185, 129, 0.35)"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color="#34D399"
                      flexShrink={0}
                    >
                      <TicketPassIcon size={20} color="#10B981" />
                    </Box>

                    {/* Clear Event Info - Fully Data-Driven */}
                    <VStack align="flex-start" gap="1" flex="1">
                      <HStack gap="2" wrap="wrap">
                        <Text
                          fontSize="9.5px"
                          fontWeight="800"
                          color="#10B981"
                          letterSpacing="0.08em"
                          textTransform="uppercase"
                        >
                          {activeEvent.badge || "NEXT MAJOR GATHERING"}
                        </Text>
                        <Badge
                          bg="rgba(56, 189, 248, 0.15)"
                          color="#38BDF8"
                          fontSize="9.5px"
                          px="2"
                          py="0.2"
                          borderRadius="full"
                        >
                          {activeEvent.dateDisplay}
                        </Badge>
                      </HStack>

                      <Text
                        fontSize={{ base: "14px", sm: "15px" }}
                        fontWeight="700"
                        color="#FFFFFF"
                        lineHeight="1.2"
                      >
                        {activeEvent.title}
                      </Text>

                      <HStack gap="3" wrap="wrap" fontSize="11.5px" color="#94A3B8">
                        <HStack gap="1">
                          <MapPinIcon size={12} color="#149191" />
                          <Text>{activeEvent.venue}</Text>
                        </HStack>
                        {activeEvent.timeDisplay && (
                          <HStack gap="1">
                            <ClockIcon size={12} color="#149191" />
                            <Text>{activeEvent.timeDisplay}</Text>
                          </HStack>
                        )}
                      </HStack>
                    </VStack>
                  </HStack>

                  {/* Explore Event Link / Indicator */}
                  <HStack
                    gap="1"
                    color="#38BDF8"
                    _hover={{ color: "#7DD3FC" }}
                    transition="all 0.2s"
                    flexShrink={0}
                    alignSelf={{ base: "flex-end", sm: "center" }}
                  >
                    <Text fontSize="12.5px" fontWeight="700">
                      Explore Event
                    </Text>
                    <ArrowRightIcon size={13} color="#38BDF8" />
                  </HStack>
                </Flex>
              </Box>

              {/* Action Buttons Row */}
              <Flex
                direction={{ base: "column", sm: "row" }}
                gap={{ base: "2.5", sm: "3" }}
                w={{ base: "100%", sm: "auto" }}
                pt="0.5"
              >
                {/* Primary Emerald Green Button */}
                <Button
                  onClick={scrollToCalendar}
                  h="42px"
                  px="5"
                  bg="#059669"
                  color="#FFFFFF"
                  borderRadius="xl"
                  fontWeight="700"
                  fontSize="13.5px"
                  boxShadow="0 4px 14px -2px rgba(5, 150, 105, 0.4)"
                  transition="all 0.2s ease"
                  _hover={{
                    bg: "#047857",
                  }}
                  _active={{ transform: "scale(0.98)" }}
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  gap="2"
                  w={{ base: "100%", sm: "auto" }}
                >
                  <CalendarIcon size={16} color="#FFFFFF" />
                  <Text>Explore 2026 Calendar</Text>
                </Button>

                {/* Secondary Dark Navy Button */}
                <Button
                  onClick={onOpenWatchPartyModal}
                  h="42px"
                  px="5"
                  bg="rgba(255, 255, 255, 0.08)"
                  color="#FFFFFF"
                  border="1px solid"
                  borderColor="rgba(255, 255, 255, 0.18)"
                  borderRadius="xl"
                  fontWeight="600"
                  fontSize="13.5px"
                  transition="all 0.2s ease"
                  _hover={{
                    bg: "rgba(255, 255, 255, 0.14)",
                    borderColor: "rgba(255, 255, 255, 0.28)",
                  }}
                  _active={{ transform: "scale(0.98)" }}
                  w={{ base: "100%", sm: "auto" }}
                >
                  Host a Regional Watch Party
                </Button>
              </Flex>

              {/* Tertiary Link: Register as Delegate */}
              <Box
                as="button"
                onClick={() => onOpenRegisterModal?.(activeEvent)}
                cursor="pointer"
                display="inline-flex"
                alignItems="center"
                gap="1"
                color="#94A3B8"
                fontSize="12.5px"
                fontWeight="600"
                transition="all 0.2s"
                _hover={{
                  color: "#34D399",
                }}
                textAlign="left"
              >
                <Text>{activeEvent.registrationBtnText || "Register as Delegate"}</Text>
                <ArrowRightIcon size={12} color="currentColor" />
              </Box>
            </VStack>
          </Box>

          {/* RIGHT COLUMN: Height matches the left header ('the gathering ground') column */}
          <Box
            flex={{ base: "1", lg: "0.85" }}
            w="100%"
            maxW={{ base: "100%", lg: "460px" }}
            position="relative"
            mx={{ base: "auto", lg: "0" }}
            display="flex"
            flexDirection="column"
          >
            {/* Visual Frame - Strictly equal height to the left header */}
            <Box
              position="relative"
              w="100%"
              h="100%"
              minH={{ base: "280px", sm: "320px", md: "350px", lg: "100%" }}
              flex="1"
              borderRadius="2xl"
              overflow="hidden"
              boxShadow="0 20px 45px -10px rgba(0, 0, 0, 0.7)"
              border="1px solid rgba(255, 255, 255, 0.12)"
              bg="#0B132B"
            >
              {/* Dynamic Photograph with curated fallback */}
              <Image
                src={activeEvent.bannerImageUrl || "/images/events-hero-clean.jpg"}
                alt={activeEvent.title ? `${activeEvent.title} - I IMPACT INITIATIVE` : "Keynote Speaker at African Youth Leadership Summit - I IMPACT INITIATIVE"}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 460px"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />

              {/* Subtle Gradient Vignette */}
              <Box
                position="absolute"
                inset="0"
                bg="linear-gradient(180deg, rgba(6, 11, 25, 0.05) 0%, rgba(6, 11, 25, 0.45) 100%)"
                pointerEvents="none"
              />

              {/* Compact Floating Metric Card Overlay */}
              <Box
                position="absolute"
                bottom="3"
                right="3"
                left={{ base: "3", sm: "auto" }}
                maxW={{ sm: "320px" }}
                bg="#FFFFFF"
                borderRadius="xl"
                p="3"
                boxShadow="0 15px 30px -8px rgba(0, 0, 0, 0.45)"
              >
                <Flex align="center" justify="space-between" gap="2.5">
                  <VStack align="flex-start" gap="0.5" flex="1">
                    {/* Live Broadcast Indicator */}
                    <HStack gap="1.5">
                      <Box
                        w="6px"
                        h="6px"
                        borderRadius="full"
                        bg="#10B981"
                      />
                      <Text
                        fontSize="9px"
                        fontWeight="800"
                        color="#059669"
                        letterSpacing="0.06em"
                        textTransform="uppercase"
                      >
                        LIVE BROADCAST READY
                      </Text>
                    </HStack>

                    {/* Metric Headline - Data-driven with fallback */}
                    <Text
                      fontSize={{ base: "14.5px", sm: "15.5px" }}
                      fontWeight="800"
                      color="#0F172A"
                      lineHeight="1.2"
                    >
                      {activeEvent.attendeeBadge || "Over 120,000 Teens Reached"}
                    </Text>

                    {/* Subtext */}
                    <Text fontSize="11px" color="#64748B" fontWeight="500">
                      {activeEvent.attendeeBadge ? "Across In-Person & Hybrid Centers" : "Since inception across West & East Africa"}
                    </Text>
                  </VStack>

                  {/* Ribbon Badge Award Icon */}
                  <Box
                    w="34px"
                    h="34px"
                    borderRadius="lg"
                    bg="rgba(16, 185, 129, 0.12)"
                    border="1px solid rgba(16, 185, 129, 0.25)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="#059669"
                    flexShrink={0}
                  >
                    <RibbonBadgeIcon size={18} color="#059669" />
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
