"use client"

import React, { useState, useEffect, useRef } from "react"
import { Box, Flex, Text, HStack, VStack, Badge } from "@chakra-ui/react"
import Link from "next/link"
import {
  SearchIcon,
  CloseIcon,
  ArrowRightIcon,
  TrophyIcon,
  CalendarIcon,
  UsersIcon,
  SparklesIcon,
} from "../icons"

interface SearchResultItem {
  id: string
  title: string
  category: "Programs" | "Events" | "Get Involved" | "About"
  href: string
  description: string
  icon: React.ReactNode
}

const SEARCH_DATA: SearchResultItem[] = [
  {
    id: "1",
    title: "Youth Leadership Academy 2026",
    category: "Programs",
    href: "/programs/leadership",
    description: "Executive leadership training & public speaking masterclass for youth.",
    icon: <TrophyIcon size={15} color="#149191" />,
  },
  {
    id: "2",
    title: "Champion Mentorship Circles",
    category: "Programs",
    href: "/programs/mentorship",
    description: "Connect 1-on-1 with industry executives, founders, and champions.",
    icon: <UsersIcon size={15} color="#051B64" />,
  },
  {
    id: "3",
    title: "Community Outreach Projects",
    category: "Programs",
    href: "/programs/community",
    description: "Direct community impact projects spearheaded by youth leaders.",
    icon: <SparklesIcon size={15} color="#10B981" />,
  },
  {
    id: "4",
    title: "Annual Impact Gala & Awards",
    category: "Events",
    href: "/events/gala",
    description: "October 2026 - Celebrating youth achievements and partners.",
    icon: <CalendarIcon size={15} color="#F59E0B" />,
  },
  {
    id: "5",
    title: "Volunteer Mentor Application",
    category: "Get Involved",
    href: "/get-involved/volunteer",
    description: "Join our network of 250+ active mentors shaping the next generation.",
    icon: <UsersIcon size={15} color="#8B5CF6" />,
  },
  {
    id: "6",
    title: "Scholarship Fund & Donations",
    category: "Get Involved",
    href: "/donate",
    description: "Support underrepresented youth with educational sponsorships.",
    icon: <TrophyIcon size={15} color="#EC4899" />,
  },
  {
    id: "7",
    title: "Our Mission & Leadership",
    category: "About",
    href: "/about",
    description: "Learn about the mission to raise champions everyday.",
    icon: <SparklesIcon size={15} color="#051B64" />,
  },
]

