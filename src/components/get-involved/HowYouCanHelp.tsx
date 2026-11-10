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
} from "@chakra-ui/react"
import {
  HeartHandshakeIcon,
  BuildingIcon,
  TrophyIcon,
  UsersIcon,
  SparklesIcon,
  TrendingUpIcon,
} from "@/components/icons"

interface ContributionCard {
  id: string
  icon: React.ReactNode
  iconBg: string
  category: string
  title: string
  description: string
  outcomeLabel: string
  outcomeDesc: string
}

const CONTRIBUTION_WAYS: ContributionCard[] = [
  {
    id: "skills",
    icon: <HeartHandshakeIcon size={20} color="#149191" />,
    iconBg: "rgba(20, 145, 145, 0.12)",
    category: "Volunteer Guidance",
    title: "Share Your Skills & Experience",
    description:
      "Offer personal mentoring sessions, career guidance, and practical insights. Walking alongside a young person demystifies the path to higher education and future careers.",
    outcomeLabel: "DIRECT OUTCOME",
    outcomeDesc: "Equipping young minds with career clarity, real-world context, and personal encouragement.",
  },
  {
    id: "schools",
    icon: <BuildingIcon size={20} color="#051B64" />,
    iconBg: "rgba(5, 27, 100, 0.1)",
    category: "School Collaboration",
    title: "Help Schools Access Opportunities",
    description:
      "When schools and community spaces open their doors, students gain access to interactive leadership workshops, innovation challenges, and peer discussion sessions.",
    outcomeLabel: "DIRECT OUTCOME",
    outcomeDesc: "Enabling classrooms to host leadership workshops, peer forums, and student delegations.",
  },
  {
    id: "programmes",
    icon: <TrophyIcon size={20} color="#D97706" />,
    iconBg: "rgba(217, 119, 6, 0.12)",
    category: "Programme Support",
    title: "Support Youth Programmes & Events",
    description:
      "Direct contributions and sponsorships help provide learning materials, workshop tools, event passes, and logistics for young people who need support most.",
    outcomeLabel: "DIRECT OUTCOME",
    outcomeDesc: "Funding learning resources, event passes, and workshop materials for aspiring students.",
  },
  {
    id: "mobilise",
    icon: <UsersIcon size={20} color="#7C3AED" />,
    iconBg: "rgba(124, 58, 237, 0.12)",
    category: "Community Reach",
    title: "Mobilise Young People Around You",
    description:
      "Word of mouth is powerful. By connecting your campus, local community, or neighbourhood youth with upcoming events and opportunities, you ensure no aspiring champion is missed.",
    outcomeLabel: "DIRECT OUTCOME",
    outcomeDesc: "Connecting more motivated teenagers and university students with life-changing platforms.",
  },
]

