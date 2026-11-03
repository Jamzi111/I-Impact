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
import {
  UsersIcon,
  ClockIcon,
  TrophyIcon,
  GraduationCapIcon,
  SparklesIcon,
  ShieldIcon,
  CheckIcon,
  TrendingUpIcon,
  FileTextIcon,
  CloseIcon,
  MapPinIcon,
} from "@/components/icons"
import { LiveDot } from "@/components/LiveDot"

interface ScorecardItem {
  id: string
  category: string
  targetNumber: number
  suffix: string
  isDecimal?: boolean
  decimalPlaces?: number
  description: string
  footerLeft: string
  footerRightText: string
  footerRightIcon: React.ReactNode
  accentColor: string
  iconBadgeBg: string
  iconBadgeColor: string
  icon: React.ReactNode
  methodologyNote: string
}

const SCORECARD_DATA: ScorecardItem[] = [
  {
    id: "reach",
    category: "TOTAL REACH",
    targetNumber: 10000,
    suffix: "+",
    description: "Young champions reached across secondary schools, regional summits, and digital learning hubs.",
    footerLeft: "Across 6 Geopolitical Zones",
    footerRightText: "Verified",
    footerRightIcon: <TrendingUpIcon size={13} color="#059669" />,
    accentColor: "#059669",
    iconBadgeBg: "#D1FAE5",
    iconBadgeColor: "#059669",
    icon: <UsersIcon size={15} color="#059669" />,
    methodologyNote: "Direct participant tracking across secondary school outreaches, annual AS A TEEN conferences, and regional skill hubs in Nigeria.",
  },
  {
    id: "mentorship",
    category: "1-ON-1 MENTORSHIP",
    targetNumber: 1200,
    suffix: "+",
    description: "Dedicated hours of personal coaching, life-pathway direction, and career guidance delivered to youth.",
    footerLeft: "Hands-on 1-on-1 Guidance",
    footerRightText: "Documented",
    footerRightIcon: <CheckIcon size={13} color="#3730A3" />,
    accentColor: "#0F172A",
    iconBadgeBg: "#EEF2FF",
    iconBadgeColor: "#3730A3",
    icon: <ClockIcon size={15} color="#3730A3" />,
    methodologyNote: "Logged one-on-one mentorship sessions and counseling appointments completed between vetted professionals and students.",
  },
  {
    id: "champions",
    category: "CHAMPION & MENTOR NETWORK",
    targetNumber: 1240,
    suffix: "+",
    description: "Vetted mentors, tech founders, industry allies, and alumni champions actively guiding future leaders.",
    footerLeft: "Nigeria & Global Diaspora",
    footerRightText: "Active",
    footerRightIcon: <SparklesIcon size={13} color="#D97706" />,
    accentColor: "#D97706",
    iconBadgeBg: "#FEF3C7",
    iconBadgeColor: "#D97706",
    icon: <TrophyIcon size={15} color="#D97706" />,
    methodologyNote: "Verified mentor directory and alumni ambassador network actively facilitating career discovery and student guidance.",
  },
  {
    id: "bootcamps",
    category: "BOOTCAMPS & SPRINTS",
    targetNumber: 50,
    suffix: "+",
    description: "Intensive leadership development academies, digital skills bootcamps, and career readiness sprints.",
    footerLeft: "Hands-on Skill Sprints",
    footerRightText: "Completed",
    footerRightIcon: <CheckIcon size={13} color="#059669" />,
    accentColor: "#10B981",
    iconBadgeBg: "#D1FAE5",
    iconBadgeColor: "#059669",
    icon: <GraduationCapIcon size={15} color="#059669" />,
    methodologyNote: "Curriculum-based digital literacy workshops, leadership masterclasses, and skill development sprints.",
  },
  {
    id: "communities",
    category: "COMMUNITIES SERVED",
    targetNumber: 20,
    suffix: "+",
    description: "Underserved grassroots districts and secondary school clusters reached via educational relief and resources.",
    footerLeft: "6 Geopolitical Zones",
    footerRightText: "Grassroots",
    footerRightIcon: <LiveDot color="#6366F1" size={6} />,
    accentColor: "#6366F1",
    iconBadgeBg: "#EDE9FE",
    iconBadgeColor: "#6366F1",
    icon: <MapPinIcon size={15} color="#6366F1" />,
    methodologyNote: "Field-verified community relief and outreach interventions across underserved urban and rural communities.",
  },
  {
    id: "safeguarding",
    category: "SAFEGUARDING & DIRECT PRACTICE",
    targetNumber: 100,
    suffix: "%",
    description: "Zero-compromise direct practice and safeguarding compliance with mandatory vetting across all programs.",
    footerLeft: "Universal Child Protection Accord",
    footerRightText: "Compliant",
    footerRightIcon: <ShieldIcon size={13} color="#0D9488" />,
    accentColor: "#0D9488",
    iconBadgeBg: "#CCFBF1",
    iconBadgeColor: "#0D9488",
    icon: <ShieldIcon size={15} color="#0D9488" />,
    methodologyNote: "Strict adherence to child protection standards, NDPR data privacy, and background-checking procedures for all staff and volunteers.",
  },
]

