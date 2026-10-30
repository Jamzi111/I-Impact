"use client"

import React from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  HStack,
  VStack,
  Button,
} from "@chakra-ui/react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PreFooterCTA } from "@/components/cta"
import { ImpactHero } from "@/components/impact"
import {
  ShieldCheckIcon,
  CheckCircleIcon,
  BarChartSquareIcon,
  TrendingUpIcon,
  GraduationCapIcon,
  UsersIcon,
  BuildingIcon,
  SparklesIcon,
  MapPinIcon,
  ClockIcon,
} from "@/components/icons"
import { LiveDot } from "@/components/LiveDot"

const LONGITUDINAL_STAGES = [
  {
    step: "01",
    phase: "Secondary School Discovery",
    title: "Public School STEM & Civic Cohorts",
    desc: "Rigorous talent screening across underserved public secondary schools in Lagos, Abuja, and regional clusters. Focus on aptitude, civic passion, and grit.",
    metrics: "120,418+ Teens Onboarded",
    icon: <UsersIcon size={20} color="#059669" />,
    badgeBg: "#D1FAE5",
    color: "#059669",
  },
  {
    step: "02",
    phase: "Verified Field Mentorship",
    title: "1-on-1 Industry Mentorship & Labs",
    desc: "Direct guidance with vetted tech architects, doctors, and civic founders. Each mentorship hour is timestamped and signed through our LMS portal.",
    metrics: "85,420 Hours Verified",
    icon: <ClockIcon size={20} color="#2563EB" />,
    badgeBg: "#DBEAFE",
    color: "#2563EB",
  },
  {
    step: "03",
    phase: "Real Capstone Deployment",
    title: "Community Solutions & Hardware Prototypes",
    desc: "Students build operational products tackling local problems—from clean energy solar battery packs to SMS health triage and agritech soil monitors.",
    metrics: "450+ Active Capstones",
    icon: <SparklesIcon size={20} color="#D97706" />,
    badgeBg: "#FEF3C7",
    color: "#D97706",
  },
  {
    step: "04",
    phase: "Longitudinal Placement",
    title: "University Transition & Venture Spinouts",
    desc: "Long-term tracking beyond graduation. 94.2% transition into STEM and collegiate degrees, scholarships, or venture incubation pipelines.",
    metrics: "94.2% Higher-Ed Transition",
    icon: <GraduationCapIcon size={20} color="#7C3AED" />,
    badgeBg: "#EDE9FE",
    color: "#7C3AED",
  },
]

const REGIONAL_HUBS = [
  { name: "Lagos Hub", location: "Yaba & Ikorodu Innovation Hubs", activeStudents: "48,200+", verifiedMentors: "180+" },
  { name: "Abuja Hub", location: "Garki & Central Federal Hub", activeStudents: "28,600+", verifiedMentors: "120+" },
  { name: "Port Harcourt Hub", location: "Niger Delta Tech Cluster", activeStudents: "16,400+", verifiedMentors: "75+" },
  { name: "Kano Hub", location: "Northern STEM Maker Facility", activeStudents: "14,800+", verifiedMentors: "60+" },
  { name: "Ibadan Hub", location: "Bodija Tech Incubation Center", activeStudents: "12,418+", verifiedMentors: "50+" },
]

