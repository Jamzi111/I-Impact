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
  VStack,
} from "@chakra-ui/react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRightIcon } from "@/components/icons"

interface PathwayItem {
  id: string
  title: string
  tag: string
  tagBg: string
  tagColor: string
  description: string
  ctaText: string
  ctaHref: string
  image: string
  category: "all" | "leadership" | "mentorship" | "skills" | "outreach"
}

const PATHWAYS: PathwayItem[] = [
  {
    id: "as-a-teen",
    title: "AS A TEEN Conference",
    tag: "ANNUAL FLAGSHIP",
    tagBg: "#051B64",
    tagColor: "#FFFFFF",
    description:
      "Our flagship youth congress empowering teenage self-discovery, identity grounding, and destiny clarity through workshops and peer dialogues.",
    ctaText: "Discover Curriculum",
    ctaHref: "/programs/as-a-teen",
    image: "/pathways/as-a-teen.jpg",
    category: "leadership",
  },
  {
    id: "skill-empowerment",
    title: "SkillUp Initiative",
    tag: "INNOVATION & SKILLS",
    tagBg: "rgba(20, 145, 145, 0.92)",
    tagColor: "#FFFFFF",
    description:
      "Equipping youths with in-demand practical skills, hands-on craft mastery, creative problem-solving, and vocational competencies for economic independence.",
    ctaText: "Explore Skills Tracks",
    ctaHref: "/programs/skills",
    image: "/pathways/unlock-tech.jpg",
    category: "skills",
  },
  {
    id: "needy-needs-you",
    title: "NEEDY NEEDS YOU (NNY)",
    tag: "OUTREACH & AID",
    tagBg: "#F59E0B",
    tagColor: "#FFFFFF",
    description:
      "Grassroots humanitarian missions bringing educational materials, nutritional relief, and hygiene kits to vulnerable children in underserved clusters.",
    ctaText: "Explore Outreaches",
    ctaHref: "/programs/nny",
    image: "/pathways/needy-needs-you.jpg",
    category: "outreach",
  },
  {
    id: "mentorship-network",
    title: "Mentorship Network",
    tag: "1-ON-1 GUIDANCE",
    tagBg: "#4F46E5",
    tagColor: "#FFFFFF",
    description:
      "Pairing aspiring youths with seasoned executives and civic leaders across tech, finance, and civil service for systematic career mapping.",
    ctaText: "Apply for Match",
    ctaHref: "/programs/mentorship",
    image: "/pathways/mentorship.jpg",
    category: "mentorship",
  },
]

const TABS = [
  { id: "all", label: "All Pathways" },
  { id: "leadership", label: "Leadership" },
  { id: "mentorship", label: "Mentorship" },
  { id: "skills", label: "Skills" },
  { id: "outreach", label: "Community Outreach" },
]