function ScorecardCard({
  item,
  isTriggered,
  index,
}: {
  item: ScorecardItem
  isTriggered: boolean
  index: number
}) {
  const [displayValue, setDisplayValue] = useState("0" + item.suffix)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    if (!isTriggered || hasAnimatedRef.current) return

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const finalVal = item.isDecimal
        ? item.targetNumber.toFixed(item.decimalPlaces || 1)
        : item.targetNumber.toLocaleString()
      setDisplayValue(finalVal + item.suffix)
      hasAnimatedRef.current = true
      return
    }

    hasAnimatedRef.current = true
    let startTime: number | null = null
    const duration = 1300 + index * 90
    let animationFrameId: number

    const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3)

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutCubic(progress)

      if (item.isDecimal) {
        const currentVal = (eased * item.targetNumber).toFixed(item.decimalPlaces || 1)
        setDisplayValue(currentVal + item.suffix)
      } else {
        const currentVal = Math.floor(eased * item.targetNumber).toLocaleString()
        setDisplayValue(currentVal + item.suffix)
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        const finalVal = item.isDecimal
          ? item.targetNumber.toFixed(item.decimalPlaces || 1)
          : item.targetNumber.toLocaleString()
        setDisplayValue(finalVal + item.suffix)
      }
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [isTriggered, item, index])

  return (
    <Box
      position="relative"
      bg="#FFFFFF"
      borderRadius="14px"
      border="1px solid"
      borderColor="#E2E8F0"
      borderLeft="3.5px solid"
      borderLeftColor={item.accentColor}
      p={{ base: "3.5", sm: "4" }}
      boxShadow="0 2px 12px -2px rgba(15, 23, 42, 0.04)"
      transition={{ base: "none", md: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)" }}
      _hover={{
        md: {
          transform: "translateY(-2px)",
          boxShadow: "0 10px 24px -6px rgba(15, 23, 42, 0.08)",
          borderColor: "#CBD5E1",
          borderLeftColor: item.accentColor,
        },
      }}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      {/* Top Header: Category and Icon */}
      <Box>
        <Flex justify="space-between" align="center">
          <Text
            fontSize="10px"
            fontWeight="800"
            color="#64748B"
            letterSpacing="0.06em"
            textTransform="uppercase"
          >
            {item.category}
          </Text>
          <Box
            w="28px"
            h="28px"
            borderRadius="full"
            bg={item.iconBadgeBg}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
          >
            {item.icon}
          </Box>
        </Flex>

        {/* Number */}
        <Heading
          as="h3"
          fontSize={{ base: "24px", sm: "26px", lg: "28px" }}
          fontWeight="900"
          color="#0F172A"
          lineHeight="1.1"
          letterSpacing="-0.02em"
          mt="1.5"
          mb="1"
        >
          {displayValue}
        </Heading>

        {/* Description */}
        <Text
          fontSize={{ base: "12px", sm: "12.5px" }}
          color="#475569"
          lineHeight="1.48"
          minH={{ md: "44px" }}
        >
          {item.description}
        </Text>
      </Box>

      {/* Card Footer / Verification Metadata */}
      <Box
        mt="2.5"
        pt="2"
        borderTop="1px solid"
        borderColor="#F1F5F9"
      >
        <Flex justify="space-between" align="center" gap="2" wrap="wrap">
          <Text fontSize="10.5px" fontWeight="600" color="#64748B">
            {item.footerLeft}
          </Text>
          <HStack gap="1" color="#0F172A">
            {item.footerRightIcon}
            <Text fontSize="11px" fontWeight="700" color="#0F172A">
              {item.footerRightText}
            </Text>
          </HStack>
        </Flex>
      </Box>
    </Box>
  )
}

