"use client"

import React, { useState } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  HStack,
  Button,
} from "@chakra-ui/react"
import Image from "next/image"
import {
  CameraIcon,
  VideoIcon,
  PlayIcon,
  MapPinIcon,
  ArrowRightIcon,
  UsersIcon,
  SparklesIcon,
} from "@/components/icons"

export interface MediaItem {
  id: string
  title: string
  category: "conferences" | "workshops" | "outreach" | "videos" | "testimonials"
  categoryLabel: string
  type: "photo" | "video"
  imageUrl: string
  location: string
  year: string
  caption: string
  metaLabel: string
}

export const MEDIA_GALLERY_ITEMS: MediaItem[] = [
  {
    id: "med-1",
    title: "AS A TEEN Continental Congress: 1,500 Youth Leaders Assembled",
    category: "conferences",
    categoryLabel: "Conferences",
    type: "photo",
    imageUrl: "/images/events-hero-summit.jpg",
    location: "Main Auditorium, Lagos",
    year: "2025",
    caption:
      "High school delegates, student union leaders, and youth executives from 48 schools gathering for keynote sessions on ethics, civic innovation, and career clarity.",
    metaLabel: "148 Photos in Album",
  },
  {
    id: "med-2",
    title: "Secondary School Maker Lab: Practical Robotics & IoT Prototyping",
    category: "workshops",
    categoryLabel: "School Workshops",
    type: "photo",
    imageUrl: "/images/areas/skills-development.jpg",
    location: "Lagos Innovates Lab, Surulere",
    year: "2025",
    caption:
      "Students learning microcontroller architecture, sensor wiring, and hardware problem-solving during our hands-on STEM skills breakout sessions.",
    metaLabel: "64 Photos in Album",
  },
  {
    id: "med-3",
    title: "NEEDY NEEDS YOU: Annual Community Care & Textbook Outreach",
    category: "outreach",
    categoryLabel: "Community Outreaches",
    type: "photo",
    imageUrl: "/images/areas/leadership-community-iimpact.jpg",
    location: "Ikorodu Community District",
    year: "2025",
    caption:
      "Volunteer mentors and student ambassadors distributing back-to-school learning kits, food care packages, and exercise books to over 600 underserved families.",
    metaLabel: "92 Photos in Album",
  },
  {
    id: "med-4",
    title: "Executive Mentorship Circles: 1-on-1 Guidance with Industry Leaders",
    category: "workshops",
    categoryLabel: "Mentorship",
    type: "photo",
    imageUrl: "/images/areas/mentorship-development.jpg",
    location: "Civic Centre, Victoria Island",
    year: "2025",
    caption:
      "Trained corporate and tech mentors sitting with secondary school scholars to map out career ambitions, goal-setting, and university entry preparation.",
    metaLabel: "45 Photos in Album",
  },
  {
    id: "med-5",
    title: "Keynote Address by Samuel Joseph: Raising Champions Everyday",
    category: "videos",
    categoryLabel: "Video Keynote",
    type: "video",
    imageUrl: "/images/events-hero-clean.jpg",
    location: "National Theatre Annex, Lagos",
    year: "2025",
    caption:
      "Watch the stirring keynote challenge to emerging teenagers on character, moral courage, and rejecting mediocrity in an evolving African landscape.",
    metaLabel: "38 Mins • HD Video",
  },
  {
    id: "med-6",
    title: "Delegate Voices & Testimonials: The Impact of Guided Mentorship",
    category: "testimonials",
    categoryLabel: "Testimonials",
    type: "video",
    imageUrl: "/images/events-hero-summit.jpg",
    location: "Summit Media Lounge",
    year: "2025",
    caption:
      "Four high school scholars share how attending I-Impact programs shifted their academic focus, built their public speaking skills, and sparked their community projects.",
    metaLabel: "14 Mins • Documentary",
  },
]

interface MediaGalleryGridProps {
  selectedCategory: string
  onSelectItem: (item: MediaItem) => void
}

