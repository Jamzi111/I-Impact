"use client"

import React from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  HStack,
  SimpleGrid,
  Button,
} from "@chakra-ui/react"
import Image from "next/image"
import {
  VideoIcon,
  PlayIcon,
  SparklesIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@/components/icons"

interface VideoHighlightsSectionProps {
  onPlayVideo: (videoItem: any) => void
}

export function VideoHighlightsSection({ onPlayVideo }: VideoHighlightsSectionProps) {
  const featuredVideo = {
    id: "feat-vid-1",
    title: "AS A TEEN Continental Congress: Official 2025 Highlight Reel",
    categoryLabel: "Flagship Documentary",
    type: "video",
    imageUrl: "/images/events-hero-summit.jpg",
    location: "Main Auditorium, Lagos, Nigeria",
    year: "2025",
    caption:
      "Experience the vibrant energy, inspiring student presentations, and keynote addresses from our flagship annual gathering of emerging African youth leaders.",
    metaLabel: "18 Mins • HD Documentary",
  }

  return (
    <Box
      as="section"
      py={{ base: "12", sm: "14", md: "18" }}
      bg="#FFFFFF"
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor="#E2E8F0"
    >
      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1140px", xl: "1240px" }}
        px={{ base: "4", sm: "6", md: "8" }}
      >
        <Box textAlign="center" maxW="700px" mx="auto" mb={{ base: "8", md: "10" }}>
          <HStack
            justify="center"
            gap="1.5"
            px="3"
            py="1"
            bg="rgba(5, 27, 100, 0.08)"
            borderRadius="full"
            w="fit-content"
            mx="auto"
            mb="3"
          >
            <VideoIcon size={14} color="#051B64" />
            <Text
              fontSize="12px"
              fontWeight="800"
              color="#051B64"
              letterSpacing="0.06em"
              textTransform="uppercase"
            >
              Video Archive
            </Text>
          </HStack>

          <Heading
            as="h2"
            fontSize={{ base: "24px", sm: "30px", md: "36px" }}
            fontWeight="800"
            color="#0F172A"
            letterSpacing="-0.02em"
            mb="3"
          >
            Watch Tomorrow's Champions in Motion
          </Heading>

          <Text fontSize="14px" color="#64748B" lineHeight="1.6">
            Keynote presentations, delegate discussions, and hands-on lab experiments recorded live on stage and in classrooms.
          </Text>
        </Box>

        {/* Featured Video Player Banner */}
        <Box
          borderRadius="24px"
          bg="#0F172A"
          color="#FFFFFF"
          overflow="hidden"
          boxShadow="0 20px 45px -12px rgba(15, 23, 42, 0.25)"
          border="1px solid #1E293B"
        >
          <SimpleGrid columns={{ base: 1, lg: 12 }}>
            {/* Visual Thumbnail with Play Button */}
            <Box
              gridColumn={{ base: "span 1", lg: "span 7" }}
              position="relative"
              minH={{ base: "240px", sm: "320px", lg: "380px" }}
              bg="#000000"
              cursor="pointer"
              onClick={() => onPlayVideo(featuredVideo)}
            >
              <Image
                src={featuredVideo.imageUrl}
                alt={featuredVideo.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                style={{ objectFit: "cover" }}
              />

              <Flex
                position="absolute"
                inset="0"
                bg="rgba(0, 0, 0, 0.45)"
                align="center"
                justify="center"
                transition="all 0.2s ease"
                _hover={{ bg: "rgba(0, 0, 0, 0.3)" }}
              >
                <Box
                  w="68px"
                  h="68px"
                  borderRadius="full"
                  bg="#149191"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="#FFFFFF"
                  boxShadow="0 8px 30px rgba(20, 145, 145, 0.6)"
                  transition="transform 0.2s ease"
                  _hover={{ transform: "scale(1.1)" }}
                >
                  <PlayIcon size={30} />
                </Box>
              </Flex>

              <Box
                position="absolute"
                bottom="14px"
                left="14px"
                px="3"
                py="1"
                borderRadius="full"
                bg="rgba(0, 0, 0, 0.75)"
                backdropFilter="blur(6px)"
                fontSize="11.5px"
                fontWeight="700"
                color="#FFFFFF"
              >
                18:24 • 1080p Full HD
              </Box>
            </Box>

            {/* Video Content & Chapter Outline */}
            <Box
              gridColumn={{ base: "span 1", lg: "span 5" }}
              p={{ base: "6", sm: "8" }}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box mb="4">
                <HStack gap="2" mb="2">
                  <Box
                    px="2.5"
                    py="0.8"
                    borderRadius="full"
                    bg="rgba(52, 211, 153, 0.15)"
                    color="#34D399"
                    fontSize="11px"
                    fontWeight="800"
                    textTransform="uppercase"
                  >
                    Flagship Reel
                  </Box>
                  <Text fontSize="12px" color="#94A3B8">
                    • 1,500 Attendees
                  </Text>
                </HStack>

                <Heading as="h3" fontSize={{ base: "18px", sm: "22px" }} fontWeight="800" mb="2.5">
                  {featuredVideo.title}
                </Heading>

                <Text fontSize="13px" color="#94A3B8" lineHeight="1.6" mb="4">
                  {featuredVideo.caption}
                </Text>

                <Box pt="3" borderTop="1px solid" borderColor="rgba(255, 255, 255, 0.1)">
                  <Text fontSize="11px" fontWeight="800" textTransform="uppercase" letterSpacing="0.06em" color="#38BDF8" mb="2">
                    Key Highlights:
                  </Text>
                  <SimpleGrid columns={1} gap="1.5" fontSize="12px" color="#CBD5E1">
                    <HStack gap="2">
                      <CheckCircleIcon size={14} color="#34D399" />
                      <Text>01:10 — Samuel Joseph Opening Keynote</Text>
                    </HStack>
                    <HStack gap="2">
                      <CheckCircleIcon size={14} color="#34D399" />
                      <Text>06:40 — High School Innovation Pitch Finale</Text>
                    </HStack>
                    <HStack gap="2">
                      <CheckCircleIcon size={14} color="#34D399" />
                      <Text>12:15 — Mentor-Scholar Breakout Sessions</Text>
                    </HStack>
                  </SimpleGrid>
                </Box>
              </Box>

              <Button
                onClick={() => onPlayVideo(featuredVideo)}
                bg="#149191"
                color="#FFFFFF"
                fontSize="13px"
                fontWeight="700"
                h="42px"
                borderRadius="12px"
                _hover={{ bg: "#107979" }}
              >
                <HStack gap="2">
                  <PlayIcon size={16} />
                  <Text>Play Highlight Video (Full Screen)</Text>
                </HStack>
              </Button>
            </Box>
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  )
}