export function FeaturedPathways() {
  const [activeTab, setActiveTab] = useState<string>("all")

  const filteredPathways =
    activeTab === "all"
      ? PATHWAYS
      : PATHWAYS.filter((item) => item.category === activeTab)

  return (
    <Box
      as="section"
      id="featured-pathways"
      position="relative"
      overflow="hidden"
      bg="linear-gradient(180deg, #FBFDFF 0%, #F5F9FE 100%)"
      py={{ base: "12", sm: "14", md: "18", lg: "20" }}
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor="rgba(14, 165, 233, 0.08)"
    >
      {/* Subtle decorative ambient glow */}
      <Box
        position="absolute"
        top="-10%"
        left="50%"
        transform="translateX(-50%)"
        w="900px"
        h="500px"
        bg="radial-gradient(ellipse, rgba(14, 165, 233, 0.08) 0%, transparent 70%)"
        filter="blur(60px)"
        pointerEvents="none"
      />

      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1160px", xl: "1240px" }}
        px={{ base: "4", sm: "6", md: "8" }}
        position="relative"
        zIndex={1}
      >
        {/* Header & Tabs Row */}
        <Flex
          direction={{ base: "column", lg: "row" }}
          align={{ base: "flex-start", lg: "flex-end" }}
          justify="space-between"
          gap={{ base: "6", lg: "8" }}
          mb={{ base: "8", sm: "10", md: "12" }}
        >
          {/* Left Title Area */}
          <VStack align="flex-start" gap="1.5">
            <Text
              fontSize={{ base: "11px", sm: "12px" }}
              fontWeight="800"
              color="#149191"
              letterSpacing="0.1em"
              textTransform="uppercase"
            >
              STRUCTURED TRANSFORMATION
            </Text>
            <Heading
              as="h2"
              fontSize={{ base: "26px", sm: "30px", md: "34px", lg: "38px" }}
              fontWeight="900"
              color="#051B64"
              letterSpacing="-0.025em"
              lineHeight="1.15"
            >
              Featured Pathways to Excellence
            </Heading>
          </VStack>

          {/* Filter Pills */}
          <Box
            bg="rgba(255, 255, 255, 0.8)"
            backdropFilter="blur(8px)"
            p="1"
            borderRadius="14px"
            border="1px solid"
            borderColor="rgba(14, 165, 233, 0.15)"
            boxShadow="0 2px 10px -2px rgba(5, 27, 100, 0.04)"
            overflowX="auto"
            maxW="100%"
          >
            <HStack gap="1" whiteSpace="nowrap">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <Box
                    as="button"
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    px={{ base: "3", sm: "3.5", md: "4" }}
                    py={{ base: "2", sm: "2" }}
                    borderRadius="10px"
                    fontSize={{ base: "12px", sm: "13px" }}
                    fontWeight={isActive ? "700" : "600"}
                    color={isActive ? "#051B64" : "#64748B"}
                    bg={isActive ? "#FFFFFF" : "transparent"}
                    boxShadow={
                      isActive
                        ? "0 2px 8px -2px rgba(5, 27, 100, 0.12)"
                        : "none"
                    }
                    transition="all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                    cursor="pointer"
                    _hover={{
                      color: isActive ? "#051B64" : "#051B64",
                      bg: isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)",
                    }}
                  >
                    {tab.label}
                  </Box>
                )
              })}
            </HStack>
          </Box>
        </Flex>

        {/* Pathways Grid */}
        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 4 }}
          gap={{ base: "6", sm: "6", md: "6", lg: "6" }}
        >
          {filteredPathways.map((item) => (
            <Box
              key={item.id}
              bg="#FFFFFF"
              borderRadius="18px"
              border="1px solid"
              borderColor="rgba(14, 165, 233, 0.14)"
              boxShadow="0 4px 20px -2px rgba(5, 27, 100, 0.05)"
              overflow="hidden"
              display="flex"
              flexDirection="column"
              transition="all 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
              _hover={{
                transform: "translateY(-6px)",
                boxShadow: "0 22px 40px -10px rgba(5, 27, 100, 0.14)",
                borderColor: "rgba(20, 145, 145, 0.45)",
                "& .card-img": {
                  transform: "scale(1.06)",
                },
                "& .cta-arrow": {
                  transform: "translateX(4px)",
                },
              }}
            >
              {/* Image Banner */}
              <Box
                position="relative"
                w="100%"
                h={{ base: "190px", sm: "180px", md: "190px", lg: "190px" }}
                overflow="hidden"
                bg="#F8FAFC"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                  className="card-img"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                />

                {/* Floating Tag Badge */}
                <Box
                  position="absolute"
                  top="3.5"
                  left="3.5"
                  zIndex={2}
                  bg={item.tagBg}
                  color={item.tagColor}
                  px="2.5"
                  py="1"
                  borderRadius="7px"
                  fontSize="10px"
                  fontWeight="800"
                  letterSpacing="0.06em"
                  textTransform="uppercase"
                  boxShadow="0 4px 12px rgba(0, 0, 0, 0.15)"
                  backdropFilter="blur(8px)"
                >
                  {item.tag}
                </Box>
              </Box>

              {/* Card Body */}
              <Flex
                direction="column"
                justify="space-between"
                p={{ base: "5", md: "5.5" }}
                flex="1"
                gap="4"
              >
                <VStack align="flex-start" gap="2.5">
                  <Heading
                    as="h3"
                    fontSize={{ base: "17px", md: "18px" }}
                    fontWeight="800"
                    color="#051B64"
                    lineHeight="1.3"
                    letterSpacing="-0.015em"
                  >
                    {item.title}
                  </Heading>

                  <Text
                    fontSize={{ base: "13px", sm: "13.5px" }}
                    color="#4B5563"
                    lineHeight="1.6"
                    fontWeight="400"
                  >
                    {item.description}
                  </Text>
                </VStack>

                {/* Action Link */}
                <Box pt="1">
                  <Link href={item.ctaHref}>
                    <HStack
                      gap="1.5"
                      color="#149191"
                      fontWeight="700"
                      fontSize={{ base: "13px", md: "13.5px" }}
                      transition="color 0.2s ease"
                      _hover={{ color: "#051B64" }}
                      display="inline-flex"
                      alignItems="center"
                    >
                      <Text>{item.ctaText}</Text>
                      <Box
                        className="cta-arrow"
                        transition="transform 0.25s ease"
                        display="inline-flex"
                        alignItems="center"
                      >
                        <ArrowRightIcon size={14} />
                      </Box>
                    </HStack>
                  </Link>
                </Box>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