export function MediaGalleryGrid({
  selectedCategory,
  onSelectItem,
}: MediaGalleryGridProps) {
  const filteredItems = MEDIA_GALLERY_ITEMS.filter((item) => {
    return selectedCategory === "all" || item.category === selectedCategory
  })

  return (
    <Box
      as="section"
      id="media-grid"
      py={{ base: "12", sm: "14", md: "18" }}
      bg="#F8FAFC"
    >
      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1140px", xl: "1240px" }}
        px={{ base: "4", sm: "6", md: "8" }}
      >
        <Flex justify="space-between" align="center" mb={{ base: "6", md: "8" }} wrap="wrap" gap="3">
          <Box>
            <Heading as="h2" fontSize={{ base: "20px", sm: "24px" }} fontWeight="800" color="#0F172A">
              Curated Photo & Video Collections
            </Heading>
            <Text fontSize="13px" color="#64748B">
              Showing {filteredItems.length} verified archive albums
            </Text>
          </Box>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: "6", md: "7" }}>
          {filteredItems.map((item) => (
            <Box
              key={item.id}
              onClick={() => onSelectItem(item)}
              borderRadius="22px"
              bg="#FFFFFF"
              border="1px solid"
              borderColor="#E2E8F0"
              overflow="hidden"
              cursor="pointer"
              transition="all 0.25s ease"
              display="flex"
              flexDirection="column"
              _hover={{
                md: {
                  transform: "translateY(-3px)",
                  boxShadow: "0 14px 30px -10px rgba(5, 27, 100, 0.15)",
                  borderColor: "#149191",
                },
              }}
            >
              {/* Image Preview Box */}
              <Box position="relative" w="100%" h={{ base: "220px", sm: "240px" }} bg="#0F172A" overflow="hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />

                {/* Top Badge Overlay */}
                <Flex
                  position="absolute"
                  top="12px"
                  left="12px"
                  right="12px"
                  justify="space-between"
                  align="center"
                >
                  <Box
                    px="2.5"
                    py="1"
                    borderRadius="full"
                    bg="rgba(5, 27, 100, 0.75)"
                    backdropFilter="blur(6px)"
                    color="#FFFFFF"
                    fontSize="10.5px"
                    fontWeight="800"
                    textTransform="uppercase"
                  >
                    {item.categoryLabel}
                  </Box>

                  <Box
                    px="2"
                    py="0.8"
                    borderRadius="full"
                    bg="rgba(16, 185, 129, 0.85)"
                    color="#FFFFFF"
                    fontSize="10.5px"
                    fontWeight="800"
                  >
                    {item.year}
                  </Box>
                </Flex>

                {/* Video Play Icon overlay if video */}
                {item.type === "video" && (
                  <Flex
                    position="absolute"
                    inset="0"
                    align="center"
                    justify="center"
                    bg="rgba(0, 0, 0, 0.25)"
                  >
                    <Box
                      w="48px"
                      h="48px"
                      borderRadius="full"
                      bg="#149191"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color="#FFFFFF"
                      boxShadow="0 4px 15px rgba(20, 145, 145, 0.4)"
                    >
                      <PlayIcon size={20} />
                    </Box>
                  </Flex>
                )}
              </Box>

              {/* Text Info */}
              <Box p="5" flex="1" display="flex" flexDirection="column" justifyContent="space-between">
                <Box mb="3">
                  <HStack gap="1" color="#64748B" fontSize="11.5px" mb="1.5">
                    <MapPinIcon size={12} color="#149191" />
                    <Text fontWeight="600">{item.location}</Text>
                  </HStack>

                  <Heading as="h3" fontSize="16px" fontWeight="800" color="#0F172A" lineHeight="1.35" mb="2">
                    {item.title}
                  </Heading>

                  <Text
                    fontSize="12.5px"
                    color="#64748B"
                    lineHeight="1.5"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item.caption}
                  </Text>
                </Box>

                <Flex
                  justify="space-between"
                  align="center"
                  pt="3"
                  borderTop="1px solid"
                  borderColor="#F1F5F9"
                  fontSize="12px"
                  color="#149191"
                  fontWeight="700"
                >
                  <Text>{item.metaLabel}</Text>
                  <HStack gap="1">
                    <Text>Open Viewer</Text>
                    <ArrowRightIcon size={12} />
                  </HStack>
                </Flex>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
