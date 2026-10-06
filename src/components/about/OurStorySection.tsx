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
import Image from "next/image"
import {
  TrophyIcon,
  SparklesIcon,
  CheckCircleIcon,
} from "@/components/icons"

export function OurStorySection() {
  return (
    <Box
      as="section"
      id="story"
      position="relative"
      py={{ base: "14", sm: "16", md: "20", lg: "24" }}
      bg="linear-gradient(180deg, #EBF5FF 0%, #F0F7FF 50%, #F5FAFF 100%)"
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor="rgba(14, 165, 233, 0.18)"
      overflow="hidden"
    >
      {/* Decorative sky blue ambient glows */}
      <Box
        position="absolute"
        top="15%"
        left="-5%"
        w="600px"
        h="600px"
        bg="radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)"
        filter="blur(75px)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="10%"
        right="-5%"
        w="650px"
        h="650px"
        bg="radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, rgba(5, 27, 100, 0.04) 50%, transparent 70%)"
        filter="blur(80px)"
        pointerEvents="none"
      />

      <Container maxW="1240px" px={{ base: "4", sm: "6", md: "8", lg: "10" }} position="relative" zIndex={1}>
        {/* Section Header */}
        <VStack align="flex-start" gap="2" mb={{ base: "8", md: "12" }}>
          <HStack
            bg="rgba(14, 165, 233, 0.12)"
            border="1px solid rgba(14, 165, 233, 0.3)"
            px="3.5"
            py="1"
            borderRadius="full"
            gap="2"
          >
            <Box w="6px" h="6px" borderRadius="full" bg="#0284C7" />
            <Text
              fontSize="11px"
              fontWeight="800"
              color="#0369A1"
              letterSpacing="0.08em"
              textTransform="uppercase"
            >
              OUR STORY & CONVICTION
            </Text>
          </HStack>

          <Heading
            as="h2"
            fontSize={{ base: "26px", sm: "32px", md: "38px", lg: "42px" }}
            fontWeight="900"
            color="#051B64"
            lineHeight="1.15"
            letterSpacing="-0.025em"
          >
            Our Story & Conviction
          </Heading>

          <Text fontSize={{ base: "13.5px", md: "15px" }} color="#475569" maxW="720px" lineHeight="1.6">
            Every generation needs young people who dare to think differently, lead courageously, and live purposefully. I IMPACT INITIATIVE exists to help raise them.
          </Text>
        </VStack>

        {/* Story Block 1: The Spark & Conviction */}
        <Box
          bg="linear-gradient(135deg, #051B64 0%, #0B2B8A 100%)"
          color="white"
          borderRadius={{ base: "20px", md: "26px" }}
          p={{ base: "6", sm: "8", md: "10", lg: "12" }}
          mb={{ base: "10", md: "14" }}
          position="relative"
          overflow="hidden"
          boxShadow="0 20px 45px -10px rgba(5, 27, 100, 0.28)"
        >
          {/* Subtle watermark circle */}
          <Box
            position="absolute"
            top="-20%"
            right="-10%"
            w="400px"
            h="400px"
            bg="radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, transparent 70%)"
            filter="blur(50px)"
            pointerEvents="none"
          />

          <Flex
            direction={{ base: "column", lg: "row" }}
            align={{ base: "flex-start", lg: "center" }}
            justify="space-between"
            gap={{ base: "8", lg: "10" }}
          >
            <VStack align="flex-start" gap="4" flex="1.2">
              <HStack gap="2">
                <Box p="2" borderRadius="lg" bg="rgba(255, 255, 255, 0.12)" color="#FACC15">
                  <SparklesIcon size={18} />
                </Box>
                <Text fontSize="12px" fontWeight="800" color="#93C5FD" letterSpacing="0.1em" textTransform="uppercase">
                  THE FOUNDATIONAL CONVICTION
                </Text>
              </HStack>

              <Heading
                as="h3"
                fontSize={{ base: "20px", sm: "24px", md: "28px", lg: "32px" }}
                fontWeight="800"
                lineHeight="1.25"
                letterSpacing="-0.02em"
                color="white"
              >
                “The potential of young people is far greater than the opportunities, expectations, and limitations that surround them.”
              </Heading>

              <Text fontSize={{ base: "13.5px", md: "15px" }} color="whiteAlpha.850" lineHeight="1.7">
                Across communities, many young people grow up without the guidance, confidence, exposure, and support they need to discover who they are and what they can become. Too often, their dreams are limited by their circumstances, their abilities are overshadowed by self-doubt, and their voices are overlooked simply because of their age.
              </Text>

              {/* Bold Turning Point Callout */}
              <Box
                bg="rgba(16, 185, 129, 0.18)"
                border="1px solid rgba(16, 185, 129, 0.4)"
                px="4"
                py="2.5"
                borderRadius="12px"
                mt="2"
              >
                <HStack gap="2.5">
                  <CheckCircleIcon size={18} color="#34D399" />
                  <Text fontSize="14px" fontWeight="800" color="#6EE7B7">
                    We believe this must change.
                  </Text>
                </HStack>
              </Box>
            </VStack>

            {/* Right Side Image in Conviction Card */}
            <Box
              flex="0.85"
              w="100%"
              maxW={{ base: "100%", lg: "420px" }}
              position="relative"
            >
              <Box
                position="relative"
                w="100%"
                h={{ base: "240px", sm: "280px", md: "320px" }}
                borderRadius="20px"
                overflow="hidden"
                border="2px solid rgba(255, 255, 255, 0.15)"
                boxShadow="0 15px 35px rgba(0, 0, 0, 0.3)"
              >
                <Image
                  src="/annie-spratt-ennonzaLSp0-unsplash1-1536x1069.jpeg"
                  alt="Young African children smiling with thumbs up - Hope and joy"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  style={{ objectFit: "cover" }}
                />
              </Box>
            </Box>
          </Flex>
        </Box>

        {/* Story Block 2: The Mission & The Champion Philosophy */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: "8", lg: "12" }} alignSelf="stretch" mb={{ base: "10", md: "14" }}>
          {/* Left Column: Photo with Floating Champion Tag */}
          <Box position="relative">
            <Box
              position="relative"
              w="100%"
              h={{ base: "280px", sm: "340px", md: "400px" }}
              borderRadius="24px"
              overflow="hidden"
              boxShadow="0 16px 36px -8px rgba(5, 27, 100, 0.14)"
              border="1px solid rgba(14, 165, 233, 0.2)"
              bg="#FFFFFF"
            >
              <Image
                src="/iimpact-kids.png"
                alt="Young I-Impact champions in branded shirts"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                style={{ objectFit: "cover", objectPosition: "center 20%" }}
              />
            </Box>

            {/* Floating Badge */}
            <Box
              position="absolute"
              bottom="-14px"
              right={{ base: "10px", md: "-14px" }}
              bg="rgba(255, 255, 255, 0.98)"
              backdropFilter="blur(10px)"
              p="4"
              borderRadius="18px"
              border="1px solid rgba(14, 165, 233, 0.25)"
              boxShadow="0 12px 28px -6px rgba(5, 27, 100, 0.15)"
              maxW="280px"
            >
              <HStack gap="2.5" align="flex-start">
                <Box p="2" borderRadius="10px" bg="rgba(245, 158, 11, 0.15)" color="#D97706" flexShrink={0}>
                  <TrophyIcon size={16} />
                </Box>
                <VStack align="flex-start" gap="0.5">
                  <Text fontSize="12px" fontWeight="800" color="#051B64">
                    Why We Call Them Champions
                  </Text>
                  <Text fontSize="11px" color="#64748B" lineHeight="1.3">
                    Every youth possesses the innate capacity to grow, lead, and transform society.
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </Box>

          {/* Right Column: Mission Details & Empowering Today */}
          <VStack align="flex-start" justify="center" gap={{ base: "4", md: "5" }}>
            <HStack gap="2">
              <Box w="6px" h="6px" borderRadius="full" bg="#059669" />
              <Text fontSize="11px" fontWeight="800" color="#059669" letterSpacing="0.1em" textTransform="uppercase">
                AGES 13 TO 25 • OUR CORE DEMOGRAPHIC
              </Text>
            </HStack>

            <Heading
              as="h3"
              fontSize={{ base: "22px", sm: "26px", md: "30px" }}
              fontWeight="900"
              color="#051B64"
              lineHeight="1.2"
              letterSpacing="-0.02em"
            >
              Shifting Mindsets, Expanding Perspectives & Equipping for Tomorrow.
            </Heading>

            <Text fontSize={{ base: "13.5px", md: "14.5px" }} color="#334155" lineHeight="1.7">
              <Box as="span" fontWeight="700" color="#051B64">
                I IMPACT INITIATIVE
              </Box>{" "}
              is a youth-development organisation committed to shifting mindsets, expanding perspectives, and equipping young people between the ages of 13 and 25 to discover and develop their potential.
            </Text>

            <Text fontSize={{ base: "13.5px", md: "14.5px" }} color="#334155" lineHeight="1.7">
              Through mentorship, leadership development, mindset education, and purpose-driven programmes, we create opportunities for young people to challenge limiting beliefs, cultivate excellence, develop emotional intelligence, and become intentional about their lives and the world around them.
            </Text>

            {/* Highlighted Quote Box */}
            <Box
              bg="rgba(255, 255, 255, 0.95)"
              borderLeft="4px solid #10B981"
              borderTop="1px solid rgba(16, 185, 129, 0.2)"
              borderRight="1px solid rgba(16, 185, 129, 0.2)"
              borderBottom="1px solid rgba(16, 185, 129, 0.2)"
              borderRadius="12px"
              p="4"
              w="100%"
              boxShadow="0 4px 14px rgba(5, 27, 100, 0.04)"
            >
              <Text fontSize="13px" fontWeight="700" color="#065F46" lineHeight="1.6">
                “At I IMPACT INITIATIVE, we are not simply preparing young people for tomorrow. We are empowering them to make a difference today.”
              </Text>
            </Box>
          </VStack>
        </SimpleGrid>

        {/* 3 Value Pillars in Story */}
        <Box
          bg="#FFFFFF"
          p={{ base: "6", md: "8" }}
          borderRadius="20px"
          border="1px solid"
          borderColor="rgba(14, 165, 233, 0.2)"
          boxShadow="0 10px 30px -6px rgba(5, 27, 100, 0.06)"
        >
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: "5", md: "6" }}>
            <Box>
              <HStack gap="2" mb="2">
                <Box p="1.5" borderRadius="md" bg="rgba(5, 27, 100, 0.08)" color="#051B64">
                  <CheckCircleIcon size={14} />
                </Box>
                <Text fontSize="14px" fontWeight="800" color="#051B64">
                  Critical Thinking
                </Text>
              </HStack>
              <Text fontSize="12.5px" color="#64748B" lineHeight="1.6">
                Teaching young people to question assumptions, solve complex real-world problems, and make value-driven decisions.
              </Text>
            </Box>

            <Box>
              <HStack gap="2" mb="2">
                <Box p="1.5" borderRadius="md" bg="rgba(14, 165, 233, 0.12)" color="#0284C7">
                  <CheckCircleIcon size={14} />
                </Box>
                <Text fontSize="14px" fontWeight="800" color="#051B64">
                  Responsible Leadership
                </Text>
              </HStack>
              <Text fontSize="12.5px" color="#64748B" lineHeight="1.6">
                Cultivating ethical leaders who take accountability for their peers, families, communities, and nations.
              </Text>
            </Box>

            <Box>
              <HStack gap="2" mb="2">
                <Box p="1.5" borderRadius="md" bg="rgba(245, 158, 11, 0.12)" color="#B45309">
                  <CheckCircleIcon size={14} />
                </Box>
                <Text fontSize="14px" fontWeight="800" color="#051B64">
                  Meaningful Contribution
                </Text>
              </HStack>
              <Text fontSize="12.5px" color="#64748B" lineHeight="1.6">
                Moving beyond personal success to drive tangible, measurable grassroots change through humanitarian service.
              </Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  )
}
