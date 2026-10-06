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
} from "@chakra-ui/react"
import Link from "next/link"
import {
  BookOpenIcon,
  HeartHandshakeIcon,
  TrophyIcon,
  UsersIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "@/components/icons"

interface ApproachStep {
  step: string
  title: string
  tag: string
  description: string
  icon: React.ReactNode
  accentColor: string
  accentBg: string
  linkHref: string
  linkLabel: string
}

const APPROACH_STEPS: ApproachStep[] = [
  {
    step: "PILLAR 01",
    title: "Mindset Education & Self-Discovery",
    tag: "AWARENESS & IDENTITY",
    description:
      "We help young people dismantle subconscious limiting beliefs, develop emotional intelligence, and anchor a clear understanding of their unique purpose and latent capacity.",
    icon: <BookOpenIcon size={22} color="#051B64" />,
    accentColor: "#051B64",
    accentBg: "rgba(5, 27, 100, 0.08)",
    linkHref: "/programs/leadership",
    linkLabel: "Explore Workshops",
  },
  {
    step: "PILLAR 02",
    title: "Transformative Mentorship Circles",
    tag: "RELATIONAL GUIDANCE",
    description:
      "Connecting youths with seasoned professionals, civic leaders, and industry role models who offer personalized guidance, accountability, and life mapping.",
    icon: <HeartHandshakeIcon size={22} color="#149191" />,
    accentColor: "#149191",
    accentBg: "rgba(20, 145, 145, 0.1)",
    linkHref: "/programs/mentorship",
    linkLabel: "Mentorship Network",
  },
  {
    step: "PILLAR 03",
    title: "Leadership & Future Skills Labs",
    tag: "COMPETENCY & EXCELLENCE",
    description:
      "Equipping teenagers and young adults with critical thinking, ethical leadership principles, creative problem solving, and practical modern vocational skills.",
    icon: <TrophyIcon size={22} color="#059669" />,
    accentColor: "#059669",
    accentBg: "rgba(5, 150, 105, 0.1)",
    linkHref: "/programs/skills",
    linkLabel: "Skills & Tech Tracks",
  },
  {
    step: "PILLAR 04",
    title: "Purpose-Driven Community Action",
    tag: "GRASSROOTS IMPACT",
    description:
      "Through flagship outreaches like NEEDY NEEDS YOU (NNY), Champions apply what they learn by serving vulnerable children and solving problems in their local communities.",
    icon: <UsersIcon size={22} color="#D97706" />,
    accentColor: "#D97706",
    accentBg: "rgba(245, 158, 11, 0.12)",
    linkHref: "/programs/nny",
    linkLabel: "View Outreaches",
  },
]

export function OurApproach() {
  return (
    <Box
      as="section"
      id="approach"
      position="relative"
      py={{ base: "14", sm: "16", md: "20" }}
      bg="#FFFFFF"
      overflow="hidden"
    >
      <Container maxW="1240px" px={{ base: "4", sm: "6", md: "8", lg: "10" }}>
        {/* Header */}
        <VStack align="flex-start" gap="2.5" mb={{ base: "10", md: "14" }}>
          <HStack
            bg="rgba(5, 150, 105, 0.08)"
            border="1px solid rgba(5, 150, 105, 0.2)"
            px="3.5"
            py="1"
            borderRadius="full"
            gap="2"
          >
            <Box w="6px" h="6px" borderRadius="full" bg="#059669" />
            <Text
              fontSize="11px"
              fontWeight="800"
              color="#059669"
              letterSpacing="0.1em"
              textTransform="uppercase"
            >
              OUR 4-PILLAR METHODOLOGY
            </Text>
          </HStack>

          <Heading
            as="h2"
            fontSize={{ base: "26px", sm: "32px", md: "38px" }}
            fontWeight="900"
            color="#051B64"
            lineHeight="1.15"
            letterSpacing="-0.02em"
          >
            Our Approach: How We Raise Champions
          </Heading>

          <Text fontSize={{ base: "14px", md: "15.5px" }} color="#64748B" maxW="680px" lineHeight="1.6">
            We don’t just inspire in the moment; we walk with young people through a systematic, holistic development framework from self-awareness to societal leadership.
          </Text>
        </VStack>

        {/* 4 Pillars Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={{ base: "5", md: "6" }}>
          {APPROACH_STEPS.map((step, idx) => (
            <Box
              key={idx}
              bg="#FFFFFF"
              borderRadius="22px"
              p={{ base: "5", sm: "6" }}
              border="1px solid"
              borderColor="#E2E8F0"
              boxShadow="0 8px 24px -4px rgba(5, 27, 100, 0.04)"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              position="relative"
              transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "0 16px 36px -6px rgba(5, 27, 100, 0.1)",
                borderColor: step.accentColor,
              }}
            >
              <Box>
                {/* Step Pill & Icon */}
                <Flex justify="space-between" align="center" mb="4">
                  <Box
                    p="3"
                    borderRadius="14px"
                    bg={step.accentBg}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {step.icon}
                  </Box>
                  <Text
                    fontSize="11px"
                    fontWeight="800"
                    color={step.accentColor}
                    letterSpacing="0.08em"
                  >
                    {step.step}
                  </Text>
                </Flex>

                <Text
                  fontSize="10px"
                  fontWeight="800"
                  color="#94A3B8"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  mb="1"
                >
                  {step.tag}
                </Text>

                <Heading
                  as="h3"
                  fontSize="17px"
                  fontWeight="800"
                  color="#051B64"
                  lineHeight="1.3"
                  mb="3"
                >
                  {step.title}
                </Heading>

                <Text fontSize="12.5px" color="#64748B" lineHeight="1.6" mb="4">
                  {step.description}
                </Text>
              </Box>

              <Link href={step.linkHref} style={{ textDecoration: "none" }}>
                <HStack
                  gap="1.5"
                  color={step.accentColor}
                  fontSize="12px"
                  fontWeight="700"
                  pt="2"
                  borderTop="1px solid"
                  borderColor="#F1F5F9"
                  transition="gap 0.2s ease"
                  _hover={{ gap: "2.5" }}
                >
                  <Text>{step.linkLabel}</Text>
                  <ArrowRightIcon size={12} />
                </HStack>
              </Link>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
