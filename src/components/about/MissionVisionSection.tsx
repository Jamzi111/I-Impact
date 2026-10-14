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
  Flex,
} from "@chakra-ui/react"
import {
  SparklesIcon,
  GlobeIcon,
  TrophyIcon,
} from "@/components/icons"
import { useInView } from "@/hooks/useInView"
import { LiveDot } from "@/components/LiveDot"

export function MissionVisionSection() {
  const { ref, isInView } = useInView({
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px",
    triggerOnce: false,
  })

  return (
    <Box
      ref={ref}
      as="section"
      id="mission-vision"
      position="relative"
      py={{ base: "14", sm: "16", md: "20", lg: "24" }}
      bg="linear-gradient(180deg, #FFFFFF 0%, #F6FAFD 50%, #FFFFFF 100%)"
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor="rgba(14, 165, 233, 0.12)"
      overflow="hidden"
    >
      {/* Ambient background glow */}
      <Box
        position="absolute"
        top="25%"
        left="50%"
        transform="translateX(-50%)"
        w={{ base: "320px", sm: "600px", md: "900px", lg: "1100px" }}
        h={{ base: "260px", sm: "360px", md: "460px" }}
        bg="radial-gradient(ellipse at center, rgba(14, 165, 233, 0.08) 0%, rgba(16, 185, 129, 0.05) 45%, transparent 70%)"
        filter="blur(80px)"
        pointerEvents="none"
        zIndex={0}
      />

      <Container maxW="1200px" px={{ base: "5", sm: "6", md: "8", lg: "10" }} position="relative" zIndex={1}>
        {/* Section Header */}
        <VStack
          align="center"
          textAlign="center"
          gap="3"
          mb={{ base: "10", sm: "12", md: "16" }}
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(22px)",
            transition: "opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Eyebrow Badge */}
          <HStack
            bg="rgba(14, 165, 233, 0.09)"
            border="1px solid rgba(14, 165, 233, 0.25)"
            px="4"
            py="1.5"
            borderRadius="full"
            gap="2"
            boxShadow="0 2px 8px rgba(14, 165, 233, 0.06)"
          >
            <LiveDot color="#0284C7" size={6} />
            <Text
              fontSize="11.5px"
              fontWeight="800"
              color="#0369A1"
              letterSpacing="0.1em"
              textTransform="uppercase"
            >
              OUR PURPOSE
            </Text>
          </HStack>

          {/* Section Heading */}
          <Heading
            as="h2"
            fontSize={{ base: "26px", sm: "34px", md: "40px", lg: "44px" }}
            fontWeight="900"
            color="#051B64"
            lineHeight="1.15"
            letterSpacing="-0.025em"
          >
            What Drives I IMPACT INITIATIVE
          </Heading>

          {/* Subtitle */}
          <Text
            fontSize={{ base: "14px", sm: "15px", md: "16px" }}
            color="#64748B"
            maxW="620px"
            lineHeight="1.6"
          >
            The foundational conviction directing our active work today and the generational future we aspire to create.
          </Text>

          {/* Header divider */}
          <Box
            w={{ base: "120px", sm: "180px", md: "220px" }}
            h="1.5px"
            mt="2"
            bg="linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.4), transparent)"
          />
        </VStack>

        {/* Editorial Side-by-Side Presentation (No Generic Boxed Cards) */}
        <Box
          position="relative"
          mb={{ base: "10", sm: "12", md: "14" }}
          py={{ base: "2", md: "4" }}
        >
          <SimpleGrid columns={{ base: 1, md: 12 }} gap={{ base: "10", md: "0" }} alignItems="stretch">
            {/* Left Column: MISSION (01) */}
            <Box
              gridColumn={{ base: "1", md: "span 6" }}
              pr={{ base: "0", md: "8", lg: "14" }}
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateX(0px)" : "translateX(-40px)",
                transition: "opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
              }}
            >
              <VStack align="flex-start" gap="4.5">
                <HStack gap="3.5" align="center">
                  <Flex
                    w="36px"
                    h="36px"
                    borderRadius="10px"
                    bg="rgba(14, 165, 233, 0.12)"
                    color="#0284C7"
                    align="center"
                    justify="center"
                  >
                    <SparklesIcon size={18} />
                  </Flex>

                  <Text
                    fontSize={{ base: "22px", md: "26px" }}
                    fontWeight="900"
                    color="#0284C7"
                    fontFamily="monospace"
                    letterSpacing="-0.03em"
                    lineHeight="1"
                  >
                    01
                  </Text>

                  <Box w="1px" h="18px" bg="rgba(14, 165, 233, 0.35)" />

                  <Text
                    fontSize="12.5px"
                    fontWeight="800"
                    color="#0369A1"
                    letterSpacing="0.14em"
                    textTransform="uppercase"
                  >
                    OUR MISSION
                  </Text>
                </HStack>

                <Heading
                  as="h3"
                  fontSize={{ base: "19px", sm: "21px", md: "23px" }}
                  fontWeight="800"
                  color="#051B64"
                  lineHeight="1.3"
                >
                  Shifting Mindsets & Equipping Latent Potential
                </Heading>

                <Text
                  fontSize={{ base: "15.5px", sm: "16.5px", md: "17.5px" }}
                  color="#0F172A"
                  lineHeight="1.8"
                  fontWeight="600"
                >
                  To shift the mindsets and expand the perspectives of young people aged 13–25 by providing transformative mentorship, leadership development, personal-growth education, and real-world opportunities that equip them to discover their potential, pursue excellence, and live purposefully.
                </Text>

                <HStack gap="2" wrap="wrap" pt="1">
                  {["Mindset Transformation", "Transformative Mentorship", "Personal Growth", "Purposeful Living"].map((tag) => (
                    <Box
                      key={tag}
                      px="3"
                      py="1"
                      borderRadius="full"
                      bg="rgba(14, 165, 233, 0.08)"
                      border="1px solid rgba(14, 165, 233, 0.22)"
                      fontSize="11.5px"
                      fontWeight="700"
                      color="#0369A1"
                    >
                      {tag}
                    </Box>
                  ))}
                </HStack>
              </VStack>
            </Box>

            {/* Center Vertical Divider (Desktop) */}
            <Box
              display={{ base: "none", md: "block" }}
              position="absolute"
              left="50%"
              top="0"
              bottom="0"
              w="1.5px"
              transform="translateX(-50%)"
              bg="linear-gradient(180deg, transparent 0%, rgba(14, 165, 233, 0.65) 20%, rgba(16, 185, 129, 0.65) 80%, transparent 100%)"
              boxShadow="0 0 14px rgba(14, 165, 233, 0.35)"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateX(-50%) scaleY(1)" : "translateX(-50%) scaleY(0)",
                transformOrigin: "center top",
                transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.55s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.55s",
              }}
            />

            {/* Mobile Divider Line */}
            <Box
              display={{ base: "block", md: "none" }}
              w="100%"
              h="1px"
              my="2"
              bg="linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.4) 30%, rgba(16, 185, 129, 0.4) 70%, transparent)"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "center",
                transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.45s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.45s",
              }}
            />

            {/* Right Column: VISION (02) */}
            <Box
              gridColumn={{ base: "1", md: "span 6" }}
              pl={{ base: "0", md: "8", lg: "14" }}
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateX(0px)" : "translateX(40px)",
                transition: "opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.35s, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.35s",
              }}
            >
              <VStack align="flex-start" gap="4.5">
                <HStack gap="3.5" align="center">
                  <Flex
                    w="36px"
                    h="36px"
                    borderRadius="10px"
                    bg="rgba(16, 185, 129, 0.12)"
                    color="#059669"
                    align="center"
                    justify="center"
                  >
                    <GlobeIcon size={18} />
                  </Flex>

                  <Text
                    fontSize={{ base: "22px", md: "26px" }}
                    fontWeight="900"
                    color="#059669"
                    fontFamily="monospace"
                    letterSpacing="-0.03em"
                    lineHeight="1"
                  >
                    02
                  </Text>

                  <Box w="1px" h="18px" bg="rgba(16, 185, 129, 0.35)" />

                  <Text
                    fontSize="12.5px"
                    fontWeight="800"
                    color="#059669"
                    letterSpacing="0.14em"
                    textTransform="uppercase"
                  >
                    OUR VISION
                  </Text>
                </HStack>

                <Heading
                  as="h3"
                  fontSize={{ base: "19px", sm: "21px", md: "23px" }}
                  fontWeight="800"
                  color="#051B64"
                  lineHeight="1.3"
                >
                  A Generation of Transformative Leaders
                </Heading>

                <Text
                  fontSize={{ base: "15px", sm: "15.5px", md: "16.5px" }}
                  color="#334155"
                  lineHeight="1.8"
                  fontWeight="500"
                >
                  To raise a generation of empowered, purpose-driven, and transformative young leaders who are confident, challenge limitations, influence culture, build sustainable community solutions, and shape a better world.
                </Text>

                <HStack gap="2" wrap="wrap" pt="1">
                  {["Empowered Leaders", "Challenging Limitations", "Cultural Influence", "Generational Impact"].map((tag) => (
                    <Box
                      key={tag}
                      px="3"
                      py="1"
                      borderRadius="full"
                      bg="rgba(16, 185, 129, 0.08)"
                      border="1px solid rgba(16, 185, 129, 0.22)"
                      fontSize="11.5px"
                      fontWeight="700"
                      color="#065F46"
                    >
                      {tag}
                    </Box>
                  ))}
                </HStack>
              </VStack>
            </Box>
          </SimpleGrid>
        </Box>

        {/* Center Illuminated Signature Anchor — "RAISING CHAMPIONS EVERYDAY" */}
        <Box
          textAlign="center"
          py="6"
          px="4"
          position="relative"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "scale(1) translateY(0)" : "scale(0.96) translateY(20px)",
            transition: "opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.65s, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.65s",
          }}
        >
          <Box
            w={{ base: "140px", sm: "180px", md: "220px" }}
            h="2px"
            mx="auto"
            mb="4"
            bg="linear-gradient(90deg, transparent, #0284C7, transparent)"
            borderRadius="full"
          />

          <HStack justify="center" gap="2.5" mb="1.5">
            <Box color="#D97706" display="flex" alignItems="center">
              <TrophyIcon size={18} />
            </Box>
            <Text
              fontSize={{ base: "15px", sm: "17px", md: "19px", lg: "20px" }}
              fontWeight="900"
              color="#051B64"
              letterSpacing="0.18em"
              textTransform="uppercase"
            >
              RAISING CHAMPIONS EVERYDAY
            </Text>
          </HStack>

          <Text fontSize={{ base: "12.5px", md: "14px" }} color="#64748B" maxW="560px" mx="auto" fontWeight="500" lineHeight="1.5">
            Developing visionary young minds to lead today and transform tomorrow.
          </Text>

          <Box
            w={{ base: "140px", sm: "180px", md: "220px" }}
            h="2px"
            mx="auto"
            mt="4"
            bg="linear-gradient(90deg, transparent, #10B981, transparent)"
            borderRadius="full"
          />
        </Box>
      </Container>
    </Box>
  )
}
