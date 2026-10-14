"use client"

import React from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  HStack,
  VStack,
} from "@chakra-ui/react"
import Image from "next/image"
import {
  TrophyIcon,
  SparklesIcon,
} from "@/components/icons"
import { useInView } from "@/hooks/useInView"
import { LiveDot } from "@/components/LiveDot"

export function OurStorySection() {
  const { ref, isInView } = useInView({ threshold: 0.15 })

  return (
    <Box
      ref={ref}
      as="section"
      id="story"
      position="relative"
      py={{ base: "12", sm: "16", md: "20", lg: "24" }}
      bg="linear-gradient(180deg, #EBF5FF 0%, #F4F9FF 50%, #FFFFFF 100%)"
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor="rgba(14, 165, 233, 0.15)"
      overflow="hidden"
    >
      {/* Subtle ambient decorative glows */}
      <Box
        position="absolute"
        top="10%"
        left="-5%"
        w="500px"
        h="500px"
        bg="radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, transparent 70%)"
        filter="blur(70px)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="10%"
        right="-5%"
        w="500px"
        h="500px"
        bg="radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%)"
        filter="blur(70px)"
        pointerEvents="none"
      />

      <Container maxW="1200px" px={{ base: "4", sm: "6", md: "8" }} position="relative" zIndex={1}>
        <SimpleGrid columns={{ base: 1, lg: 12 }} gap={{ base: "10", lg: "14" }} alignItems="center">
          
          {/* Left Column: The Narrative (Reveals with staggered slide up) */}
          <VStack
            align="flex-start"
            gap={{ base: "4", md: "5" }}
            gridColumn={{ base: "1", lg: "span 7" }}
            opacity={isInView ? 1 : 0}
            transform={isInView ? "translateY(0px)" : "translateY(24px)"}
            transition="opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)"
          >
            
            {/* Clean Section Tag */}
            <HStack
              bg="rgba(14, 165, 233, 0.12)"
              border="1px solid rgba(14, 165, 233, 0.28)"
              px="3.5"
              py="1"
              borderRadius="full"
              gap="2"
            >
              <LiveDot color="#0284C7" size={6} />
              <Text
                fontSize="11px"
                fontWeight="800"
                color="#0369A1"
                letterSpacing="0.08em"
                textTransform="uppercase"
              >
                OUR STORY
              </Text>
            </HStack>

            {/* Main Headline */}
            <Heading
              as="h2"
              fontSize={{ base: "28px", sm: "34px", md: "40px", lg: "44px" }}
              fontWeight="900"
              color="#051B64"
              lineHeight="1.15"
              letterSpacing="-0.025em"
            >
              Raising Champions Everyday
            </Heading>

            {/* Lead Hook */}
            <Text
              fontSize={{ base: "15px", sm: "16px", md: "17px" }}
              fontWeight="600"
              color="#0284C7"
              lineHeight="1.6"
            >
              Every generation needs young people who dare to think differently, lead courageously, and live purposefully.
            </Text>

            {/* Concise Story Body */}
            <VStack align="flex-start" gap="3.5" color="#334155" fontSize={{ base: "14px", md: "15px" }} lineHeight="1.75">
              <Text>
                <Box as="span" fontWeight="700" color="#051B64">
                  I IMPACT INITIATIVE
                </Box>{" "}
                was born from a conviction that young people possess enormous potential, but that potential can be limited by lack of guidance, confidence, exposure, and opportunity.
              </Text>

              <Text>
                We exist to help young people aged 13–25 discover and develop that potential through mentorship, leadership development, mindset education, and purpose-driven programmes.
              </Text>

              <Text>
                We call them{" "}
                <Box as="span" fontWeight="800" color="#051B64">
                  Champions
                </Box>{" "}
                because we believe every young person has the capacity to grow, lead, and make a difference.
              </Text>
            </VStack>

            {/* Highlighted Closing Statement */}
            <Box
              w="100%"
              bg="linear-gradient(135deg, rgba(5, 27, 100, 0.04) 0%, rgba(14, 165, 233, 0.08) 100%)"
              borderLeft="4px solid #0284C7"
              borderTop="1px solid rgba(14, 165, 233, 0.2)"
              borderRight="1px solid rgba(14, 165, 233, 0.2)"
              borderBottom="1px solid rgba(14, 165, 233, 0.2)"
              borderRadius="12px"
              p={{ base: "4", sm: "5" }}
              mt="2"
              boxShadow="0 4px 16px rgba(5, 27, 100, 0.04)"
            >
              <HStack gap="3" align="flex-start">
                <Box p="1.5" borderRadius="md" bg="rgba(14, 165, 233, 0.15)" color="#0284C7" flexShrink={0} mt="0.5">
                  <SparklesIcon size={16} />
                </Box>
                <Text
                  fontSize={{ base: "13.5px", sm: "14.5px" }}
                  fontWeight="700"
                  color="#051B64"
                  lineHeight="1.6"
                >
                  “We are not simply preparing young people for tomorrow. We are empowering them to make a difference today.”
                </Text>
              </HStack>
            </Box>

          </VStack>

          {/* Right Column: High-Impact Visual (Reveals with slight delay) */}
          <Box
            gridColumn={{ base: "1", lg: "span 5" }}
            position="relative"
            w="100%"
            maxW={{ base: "100%", sm: "480px", lg: "100%" }}
            mx="auto"
            opacity={isInView ? 1 : 0}
            transform={isInView ? "translateY(0px)" : "translateY(28px)"}
            transition="opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.15s"
          >
            {/* Image Container */}
            <Box
              position="relative"
              w="100%"
              h={{ base: "300px", sm: "380px", md: "440px", lg: "480px" }}
              borderRadius={{ base: "20px", md: "26px" }}
              overflow="hidden"
              boxShadow="0 20px 45px -10px rgba(5, 27, 100, 0.16)"
              border="2px solid rgba(255, 255, 255, 0.8)"
              bg="#FFFFFF"
            >
              <Image
                src="/iimpact-kids.png"
                alt="I-Impact Champions learning and growing together"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 480px"
                style={{ objectFit: "cover", objectPosition: "center 25%" }}
                priority
              />
            </Box>

            {/* Floating Champion Badge with subtle continuous float */}
            <Box
              className="animate-float-slow"
              position="absolute"
              bottom={{ base: "-16px", md: "-18px" }}
              left={{ base: "12px", sm: "auto" }}
              right={{ base: "12px", sm: "-12px", md: "-18px" }}
              bg="rgba(255, 255, 255, 0.98)"
              backdropFilter="blur(12px)"
              p={{ base: "3.5", sm: "4" }}
              borderRadius="18px"
              border="1px solid rgba(14, 165, 233, 0.25)"
              boxShadow="0 14px 30px -6px rgba(5, 27, 100, 0.16)"
              maxW={{ base: "100%", sm: "290px" }}
            >
              <HStack gap="3" align="center">
                <Box
                  p="2.5"
                  borderRadius="12px"
                  bg="rgba(245, 158, 11, 0.15)"
                  color="#D97706"
                  flexShrink={0}
                >
                  <TrophyIcon size={20} />
                </Box>
                <VStack align="flex-start" gap="0.5">
                  <Text fontSize="12px" fontWeight="800" color="#051B64" letterSpacing="0.02em">
                    The Champion Mindset
                  </Text>
                  <Text fontSize="11px" color="#64748B" lineHeight="1.35" fontWeight="500">
                    Empowered with vision, character, and the courage to lead today.
                  </Text>
                </VStack>
              </HStack>
            </Box>

            {/* Top Right Demographic Badge */}
            <Box
              position="absolute"
              top="16px"
              right="16px"
              bg="rgba(5, 27, 100, 0.85)"
              backdropFilter="blur(8px)"
              color="white"
              px="3"
              py="1"
              borderRadius="full"
              fontSize="11px"
              fontWeight="700"
              letterSpacing="0.05em"
              border="1px solid rgba(255, 255, 255, 0.2)"
            >
              Ages 13–25
            </Box>

          </Box>

        </SimpleGrid>
      </Container>
    </Box>
  )
}

