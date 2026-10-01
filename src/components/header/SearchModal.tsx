"use client"

import React, { useState, useEffect, useRef } from "react"
import { Box, Flex, Text, HStack, VStack, Badge } from "@chakra-ui/react"
import Link from "next/link"
import { SearchIcon, CloseIcon, ArrowRightIcon, TrophyIcon, CalendarIcon, UsersIcon, SparklesIcon } from "../icons"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

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
    description: "Executive leadership training & public speaking masterclass for high schoolers.",
    icon: <TrophyIcon size={16} color="#149191" />,
  },
  {
    id: "2",
    title: "Champion Mentorship Circles",
    category: "Programs",
    href: "/programs/mentorship",
    description: "Connect 1-on-1 with industry executives, tech founders, and community champions.",
    icon: <UsersIcon size={16} color="#051B64" />,
  },
  {
    id: "3",
    title: "Community Outreach & Food Drives",
    category: "Programs",
    href: "/programs/community",
    description: "Direct community impact projects spearheaded by youth leaders.",
    icon: <SparklesIcon size={16} color="#10B981" />,
  },
  {
    id: "4",
    title: "Annual Impact Gala & Awards",
    category: "Events",
    href: "/events/gala",
    description: "October 2026 - Celebrating youth achievements and partner organizations.",
    icon: <CalendarIcon size={16} color="#F59E0B" />,
  },
  {
    id: "5",
    title: "Volunteer Mentor Application",
    category: "Get Involved",
    href: "/get-involved/volunteer",
    description: "Join our network of 250+ active mentors creating meaningful generational shifts.",
    icon: <UsersIcon size={16} color="#8B5CF6" />,
  },
  {
    id: "6",
    title: "Scholarship Fund & Donations",
    category: "Get Involved",
    href: "/donate",
    description: "Support underrepresented youth with tuition, books, and educational devices.",
    icon: <TrophyIcon size={16} color="#EC4899" />,
  },
  {
    id: "7",
    title: "Our Mission & Leadership Team",
    category: "About",
    href: "/about",
    description: "Learn about the mission to raise champions everyday across the globe.",
    icon: <SparklesIcon size={16} color="#051B64" />,
  },
]

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const inputRef = useRef<HTMLInputElement>(null)

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
        if (isOpen) onClose()
        else {
          // Open search
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const filteredResults = SEARCH_DATA.filter((item) => {
    const matchesQuery =
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory

    return matchesQuery && matchesCategory
  })

  const categories = ["All", "Programs", "Events", "Get Involved", "About"]

  return (
    <Box
      position="fixed"
      inset="0"
      bg="rgba(5, 27, 100, 0.45)"
      backdropFilter="blur(6px)"
      zIndex={1000}
      display="flex"
      alignItems="flex-start"
      justifyContent="center"
      pt={{ base: "10vh", md: "15vh" }}
      px="4"
      onClick={onClose}
    >
      <Box
        bg="white"
        w="100%"
        maxW="600px"
        borderRadius="2xl"
        boxShadow="0 25px 50px -12px rgba(5, 27, 100, 0.25)"
        border="1px solid rgba(20, 145, 145, 0.2)"
        overflow="hidden"
        onClick={(e) => e.stopPropagation()}
        animation="fadeIn 0.15s ease-out"
      >
        {/* Search Input Bar */}
        <Flex
          align="center"
          px="4"
          py="3.5"
          borderBottom="1px solid"
          borderColor="gray.100"
          gap="3"
        >
          <SearchIcon size={20} color="#149191" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search programs, events, mentorship, scholarships..."
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: "15px",
              fontWeight: "500",
              color: "#1F2937",
              background: "transparent",
            }}
          />
          {query ? (
            <Box
              as="button"
              onClick={() => setQuery("")}
              p="1"
              color="gray.400"
              _hover={{ color: "gray.600" }}
              cursor="pointer"
            >
              <CloseIcon size={16} />
            </Box>
          ) : (
            <Badge
              bg="gray.100"
              color="gray.500"
              fontSize="11px"
              px="2"
              py="0.5"
              borderRadius="md"
              fontWeight="medium"
            >
              ESC
            </Badge>
          )}
        </Flex>

        {/* Filter Pills */}
        <HStack px="4" py="2.5" gap="2" bg="gray.50" overflowX="auto">
          {categories.map((cat) => (
            <Box
              key={cat}
              as="button"
              onClick={() => setSelectedCategory(cat)}
              px="2.5"
              py="1"
              borderRadius="full"
              fontSize="xs"
              fontWeight="600"
              cursor="pointer"
              transition="all 0.15s"
              bg={selectedCategory === cat ? "#051B64" : "white"}
              color={selectedCategory === cat ? "white" : "gray.600"}
              border="1px solid"
              borderColor={selectedCategory === cat ? "#051B64" : "gray.200"}
              _hover={{
                borderColor: "#149191",
                color: selectedCategory === cat ? "white" : "#149191",
              }}
            >
              {cat}
            </Box>
          ))}
        </HStack>

        {/* Results List */}
        <Box maxH="360px" overflowY="auto" p="3">
          {filteredResults.length > 0 ? (
            <VStack align="stretch" gap="1">
              {filteredResults.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                >
                  <Flex
                    p="2.5"
                    borderRadius="xl"
                    align="center"
                    gap="3"
                    _hover={{
                      bg: "rgba(20, 145, 145, 0.08)",
                      transform: "translateX(2px)",
                    }}
                    transition="all 0.15s"
                    cursor="pointer"
                  >
                    <Box
                      p="2"
                      borderRadius="lg"
                      bg="gray.100"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {item.icon}
                    </Box>
                    <Box flex="1">
                      <HStack gap="2">
                        <Text fontSize="sm" fontWeight="600" color="gray.800">
                          {item.title}
                        </Text>
                        <Badge
                          bg="rgba(5, 27, 100, 0.08)"
                          color="#051B64"
                          fontSize="10px"
                          px="1.5"
                          borderRadius="md"
                        >
                          {item.category}
                        </Badge>
                      </HStack>
                      <Text fontSize="xs" color="gray.500" lineClamp={1}>
                        {item.description}
                      </Text>
                    </Box>
                    <Box color="gray.300">
                      <ArrowRightIcon size={14} />
                    </Box>
                  </Flex>
                </Link>
              ))}
            </VStack>
          ) : (
            <Box py="8" textAlign="center">
              <Text fontSize="sm" color="gray.500" fontWeight="medium">
                No results found for &ldquo;{query}&rdquo;
              </Text>
              <Text fontSize="xs" color="gray.400" mt="1">
                Try searching for &quot;mentorship&quot;, &quot;events&quot;, or &quot;leadership&quot;.
              </Text>
            </Box>
          )}
        </Box>

        {/* Footer info */}
        <Flex
          px="4"
          py="2.5"
          bg="gray.50"
          borderTop="1px solid"
          borderColor="gray.100"
          justify="space-between"
          align="center"
          fontSize="11px"
          color="gray.500"
        >
          <HStack gap="3">
            <Text>Navigate with keys</Text>
            <Text>•</Text>
            <Text>Press ESC to close</Text>
          </HStack>
          <Text fontWeight="600" color="#149191">
            Impact Portal
          </Text>
        </Flex>
      </Box>
    </Box>
  )
}
