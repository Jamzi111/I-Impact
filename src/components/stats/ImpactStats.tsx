"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react"
import {
  UsersIcon,
  TrophyIcon,
  MapPinIcon,
  HeartHandshakeIcon,
  CalendarIcon,
} from "@/components/icons"

interface StatItem {
  id: string
  targetNumber: number
  suffix: string
  label: string
  description: string
  icon: React.ReactNode
  iconBg: string
  iconColor: string
}

const STATS_DATA: StatItem[] = [
  {
    id: "youth",
    targetNumber: 10000,
    suffix: "+",
    label: "YOUTH REACHED",
    description: "Across 6 geopolitical zones in Nigeria",
    icon: <UsersIcon size={18} />,
    iconBg: "rgba(5, 27, 100, 0.08)",
    iconColor: "#051B64",
  },
  {
    id: "bootcamps",
    targetNumber: 50,
    suffix: "+",
    label: "BOOTCAMPS",
    description: "Intensive leadership and digital sprints",
    icon: <TrophyIcon size={18} />,
    iconBg: "rgba(245, 158, 11, 0.12)",
    iconColor: "#D97706",
  },
  {
    id: "communities",
    targetNumber: 20,
    suffix: "+",
    label: "COMMUNITIES",
    description: "Underserved districts served via relief",
    icon: <MapPinIcon size={18} />,
    iconBg: "rgba(20, 145, 145, 0.12)",
    iconColor: "#149191",
  },
  {
    id: "mentors",
    targetNumber: 150,
    suffix: "+",
    label: "MENTORS",
    description: "Industry executives and verified allies",
    icon: <HeartHandshakeIcon size={18} />,
    iconBg: "rgba(99, 102, 241, 0.12)",
    iconColor: "#4F46E5",
  },
  {
    id: "hours",
    targetNumber: 1200,
    suffix: "+",
    label: "1-ON-1 HOURS",
    description: "Dedicated coaching & career guidance",
    icon: <CalendarIcon size={18} />,
    iconBg: "rgba(16, 185, 129, 0.12)",
    iconColor: "#059669",
  },
]

function StatCounterCard({
  stat,
  isTriggered,
  index,
}: {
  stat: StatItem
  isTriggered: boolean
  index: number
}) {
  const [currentCount, setCurrentCount] = useState(0)

  useEffect(() => {
    // If out of view, reset counter to 0 so it re-runs when scrolled back into view
    if (!isTriggered) {
      setCurrentCount(0)
      return
    }

    let startTime: number | null = null
    const duration = 1800 // 1.8 seconds smooth animation
    let animationFrameId: number

    // Ease Out Cubic curve: fast initial acceleration, gentle deceleration
    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3)
    }

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(progress)
      const value = Math.floor(easedProgress * stat.targetNumber)

      setCurrentCount(value)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setCurrentCount(stat.targetNumber)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isTriggered, stat.targetNumber])

  return (
    <Box
      bg="#F4F8FE"
      borderRadius={{ base: "16px", md: "20px" }}
      border="1px solid"
      borderColor="rgba(5, 27, 100, 0.06)"
      py={{ base: "6", md: "7" }}
      px={{ base: "4", sm: "4.5", md: "5" }}
      textAlign="center"
      position="relative"
      transition="all 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
      style={{
        opacity: isTriggered ? 1 : 0,
        transform: isTriggered ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s, box-shadow 0.3s ease, border-color 0.3s ease`,
      }}
      _hover={{
        transform: "translateY(-6px)",
        boxShadow: "0 18px 36px -10px rgba(5, 27, 100, 0.12)",
        borderColor: "rgba(20, 145, 145, 0.35)",
        bg: "#FFFFFF",
      }}
    >
      <VStack gap="2" align="center">
        {/* Icon Pill */}
        <Box
          p="2.5"
          borderRadius="12px"
          bg={stat.iconBg}
          color={stat.iconColor}
          display="flex"
          alignItems="center"
          justifyContent="center"
          transition="transform 0.3s ease"
          _hover={{ transform: "scale(1.1) rotate(5deg)" }}
        >
          {stat.icon}
        </Box>

        {/* Count Number */}
        <Heading
          as="h3"
          fontSize={{ base: "28px", sm: "30px", md: "32px", lg: "30px", xl: "34px" }}
          fontWeight="900"
          color="#051B64"
          lineHeight="1.1"
          letterSpacing="-0.025em"
          fontVariantNumeric="tabular-nums"
        >
          {currentCount.toLocaleString()}
          <Box as="span" color="#149191">
            {stat.suffix}
          </Box>
        </Heading>

        {/* Green / Teal Label */}
        <Text
          fontSize={{ base: "10.5px", sm: "11px" }}
          fontWeight="800"
          color="#149191"
          letterSpacing="0.08em"
          textTransform="uppercase"
          lineHeight="1.2"
        >
          {stat.label}
        </Text>

        {/* Description */}
        <Text
          fontSize={{ base: "11.5px", sm: "12px" }}
          color="#4B5563"
          lineHeight="1.45"
          maxW="190px"
          mx="auto"
        >
          {stat.description}
        </Text>
      </VStack>
    </Box>
  )
}

export function ImpactStats() {
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        } else {
          setInView(false)
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
      observer.disconnect()
    }
  }, [])

  return (
    <Box
      as="section"
      id="impact-stats"
      ref={sectionRef}
      pt={{ base: "4", sm: "6", md: "8" }}
      pb={{ base: "10", sm: "12", md: "14", lg: "16" }}
      bg="white"
      position="relative"
    >
      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1160px", xl: "1240px" }}
        px={{ base: "4", sm: "6", md: "8" }}
      >
        {/* Header Title Section */}
        <VStack
          gap="2"
          textAlign="center"
          mb={{ base: "6", md: "8" }}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <Text
            fontSize={{ base: "11px", md: "12px" }}
            fontWeight="800"
            color="#149191"
            letterSpacing="0.1em"
            textTransform="uppercase"
          >
            VERIFIABLE REACH
          </Text>

          <Heading
            as="h2"
            fontSize={{ base: "14px", sm: "15px", md: "17px", lg: "19px" }}
            fontWeight="800"
            color="#051B64"
            letterSpacing="-0.015em"
            lineHeight="1.35"
            maxW="720px"
            mx="auto"
          >
            We have numbers that push us to give our best and make sure we break our own records. We are happy to be growing and helping more day by day.
          </Heading>
        </VStack>

        {/* 5-Column Stats Grid with Staggered Animations */}
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 5 }}
          gap={{ base: "4", sm: "4.5", md: "5", lg: "4", xl: "4.5" }}
        >
          {STATS_DATA.map((stat, idx) => (
            <StatCounterCard
              key={stat.id}
              stat={stat}
              isTriggered={inView}
              index={idx}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

