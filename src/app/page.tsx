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
    <Box minH="100vh" bg="gray.50" display="flex" flexDirection="column">
      {/* Header Component */}
      <Header />

      {/* Hero Section */}
      <Box
        position="relative"
        overflow="hidden"
        bg="linear-gradient(180deg, #FFFFFF 0%, #F0FDF4 50%, #F3F4F6 100%)"
        py={{ base: "16", md: "24", lg: "28" }}
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        {/* Background glow effects */}
        <Box
          position="absolute"
          top="-10%"
          left="50%"
          transform="translateX(-50%)"
          w="800px"
          h="400px"
          bg="radial-gradient(ellipse at center, rgba(20, 145, 145, 0.15) 0%, rgba(5, 27, 100, 0.05) 50%, transparent 70%)"
          filter="blur(50px)"
          pointerEvents="none"
        />

        <Container maxW="1200px" px={{ base: "4", md: "8" }} position="relative" zIndex={2}>
          <VStack gap="6" textAlign="center" maxW="850px" mx="auto">
            {/* Tag / Badge */}
            <HStack
              bg="white"
              px="3.5"
              py="1.5"
              borderRadius="full"
              boxShadow="0 4px 14px rgba(5, 27, 100, 0.06)"
              border="1px solid"
              borderColor="rgba(20, 145, 145, 0.2)"
              gap="2"
            >
              <SparklesIcon size={16} color="#149191" />
              <Text fontSize="xs" fontWeight="bold" color="#051B64">
                Empowering Youth Excellence & Ethical Leadership
              </Text>
              <Badge
                bg="#149191"
                color="white"
                fontSize="10px"
                px="2"
                py="0.5"
                borderRadius="full"
              >
                2026
              </Badge>
            </HStack>

            {/* Main Headline */}
            <Heading
              as="h1"
              fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
              fontWeight="900"
              color="#051B64"
              lineHeight="1.15"
              letterSpacing="-0.03em"
            >
              Raising Champions{" "}
              <Box
                as="span"
                bg="linear-gradient(135deg, #149191 0%, #0d9488 100%)"
                backgroundClip="text"
                color="transparent"
              >
                Everyday.
              </Box>
            </Heading>

            {/* Subtitle */}
            <Text
              fontSize={{ base: "md", md: "xl" }}
              color="gray.600"
              lineHeight="1.6"
              maxW="720px"
            >
              I-Impact equips the next generation with world-class executive mentorship,
              transformational community projects, and future-ready innovation skills to lead with purpose.
            </Text>

            {/* Call to Actions */}
            <Flex
              gap="4"
              wrap="wrap"
              justify="center"
              pt="3"
              w="100%"
            >
              <Link href="/programs/mentorship">
                <Button
                  size="lg"
                  bg="linear-gradient(135deg, #149191 0%, #0d6d6d 100%)"
                  color="white"
                  fontWeight="bold"
                  px="7"
                  py="6"
                  borderRadius="full"
                  boxShadow="0 10px 25px -5px rgba(20, 145, 145, 0.4)"
                  _hover={{
                    bg: "linear-gradient(135deg, #107979 0%, #095252 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 14px 28px -5px rgba(20, 145, 145, 0.5)",
                  }}
                  transition="all 0.2s"
                >
                  <HStack gap="2">
                    <Text>Explore Mentorship Program</Text>
                    <ArrowRightIcon size={16} />
                  </HStack>
                </Button>
              </Link>

              <Link href="/donate">
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="#051B64"
                  color="#051B64"
                  fontWeight="bold"
                  px="7"
                  py="6"
                  borderRadius="full"
                  bg="white"
                  boxShadow="0 4px 12px rgba(0, 0, 0, 0.04)"
                  _hover={{
                    bg: "rgba(5, 27, 100, 0.04)",
                    borderColor: "#149191",
                    color: "#149191",
                  }}
                  transition="all 0.2s"
                >
                  <HStack gap="2">
                    <HeartHandshakeIcon size={18} color="#051B64" />
                    <Text>Sponsor a Champion</Text>
                  </HStack>
                </Button>
              </Link>
            </Flex>

            {/* Quick Metrics */}
            <HStack
              gap={{ base: "6", md: "12" }}
              pt="8"
              borderTop="1px solid"
              borderColor="gray.200"
              w="100%"
              justify="center"
              wrap="wrap"
            >
              <VStack gap="0.5">
                <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="900" color="#051B64">
                  10,000+
                </Text>
                <Text fontSize="xs" color="gray.500" fontWeight="semibold">
                  Youth Empowered
                </Text>
              </VStack>

              <VStack gap="0.5">
                <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="900" color="#149191">
                  250+
                </Text>
                <Text fontSize="xs" color="gray.500" fontWeight="semibold">
                  Active Mentors
                </Text>
              </VStack>

              <VStack gap="0.5">
                <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="900" color="#051B64">
                  $1.2M+
                </Text>
                <Text fontSize="xs" color="gray.500" fontWeight="semibold">
                  Scholarships Awarded
                </Text>
              </VStack>

              <VStack gap="0.5">
                <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="900" color="#10B981">
                  100%
                </Text>
                <Text fontSize="xs" color="gray.500" fontWeight="semibold">
                  Graduate Success
                </Text>
              </VStack>
            </HStack>
          </VStack>
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