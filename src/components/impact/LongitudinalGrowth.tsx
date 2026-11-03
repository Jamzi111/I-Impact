"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  HStack,
  VStack,
} from "@chakra-ui/react"
import {
  TrendingUpIcon,
  SparklesIcon,
  CheckIcon,
  FileTextIcon,
} from "@/components/icons"
import { LiveDot } from "@/components/LiveDot"

export interface HistoricalDataPoint {
  id: string
  label: string
  cumulativeReach: number
  displayReach: string
  isMilestone?: boolean
  isPlaceholder?: boolean
  x: number
  y: number
}

// 3-Year Cumulative Growth Dataset
// Year 1 and Year 2 are illustrative design baselines.
// Year 3 anchors the confirmed 10,000+ cumulative milestone.
export const CUMULATIVE_GROWTH_DATA: HistoricalDataPoint[] = [
  {
    id: "y1",
    label: "Year 1",
    cumulativeReach: 2500,
    displayReach: "2,500",
    isPlaceholder: true,
    x: 130,
    y: 201.25,
  },
  {
    id: "y2",
    label: "Year 2",
    cumulativeReach: 6000,
    displayReach: "6,000",
    isPlaceholder: true,
    x: 390,
    y: 140,
  },
  {
    id: "y3",
    label: "Year 3",
    cumulativeReach: 10000,
    displayReach: "10,000+",
    isMilestone: true,
    isPlaceholder: false,
    x: 650,
    y: 70,
  },
]

