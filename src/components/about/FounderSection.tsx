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
import { useInView } from "@/hooks/useInView"
import { LiveDot } from "@/components/LiveDot"

export function FounderSection() {
  const { ref, isInView } = useInView({
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px",
    triggerOnce: true,
  })

  return (
    <Box
      ref={ref}
      as="section"
      id="founder"
      position="relative"
      py={{ base: "14", sm: "16", md: "20", lg: "24" }}
      bg="#FFFFFF"
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor="#EEF2F6"
      overflow="hidden"
    >
      {/* Subtle ambient lighting */}
      <Box
        position="absolute"
        top="20%"
        left="5%"
        w={{ base: "280px", md: "520px" }}
        h={{ base: "280px", md: "520px" }}
        bg="radial-gradient(circle, rgba(2, 132, 199, 0.05) 0%, transparent 70%)"
        filter="blur(70px)"
        pointerEvents="none"
        zIndex={0}
      />

      <Container maxW="1200px" px={{ base: "4", sm: "6", md: "8", lg: "10" }} position="relative" zIndex={1}>
        {/* SimpleGrid: On mobile image is on top, on desktop image is on the left */}
        <SimpleGrid
          columns={{ base: 1, lg: 12 }}
          gap={{ base: "8", sm: "10", md: "12", lg: "16" }}
          alignItems="center"
        >
          {/* Column 1 (Image): Comes first on mobile (order: 1), sits on left on desktop (order: 1) */}
          <Box
            gridColumn={{ base: "1", lg: "span 5" }}
            order={{ base: 1, lg: 1 }}
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0)" : "translateY(22px)",
              transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <Box
              position="relative"
              w="100%"
              maxW={{ base: "320px", sm: "380px", md: "420px", lg: "100%" }}
              mx={{ base: "auto", lg: "0" }}
            >
              {/* Subtle ambient backlight aura */}
              <Box
                position="absolute"
                inset="-6px"
                borderRadius={{ base: "26px", md: "30px" }}
                bg="linear-gradient(135deg, rgba(2, 132, 199, 0.2) 0%, rgba(5, 27, 100, 0.12) 100%)"
                filter="blur(16px)"
                zIndex={0}
              />

              {/* Founder Portrait Frame */}
              <Box
                position="relative"
                zIndex={1}
                w="100%"
                h={{ base: "380px", sm: "440px", md: "490px", lg: "540px" }}
                borderRadius={{ base: "22px", md: "26px" }}
                overflow="hidden"
                boxShadow="0 20px 42px -12px rgba(5, 27, 100, 0.18)"
                border="1px solid"
                borderColor="rgba(5, 27, 100, 0.1)"
                transition="transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                _hover={{
                  transform: "scale(1.02)",
                }}
              >
                <Image
                  src="/The-founder.png"
                  alt="Samuel Joseph - Founder, I IMPACT INITIATIVE"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 460px"
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
              </Box>
            </Box>
          </Box>

          {/* Column 2 (Writeup): Comes second on mobile (order: 2), sits on right on desktop (order: 2) */}
          <Box
            gridColumn={{ base: "1", lg: "span 7" }}
            order={{ base: 2, lg: 2 }}
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0)" : "translateY(22px)",
              transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.12s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.12s",
            }}
          >
            <VStack align="flex-start" gap="4">
              {/* Eyebrow Badge */}
              <HStack
                bg="rgba(5, 27, 100, 0.05)"
                border="1px solid rgba(5, 27, 100, 0.12)"
                px="3.5"
                py="1"
                borderRadius="full"
                gap="2"
              >
                <LiveDot color="#0284C7" size={6} />
                <Text
                  fontSize="11px"
                  fontWeight="800"
                  color="#051B64"
                  letterSpacing="0.14em"
                  textTransform="uppercase"
                >
                  ABOUT THE FOUNDER
                </Text>
              </HStack>

              {/* Founder Name & Title */}
              <Box>
                <Heading
                  as="h2"
                  fontSize={{ base: "28px", sm: "34px", md: "40px", lg: "44px" }}
                  fontWeight="900"
                  color="#051B64"
                  lineHeight="1.15"
                  letterSpacing="-0.025em"
                  mb="1"
                >
                  Samuel Joseph
                </Heading>
                <Text
                  fontSize={{ base: "13px", sm: "14px" }}
                  fontWeight="800"
                  color="#0284C7"
                  letterSpacing="0.06em"
                  textTransform="uppercase"
                >
                  Founder, I IMPACT INITIATIVE
                </Text>
              </Box>

              {/* The Founder's Message Body */}
              <VStack align="flex-start" gap="3.5" pt="1" color="#475569" fontSize={{ base: "14px", sm: "15px" }} lineHeight="1.75">
                <Text>
                  Samuel Joseph is the founder of I IMPACT, a youth-development initiative driven by the conviction that changing the way young people think can change the way they live, lead, and influence the world.
                </Text>

                <Text>
                  His vision is centred on mindset transformation, leadership development, and the intentional cultivation of human potential. Through I IMPACT INITIATIVE, he seeks to challenge limiting narratives about young people and create opportunities for them to develop the confidence, character, and competence required to lead purposeful lives.
                </Text>

                <Text>
                  He believes young people should not have to wait until adulthood to become agents of change. With the right guidance, opportunities, and commitment to growth, they can begin making meaningful contributions today.
                </Text>

                <Text>
                  He is working towards a generation that does not simply inherit the world as it is, but has the courage and capacity to help shape the world as it ought to be.
                </Text>
              </VStack>

              {/* Emphasized Closing Vision Quote Banner */}
              <Box
                w="100%"
                mt="2"
                p={{ base: "4.5", sm: "5", md: "5.5" }}
                borderRadius="18px"
                bg="linear-gradient(135deg, rgba(2, 132, 199, 0.05) 0%, rgba(20, 145, 145, 0.06) 100%)"
                border="1px solid rgba(2, 132, 199, 0.18)"
                borderLeft="4px solid"
                borderLeftColor="#0284C7"
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.24s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.24s",
                }}
              >
                <Text
                  fontSize={{ base: "14.5px", sm: "15.5px", md: "16.5px" }}
                  fontWeight="700"
                  color="#051B64"
                  lineHeight="1.6"
                  fontStyle="italic"
                  mb="2.5"
                >
                  “A generation that does not simply inherit the world as it is, but has the courage and capacity to help shape the world as it ought to be.”
                </Text>
                <Text
                  fontSize="12.5px"
                  fontWeight="800"
                  color="#0284C7"
                  letterSpacing="0.04em"
                >
                  — Samuel Joseph
                </Text>
              </Box>
            </VStack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
