"use client"

import React from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  HStack,
} from "@chakra-ui/react"
import { NewspaperIcon, SearchIcon, SparklesIcon } from "@/components/icons"
import { LiveDot } from "@/components/LiveDot"

interface BlogHeroProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

const BLOG_CATEGORIES = [
  { id: "all", label: "All Dispatches" },
  { id: "announcements", label: "Program Announcements" },
  { id: "stories", label: "Youth Stories" },
  { id: "recaps", label: "Event Recaps" },
  { id: "articles", label: "Articles & Insights" },
  { id: "opportunities", label: "Opportunities" },
  { id: "updates", label: "Organisation Updates" },
]

export function BlogHero({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
}: BlogHeroProps) {
  return (
    <Box
      as="section"
      position="relative"
      bg="linear-gradient(180deg, #051B64 0%, #071647 60%, #0B1A4D 100%)"
      color="#FFFFFF"
      pt={{ base: "84px", sm: "96px", md: "110px", lg: "116px" }}
      pb={{ base: "10", sm: "12", md: "14" }}
      overflow="hidden"
    >
      {/* Background ambient lighting */}
      <Box
        position="absolute"
        top="-10%"
        left="50%"
        transform="translateX(-50%)"
        w={{ base: "300px", md: "580px" }}
        h={{ base: "220px", md: "360px" }}
        bg="radial-gradient(circle, rgba(20, 145, 145, 0.16) 0%, rgba(5, 27, 100, 0) 70%)"
        filter="blur(50px)"
        pointerEvents="none"
      />

      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1140px", xl: "1240px" }}
        px={{ base: "4", sm: "6", md: "8" }}
        position="relative"
        zIndex={1}
      >
        <Flex
          direction="column"
          align="center"
          textAlign="center"
          maxW="820px"
          mx="auto"
        >
          {/* Eyebrow Badge */}
          <HStack
            gap="2"
            px="3"
            py="1"
            bg="rgba(20, 145, 145, 0.18)"
            border="1px solid"
            borderColor="rgba(20, 145, 145, 0.35)"
            borderRadius="full"
            mb="3"
            boxShadow="0 2px 8px rgba(20, 145, 145, 0.15)"
          >
            <LiveDot color="#149191" size={6} />
            <Text
              fontSize={{ base: "10.5px", sm: "11.5px" }}
              fontWeight="800"
              letterSpacing="0.08em"
              textTransform="uppercase"
              color="#34D399"
            >
              News, Stories & Insights
            </Text>
            <SparklesIcon size={13} color="#34D399" />
          </HStack>

          {/* Heading */}
          <Heading
            as="h1"
            fontSize={{ base: "24px", sm: "30px", md: "38px", lg: "44px" }}
            fontWeight="900"
            lineHeight={{ base: "1.2", md: "1.16" }}
            letterSpacing="-0.025em"
            color="#FFFFFF"
            mb="3"
          >
            The Ongoing Pulse of{" "}
            <Text
              as="span"
              bgGradient="to-r"
              gradientFrom="#34D399"
              gradientTo="#6EE7B7"
              bgClip="text"
              color="#34D399"
            >
              I-Impact Initiative
            </Text>
          </Heading>

          {/* Supporting Text */}
          <Text
            fontSize={{ base: "13.5px", sm: "14.5px", md: "15.5px" }}
            lineHeight={{ base: "1.55", md: "1.6" }}
            color="rgba(226, 232, 240, 0.9)"
            maxW="680px"
            mb={{ base: "6", md: "7" }}
          >
            Stay informed with our program announcements, real stories from the field, event recaps,
            thought leadership essays, and upcoming opportunities for students and mentors.
          </Text>

          {/* Search Input Bar */}
          <Box w="100%" maxW="580px" mb="5">
            <Box
              position="relative"
              bg="#FFFFFF"
              borderRadius="16px"
              boxShadow="0 10px 25px -5px rgba(5, 27, 100, 0.25)"
              p="1.5"
            >
              <Flex align="center">
                <Box pl="3.5" pr="2" color="#64748B">
                  <SearchIcon size={18} />
                </Box>
                <input
                  type="text"
                  placeholder="Search news, youth stories, event recaps..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#0F172A",
                    padding: "8px 12px 8px 4px",
                    background: "transparent",
                  }}
                />
                {searchQuery && (
                  <Box
                    as="button"
                    onClick={() => onSearchChange("")}
                    color="#94A3B8"
                    fontSize="12px"
                    fontWeight="700"
                    pr="3"
                    cursor="pointer"
                    _hover={{ color: "#0F172A" }}
                  >
                    Clear
                  </Box>
                )}
              </Flex>
            </Box>
          </Box>

          {/* Category Filter Pills */}
          <Flex justify="center" align="center" gap="2" wrap="wrap" maxW="840px">
            {BLOG_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id
              return (
                <Box
                  key={cat.id}
                  as="button"
                  onClick={() => onSelectCategory(cat.id)}
                  px="3.5"
                  py="1.5"
                  borderRadius="full"
                  fontSize="12px"
                  fontWeight="700"
                  transition="all 0.18s ease"
                  bg={isActive ? "#149191" : "rgba(255, 255, 255, 0.08)"}
                  color={isActive ? "#FFFFFF" : "rgba(226, 232, 240, 0.85)"}
                  border="1px solid"
                  borderColor={isActive ? "#149191" : "rgba(255, 255, 255, 0.15)"}
                  cursor="pointer"
                  _hover={{
                    md: {
                      bg: isActive ? "#149191" : "rgba(255, 255, 255, 0.15)",
                      borderColor: isActive ? "#149191" : "rgba(255, 255, 255, 0.3)",
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  {cat.label}
                </Box>
              )
            })}
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}

