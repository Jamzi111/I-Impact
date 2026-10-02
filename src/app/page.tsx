"use client"

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  HStack,
  VStack,
  SimpleGrid,
  Badge,
} from "@chakra-ui/react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ConferenceBanner } from "@/components/conference"
import {
  TrophyIcon,
  UsersIcon,
  SparklesIcon,
  ArrowRightIcon,
  HeartHandshakeIcon,
  CheckCircleIcon,
  CalendarIcon,
} from "@/components/icons"

export default function Home() {
  return (
    <Box minH="100vh" bg="#FFFFFF" display="flex" flexDirection="column">
      {/* Header Component */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Upcoming Event Section */}
      <Box
        as="section"
        position="relative"
        overflow="hidden"
        bg="linear-gradient(180deg, #FBFDFF 0%, #F5F9FE 100%)"
        py={{ base: "6", sm: "8", md: "10" }}
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor="rgba(14, 165, 233, 0.05)"
      >
        {/* Subtle decorative ambient glow */}
        <Box
          position="absolute"
          top="-20%"
          left="50%"
          transform="translateX(-50%)"
          w="800px"
          h="400px"
          bg="radial-gradient(ellipse, rgba(14, 165, 233, 0.08) 0%, transparent 70%)"
          filter="blur(50px)"
          pointerEvents="none"
        />

        <Container maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1160px", xl: "1200px" }} px={{ base: "4", sm: "6", md: "8", lg: "8" }} position="relative" zIndex={1}>
          <ConferenceBanner />
        </Container>
      </Box>

      {/* Feature Pillars Section */}
      <Box py={{ base: "14", md: "20" }} bg="white">
        <Container maxW="1200px" px={{ base: "4", md: "8" }}>
          <VStack gap="4" textAlign="center" mb="12">
            <Text fontSize="xs" fontWeight="bold" color="#149191" letterSpacing="wider" textTransform="uppercase">
              Core Pillars of Excellence
            </Text>
            <Heading fontSize={{ base: "2xl", md: "3xl" }} fontWeight="800" color="#051B64">
              How We Build Generational Leaders
            </Heading>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap="8">
            {/* Card 1 */}
            <Box
              p="6"
              borderRadius="2xl"
              bg="gray.50"
              border="1px solid"
              borderColor="gray.100"
              transition="all 0.2s"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "0 20px 30px -10px rgba(5, 27, 100, 0.1)",
                borderColor: "rgba(20, 145, 145, 0.3)",
              }}
            >
              <Box
                w="48px"
                h="48px"
                borderRadius="xl"
                bg="rgba(20, 145, 145, 0.12)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb="4"
              >
                <TrophyIcon size={24} color="#149191" />
              </Box>
              <Heading fontSize="lg" fontWeight="bold" color="#051B64" mb="2">
                Youth Leadership Academy
              </Heading>
              <Text fontSize="sm" color="gray.600" lineHeight="1.6">
                Curated curriculum in public speaking, critical reasoning, negotiation, and high-impact emotional intelligence.
              </Text>
            </Box>

            {/* Card 2 */}
            <Box
              p="6"
              borderRadius="2xl"
              bg="gray.50"
              border="1px solid"
              borderColor="gray.100"
              transition="all 0.2s"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "0 20px 30px -10px rgba(5, 27, 100, 0.1)",
                borderColor: "rgba(5, 27, 100, 0.3)",
              }}
            >
              <Box
                w="48px"
                h="48px"
                borderRadius="xl"
                bg="rgba(5, 27, 100, 0.1)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb="4"
              >
                <UsersIcon size={24} color="#051B64" />
              </Box>
              <Heading fontSize="lg" fontWeight="bold" color="#051B64" mb="2">
                1-on-1 Champion Mentorship
              </Heading>
              <Text fontSize="sm" color="gray.600" lineHeight="1.6">
                Direct pairing with vetted senior professionals, engineers, doctors, and civic founders for weekly career coaching.
              </Text>
            </Box>

            {/* Card 3 */}
            <Box
              p="6"
              borderRadius="2xl"
              bg="gray.50"
              border="1px solid"
              borderColor="gray.100"
              transition="all 0.2s"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "0 20px 30px -10px rgba(5, 27, 100, 0.1)",
                borderColor: "rgba(16, 185, 129, 0.3)",
              }}
            >
              <Box
                w="48px"
                h="48px"
                borderRadius="xl"
                bg="rgba(16, 185, 129, 0.12)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb="4"
              >
                <SparklesIcon size={24} color="#10B981" />
              </Box>
              <Heading fontSize="lg" fontWeight="bold" color="#051B64" mb="2">
                Social Innovation Labs
              </Heading>
              <Text fontSize="sm" color="gray.600" lineHeight="1.6">
                Seed grants and engineering workshops empowering youth to solve real-world problems in local neighborhoods.
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Footer */}
      <Box mt="auto" bg="#051B64" color="white" py="10" borderTop="1px solid rgba(255, 255, 255, 0.1)">
        <Container maxW="1200px" px={{ base: "4", md: "8" }}>
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "center", md: "center" }}
            gap="6"
            textAlign={{ base: "center", md: "left" }}
          >
            <Box position="relative" w="120px" h="36px">
              <Image
                src="/iimpact-logo2.png"
                alt="I-Impact - Raising Champions Everyday"
                fill
                style={{ objectFit: "contain", objectPosition: "left" }}
              />
            </Box>

            <Text fontSize="xs" color="whiteAlpha.700">
              © {new Date().getFullYear()} I-Impact Generation. All rights reserved. Built with Next.js, React, TypeScript & Chakra UI v3.
            </Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}