export function HowYouCanHelp() {
  return (
    <Box
      as="section"
      py={{ base: "12", sm: "14", md: "18" }}
      bg="#FFFFFF"
      borderBottom="1px solid"
      borderColor="#E2E8F0"
    >
      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1140px", xl: "1240px" }}
        px={{ base: "4", sm: "6", md: "8" }}
      >
        {/* Section Header */}
        <Flex
          direction="column"
          align="center"
          textAlign="center"
          maxW="720px"
          mx="auto"
          mb={{ base: "8", md: "12" }}
        >
          <HStack
            gap="2"
            px="3"
            py="1"
            bg="rgba(20, 145, 145, 0.08)"
            border="1px solid"
            borderColor="rgba(20, 145, 145, 0.25)"
            borderRadius="full"
            mb="2.5"
          >
            <SparklesIcon size={13} color="#149191" />
            <Text
              fontSize="11.5px"
              fontWeight="800"
              letterSpacing="0.06em"
              textTransform="uppercase"
              color="#0F766E"
            >
              Making a Difference
            </Text>
          </HStack>
          <Heading
            as="h2"
            fontSize={{ base: "22px", sm: "28px", md: "34px" }}
            fontWeight="900"
            color="#051B64"
            lineHeight="1.2"
            mb="2.5"
          >
            Ways Your Contribution Can Make a Difference
          </Heading>
          <Text
            fontSize={{ base: "13.5px", sm: "14.5px" }}
            color="#64748B"
            lineHeight="1.6"
          >
            Every contribution of time, expertise, or partnership helps open doors for
            young people to learn, grow, and lead.
          </Text>
        </Flex>

        {/* 4 Outcome Cards */}
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="5" mb="8">
          {CONTRIBUTION_WAYS.map((item) => (
            <Box
              key={item.id}
              bg="#FFFFFF"
              borderRadius="18px"
              p={{ base: "5", md: "6" }}
              border="1px solid"
              borderColor="#E2E8F0"
              boxShadow="0 4px 16px -4px rgba(5, 27, 100, 0.05)"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              transition="all 0.2s ease"
              _hover={{
                borderColor: "#CBD5E1",
                transform: "translateY(-3px)",
                boxShadow: "0 12px 24px -6px rgba(5, 27, 100, 0.09)",
              }}
            >
              <Box mb="4">
                <Box
                  p="2.5"
                  borderRadius="12px"
                  bg={item.iconBg}
                  w="fit-content"
                  mb="3.5"
                >
                  {item.icon}
                </Box>
                <Text
                  fontSize="11px"
                  fontWeight="800"
                  color="#149191"
                  textTransform="uppercase"
                  letterSpacing="0.05em"
                  mb="1"
                >
                  {item.category}
                </Text>
                <Heading
                  as="h3"
                  fontSize="16px"
                  fontWeight="800"
                  color="#051B64"
                  lineHeight="1.3"
                  mb="2"
                >
                  {item.title}
                </Heading>
                <Text fontSize="13px" color="#475569" lineHeight="1.55">
                  {item.description}
                </Text>
              </Box>

              {/* Bottom Outcome Container */}
              <Box
                bg="#F8FAFC"
                borderRadius="12px"
                p="3"
                border="1px solid"
                borderColor="#F1F5F9"
              >
                <Text
                  fontSize="10.5px"
                  fontWeight="800"
                  color="#059669"
                  letterSpacing="0.05em"
                  textTransform="uppercase"
                  mb="1"
                >
                  {item.outcomeLabel}
                </Text>
                <Text
                  fontSize="12px"
                  fontWeight="600"
                  color="#051B64"
                  lineHeight="1.45"
                >
                  {item.outcomeDesc}
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>

        {/* Real-Time Impact Metric Graph (Subtle SVG Data Vis under 2KB) */}
        <Box
          bg="#F8FAFC"
          p={{ base: "4", sm: "5", md: "6" }}
          borderRadius="20px"
          border="1px solid"
          borderColor="#E2E8F0"
          boxShadow="0 2px 8px rgba(5, 27, 100, 0.03)"
        >
          <Flex
            direction={{ base: "column", lg: "row" }}
            align={{ base: "stretch", lg: "center" }}
            justify="space-between"
            gap="6"
          >
            {/* Left Info */}
            <Flex align="center" gap="4">
              <Box
                p="3"
                bg="#FFFFFF"
                borderRadius="14px"
                color="#059669"
                boxShadow="0 2px 6px rgba(0, 0, 0, 0.05)"
                border="1px solid"
                borderColor="#E2E8F0"
                flexShrink={0}
              >
                <TrendingUpIcon size={26} color="#059669" />
              </Box>
              <Box>
                <Heading
                  as="h4"
                  fontSize={{ base: "15px", sm: "16px" }}
                  fontWeight="800"
                  color="#051B64"
                  lineHeight="1.25"
                  mb="0.5"
                >
                  Community & Impact Growth Trajectory
                </Heading>
                <Text fontSize="12.5px" color="#64748B" lineHeight="1.4">
                  Tracked expansion across volunteer mentors, school collaborations, and young people reached.
                </Text>
              </Box>
            </Flex>

            {/* Right: Inline SVG Sparkline Visualizer */}
            <Box w={{ base: "100%", lg: "420px" }} flexShrink={0}>
              <Flex justify="space-between" fontSize="11px" color="#64748B" mb="1.5">
                <Text as="span">Foundation Outreaches</Text>
                <Text as="span">Expanding Schools</Text>
                <Text as="span" color="#059669" fontWeight="800">
                  10,000+ Reached
                </Text>
              </Flex>
              <Box
                h="46px"
                bg="#FFFFFF"
                borderRadius="12px"
                p="2"
                border="1px solid"
                borderColor="#E2E8F0"
                display="flex"
                alignItems="center"
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 300 40"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="sparklineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#34D399" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 5,34 Q 45,30 85,24 T 175,17 T 255,10 T 295,4"
                    stroke="url(#sparklineGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="85" cy="24" r="3.5" fill="#10B981" />
                  <circle cx="175" cy="17" r="3.5" fill="#10B981" />
                  <circle cx="255" cy="10" r="3.5" fill="#059669" />
                  <circle cx="295" cy="4" r="4.5" fill="#059669" />
                </svg>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Container>
    </Box>
  )
}
