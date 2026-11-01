"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  HStack,
  SimpleGrid,
  Button,
} from "@chakra-ui/react"
import Image from "next/image"
import {
  TrendingUpIcon,
  ShieldIcon,
  LockIcon,
  BarChartSquareIcon,
  FileTextIcon,
  CheckIcon,
} from "@/components/icons"
import { LiveDot } from "@/components/LiveDot"
import { ReportDownloadModal } from "./ReportDownloadModal"

interface AnimatedMetricProps {
  target: number
  suffix: string
  label: string
  isTriggered: boolean
  duration?: number
}

function AnimatedMetric({
  target,
  suffix,
  label,
  isTriggered,
  duration = 1200,
}: AnimatedMetricProps) {
  const [count, setCount] = useState(0)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    if (!isTriggered || hasAnimatedRef.current) return

    // Respect accessibility: immediately display target if prefers-reduced-motion is active
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setCount(target)
      hasAnimatedRef.current = true
      return
    }

    hasAnimatedRef.current = true
    let startTime: number | null = null
    let animationFrameId: number

    // Ease Out Cubic: smooth start, gentle and natural deceleration
    const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3)

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutCubic(progress)
      const val = Math.floor(eased * target)

      setCount(val)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [isTriggered, target, duration])

  const formattedValue = isTriggered
    ? count.toLocaleString() + suffix
    : "0" + suffix

  return (
    <Box
      bg="#F1F5F9"
      borderRadius="12px"
      py="3"
      px="2"
      textAlign="center"
      transition="all 0.25s ease"
      _hover={{
        bg: "#E2E8F0",
        transform: "translateY(-2px)",
      }}
    >
      <Text
        fontSize={{ base: "17px", sm: "19px", md: "21px" }}
        fontWeight="800"
        color="#0F172A"
        lineHeight="1.1"
      >
        {formattedValue}
      </Text>
      <Text
        fontSize={{ base: "9px", sm: "10px" }}
        fontWeight="700"
        color="#64748B"
        letterSpacing="0.05em"
        textTransform="uppercase"
        mt="1"
      >
        {label}
      </Text>
    </Box>
  )
}