export function ImpactScorecard() {
  const [inView, setInView] = useState(false)
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.08 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <Box
      ref={sectionRef}
      id="impact-scorecard"
      as="section"
      py={{ base: "8", md: "11" }}
      bg="#F8FAFC"
      borderBottom="1px solid"
      borderColor="#E2E8F0"
      position="relative"
    >
      <Container maxW="1360px" px={{ base: "4", sm: "6", md: "8", lg: "10" }}>
        {/* Section Header */}
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "flex-start", md: "flex-end" }}
          justify="space-between"
          gap={{ base: "3", md: "6" }}
          mb={{ base: "5", md: "7" }}
        >
          <Box maxW="600px">
            <Text
              fontSize="11px"
              fontWeight="800"
              color="#059669"
              letterSpacing="0.08em"
              textTransform="uppercase"
              mb="1"
            >
              CORE ACCOUNTABILITY SCORECARD
            </Text>
            <Heading
              as="h2"
              fontSize={{ base: "22px", sm: "26px", md: "30px" }}
              fontWeight="900"
              color="#0F172A"
              lineHeight="1.2"
              letterSpacing="-0.02em"
            >
              Longitudinal Impact at Scale
            </Heading>
          </Box>

          <Box maxW={{ base: "100%", md: "460px" }}>
            <Text fontSize="13px" color="#64748B" lineHeight="1.5">
              Tracking our progress through measurable outcomes in education, mentorship,
              skills development, and youth leadership across regional maker clusters.
            </Text>
          </Box>
        </Flex>

        {/* 6-Card Scorecard Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: "3", lg: "4" }}>
          {SCORECARD_DATA.map((item, index) => (
            <ScorecardCard
              key={item.id}
              item={item}
              isTriggered={inView}
              index={index}
            />
          ))}
        </SimpleGrid>

        {/* Bottom Verification & Methodology Note */}
        <Flex
          mt="5"
          pt="3.5"
          borderTop="1px dashed"
          borderColor="#E2E8F0"
          justify="space-between"
          align="center"
          direction={{ base: "column", sm: "row" }}
          gap="2.5"
        >
          <HStack gap="2" color="#64748B">
            <Box w="5px" h="5px" borderRadius="full" bg="#059669" />
            <Text fontSize="11.5px" color="#64748B" fontWeight="500">
              Reporting cycle 2024–2026 • Verified across 5 regional maker clusters
            </Text>
          </HStack>

          <Button
            onClick={() => setIsMethodologyOpen(true)}
            bg="#ECFDF5"
            color="#047857"
            border="1px solid"
            borderColor="#A7F3D0"
            borderRadius="8px"
            fontWeight="700"
            fontSize="12px"
            px="3.5"
            py="2"
            minH="38px"
            h="auto"
            _hover={{ bg: "#D1FAE5", borderColor: "#6EE7B7" }}
            _active={{ transform: "scale(0.98)" }}
            display="inline-flex"
            alignItems="center"
            gap="2"
            cursor="pointer"
          >
            <FileTextIcon size={14} color="#059669" />
            View Measurement Methodology & Sources
          </Button>
        </Flex>
      </Container>

      {/* Methodology & Measurement Criteria Modal */}
      {isMethodologyOpen && (
        <Box
          position="fixed"
          inset="0"
          zIndex={9999}
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={{ base: "4", sm: "6" }}
        >
          {/* Backdrop */}
          <Box
            position="absolute"
            inset="0"
            bg="rgba(15, 23, 42, 0.65)"
            backdropFilter="blur(8px)"
            onClick={() => setIsMethodologyOpen(false)}
          />

          {/* Modal Container */}
          <Box
            position="relative"
            bg="#FFFFFF"
            w="100%"
            maxW="720px"
            borderRadius="20px"
            boxShadow="0 25px 50px -12px rgba(15, 23, 42, 0.25)"
            p={{ base: "5", md: "7" }}
            maxH="90vh"
            overflowY="auto"
            zIndex={1}
          >
            <Flex justify="space-between" align="center" mb="4">
              <Box>
                <Text fontSize="11px" fontWeight="800" color="#059669" letterSpacing="0.08em" textTransform="uppercase">
                  TRANSPARENCY & METHODOLOGY
                </Text>
                <Heading as="h3" fontSize="20px" fontWeight="800" color="#0F172A">
                  Measurement Criteria & Data Integrity
                </Heading>
              </Box>
              <Box
                as="button"
                onClick={() => setIsMethodologyOpen(false)}
                p="2"
                borderRadius="full"
                color="#64748B"
                _hover={{ bg: "#F1F5F9", color: "#0F172A" }}
                cursor="pointer"
              >
                <CloseIcon size={18} />
              </Box>
            </Flex>

            <Text fontSize="12.5px" color="#64748B" mb="5" lineHeight="1.55">
              Our impact reporting reflects direct practice outcomes recorded across secondary school outreaches, hands-on mentorship logs, and verifiable community interventions. Here is how each metric is measured:
            </Text>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap="3.5">
              {SCORECARD_DATA.map((item) => (
                <Box
                  key={item.id}
                  p="3.5"
                  borderRadius="12px"
                  bg="#F8FAFC"
                  border="1px solid"
                  borderColor="#E2E8F0"
                >
                  <HStack gap="2" mb="1">
                    <Box
                      w="22px"
                      h="22px"
                      borderRadius="full"
                      bg={item.iconBadgeBg}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      {item.icon}
                    </Box>
                    <Text fontSize="11.5px" fontWeight="800" color="#0F172A">
                      {item.category}
                    </Text>
                  </HStack>
                  <Text fontSize="11.5px" color="#475569" lineHeight="1.5">
                    {item.methodologyNote}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>

            <Box mt="5" pt="3" borderTop="1px solid" borderColor="#F1F5F9" textAlign="right">
              <Button
                onClick={() => setIsMethodologyOpen(false)}
                bg="#047857"
                color="#FFFFFF"
                px="4"
                py="2"
                borderRadius="8px"
                fontWeight="700"
                fontSize="12.5px"
                _hover={{ bg: "#065F46" }}
              >
                Close Methodology
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}
