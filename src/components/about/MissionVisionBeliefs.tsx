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
import {
  TrophyIcon,
  SparklesIcon,
  CheckCircleIcon,
  HeartHandshakeIcon,
  UsersIcon,
  BookOpenIcon,
} from "@/components/icons"

interface BeliefItem {
  number: string
  title: string
  description: string
}

const BELIEFS: BeliefItem[] = [
  {
    number: "01",
    title: "Latent Greatness",
    description:
      "Every young person carries innate brilliance and leadership capacity, regardless of socioeconomic background or current circumstances.",
  },
  {
    number: "02",
    title: "Mindset Precedes Mastery",
    description:
      "Long-term transformation begins from within. Dismantling limiting beliefs unlocks resilience, emotional intelligence, and relentless drive.",
  },
  {
    number: "03",
    title: "Action Today, Not Just Tomorrow",
    description:
      "Youth are active contributors to society today. We empower them to lead, innovate, and serve their communities immediately.",
  },
  {
    number: "04",
    title: "Relational Mentorship",
    description:
      "Structured, compassionate mentorship from seasoned role models bridges the opportunity gap and creates lifelong ripple effects.",
  },
]

export function MissionVisionBeliefs() {
  return (
    <Box
      as="section"
      id="vision"
      position="relative"
      py={{ base: "14", sm: "16", md: "20" }}
      bg="linear-gradient(180deg, #FBFDFF 0%, #F4F8FE 100%)"
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor="rgba(5, 27, 100, 0.06)"
      overflow="hidden"
    >
      {/* Background ambient lighting */}
      <Box
        position="absolute"
        top="10%"
        left="50%"
        transform="translateX(-50%)"
        w="750px"
        h="400px"
        bg="radial-gradient(ellipse, rgba(20, 145, 145, 0.06) 0%, transparent 70%)"
        filter="blur(60px)"
        pointerEvents="none"
      />

      <Container maxW="1240px" px={{ base: "4", sm: "6", md: "8", lg: "10" }} position="relative" zIndex={1}>
        {/* Section Heading */}
        <VStack align="center" textAlign="center" gap="2.5" mb={{ base: "10", md: "14" }}>
          <HStack
            bg="rgba(5, 27, 100, 0.06)"
            border="1px solid rgba(5, 27, 100, 0.12)"
            px="3.5"
            py="1"
            borderRadius="full"
            gap="2"
          >
            <Box w="6px" h="6px" borderRadius="full" bg="#051B64" />
            <Text
              fontSize="11px"
              fontWeight="800"
              color="#051B64"
              letterSpacing="0.1em"
              textTransform="uppercase"
            >
              PURPOSE, HORIZON & CORE CONVICTIONS
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
            Our Mission, Vision & What We Believe
          </Heading>

          <Text fontSize={{ base: "14px", md: "15.5px" }} color="#64748B" maxW="640px" lineHeight="1.6">
            The foundational principles and guiding compass that drive every initiative, conference, workshop, and mentorship cohort at I-Impact.
          </Text>
        </VStack>

        {/* Mission & Vision Side-by-Side Cards */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: "6", md: "8" }} mb={{ base: "10", md: "14" }}>
          {/* Mission Card */}
          <Box
            bg="#FFFFFF"
            p={{ base: "6", sm: "8", md: "9" }}
            borderRadius="24px"
            border="1px solid"
            borderColor="rgba(20, 145, 145, 0.2)"
            boxShadow="0 12px 32px -6px rgba(5, 27, 100, 0.06)"
            position="relative"
            overflow="hidden"
            transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "0 18px 40px -6px rgba(20, 145, 145, 0.15)",
              borderColor: "#149191",
            }}
          >
            {/* Subtle top color bar */}
            <Box position="absolute" top="0" left="0" right="0" h="4px" bg="linear-gradient(90deg, #149191, #059669)" />

            <VStack align="flex-start" gap="4">
              <Flex
                w="48px"
                h="48px"
                borderRadius="14px"
                bg="rgba(20, 145, 145, 0.12)"
                color="#149191"
                align="center"
                justify="center"
              >
                <TrophyIcon size={24} />
              </Flex>

              <Box>
                <Text fontSize="11px" fontWeight="800" color="#149191" letterSpacing="0.1em" textTransform="uppercase" mb="1">
                  OUR MISSION
                </Text>
                <Heading as="h3" fontSize={{ base: "20px", sm: "22px", md: "24px" }} fontWeight="800" color="#051B64">
                  Shifting Mindsets & Equipping Potential
                </Heading>
              </Box>

              <Text fontSize={{ base: "13.5px", md: "14.5px" }} color="#4B5563" lineHeight="1.7">
                To shift mindsets, expand perspectives, and equip young people between the ages of 13 and 25 to discover and develop their potential through mentorship, leadership development, mindset education, and purpose-driven programmes.
              </Text>

              {/* Bullet Highlights */}
              <VStack align="flex-start" gap="2" pt="2" w="100%">
                {[
                  "Challenge limiting beliefs and expand perspectives",
                  "Cultivate excellence and emotional intelligence",
                  "Enable intentional living and active societal impact",
                ].map((item, idx) => (
                  <HStack key={idx} gap="2" align="flex-start">
                    <Box color="#059669" mt="0.5" flexShrink={0}>
                      <CheckCircleIcon size={15} />
                    </Box>
                    <Text fontSize="12.5px" fontWeight="600" color="#334155">
                      {item}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </VStack>
          </Box>

          {/* Vision Card */}
          <Box
            bg="#FFFFFF"
            p={{ base: "6", sm: "8", md: "9" }}
            borderRadius="24px"
            border="1px solid"
            borderColor="rgba(5, 27, 100, 0.12)"
            boxShadow="0 12px 32px -6px rgba(5, 27, 100, 0.06)"
            position="relative"
            overflow="hidden"
            transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "0 18px 40px -6px rgba(5, 27, 100, 0.12)",
              borderColor: "#051B64",
            }}
          >
            {/* Subtle top color bar */}
            <Box position="absolute" top="0" left="0" right="0" h="4px" bg="linear-gradient(90deg, #051B64, #3B82F6)" />

            <VStack align="flex-start" gap="4">
              <Flex
                w="48px"
                h="48px"
                borderRadius="14px"
                bg="rgba(5, 27, 100, 0.08)"
                color="#051B64"
                align="center"
                justify="center"
              >
                <SparklesIcon size={24} />
              </Flex>

              <Box>
                <Text fontSize="11px" fontWeight="800" color="#051B64" letterSpacing="0.1em" textTransform="uppercase" mb="1">
                  OUR VISION
                </Text>
                <Heading as="h3" fontSize={{ base: "20px", sm: "22px", md: "24px" }} fontWeight="800" color="#051B64">
                  A Generation of Transformative Leaders
                </Heading>
              </Box>

              <Text fontSize={{ base: "13.5px", md: "14.5px" }} color="#4B5563" lineHeight="1.7">
                To raise a generation of young people that thinks critically, leads responsibly, pursues excellence, and contributes meaningfully to society across Nigeria and the entire African continent.
              </Text>

              {/* Bullet Highlights */}
              <VStack align="flex-start" gap="2" pt="2" w="100%">
                {[
                  "Cultivating ethical leaders in every sector",
                  "Bridging the opportunity divide through grassroots access",
                  "Establishing sustainable youth development hubs across Africa",
                ].map((item, idx) => (
                  <HStack key={idx} gap="2" align="flex-start">
                    <Box color="#051B64" mt="0.5" flexShrink={0}>
                      <CheckCircleIcon size={15} />
                    </Box>
                    <Text fontSize="12.5px" fontWeight="600" color="#334155">
                      {item}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </VStack>
          </Box>
        </SimpleGrid>

        {/* What We Believe (Core Convictions Grid) */}
        <Box
          bg="#FFFFFF"
          p={{ base: "6", sm: "8", md: "10" }}
          borderRadius="24px"
          border="1px solid"
          borderColor="#E2E8F0"
          boxShadow="0 8px 24px -4px rgba(5, 27, 100, 0.04)"
        >
          <VStack align="flex-start" gap="2" mb="8">
            <HStack gap="2">
              <Box p="1.5" borderRadius="md" bg="rgba(245, 158, 11, 0.12)" color="#B45309">
                <BookOpenIcon size={16} />
              </Box>
              <Text fontSize="11px" fontWeight="800" color="#B45309" letterSpacing="0.1em" textTransform="uppercase">
                WHAT WE BELIEVE
              </Text>
            </HStack>
            <Heading as="h3" fontSize={{ base: "20px", sm: "24px", md: "26px" }} fontWeight="800" color="#051B64">
              Our 4 Core Beliefs
            </Heading>
            <Text fontSize="13.5px" color="#64748B">
              These shared convictions form the bedrock of our culture and how we nurture every Champion.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={{ base: "5", md: "6" }}>
            {BELIEFS.map((belief, idx) => (
              <Box
                key={idx}
                p="5"
                borderRadius="16px"
                bg="#F8FAFC"
                border="1px solid"
                borderColor="#EDF2F7"
                position="relative"
                transition="all 0.25s ease"
                _hover={{
                  bg: "#FFFFFF",
                  borderColor: "rgba(20, 145, 145, 0.3)",
                  boxShadow: "0 8px 20px -4px rgba(5, 27, 100, 0.08)",
                  transform: "translateY(-2px)",
                }}
              >
                <Text
                  fontSize="22px"
                  fontWeight="900"
                  color="#CBD5E1"
                  mb="2"
                  fontFamily="monospace"
                >
                  {belief.number}
                </Text>
                <Text fontSize="14px" fontWeight="800" color="#051B64" mb="2">
                  {belief.title}
                </Text>
                <Text fontSize="12.5px" color="#64748B" lineHeight="1.6">
                  {belief.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  )
}
