"use client"

import React from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  HStack,
  VStack,
  Stack,
} from "@chakra-ui/react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRightIcon, StarIcon } from "../icons"

const AVATAR_URLS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
]

export function Hero() {
  // Shared Social Proof / Ratings snippet
  const renderSocialProof = () => (
    <Flex align="center" gap="4" wrap="wrap">
      {/* Overlapping User Avatars */}
      <Flex align="center">
        {AVATAR_URLS.map((url, i) => (
          <Box
            key={i}
            position="relative"
            w="36px"
            h="36px"
            borderRadius="full"
            overflow="hidden"
            ml={i === 0 ? "0" : "-8px"}
            border="2px solid #FFFFFF"
            boxShadow="0 2px 6px rgba(0, 0, 0, 0.1)"
            zIndex={5 - i}
          >
            <Image
              src={url}
              alt="Champion Graduate"
              fill
              sizes="36px"
              style={{ objectFit: "cover" }}
            />
          </Box>
        ))}
        {/* Extra count badge */}
        <Box
          position="relative"
          w="36px"
          h="36px"
          borderRadius="full"
          bg="#051B64"
          color="white"
          fontSize="11px"
          fontWeight="bold"
          display="flex"
          alignItems="center"
          justifyContent="center"
          ml="-8px"
          border="2px solid #FFFFFF"
          boxShadow="0 2px 6px rgba(0, 0, 0, 0.1)"
          zIndex={1}
        >
          +1.2k
        </Box>
      </Flex>

      {/* Stars and Rating Text */}
      <VStack align="flex-start" gap="0.5">
        <HStack gap="1">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon key={star} size={14} color="#F59E0B" />
          ))}
        </HStack>
        <Text fontSize="12px" color="gray.500" fontWeight="medium">
          from <Box as="span" fontWeight="bold" color="#051B64">10,000+ young champions</Box> across Africa
        </Text>
      </VStack>
    </Flex>
  )

  return (
    <Box
      as="section"
      position="relative"
      overflow="hidden"
      bg={{
        base: "linear-gradient(180deg, #F4F8FE 0%, #F8FBFF 58%, #FFFFFF 88%)",
        md: "linear-gradient(180deg, #F4F8FE 0%, #F8FBFF 50%, #FFFFFF 100%)",
      }}
      pt={{ base: "20", sm: "22", md: "24", lg: "26", xl: "28" }}
      pb={{ base: "12", md: "16", lg: "18" }}
    >
      {/* Subtle background ambient gradients */}
      <Box
        position="absolute"
        top="-15%"
        left="-10%"
        w="650px"
        h="650px"
        bg="radial-gradient(circle, rgba(20, 145, 145, 0.05) 0%, transparent 70%)"
        filter="blur(60px)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        top="-12%"
        right="-5%"
        w="650px"
        h="650px"
        bg="radial-gradient(circle, rgba(20, 145, 145, 0.04) 0%, rgba(5, 27, 100, 0.03) 50%, transparent 70%)"
        filter="blur(65px)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="-10%"
        right="20%"
        w="500px"
        h="500px"
        bg="radial-gradient(circle, rgba(5, 27, 100, 0.02) 0%, transparent 70%)"
        filter="blur(70px)"
        pointerEvents="none"
      />

      <Container maxW="1360px" px={{ base: "4", sm: "6", md: "8", lg: "10" }} position="relative" zIndex={1}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          flexDirection={{ base: "column", lg: "row" }}
          align="flex-start"
          justify="space-between"
          gap={{ base: "8", lg: "12" }}
        >
          {/* Left Column: Text, CTAs & Social Proof (Desktop/Tablet) */}
          <Box flex={{ base: "1", lg: "1.15" }} maxW={{ base: "100%", lg: "640px" }} w="100%">
            <VStack align="flex-start" gap={{ base: "4", md: "5" }} w="100%">
              {/* Top Ecosystem Pill Badge */}
              <HStack
                bg="#E6F7F0"
                border="1px solid rgba(16, 185, 129, 0.3)"
                px="3.5"
                py="1.5"
                borderRadius="full"
                gap="2"
                boxShadow="0 2px 8px rgba(16, 185, 129, 0.1)"
                transition="all 0.2s ease"
                _hover={{
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 12px rgba(16, 185, 129, 0.18)",
                }}
              >
                {/* Green Pulsing Indicator Dot */}
                <Box position="relative" display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                  <Box
                    w="8px"
                    h="8px"
                    borderRadius="full"
                    bg="#10B981"
                  />
                  <Box
                    position="absolute"
                    w="12px"
                    h="12px"
                    borderRadius="full"
                    bg="#10B981"
                    opacity={0.5}
                    animation="ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite"
                  />
                </Box>

                <Text
                  fontSize={{ base: "8px", sm: "9.5px", md: "10.5px" }}
                  fontWeight="800"
                  color="#059669"
                  letterSpacing={{ base: "0.02em", sm: "0.04em" }}
                  textTransform="uppercase"
                  whiteSpace="nowrap"
                  lineHeight="1"
                >
                  EMPOWERMENT, TRANSFORMATION, DEVELOPMENT & LEADERSHIP ECOSYSTEM
                </Text>
              </HStack>

              {/* Main Heading */}
              <Heading
                as="h1"
                fontSize={{ base: "26px", sm: "32px", md: "38px", lg: "42px", xl: "46px" }}
                fontWeight="900"
                color="#051B64"
                lineHeight={{ base: "1.2", sm: "1.18", md: "1.15" }}
                letterSpacing="-0.025em"
                mt={{ base: "1.5", sm: "2.5" }}
              >
                Empowering Young People to Discover Their Potential &{" "}
                <Box
                  as="span"
                  position="relative"
                  display="inline-block"
                  color="#059669"
                >
                  <Box as="span" position="relative" zIndex={2}>
                    Impact the World.
                  </Box>
                  {/* Styled Green Accent Underline Bar */}
                  <Box
                    position="absolute"
                    bottom={{ base: "-3px", md: "-4px" }}
                    left="0"
                    w="100%"
                    h={{ base: "4px", md: "6px" }}
                    bg="#A7F3D0"
                    borderRadius="full"
                    zIndex={1}
                    opacity={0.85}
                  />
                </Box>
              </Heading>

              {/* Subtitle Description */}
              <Text
                fontSize={{ base: "13.5px", sm: "14.5px", md: "15px" }}
                color="#4B5563"
                lineHeight="1.6"
                maxW="520px"
              >
                We mentor, train, and equip emerging African youth with practical skills,
                leadership values, and community impact opportunities. Building confident
                champions who transform society.
              </Text>

              {/* Call to Actions Row: Stacked on mobile & tablet portrait, side by side on md+ */}
              <Stack
                direction={{ base: "column", md: "row" }}
                flexDirection={{ base: "column", md: "row" }}
                gap={{ base: "3", md: "3.5" }}
                align={{ base: "stretch", md: "center" }}
                pt={{ base: "2", md: "3" }}
                w={{ base: "100%", md: "auto" }}
              >
                {/* Primary Button: Get Involved */}
                <Box w={{ base: "100%", md: "auto" }}>
                  <Link href="/Get-Involved" style={{ display: "block", width: "100%" }}>
                    <Button
                      w={{ base: "100%", md: "auto" }}
                      size="md"
                      bg="#051B64"
                      color="white"
                      fontWeight="700"
                      fontSize="13.5px"
                      px="5"
                      py="5"
                      borderRadius="lg"
                      boxShadow="0 8px 20px -4px rgba(5, 27, 100, 0.35)"
                      _hover={{
                        bg: "#03113d",
                        transform: "translateY(-2px)",
                        boxShadow: "0 12px 26px -4px rgba(5, 27, 100, 0.45)",
                      }}
                      _active={{ transform: "translateY(0)" }}
                      transition="all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                    >
                      <HStack gap="2" justify="center" w="100%">
                        <Text>Get Involved</Text>
                        <ArrowRightIcon size={15} color="white" />
                      </HStack>
                    </Button>
                  </Link>
                </Box>

                {/* Secondary Button: Explore Our Programs */}
                <Box w={{ base: "100%", md: "auto" }}>
                  <Link href="/programs" style={{ display: "block", width: "100%" }}>
                    <Button
                      w={{ base: "100%", md: "auto" }}
                      size="md"
                      bg="#F1F5F9"
                      color="#051B64"
                      fontWeight="600"
                      fontSize="13.5px"
                      px="5"
                      py="5"
                      borderRadius="lg"
                      border="1px solid transparent"
                      _hover={{
                        bg: "#E2E8F0",
                        borderColor: "rgba(5, 27, 100, 0.1)",
                      }}
                      _active={{ transform: "translateY(0)" }}
                      transition="all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                    >
                      <Text textAlign="center" w="100%">Explore Our Programs</Text>
                    </Button>
                  </Link>
                </Box>
              </Stack>

              {/* Social Proof / Ratings (Desktop & Tablet: rendered below buttons) */}
              <Box
                pt="4"
                borderTop="1px solid"
                borderColor="gray.100"
                w="100%"
                mt={{ base: "1", sm: "2" }}
                display={{ base: "none", md: "block" }}
              >
                {renderSocialProof()}
              </Box>
            </VStack>
          </Box>

          {/* Right Column: Hero Visual Image + (Mobile: Social Proof below image) */}
          <Box
            flex={{ base: "1", lg: "0.85" }}
            w="100%"
            maxW={{ base: "100%", sm: "520px", lg: "480px", xl: "500px" }}
            mx={{ base: "auto", lg: "0" }}
            position="relative"
          >
            {/* Main Image Frame */}
            <Box
              position="relative"
              w="100%"
              h={{ base: "380px", sm: "460px", md: "520px", lg: "540px" }}
              borderRadius={{ base: "24px", md: "32px" }}
              overflow="hidden"
            >
              {/* Image requested by the user */}
              <Image
                src="/jay-young-people.jpeg"
                alt="I-Impact Nigerian Youth Champions Gathering"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                style={{
                  objectFit: "cover",
                  objectPosition: "center 25%",
                }}
              />
            </Box>

            {/* Social Proof / Ratings (Mobile Only: rendered directly below image) */}
            <Box
              pt="3.5"
              mt="2"
              w="100%"
              display={{ base: "block", md: "none" }}
            >
              {renderSocialProof()}
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