export function ImpactHero() {
  const [isReportOpen, setIsReportOpen] = useState(false)
  const [inView, setInView] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check reduced motion preference
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
      setPrefersReducedMotion(mediaQuery.matches)
      const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
      mediaQuery.addEventListener("change", handleChange)

      // Observe section entry to trigger entrance animation once
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true)
          }
        },
        { threshold: 0.08 }
      )

      if (heroRef.current) {
        observer.observe(heroRef.current)
      }

      // Fallback trigger in case observer doesn't fire immediately at top of page
      const timer = setTimeout(() => setInView(true), 50)

      return () => {
        mediaQuery.removeEventListener("change", handleChange)
        observer.disconnect()
        clearTimeout(timer)
      }
    }
  }, [])

  const handleScrollToExplorer = () => {
    const explorerEl = document.getElementById("impact-explorer")
    if (explorerEl) {
      explorerEl.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Helper for subtle, dignified entrance animations
  const getTransitionStyle = (delayMs: number = 0, durationMs: number = 450) => {
    if (prefersReducedMotion) {
      return {
        opacity: 1,
        transform: "none",
        transition: "none",
      }
    }
    return {
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(14px)",
      transition: `opacity ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
    }
  }

  return (
    <>
      <Box
        ref={heroRef}
        as="section"
        position="relative"
        overflow="hidden"
        overflowX="hidden"
        w="100%"
        maxW="100%"
        bg="#FBFBFC"
        pt={{ base: "118px", sm: "112px", md: "104px", lg: "112px" }}
        pb={{ base: "14", md: "18", lg: "22" }}
        borderBottom="1px solid"
        borderColor="rgba(15, 23, 42, 0.06)"
      >
        {/* Subtle Ambient Background Gradients */}
        <Box
          position="absolute"
          top="-8%"
          right="-5%"
          w={{ base: "300px", md: "560px" }}
          h={{ base: "300px", md: "560px" }}
          bg="radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0) 70%)"
          filter="blur(60px)"
          pointerEvents="none"
          zIndex={0}
        />
        <Box
          position="absolute"
          top="15%"
          left="-8%"
          w={{ base: "280px", md: "500px" }}
          h={{ base: "280px", md: "500px" }}
          bg="radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, rgba(99, 102, 241, 0) 70%)"
          filter="blur(60px)"
          pointerEvents="none"
          zIndex={0}
        />

        <Container
          maxW="1360px"
          px={{ base: "4", sm: "6", md: "8", lg: "10" }}
          position="relative"
          zIndex={1}
        >
          <Flex
            direction={{ base: "column", lg: "row" }}
            align={{ base: "stretch", lg: "flex-start" }}
            justify="space-between"
            gap={{ base: "12", lg: "10", xl: "14" }}
          >
            {/* ===================== LEFT COLUMN ===================== */}
            <Box flex={{ base: "1", lg: "1.15" }} maxW={{ lg: "640px", xl: "680px" }}>
              {/* 1. Eyebrow Pill */}
              <Box mb={{ base: "4", md: "5" }} style={getTransitionStyle(0, 400)}>
                <Box
                  display="inline-flex"
                  alignItems="center"
                  gap="2.5"
                  bg="#051B64"
                  borderRadius="full"
                  px="3.5"
                  py="1.5"
                  boxShadow="0 2px 8px rgba(5, 27, 100, 0.18)"
                >
                  <Box color="#34D399" display="flex" alignItems="center">
                    <BarChartSquareIcon size={14} />
                  </Box>
                  <Text
                    fontSize="11px"
                    fontWeight="700"
                    color="#E2E8F0"
                    letterSpacing="0.08em"
                    textTransform="uppercase"
                  >
                    OUR IMPACT · MEASURING WHAT MATTERS
                  </Text>
                </Box>
              </Box>

              {/* 2. Main Heading (Gentle fade-in + slight upward movement) */}
              <Box style={getTransitionStyle(80, 450)}>
                <Heading
                  as="h1"
                  fontSize={{ base: "26px", sm: "32px", md: "38px", lg: "42px", xl: "46px" }}
                  fontWeight="900"
                  lineHeight="1.15"
                  letterSpacing="-0.03em"
                  mb={{ base: "5", md: "6" }}
                >
                  <Box as="span" display="block" color="#0F172A">
                    Measuring Progress.
                  </Box>
                  <Box as="span" display="block" color="#059669">
                    Creating Opportunities.
                  </Box>
                  <Box as="span" display="block" color="#0F172A">
                    Raising Champions.
                  </Box>
                </Heading>
              </Box>

              {/* 3. Subparagraph (Fade-in shortly after heading) */}
              <Box style={getTransitionStyle(160, 450)}>
                <Text
                  fontSize={{ base: "15px", sm: "16px", md: "17px" }}
                  lineHeight="1.68"
                  color="#475569"
                  maxW="590px"
                  mb={{ base: "7", md: "8" }}
                >
                  We believe impact goes beyond numbers. It&apos;s about young people gaining confidence, developing practical skills, discovering their potential, and becoming champions who create positive change in their communities.
                </Text>
              </Box>

              {/* 4. Action Buttons (Subtle hover lift) */}
              <Box mb={{ base: "8", md: "9" }} style={getTransitionStyle(240, 450)} w="100%">
                <Flex
                  direction={{ base: "column", sm: "row" }}
                  align={{ base: "stretch", sm: "center" }}
                  gap="3.5"
                  w={{ base: "100%", sm: "auto" }}
                >
                  {/* Primary CTA: Explore Our Results */}
                  <Button
                    onClick={handleScrollToExplorer}
                    bg="#047857"
                    color="#FFFFFF"
                    px="5"
                    py="3.5"
                    h="auto"
                    w={{ base: "100%", sm: "auto" }}
                    justifyContent="center"
                    fontSize="14px"
                    fontWeight="700"
                    borderRadius="10px"
                    boxShadow="0 4px 14px rgba(4, 120, 87, 0.25)"
                    _hover={{
                      bg: "#065F46",
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 18px rgba(4, 120, 87, 0.32)",
                    }}
                    _active={{
                      transform: "translateY(0)",
                    }}
                    transition="all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                    display="inline-flex"
                    alignItems="center"
                    gap="2.5"
                  >
                    <TrendingUpIcon size={17} color="#FFFFFF" />
                    Explore Our Results
                  </Button>

                  {/* Secondary CTA: Explore Our Impact Report */}
                  <Button
                    onClick={() => setIsReportOpen(true)}
                    bg="#0B0F2A"
                    color="#FFFFFF"
                    px="5"
                    py="3.5"
                    h="auto"
                    w={{ base: "100%", sm: "auto" }}
                    justifyContent="center"
                    fontSize="14px"
                    fontWeight="700"
                    borderRadius="10px"
                    boxShadow="0 4px 14px rgba(11, 15, 42, 0.2)"
                    _hover={{
                      bg: "#181E48",
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 18px rgba(11, 15, 42, 0.28)",
                    }}
                    _active={{
                      transform: "translateY(0)",
                    }}
                    transition="all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                    display="inline-flex"
                    alignItems="center"
                    gap="2.5"
                  >
                    <FileTextIcon size={16} color="#FFFFFF" />
                    Explore Our Impact Report
                  </Button>
                </Flex>
              </Box>

              {/* 5. Trust Badges Bar (Subtle fade-in) */}
              <Box
                style={getTransitionStyle(320, 500)}
                bg="#FFFFFF"
                borderRadius="16px"
                border="1px solid"
                borderColor="#E2E8F0"
                py="3.5"
                px={{ base: "3.5", sm: "4.5" }}
                boxShadow="0 4px 16px -4px rgba(15, 23, 42, 0.05)"
              >
                <SimpleGrid columns={{ base: 2, sm: 2 }} gap={{ base: "3", sm: "4" }} alignItems="center">
                  {/* Trust Badge 1 - Safeguarding */}
                  <Flex align="center" gap={{ base: "2.5", sm: "3" }}>
                    <Box
                      w={{ base: "32px", sm: "36px" }}
                      h={{ base: "32px", sm: "36px" }}
                      borderRadius="full"
                      bg="#EDE9FE"
                      color="#7C3AED"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <ShieldIcon size={17} color="#7C3AED" />
                    </Box>
                    <Box minW={0}>
                      <Text
                        fontSize={{ base: "12px", sm: "13px" }}
                        fontWeight="800"
                        color="#0F172A"
                        lineHeight="1.2"
                      >
                        Safeguarding
                      </Text>
                      <Text
                        fontSize={{ base: "10px", sm: "11px" }}
                        color="#64748B"
                        lineHeight="1.2"
                        mt="0.5"
                      >
                        Our commitment to safety
                      </Text>
                    </Box>
                  </Flex>

                  {/* Trust Badge 2 - Transparency */}
                  <Flex align="center" gap={{ base: "2.5", sm: "3" }}>
                    <Box
                      w={{ base: "32px", sm: "36px" }}
                      h={{ base: "32px", sm: "36px" }}
                      borderRadius="full"
                      bg="#ECFDF5"
                      color="#047857"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <CheckIcon size={17} color="#047857" />
                    </Box>
                    <Box minW={0}>
                      <Text
                        fontSize={{ base: "12px", sm: "13px" }}
                        fontWeight="800"
                        color="#0F172A"
                        lineHeight="1.2"
                      >
                        Transparency
                      </Text>
                      <Text
                        fontSize={{ base: "10px", sm: "11px" }}
                        color="#64748B"
                        lineHeight="1.2"
                        mt="0.5"
                      >
                        Accountability in our work
                      </Text>
                    </Box>
                  </Flex>
                </SimpleGrid>
              </Box>
            </Box>

            {/* ===================== RIGHT COLUMN ===================== */}
            <Box
              flex={{ base: "1", lg: "0.95" }}
              maxW={{ lg: "520px", xl: "540px" }}
              w="100%"
              style={getTransitionStyle(120, 500)}
            >
              {/* Outer Card with Top Gradient Border */}
              <Box
                position="relative"
                bg="#FFFFFF"
                borderRadius="24px"
                border="1px solid"
                borderColor="rgba(226, 232, 240, 0.95)"
                boxShadow="0 20px 45px -12px rgba(15, 23, 42, 0.12), 0 0 1px rgba(15, 23, 42, 0.08)"
                overflow="hidden"
                p={{ base: "3", sm: "4" }}
                transition="box-shadow 0.3s ease, transform 0.3s ease"
                _hover={{
                  boxShadow: "0 25px 55px -12px rgba(15, 23, 42, 0.16)",
                  transform: "translateY(-2px)",
                }}
              >
                {/* Top Gradient Accent Bar */}
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  h="4px"
                  bg="linear-gradient(90deg, #10B981 0%, #06B6D4 50%, #6366F1 100%)"
                />

                {/* Inner Image Section */}
                <Box
                  position="relative"
                  w="100%"
                  h={{ base: "240px", sm: "280px", md: "310px" }}
                  borderRadius="16px"
                  overflow="hidden"
                  bg="#0B132B"
                >
                  <Image
                    src="/Collaborative-Tech-Lab-Learning.png"
                    alt="Collaborative Tech Lab Learning - Young Innovators Building Tomorrow"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 540px"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center 20%",
                    }}
                  />

                  {/* Dark Vignette / Contrast Gradient */}
                  <Box
                    position="absolute"
                    inset="0"
                    bg="linear-gradient(180deg, rgba(15, 23, 42, 0) 30%, rgba(15, 23, 42, 0.85) 75%, rgba(15, 23, 42, 0.96) 100%)"
                    pointerEvents="none"
                  />

                  {/* Overlay Sensor Badge & Title */}
                  <Box
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    p={{ base: "4", sm: "4.5" }}
                    zIndex={2}
                  >
                    {/* Living Work in Action Badge */}
                    <HStack gap="2" mb="1.5">
                      <LiveDot color="#34D399" size={7} />
                      <Text
                        fontSize="11px"
                        fontWeight="800"
                        color="#34D399"
                        letterSpacing="0.06em"
                        textTransform="uppercase"
                      >
                        OUR WORK IN ACTION
                      </Text>
                    </HStack>

                    {/* Image Title */}
                    <Heading
                      as="h3"
                      fontSize={{ base: "17px", sm: "19px", md: "20px" }}
                      fontWeight="800"
                      color="#FFFFFF"
                      lineHeight="1.25"
                      mb="1"
                    >
                      Young Innovators Building Tomorrow
                    </Heading>

                    {/* Subtitle */}
                    <Text fontSize="12px" color="rgba(255, 255, 255, 0.85)" fontWeight="500">
                      Real programs. Real experiences. Meaningful progress.
                    </Text>
                  </Box>
                </Box>

                {/* Metrics 3-Column Row (Count-up once on enter) */}
                <Box mt="3.5">
                  <SimpleGrid columns={3} gap="2">
                    <AnimatedMetric
                      target={10000}
                      suffix="+"
                      label="YOUNG PEOPLE REACHED"
                      isTriggered={inView}
                    />
                    <AnimatedMetric
                      target={1200}
                      suffix="+h"
                      label="MENTORSHIP DELIVERED"
                      isTriggered={inView}
                    />
                    <AnimatedMetric
                      target={100}
                      suffix="%"
                      label="DIRECT PRACTICE"
                      isTriggered={inView}
                    />
                  </SimpleGrid>
                </Box>

                {/* Card Subtle Footer */}
                <Box
                  mt="3"
                  pt="2.5"
                  borderTop="1px solid"
                  borderColor="#F1F5F9"
                  bg="#FFFFFF"
                >
                  <Flex justify="space-between" align="center" wrap="wrap" gap="2">
                    <HStack gap="1.5">
                      <Box w="6px" h="6px" borderRadius="full" bg="#059669" />
                      <Text fontSize="11px" color="#64748B" fontWeight="600">
                        Reporting Period: 2025–2026
                      </Text>
                    </HStack>
                    <Text fontSize="11px" color="#059669" fontWeight="700">
                      Verified Community Outcomes
                    </Text>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Report Modal */}
      <ReportDownloadModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
    </>
  )
}
