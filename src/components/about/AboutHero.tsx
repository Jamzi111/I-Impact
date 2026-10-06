"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  HStack,
  VStack,
} from "@chakra-ui/react"
import Image from "next/image"
import {
  UsersIcon,
  TrophyIcon,
  MapPinIcon,
  HeartHandshakeIcon,
  SparklesIcon,
} from "@/components/icons"

interface StatMetric {
  targetNumber: number
  suffix: string
  label: string
  sublabel: string
  icon: React.ReactNode
  accentColor: string
}

const STAT_METRICS: StatMetric[] = [
  {
    targetNumber: 10000,
    suffix: "+",
    label: "Youth Champions",
    sublabel: "Mentored & equipped directly",
    icon: <UsersIcon size={18} color="#051B64" />,
    accentColor: "#051B64",
  },
  {
    targetNumber: 1240,
    suffix: "+",
    label: "Vetted Mentors",
    sublabel: "Active champions, tech founders & advisors",
    icon: <SparklesIcon size={18} color="#059669" />,
    accentColor: "#059669",
  },
  {
    targetNumber: 6,
    suffix: " Zones",
    label: "Geopolitical Reach",
    sublabel: "Nigeria & growing Pan-African hubs",
    icon: <MapPinIcon size={18} color="#149191" />,
    accentColor: "#149191",
  },
  {
    targetNumber: 100,
    suffix: "%",
    label: "Direct Practice",
    sublabel: "Hands-on grassroots impact",
    icon: <HeartHandshakeIcon size={18} color="#D97706" />,
    accentColor: "#D97706",
  },
]