export function SearchPopover() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const popoverRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery("")
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  const categories = ["All", "Programs", "Events", "Get Involved", "About"]

  const filteredResults = SEARCH_DATA.filter((item) => {
    const matchesQuery =
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory

    return matchesQuery && matchesCategory
  })

  return (
    <Box position="relative" ref={popoverRef}>
      {/* Search Icon Button */}
      <Box
        as="button"
        aria-label="Open Search"
        onClick={() => setIsOpen(!isOpen)}
        p="1.5"
        borderRadius="lg"
        color={isOpen ? "#149191" : "gray.600"}
        bg={isOpen ? "rgba(20, 145, 145, 0.08)" : "transparent"}
        _hover={{ bg: "gray.100", color: "#149191" }}
        position="relative"
        cursor="pointer"
        display="flex"
        alignItems="center"
        justifyContent="center"
        transition="all 0.2s"
      >
        <SearchIcon size={18} />
      </Box>

      {/* Popover Card (Matches Notifications Popover Design) */}
      {isOpen && (
        <Box
          position="absolute"
          top="100%"
          right={{ base: "-60px", sm: "0" }}
          mt="2"
          w={{ base: "310px", sm: "380px" }}
          bg="white"
          borderRadius="2xl"
          boxShadow="0 20px 40px -15px rgba(5, 27, 100, 0.2), 0 0 0 1px rgba(5, 27, 100, 0.08)"
          p="3"
          zIndex={200}
          animation="fadeIn 0.2s ease"
        >
          {/* Popover Header / Input */}
          <Flex
            align="center"
            px="3"
            py="1.5"
            mb="2"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="xl"
            bg="gray.50"
            gap="2"
            _focusWithin={{
              borderColor: "#149191",
              bg: "white",
              boxShadow: "0 0 0 2px rgba(20, 145, 145, 0.15)",
            }}
          >
            <SearchIcon size={15} color="#149191" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search programs, events..."
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                fontSize: "12px",
                fontWeight: "500",
                color: "#1F2937",
                background: "transparent",
              }}
            />
            {query ? (
              <Box
                as="button"
                onClick={() => setQuery("")}
                p="0.5"
                color="gray.400"
                _hover={{ color: "gray.600" }}
                cursor="pointer"
              >
                <CloseIcon size={13} />
              </Box>
            ) : (
              <Badge
                bg="white"
                color="gray.400"
                fontSize="9px"
                px="1.5"
                py="0.2"
                borderRadius="md"
                boxShadow="xs"
              >
                ESC
              </Badge>
            )}
          </Flex>

          {/* Filter Pills */}
          <HStack gap="1.5" mb="2" overflowX="auto" pb="1">
            {categories.map((cat) => (
              <Box
                key={cat}
                as="button"
                onClick={() => setSelectedCategory(cat)}
                px="2"
                py="0.5"
                borderRadius="full"
                fontSize="10px"
                fontWeight="600"
                cursor="pointer"
                transition="all 0.15s"
                bg={selectedCategory === cat ? "#051B64" : "gray.100"}
                color={selectedCategory === cat ? "white" : "gray.600"}
                _hover={{
                  bg: selectedCategory === cat ? "#051B64" : "rgba(20, 145, 145, 0.12)",
                  color: selectedCategory === cat ? "white" : "#149191",
                }}
                flexShrink={0}
              >
                {cat}
              </Box>
            ))}
          </HStack>

          {/* Results List */}
          <Box maxH="280px" overflowY="auto" pr="0.5">
            {filteredResults.length > 0 ? (
              <VStack align="stretch" gap="1">
                {filteredResults.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <Flex
                      p="2"
                      borderRadius="xl"
                      align="center"
                      gap="2.5"
                      _hover={{
                        bg: "rgba(20, 145, 145, 0.08)",
                        transform: "translateX(2px)",
                      }}
                      transition="all 0.15s"
                      cursor="pointer"
                    >
                      <Box
                        p="1.5"
                        borderRadius="lg"
                        bg="gray.100"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                      >
                        {item.icon}
                      </Box>
                      <Box flex="1" minW="0">
                        <HStack gap="1.5">
                          <Text
                            fontSize="xs"
                            fontWeight="bold"
                            color="gray.800"
                            lineClamp={1}
                          >
                            {item.title}
                          </Text>
                          <Badge
                            bg="rgba(5, 27, 100, 0.08)"
                            color="#051B64"
                            fontSize="9px"
                            px="1"
                            borderRadius="sm"
                            flexShrink={0}
                          >
                            {item.category}
                          </Badge>
                        </HStack>
                        <Text
                          fontSize="10px"
                          color="gray.500"
                          lineClamp={1}
                        >
                          {item.description}
                        </Text>
                      </Box>
                      <Box color="gray.300" flexShrink={0}>
                        <ArrowRightIcon size={12} />
                      </Box>
                    </Flex>
                  </Link>
                ))}
              </VStack>
            ) : (
              <Box py="5" textAlign="center">
                <Text fontSize="xs" color="gray.500" fontWeight="medium">
                  No results for &ldquo;{query}&rdquo;
                </Text>
              </Box>
            )}
          </Box>

          {/* Footer Info */}
          <Flex
            mt="2"
            pt="2"
            borderTop="1px solid"
            borderColor="gray.100"
            justify="space-between"
            align="center"
            fontSize="10px"
            color="gray.400"
          >
            <Text>Quick search</Text>
            <Text fontWeight="semibold" color="#149191">
              Press ESC to close
            </Text>
          </Flex>
        </Box>
      )}
    </Box>
  )
}
