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
} from "../icons"

export function ConferenceBanner() {
  // Target Conference Date: November 15, 2025
  // We compute real active countdown time
  const [timeLeft, setTimeLeft] = useState({
    days: 64,
    hours: 18,
    minutes: 25,
    seconds: 34,
  })

  useEffect(() => {
    // Conference target timestamp
    const targetDate = new Date("2025-11-15T09:00:00Z").getTime()

    const updateTimer = () => {
      const now = new Date().getTime()
      let diff = targetDate - now

      // If difference is non-positive or in past relative to current clock,
      // calculate an active countdown simulating days to the next edition
      if (diff <= 0) {
        // Active simulation counting down continuously
        const cycle = 64 * 86400000 + 18 * 3600000 + 25 * 60000 + 34000
        const elapsed = (now % cycle)
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
  }, [])

  // Format 2-digit helper
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
          {/* Flagship Badge */}
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
              ANNUAL FLAGSHIP YOUTH CONGRESS
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
            AS A TEEN Conference 2025:{" "}
            <Box as="span" display={{ base: "inline", md: "block" }} color="white">
              Unleashing The Extraordinary
            </Box>
          </Heading>

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
                November 15–17, 2025
              </Text>
            </HStack>

            {/* Venue / Location */}
            <HStack gap="1.5" color="#E2E8F0">
              <MapPinIcon size={14} color="#10B981" />
              <Text fontSize={{ base: "12px", sm: "12.5px" }} fontWeight="600">
                Landmark Centre, Lagos & Virtual Worldwide
              </Text>
            </HStack>

            {/* Registered Attendees */}
            <HStack gap="1.5" color="#E2E8F0">
              <UsersIcon size={14} color="#10B981" />
              <Text fontSize={{ base: "12px", sm: "12.5px" }} fontWeight="600">
                2,500+ Registered Teens
              </Text>
            </HStack>
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
            <Link href="/programs">
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
                Register Free Now
              </Button>
            </Link>

            {/* View Agenda Button */}
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
                View Conference Agenda
              </Button>
            </Link>
          </HStack>
        </VStack>
      </Flex>
    </Box>
  )
}