function AnimatedStatCard({
  metric,
  isTriggered,
  index,
}: {
  metric: StatMetric
  isTriggered: boolean
  index: number
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Whenever out of view, reset to 0 so it animates again when scrolled into view
    if (!isTriggered) {
      setCount(0)
      return
    }

    let startTime: number | null = null
    const duration = 1600 + index * 100
    let animationFrameId: number

    // Ease Out Cubic for ultra-smooth counting acceleration and soft deceleration
    const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3)

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutCubic(progress)
      const val = Math.floor(eased * metric.targetNumber)

      setCount(val)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setCount(metric.targetNumber)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [isTriggered, metric.targetNumber, index])

  const formattedValue = count.toLocaleString() + metric.suffix

  return (
    <Box
      bg="#FFFFFF"
      p={{ base: "3.5", md: "4" }}
      borderRadius="16px"
      border="1px solid"
      borderColor="rgba(5, 27, 100, 0.08)"
      boxShadow="0 4px 16px -3px rgba(5, 27, 100, 0.04)"
      position="relative"
      style={{
        opacity: isTriggered ? 1 : 0.4,
        transform: isTriggered ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s, box-shadow 0.25s ease, border-color 0.25s ease`,
      }}
      _hover={{
        transform: "translateY(-3px)",
        boxShadow: "0 12px 28px -4px rgba(5, 27, 100, 0.09)",
        borderColor: "rgba(20, 145, 145, 0.35)",
      }}
    >
      {/* Top Row: Metric Number on Left, Icon Badge on Top Right */}
      <Flex justify="space-between" align="flex-start" mb="1" w="100%">
        <Heading
          as="h4"
          fontSize={{ base: "20px", sm: "22px", md: "23px" }}
          fontWeight="900"
          color="#051B64"
          lineHeight="1"
          letterSpacing="-0.03em"
          fontVariantNumeric="tabular-nums"
        >
          {formattedValue}
        </Heading>

        <Box
          p="1.5"
          borderRadius="8px"
          bg={`${metric.accentColor}12`}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
          transition="transform 0.2s ease"
          _hover={{ transform: "scale(1.08)" }}
        >
          {metric.icon}
        </Box>
      </Flex>

      {/* Bottom Row: Label and Sublabel */}
      <VStack align="flex-start" gap="0.5" mt="0">
        <Text fontSize="12px" fontWeight="800" color="#051B64" lineHeight="1.15">
          {metric.label}
        </Text>
        <Text fontSize="10.5px" color="#64748B" lineHeight="1.3">
          {metric.sublabel}
        </Text>
      </VStack>
    </Box>
  )
}

export function AboutHero() {
  const [inView, setInView] = useState(false)
  const [isStatsInView, setIsStatsInView] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hero section general visibility
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.1 }
    )

    if (heroRef.current) heroObserver.observe(heroRef.current)
    setInView(true)

    // Dedicated stats scroll observer that resets and recounts anytime scrolled into view
    const statsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatsInView(true)
        } else {
          setIsStatsInView(false)
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -20px 0px",
      }
    )

    const currentStats = statsRef.current
    if (currentStats) {
      statsObserver.observe(currentStats)
    }

    return () => {
      if (heroRef.current) heroObserver.unobserve(heroRef.current)
      if (currentStats) statsObserver.unobserve(currentStats)
      heroObserver.disconnect()
      statsObserver.disconnect()
    }
  }, [])

  return (
    <Box
      as="section"
      ref={heroRef}
      position="relative"
      overflow="hidden"
      bg="linear-gradient(180deg, #F4F8FE 0%, #F8FBFF 40%, #FFFFFF 100%)"
      pt={{ base: "20", sm: "22", md: "24", lg: "26" }}
      pb={{ base: "10", md: "14", lg: "16" }}
    >
      {/* Background ambient lighting */}
      <Box
        position="absolute"
        top="-10%"
        left="-5%"
        w={{ base: "400px", md: "650px" }}
        h={{ base: "350px", md: "500px" }}
        bg="radial-gradient(ellipse at center, rgba(20, 145, 145, 0.12) 0%, rgba(5, 27, 100, 0.04) 50%, transparent 75%)"
        filter="blur(70px)"
        pointerEvents="none"
        className="animate-pulse-glow"
      />

      <Container maxW="1280px" px={{ base: "4", sm: "6", md: "8", lg: "10" }} position="relative" zIndex={1}>
        {/* Left-Aligned Header with Staggered Entrance Animations */}
        <VStack
          align="flex-start"
          textAlign="left"
          gap={{ base: "2.5", md: "3" }}
          mb={{ base: "6", md: "7" }}
          maxW="920px"
        >
          {/* Eyebrow Badge */}
          <Box
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
          >
            <HStack
              bg="rgba(245, 158, 11, 0.12)"
              border="1px solid rgba(245, 158, 11, 0.3)"
              px="3"
              py="1"
              borderRadius="full"
              gap="1.5"
              boxShadow="0 2px 6px rgba(245, 158, 11, 0.08)"
            >
              <Box color="#B45309" display="flex" alignItems="center">
                <TrophyIcon size={13} />
              </Box>
              <Text
                fontSize={{ base: "9px", sm: "10px" }}
                fontWeight="800"
                color="#B45309"
                letterSpacing="0.06em"
                textTransform="uppercase"
              >
                OUR PURPOSE & CONVICTION • ACCREDITED YOUTH DEVELOPMENT INITIATIVE
              </Text>
            </HStack>
          </Box>

          {/* Main Hero Headline with Animated Shimmer on Tagline */}
          <Box
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}
          >
            <Heading
              as="h1"
              fontSize={{ base: "24px", sm: "28px", md: "34px", lg: "38px" }}
              fontWeight="900"
              color="#051B64"
              lineHeight={{ base: "1.22", md: "1.2" }}
              letterSpacing="-0.025em"
            >
              Nurturing Purpose. Equipping Leaders.{" "}
              <Box
                as="span"
                display={{ base: "inline", sm: "inline-block" }}
                className="animate-text-shimmer"
                fontWeight="900"
              >
                Raising Champions Everyday.
              </Box>
            </Heading>
          </Box>

          {/* Lead Subtitle Writeup */}
          <Box
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
            }}
          >
            <Text
              maxW="760px"
              fontSize={{ base: "13px", sm: "13.5px", md: "14.5px" }}
              color="#4B5563"
              lineHeight="1.6"
              fontWeight="450"
            >
              Founded on the unyielding belief that every African teenager possesses extraordinary latent capacity,{" "}
              <Box as="span" fontWeight="700" color="#051B64">
                I IMPACT INITIATIVE
              </Box>{" "}
              is building the continent&apos;s most trusted ecosystem for adolescent purpose discovery, ethical mentorship, tech leadership, and community transformation.
            </Text>
          </Box>
        </VStack>

        {/* Panoramic Wide Hero Image with Living Frame & Ambient Glow */}
        <Box
          position="relative"
          w="100%"
          maxW="1200px"
          mx="auto"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "scale(1) translateY(0)" : "scale(0.98) translateY(18px)",
            transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.35s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.35s",
          }}
        >
          {/* Subtle Ambient Color Aura Glow Behind Frame */}
          <Box
            position="absolute"
            inset="-10px"
            borderRadius={{ base: "26px", sm: "30px", md: "32px" }}
            bg="radial-gradient(ellipse at center, rgba(20, 145, 145, 0.3) 0%, rgba(5, 27, 100, 0.15) 70%, transparent 100%)"
            filter="blur(16px)"
            zIndex={0}
            pointerEvents="none"
          />

          {/* Main Rounded Image Container */}
          <Box
            position="relative"
            zIndex={1}
            w="100%"
            h={{ base: "220px", sm: "320px", md: "420px", lg: "500px", xl: "540px" }}
            borderRadius={{ base: "18px", sm: "22px", md: "24px" }}
            overflow="hidden"
            boxShadow="0 18px 45px -10px rgba(5, 27, 100, 0.16)"
            bg="#051B64"
            transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "0 26px 60px -12px rgba(5, 27, 100, 0.22)",
            }}
          >
            {/* Inner Image with Slow Cinematic Ken Burns Motion */}
            <Box
              position="absolute"
              inset="0"
              className="animate-ken-burns"
            >
              <Image
                src="/About-iimpact.png"
                alt="I-Impact Champions - Young leaders and mentor in a leadership and skills workshop"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 1200px"
                style={{
                  objectFit: "cover",
                  objectPosition: "center 25%",
                }}
              />
            </Box>

            {/* Subtle Gradient Vignette at the Bottom */}
            <Box
              position="absolute"
              inset="0"
              bg="linear-gradient(180deg, transparent 65%, rgba(5, 27, 100, 0.38) 100%)"
              pointerEvents="none"
              zIndex={2}
            />

            {/* Floating Live Badge on Image */}
            <Box
              position="absolute"
              bottom={{ base: "12px", sm: "16px", md: "20px" }}
              left={{ base: "12px", sm: "16px", md: "20px" }}
              zIndex={3}
              bg="rgba(5, 27, 100, 0.85)"
              backdropFilter="blur(10px)"
              border="1px solid rgba(255, 255, 255, 0.25)"
              boxShadow="0 8px 20px rgba(0, 0, 0, 0.25)"
              borderRadius="full"
              px={{ base: "3", sm: "3.5" }}
              py={{ base: "1", sm: "1.5" }}
              display="flex"
              alignItems="center"
              gap="2"
              className="animate-float-slow"
            >
              <Box
                w="7px"
                h="7px"
                borderRadius="full"
                bg="#10B981"
                className="animate-pulse-glow"
              />
              <Text
                fontSize={{ base: "10px", sm: "11.5px" }}
                fontWeight="700"
                color="#FFFFFF"
                letterSpacing="0.04em"
              >
                Mentorship & Leadership in Action
              </Text>
            </Box>
          </Box>
        </Box>

        {/* Impact Stat Cards Grid (Re-triggering Animated Counters on Scroll) */}
        <Box
          ref={statsRef}
          maxW="1200px"
          mt={{ base: "4", md: "5" }}
        >
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={{ base: "2.5", md: "3.5" }}>
            {STAT_METRICS.map((metric, idx) => (
              <AnimatedStatCard
                key={idx}
                metric={metric}
                isTriggered={isStatsInView}
                index={idx}
              />
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  )
}