export default function ImpactPage() {
  return (
    <Box minH="100vh" bg="#FFFFFF" display="flex" flexDirection="column">
      {/* Universal Navigation Header */}
      <Header />

      <Box as="main" flex="1">
        {/* 1. Impact Hero Section (Built from reference screenshot) */}
        <ImpactHero />

        {/* 2. Longitudinal Methodology Explorer */}
        <Box
          id="impact-explorer"
          as="section"
          py={{ base: "14", md: "20" }}
          bg="#FFFFFF"
          borderBottom="1px solid"
          borderColor="#F1F5F9"
        >
          <Container maxW="1360px" px={{ base: "4", sm: "6", md: "8", lg: "10" }}>
            <Box maxW="700px" mb={{ base: "10", md: "14" }}>
              <HStack gap="2" mb="2">
                <Box
                  p="1.5"
                  borderRadius="8px"
                  bg="rgba(5, 150, 105, 0.1)"
                  color="#059669"
                >
                  <TrendingUpIcon size={16} />
                </Box>
                <Text
                  fontSize="12px"
                  fontWeight="800"
                  color="#059669"
                  letterSpacing="0.08em"
                  textTransform="uppercase"
                >
                  Longitudinal Verification Architecture
                </Text>
              </HStack>
              <Heading
                as="h2"
                fontSize={{ base: "26px", sm: "32px", md: "38px" }}
                fontWeight="800"
                color="#0F172A"
                lineHeight="1.2"
                mb="3"
              >
                From Public Classrooms to Verified Continental Champions
              </Heading>
              <Text fontSize={{ base: "14px", sm: "16px" }} color="#64748B" lineHeight="1.65">
                Every statistic presented in our ledger is tracked through individual student ID numbers
                across multi-year checkpoints. Here is how we turn potential into measurable transformation.
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="6">
              {LONGITUDINAL_STAGES.map((stage) => (
                <Box
                  key={stage.step}
                  p="6"
                  borderRadius="18px"
                  border="1px solid"
                  borderColor="#E2E8F0"
                  bg="#FAFCFF"
                  position="relative"
                  transition="all 0.3s ease"
                  _hover={{
                    borderColor: stage.color,
                    transform: "translateY(-4px)",
                    boxShadow: "0 14px 30px -10px rgba(15, 23, 42, 0.08)",
                  }}
                >
                  <Flex justify="space-between" align="center" mb="4">
                    <Box
                      w="40px"
                      h="40px"
                      borderRadius="12px"
                      bg={stage.badgeBg}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {stage.icon}
                    </Box>
                    <Text
                      fontSize="14px"
                      fontWeight="900"
                      color="#94A3B8"
                      fontFamily="monospace"
                    >
                      PHASE {stage.step}
                    </Text>
                  </Flex>

                  <Text
                    fontSize="11px"
                    fontWeight="700"
                    color={stage.color}
                    textTransform="uppercase"
                    letterSpacing="0.05em"
                    mb="1"
                  >
                    {stage.phase}
                  </Text>
                  <Heading
                    as="h3"
                    fontSize="17px"
                    fontWeight="700"
                    color="#0F172A"
                    mb="2"
                    lineHeight="1.3"
                  >
                    {stage.title}
                  </Heading>
                  <Text fontSize="13px" color="#64748B" lineHeight="1.6" mb="4">
                    {stage.desc}
                  </Text>

                  <Box
                    pt="3"
                    borderTop="1px dashed"
                    borderColor="#E2E8F0"
                  >
                    <HStack gap="1.5" color="#0F172A">
                      <CheckCircleIcon size={14} color={stage.color} />
                      <Text fontSize="12px" fontWeight="800">
                        {stage.metrics}
                      </Text>
                    </HStack>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* 3. Regional Hub Coverage Breakdown */}
        <Box as="section" py={{ base: "12", md: "16" }} bg="#F8FAFC">
          <Container maxW="1360px" px={{ base: "4", sm: "6", md: "8", lg: "10" }}>
            <Flex
              direction={{ base: "column", lg: "row" }}
              align={{ base: "flex-start", lg: "center" }}
              justify="space-between"
              gap="8"
              mb="8"
            >
              <Box maxW="600px">
                <HStack gap="2" mb="2">
                  <LiveDot color="#059669" size={6} />
                  <Text
                    fontSize="12px"
                    fontWeight="800"
                    color="#059669"
                    letterSpacing="0.08em"
                    textTransform="uppercase"
                  >
                    Active Continental Deployments
                  </Text>
                </HStack>
                <Heading
                  as="h2"
                  fontSize={{ base: "24px", sm: "28px", md: "32px" }}
                  fontWeight="800"
                  color="#0F172A"
                >
                  Decentralized Network of Regional Labs
                </Heading>
              </Box>

              <Text fontSize="13px" color="#64748B" maxW="400px">
                Each hub operates under zero-leakage financial controls with automated telemetry
                reporting student attendance, workshop completions, and device utilization.
              </Text>
            </Flex>

            <SimpleGrid columns={{ base: 1, sm: 2, lg: 5 }} gap="4">
              {REGIONAL_HUBS.map((hub) => (
                <Box
                  key={hub.name}
                  p="4.5"
                  borderRadius="14px"
                  bg="#FFFFFF"
                  border="1px solid"
                  borderColor="#E2E8F0"
                >
                  <HStack gap="2" mb="1" color="#059669">
                    <MapPinIcon size={15} />
                    <Text fontSize="14px" fontWeight="800" color="#0F172A">
                      {hub.name}
                    </Text>
                  </HStack>
                  <Text fontSize="11px" color="#64748B" mb="3">
                    {hub.location}
                  </Text>

                  <Box pt="2" borderTop="1px solid" borderColor="#F1F5F9">
                    <Text fontSize="16px" fontWeight="800" color="#0F172A">
                      {hub.activeStudents}
                    </Text>
                    <Text fontSize="10px" fontWeight="600" color="#64748B" textTransform="uppercase">
                      Active Youth • {hub.verifiedMentors} Mentors
                    </Text>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* 4. PreFooter Call to Action */}
        <PreFooterCTA />
      </Box>

      {/* Universal Footer */}
      <Footer />
    </Box>
  )
}
