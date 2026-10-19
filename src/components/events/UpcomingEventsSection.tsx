"use client"

import React, { useState } from "react"
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
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  ArrowRightIcon,
  SparklesIcon,
  SearchIcon,
  VideoIcon,
} from "@/components/icons"
import { EventData, INITIAL_UPCOMING_EVENTS } from "./eventsData"

interface UpcomingEventsSectionProps {
  onOpenRegisterModal?: (event: EventData) => void
  onOpenDetailModal?: (event: EventData) => void
}

const CATEGORIES = [
  "All Events",
  "Flagship Summit",
  "Code & Innovation",
  "Leadership Masterclass",
  "Regional Gathering",
] as const

export function UpcomingEventsSection({
  onOpenRegisterModal,
  onOpenDetailModal,
}: UpcomingEventsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Events")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredEvents = INITIAL_UPCOMING_EVENTS.filter((evt) => {
    const matchesCat =
      selectedCategory === "All Events" || evt.category === selectedCategory
    const query = searchQuery.toLowerCase().trim()
    const matchesQuery =
      !query ||
      evt.title.toLowerCase().includes(query) ||
      evt.venue.toLowerCase().includes(query) ||
      evt.description.toLowerCase().includes(query)
    return matchesCat && matchesQuery
  })

  return (
    <Box
      as="section"
      id="upcoming-events"
      py={{ base: "16", sm: "20", md: "24" }}
      bg="#F8FAFC"
      position="relative"
    >
      <Container maxW="1360px" px={{ base: "4", sm: "6", lg: "8" }}>
        {/* Section Header */}
        <VStack align="center" textAlign="center" maxW="760px" mx="auto" mb={{ base: "10", md: "14" }} gap="3.5">
          <HStack
            gap="2"
            px="3"
            py="1"
            borderRadius="full"
            bg="rgba(5, 27, 100, 0.06)"
            border="1px solid"
            borderColor="rgba(5, 27, 100, 0.12)"
          >
            <CalendarIcon size={14} color="#051B64" />
            <Text fontSize="11px" fontWeight="700" color="#051B64" letterSpacing="0.05em" textTransform="uppercase">
              02 • UPCOMING GATHERINGS & LABS
            </Text>
          </HStack>

          <Heading
            as="h2"
            fontSize={{ base: "28px", sm: "36px", md: "42px" }}
            fontWeight="800"
            color="#051B64"
            lineHeight="1.18"
            letterSpacing="-0.02em"
          >
            Curated Gatherings for Africa’s Future Leaders
          </Heading>

          <Text fontSize={{ base: "15px", md: "16px" }} color="#64748B" lineHeight="1.65">
            Explore our confirmed calendar of flagship summits, tech incubators, and regional
            delegations across Nigeria, Ghana, Kenya, and hybrid international broadcasts.
          </Text>
        </VStack>

        {/* Filter Controls: Category Tabs & Search Bar */}
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "stretch", md: "center" }}
          justify="space-between"
          gap="4"
          mb="8"
          bg="#FFFFFF"
          p="2.5"
          borderRadius="2xl"
          boxShadow="0 4px 20px -2px rgba(5, 27, 100, 0.05)"
          border="1px solid rgba(5, 27, 100, 0.06)"
        >
          {/* Category Tabs */}
          <Flex wrap="wrap" gap="1.5">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat
              return (
                <Box
                  key={cat}
                  as="button"
                  onClick={() => setSelectedCategory(cat)}
                  px="3.5"
                  py="2"
                  borderRadius="xl"
                  fontSize="12.5px"
                  fontWeight="600"
                  transition="all 0.2s"
                  cursor="pointer"
                  bg={isSelected ? "#051B64" : "transparent"}
                  color={isSelected ? "#FFFFFF" : "#475569"}
                  _hover={{
                    bg: isSelected ? "#051B64" : "rgba(5, 27, 100, 0.05)",
                    color: isSelected ? "#FFFFFF" : "#051B64",
                  }}
                >
                  {cat}
                </Box>
              )
            })}
          </Flex>

          {/* Search Input */}
          <Flex
            align="center"
            px="3"
            py="1.5"
            borderRadius="xl"
            bg="#F1F5F9"
            border="1px solid #E2E8F0"
            gap="2"
            minW={{ base: "100%", md: "260px" }}
            _focusWithin={{ borderColor: "#149191", bg: "#FFFFFF", boxShadow: "0 0 0 2px rgba(20, 145, 145, 0.15)" }}
          >
            <SearchIcon size={14} color="#64748B" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by city, title, or topic..."
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                fontSize: "12.5px",
                background: "transparent",
                color: "#1E293B",
              }}
            />
            {searchQuery && (
              <Box
                as="button"
                onClick={() => setSearchQuery("")}
                fontSize="11px"
                color="#64748B"
                cursor="pointer"
                fontWeight="700"
              >
                ✕
              </Box>
            )}
          </Flex>
        </Flex>

        {/* Events Cards Grid */}
        {filteredEvents.length === 0 ? (
          <Box
            p="12"
            textAlign="center"
            borderRadius="2xl"
            bg="#FFFFFF"
            border="1px dashed #CBD5E1"
          >
            <Text fontSize="16px" fontWeight="600" color="#334155" mb="1">
              No matching events found
            </Text>
            <Text fontSize="13px" color="#64748B" mb="4">
              Try adjusting your category selection or search keywords.
            </Text>
            <Button
              size="sm"
              bg="#051B64"
              color="#FFFFFF"
              borderRadius="lg"
              onClick={() => {
                setSelectedCategory("All Events")
                setSearchQuery("")
              }}
            >
              Reset Filters
            </Button>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
            {filteredEvents.map((evt) => (
              <Box
                key={evt.id}
                borderRadius="2xl"
                bg="#FFFFFF"
                border="1px solid"
                borderColor="rgba(5, 27, 100, 0.08)"
                overflow="hidden"
                display="flex"
                flexDirection="column"
                boxShadow="0 4px 16px -2px rgba(5, 27, 100, 0.04)"
                transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "0 16px 32px -6px rgba(5, 27, 100, 0.12)",
                  borderColor: "rgba(20, 145, 145, 0.35)",
                }}
              >
                {/* Card Top Accent Bar with Date & Status */}
                <Box
                  p="4"
                  bg={
                    evt.isHeroFeatured
                      ? "linear-gradient(135deg, #060B19 0%, #0A1E4A 100%)"
                      : "linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)"
                  }
                  color={evt.isHeroFeatured ? "#FFFFFF" : "#0F172A"}
                  borderBottom="1px solid"
                  borderColor={evt.isHeroFeatured ? "rgba(255, 255, 255, 0.1)" : "#E2E8F0"}
                >
                  <Flex align="center" justify="space-between" gap="2">
                    {/* Date Tag */}
                    <HStack gap="1.5">
                      <CalendarIcon
                        size={14}
                        color={evt.isHeroFeatured ? "#34D399" : "#149191"}
                      />
                      <Text
                        fontSize="12.5px"
                        fontWeight="800"
                        letterSpacing="0.02em"
                        color={evt.isHeroFeatured ? "#FFFFFF" : "#051B64"}
                      >
                        {evt.dateDisplay}
                      </Text>
                    </HStack>

                    {/* Status Pill */}
                    <Badge
                      px="2.5"
                      py="0.5"
                      borderRadius="full"
                      fontSize="10px"
                      fontWeight="800"
                      letterSpacing="0.04em"
                      bg={
                        evt.status === "Featured"
                          ? "#059669"
                          : evt.status === "Filling Fast"
                          ? "#EA580C"
                          : "#149191"
                      }
                      color="#FFFFFF"
                    >
                      {evt.status}
                    </Badge>
                  </Flex>
                </Box>

                {/* Card Content Body */}
                <Box p={{ base: "4", sm: "5" }} display="flex" flexDirection="column" flex="1">
                  {/* Category & Mode Badge */}
                  <HStack gap="2" mb="2.5" wrap="wrap">
                    <Text
                      fontSize="11px"
                      fontWeight="700"
                      color="#149191"
                      letterSpacing="0.04em"
                      textTransform="uppercase"
                    >
                      {evt.category}
                    </Text>
                    <Text fontSize="11px" color="#CBD5E1">
                      •
                    </Text>
                    <HStack gap="1">
                      {evt.mode.includes("Virtual") ? (
                        <VideoIcon size={12} color="#64748B" />
                      ) : (
                        <MapPinIcon size={12} color="#64748B" />
                      )}
                      <Text fontSize="11px" color="#64748B" fontWeight="500">
                        {evt.mode}
                      </Text>
                    </HStack>
                  </HStack>

                  {/* Event Title */}
                  <Heading
                    as="h3"
                    fontSize="18px"
                    fontWeight="800"
                    color="#051B64"
                    lineHeight="1.3"
                    mb="2"
                    cursor="pointer"
                    _hover={{ color: "#149191" }}
                    onClick={() => onOpenDetailModal?.(evt)}
                  >
                    {evt.title}
                  </Heading>

                  {/* Short description */}
                  <Text
                    fontSize="13px"
                    color="#64748B"
                    lineHeight="1.55"
                    mb="4"
                    lineClamp={3}
                  >
                    {evt.description}
                  </Text>

                  {/* Metadata Chips: Venue & Attendee count */}
                  <VStack align="flex-start" gap="2" mb="5" mt="auto">
                    <HStack gap="2" align="flex-start" color="#334155" fontSize="12px">
                      <MapPinIcon size={14} color="#051B64" style={{ marginTop: "2px", flexShrink: 0 }} />
                      <Text fontWeight="600" lineClamp={1}>
                        {evt.venue}
                      </Text>
                    </HStack>

                    <HStack gap="2" align="center" color="#059669" fontSize="12px">
                      <UsersIcon size={14} color="#059669" />
                      <Text fontWeight="700">
                        {evt.attendeeBadge}
                      </Text>
                    </HStack>
                  </VStack>

                  {/* Bottom Action Buttons */}
                  <HStack gap="2.5" pt="3" borderTop="1px solid" borderColor="#F1F5F9">
                    <Button
                      flex="1"
                      h="40px"
                      bg="#059669"
                      color="#FFFFFF"
                      borderRadius="xl"
                      fontSize="12.5px"
                      fontWeight="700"
                      transition="all 0.2s"
                      _hover={{ bg: "#047857", transform: "translateY(-1px)" }}
                      onClick={() => onOpenRegisterModal?.(evt)}
                    >
                      {evt.registrationBtnText || "Register Free"}
                    </Button>

                    <Button
                      h="40px"
                      px="3.5"
                      variant="outline"
                      borderColor="#E2E8F0"
                      color="#334155"
                      borderRadius="xl"
                      fontSize="12.5px"
                      fontWeight="600"
                      _hover={{ bg: "#F8FAFC", borderColor: "#CBD5E1" }}
                      onClick={() => onOpenDetailModal?.(evt)}
                    >
                      Agenda
                    </Button>
                  </HStack>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  )
}