export function LongitudinalGrowth() {
  const [inView, setInView] = useState(false)
  const [animatedCount, setAnimatedCount] = useState(0)
  const [lineDrawn, setLineDrawn] = useState(false)
  const [activePointIndex, setActivePointIndex] = useState<number>(2) // Default to Year 3 milestone
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Intersection observer & reduced motion detection
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
      setPrefersReducedMotion(mediaQuery.matches)

      const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
      mediaQuery.addEventListener("change", handleChange)

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      )

      if (sectionRef.current) {
        observer.observe(sectionRef.current)
      }

      return () => {
        mediaQuery.removeEventListener("change", handleChange)
        observer.disconnect()
      }
    }
  }, [])

  // Smooth single-run counter animation for 10,000+
  useEffect(() => {
    if (!inView) return

    if (prefersReducedMotion) {
      setAnimatedCount(10000)
      setLineDrawn(true)
      return
    }

    const lineTimer = setTimeout(() => {
      setLineDrawn(true)
    }, 150)

    let startTime: number | null = null
    const duration = 1600
    const target = 10000
    let animationFrameId: number

    const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3)

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutCubic(progress)
      const value = Math.floor(eased * target)

      setAnimatedCount(value)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setAnimatedCount(target)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      clearTimeout(lineTimer)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [inView, prefersReducedMotion])

  // Y-axis ticks across range 0 to 12K (height: 210px, y: 245 down to 35)
  const yAxisTicks = [
    { label: "12K", y: 35 },
    { label: "9K", y: 87.5 },
    { label: "6K", y: 140 },
    { label: "3K", y: 192.5 },
    { label: "0", y: 245 },
  ]

  const activePoint = CUMULATIVE_GROWTH_DATA[activePointIndex]

  return (
    <Box
      ref={sectionRef}
      id="impact-explorer"
      as="section"
      position="relative"
      py={{ base: "12", sm: "14", md: "18", lg: "22" }}
      bg="#FBFBFC"
      borderBottom="1px solid"
      borderColor="rgba(15, 23, 42, 0.06)"
      overflow="hidden"
    >
      {/* Background ambient lighting */}
      <Box
        position="absolute"
        top="5%"
        right="-5%"
        w={{ base: "260px", md: "500px" }}
        h={{ base: "260px", md: "500px" }}
        bg="radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%)"
        filter="blur(60px)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="10%"
        left="-5%"
        w={{ base: "260px", md: "460px" }}
        h={{ base: "260px", md: "460px" }}
        bg="radial-gradient(circle, rgba(5, 27, 100, 0.05) 0%, transparent 70%)"
        filter="blur(60px)"
        pointerEvents="none"
      />

      <Container
        maxW="1200px"
        px={{ base: "4", sm: "6", md: "8", lg: "10" }}
        position="relative"
        zIndex={1}
      >
        {/* ================= 1. SECTION HEADER ================= */}
        <Box maxW="780px" mb={{ base: "7", md: "10" }}>
          {/* Eyebrow Label */}
          <Box mb="2.5">
            <HStack
              display="inline-flex"
              gap="2"
              px="3.5"
              py="1.5"
              bg="#ECFDF5"
              borderRadius="full"
              border="1px solid"
              borderColor="#A7F3D0"
            >
              <Box color="#059669" display="flex" alignItems="center">
                <TrendingUpIcon size={13} />
              </Box>
              <Text
                fontSize="11px"
                fontWeight="800"
                color="#047857"
                letterSpacing="0.08em"
                textTransform="uppercase"
              >
                LONGITUDINAL GROWTH
              </Text>
            </HStack>
          </Box>

          {/* Main Heading */}
          <Heading
            as="h2"
            fontSize={{ base: "28px", sm: "34px", md: "40px", lg: "44px" }}
            fontWeight="800"
            color="#0F172A"
            lineHeight="1.2"
            letterSpacing="-0.02em"
            mb="3"
          >
            Our Impact Over Time
          </Heading>

          {/* Subheading / Lead Paragraph */}
          <Text
            fontSize={{ base: "15px", sm: "16px", md: "17px" }}
            color="#64748B"
            lineHeight="1.6"
            maxW="680px"
          >
            The growing number of young people reached since our beginning.
          </Text>
        </Box>

        {/* ================= 2. UNIFIED CUMULATIVE GROWTH CARD ================= */}
        <Box
          position="relative"
          bg="#FFFFFF"
          borderRadius="24px"
          border="1px solid"
          borderColor="rgba(226, 232, 240, 0.95)"
          boxShadow="0 20px 45px -12px rgba(15, 23, 42, 0.08), 0 0 1px rgba(15, 23, 42, 0.05)"
          p={{ base: "4", sm: "6", md: "8" }}
          overflow="hidden"
          transition="box-shadow 0.3s ease"
          _hover={{
            boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.12)",
          }}
        >
          {/* Top Gradient Stripe */}
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            h="4px"
            bg="linear-gradient(90deg, #10B981 0%, #06B6D4 50%, #6366F1 100%)"
            borderTopRadius="24px"
          />

          {/* Top Row: Metric Highlight & Owner Disclaimer */}
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "flex-start", md: "center" }}
            gap={{ base: "3.5", md: "6" }}
            mb={{ base: "4", sm: "5", md: "7" }}
            pb={{ base: "4", sm: "5", md: "6" }}
            borderBottom="1px solid"
            borderColor="#F1F5F9"
          >
            {/* Left: Prominent 10,000+ Total Reached */}
            <Box>
              <Text
                fontSize={{ base: "38px", sm: "50px", md: "60px" }}
                fontWeight="900"
                color="#051B64"
                lineHeight="1.0"
                letterSpacing="-0.035em"
                fontVariantNumeric="tabular-nums"
                display="inline-flex"
                alignItems="baseline"
              >
                {animatedCount.toLocaleString()}
                <Box as="span" color="#10B981" ml="1">
                  +
                </Box>
              </Text>
              <Text
                fontSize={{ base: "13px", sm: "14.5px", md: "15.5px" }}
                fontWeight="700"
                color="#475569"
                mt="1"
              >
                Total cumulative youth reached
              </Text>
            </Box>

            {/* Right: Disclaimer Banner */}
            <Box
              bg="#F8FAFC"
              border="1px dashed"
              borderColor="#CBD5E1"
              borderRadius="12px"
              p={{ base: "2.5", sm: "3.5" }}
              maxW={{ base: "100%", md: "460px" }}
              w={{ base: "100%", md: "auto" }}
            >
              <Flex align="flex-start" gap="2.5">
                <Box color="#64748B" mt="0.5" flexShrink={0}>
                  <FileTextIcon size={14} />
                </Box>
                <Text fontSize={{ base: "11.5px", sm: "12px" }} color="#64748B" lineHeight="1.5">
                  Illustrative example only. These annual values are not actual I IMPACT INITIATIVE
                  records.
                </Text>
              </Flex>
            </Box>
          </Flex>

          {/* 3-Year Timeline Interactive Pills */}
          <Box mb={{ base: "3", md: "4" }}>
            <Flex
              direction={{ base: "column", sm: "row" }}
              justify={{ base: "flex-start", sm: "space-between" }}
              align={{ base: "stretch", sm: "center" }}
              gap="2"
            >
              <Text
                fontSize="11px"
                fontWeight="700"
                color="#94A3B8"
                textTransform="uppercase"
                letterSpacing="0.05em"
                display={{ base: "none", sm: "block" }}
              >
                Inspect Years:
              </Text>
              <Flex gap={{ base: "1.5", sm: "2" }} w={{ base: "100%", sm: "auto" }}>
                {CUMULATIVE_GROWTH_DATA.map((pt, idx) => (
                  <Box
                    key={pt.id}
                    as="button"
                    onClick={() => setActivePointIndex(idx)}
                    onMouseEnter={() => setActivePointIndex(idx)}
                    flex={{ base: "1", sm: "initial" }}
                    textAlign="center"
                    px={{ base: "2", sm: "3.5" }}
                    py={{ base: "2", sm: "1.5" }}
                    minH={{ base: "40px", sm: "36px" }}
                    borderRadius="8px"
                    fontSize={{ base: "11px", sm: "12px" }}
                    fontWeight="700"
                    bg={activePointIndex === idx ? (pt.isMilestone ? "#047857" : "#051B64") : "#F1F5F9"}
                    color={activePointIndex === idx ? "#FFFFFF" : "#64748B"}
                    boxShadow={activePointIndex === idx ? "0 2px 6px rgba(0,0,0,0.15)" : "none"}
                    cursor="pointer"
                    transition="all 0.2s ease"
                    _hover={{
                      transform: "translateY(-1px)",
                    }}
                    _active={{
                      transform: "scale(0.97)",
                    }}
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {pt.label}
                    {pt.isMilestone && (
                      <Box
                        as="span"
                        ml={{ base: "1", sm: "2" }}
                        px="1.5"
                        py="0.5"
                        borderRadius="full"
                        bg="#34D399"
                        color="#064E3B"
                        fontSize={{ base: "8.5px", sm: "9.5px" }}
                        fontWeight="800"
                      >
                        <Box as="span" display={{ base: "inline", sm: "none" }}>
                          10K+
                        </Box>
                        <Box as="span" display={{ base: "none", sm: "inline" }}>
                          10,000+ Verified
                        </Box>
                      </Box>
                    )}
                  </Box>
                ))}
              </Flex>
            </Flex>
          </Box>

          {/* ================= 3. SVG CUMULATIVE 3-YEAR GRAPH ================= */}
          <Box
            position="relative"
            w="100%"
            aspectRatio="760 / 300"
            style={{ aspectRatio: "760 / 300" }}
            mt={{ base: "2", sm: "3" }}
            mb={{ base: "2", sm: "3" }}
            userSelect="none"
          >
            <svg
              viewBox="0 0 760 300"
              width="100%"
              height="100%"
              style={{ overflow: "visible", display: "block" }}
              aria-label="3-Year Cumulative youth impact growth chart showing progression to 10,000+ reached"
            >
              <defs>
                {/* Gradient for Line Stroke */}
                <linearGradient id="threeYearLineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#059669" />
                  <stop offset="55%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>

                {/* Gradient for Area Fill */}
                <linearGradient id="threeYearAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.22" />
                  <stop offset="70%" stopColor="#10B981" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>

                {/* Shadows */}
                <filter id="nodeShadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#047857" floodOpacity="0.35" />
                </filter>
                <filter id="activeTooltipShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#0F172A" floodOpacity="0.16" />
                </filter>
              </defs>

              {/* Y-Axis Horizontal Gridlines & Values (0, 3K, 6K, 9K, 12K) */}
              {yAxisTicks.map((tick) => (
                <g key={tick.label}>
                  <line
                    x1="65"
                    y1={tick.y}
                    x2="700"
                    y2={tick.y}
                    stroke="#E2E8F0"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <text
                    x="50"
                    y={tick.y + 4}
                    textAnchor="end"
                    fill="#94A3B8"
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="monospace"
                  >
                    {tick.label}
                  </text>
                </g>
              ))}

              {/* Baseline at 0 (y = 245) */}
              <line
                x1="65"
                y1="245"
                x2="700"
                y2="245"
                stroke="#CBD5E1"
                strokeWidth="1.2"
              />

              {/* Area Gradient Fill Under Curve */}
              <path
                d="M 130 201.25 C 230 188, 290 148, 390 140 C 490 132, 550 78, 650 70 L 650 245 L 130 245 Z"
                fill="url(#threeYearAreaGradient)"
                style={{
                  opacity: lineDrawn || prefersReducedMotion ? 1 : 0,
                  transition: prefersReducedMotion ? "none" : "opacity 0.9s ease 0.4s",
                }}
              />

              {/* Smooth 3-Year Cumulative Curve */}
              <path
                d="M 130 201.25 C 230 188, 290 148, 390 140 C 490 132, 550 78, 650 70"
                fill="none"
                stroke="url(#threeYearLineGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 600,
                  strokeDashoffset: lineDrawn || prefersReducedMotion ? 0 : 600,
                  transition: prefersReducedMotion
                    ? "none"
                    : "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
                }}
              />

              {/* X-Axis Labels (Year 1, Year 2, Year 3) */}
              {CUMULATIVE_GROWTH_DATA.map((pt, idx) => (
                <text
                  key={pt.id}
                  x={pt.x}
                  y="272"
                  textAnchor="middle"
                  fill={activePointIndex === idx ? (pt.isMilestone ? "#047857" : "#051B64") : "#64748B"}
                  fontSize={pt.isMilestone ? "13.5" : "12.5"}
                  fontWeight={activePointIndex === idx || pt.isMilestone ? "800" : "600"}
                  cursor="pointer"
                  onClick={() => setActivePointIndex(idx)}
                >
                  {pt.label}
                </text>
              ))}

              {/* Interactive Data Nodes for the 3 Years */}
              {CUMULATIVE_GROWTH_DATA.map((pt, idx) => {
                const isActive = activePointIndex === idx
                return (
                  <g
                    key={pt.id}
                    cursor="pointer"
                    onClick={() => setActivePointIndex(idx)}
                    onMouseEnter={() => setActivePointIndex(idx)}
                    style={{
                      opacity: lineDrawn || prefersReducedMotion ? 1 : 0,
                      transition: `opacity 0.4s ease ${0.4 + idx * 0.15}s`,
                    }}
                  >
                    {/* Outer halo ring */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isActive ? (pt.isMilestone ? "18" : "14") : pt.isMilestone ? "12" : "9"}
                      fill={pt.isMilestone ? "rgba(16, 185, 129, 0.28)" : "rgba(16, 185, 129, 0.16)"}
                      style={{ transition: "r 0.25s ease" }}
                    />
                    {/* Inner core dot */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={pt.isMilestone ? "7" : "5.5"}
                      fill={isActive ? "#047857" : pt.isMilestone ? "#059669" : "#10B981"}
                      stroke="#FFFFFF"
                      strokeWidth={pt.isMilestone ? "3" : "2.5"}
                      filter="url(#nodeShadow)"
                    />
                    {/* Invisible generous hover touch-target */}
                    <circle cx={pt.x} cy={pt.y} r="32" fill="transparent" />
                  </g>
                )
              })}

            </svg>

            {/* HTML Floating Tooltip: Sits precisely over the active point on mobile & desktop */}
            <Box
              position="absolute"
              left={`${(activePoint.x / 760) * 100}%`}
              top={`${(activePoint.y / 300) * 100}%`}
              transform={
                activePointIndex === 2
                  ? "translate(-80%, -100%) translateY(-8px)"
                  : activePointIndex === 0
                  ? "translate(-20%, -100%) translateY(-8px)"
                  : "translate(-50%, -100%) translateY(-8px)"
              }
              bg="#0F172A"
              color="#FFFFFF"
              borderRadius={{ base: "8px", sm: "10px", md: "12px" }}
              px={{ base: "2.5", sm: "3.5", md: "4" }}
              py={{ base: "1", sm: "1.5", md: "2.5" }}
              boxShadow="0 10px 25px -4px rgba(15, 23, 42, 0.4), 0 0 1px rgba(255, 255, 255, 0.2)"
              border="1px solid rgba(255, 255, 255, 0.12)"
              pointerEvents="none"
              whiteSpace="nowrap"
              textAlign="center"
              transition="left 0.3s cubic-bezier(0.16, 1, 0.3, 1), top 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease"
              opacity={lineDrawn || prefersReducedMotion ? 1 : 0}
              zIndex={10}
            >
              {/* Downward triangle pointer */}
              <Box
                position="absolute"
                bottom={{ base: "-4px", sm: "-5px", md: "-6px" }}
                left={
                  activePointIndex === 2
                    ? "80%"
                    : activePointIndex === 0
                    ? "20%"
                    : "50%"
                }
                transform="translateX(-50%)"
                w="0"
                h="0"
                borderLeft={{ base: "4px solid transparent", sm: "5px solid transparent", md: "6px solid transparent" }}
                borderRight={{ base: "4px solid transparent", sm: "5px solid transparent", md: "6px solid transparent" }}
                borderTop={{ base: "4px solid #0F172A", sm: "5px solid #0F172A", md: "6px solid #0F172A" }}
                transition="left 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
              />

              {/* Status Header with Micro Dot */}
              <HStack gap="1" justify="center" mb={{ base: "0.5", md: "1" }}>
                <Box
                  w={{ base: "3.5px", sm: "4.5px", md: "5px" }}
                  h={{ base: "3.5px", sm: "4.5px", md: "5px" }}
                  borderRadius="full"
                  bg={activePoint.isMilestone ? "#34D399" : "#94A3B8"}
                  flexShrink={0}
                />
                <Text
                  fontSize={{ base: "8px", sm: "9px", md: "10.5px" }}
                  fontWeight="800"
                  color={activePoint.isMilestone ? "#34D399" : "#94A3B8"}
                  letterSpacing="0.06em"
                  textTransform="uppercase"
                  lineHeight="1.2"
                >
                  {activePoint.label} · {activePoint.isMilestone ? "Verified" : "Illustrative"}
                </Text>
              </HStack>

              {/* Metric Value */}
              <Text
                fontSize={{ base: "11px", sm: "12.5px", md: "14px" }}
                fontWeight="800"
                color="#FFFFFF"
                lineHeight="1.2"
              >
                {activePoint.displayReach} Young People
              </Text>
            </Box>
          </Box>

          {/* ================= 4. BOTTOM CAPTION / DISCLAIMER ================= */}
          <Box
            pt="3"
            borderTop="1px solid"
            borderColor="#F1F5F9"
            textAlign="center"
          >
            <Text fontSize={{ base: "11px", sm: "12px" }} color="#94A3B8" fontStyle="italic">
              Illustrative graph only — actual historical figures must replace these sample values.
            </Text>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
