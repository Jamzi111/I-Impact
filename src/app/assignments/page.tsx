"use client"

import React, { useState, useEffect } from "react"
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
  Spinner,
} from "@chakra-ui/react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  GraduationCapIcon,
  ClockIcon,
  CalendarIcon,
  SparklesIcon,
  CheckIcon,
  FileTextIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
  TrophyIcon,
} from "@/components/icons"
import { AssignmentItem } from "@/types/assignment"

const TRACK_FILTERS = [
  "All Tracks",
  "Leadership & Civic Action",
  "STEM Innovation Lab",
  "Mentorship Cohort 2026",
  "Career Foundations",
]

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<AssignmentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTrack, setSelectedTrack] = useState("All Tracks")
  const [submittedIds, setSubmittedIds] = useState<string[]>([])

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await fetch("/api/assignments", { cache: "no-store" })
        if (res.ok) {
          const data = await res.json()
          if (data.success && Array.isArray(data.assignments)) {
            setAssignments(data.assignments)
          }
        }
      } catch (err) {
        console.error("Failed to load assignments:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAssignments()

    try {
      const stored = localStorage.getItem("iimpact_submitted_assignments")
      if (stored) {
        setSubmittedIds(JSON.parse(stored))
      }
    } catch {}
  }, [])

  const handleMarkSubmitted = (id: string) => {
    let updated: string[]
    if (submittedIds.includes(id)) {
      updated = submittedIds.filter((item) => item !== id)
    } else {
      updated = [...submittedIds, id]
    }
    setSubmittedIds(updated)
    try {
      localStorage.setItem("iimpact_submitted_assignments", JSON.stringify(updated))
    } catch {}
  }

  const filteredAssignments = assignments.filter((item) => {
    if (selectedTrack === "All Tracks") return true
    return item.track?.toLowerCase().includes(selectedTrack.toLowerCase())
  })

  return (
    <Box minH="100vh" bg="#F8FAFC" display="flex" flexDirection="column">
      <Header />

      <Box pt={{ base: "24", md: "28" }} pb="20" flex="1">
        <Container maxW="1280px" px={{ base: "4", md: "8" }}>
          {/* Header Banner */}
          <Box
            mb="10"
            p={{ base: "6", md: "10" }}
            borderRadius="3xl"
            bg="linear-gradient(135deg, #051B64 0%, #0A2E8A 50%, #149191 100%)"
            color="white"
            position="relative"
            overflow="hidden"
            boxShadow="0 20px 40px -15px rgba(5, 27, 100, 0.35)"
          >
            {/* Background glowing orbs */}
            <Box
              position="absolute"
              top="-30%"
              right="-10%"
              w="350px"
              h="350px"
              borderRadius="full"
              bg="radial-gradient(circle, rgba(20, 145, 145, 0.4) 0%, transparent 70%)"
              filter="blur(30px)"
              pointerEvents="none"
            />

            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align={{ base: "flex-start", md: "center" }}
              gap="6"
              position="relative"
              zIndex={1}
            >
              <Box maxW="700px">
                <HStack gap="2" mb="3">
                  <Badge
                    bg="rgba(255, 255, 255, 0.15)"
                    color="white"
                    px="3"
                    py="1"
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="bold"
                    backdropFilter="blur(8px)"
                  >
                    STUDENT & PARTICIPANT PORTAL
                  </Badge>
                  <Badge
                    bg="#149191"
                    color="white"
                    px="3"
                    py="1"
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="bold"
                  >
                    LIVE COHORT TASKS
                  </Badge>
                </HStack>

                <Heading
                  as="h1"
                  fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                  fontWeight="900"
                  letterSpacing="-0.02em"
                  mb="3"
                >
                  Cohort Assignments & Impact Deliverables
                </Heading>
                <Text fontSize={{ base: "sm", md: "md" }} color="gray.200" lineHeight="1.6">
                  Complete your weekly track milestones, submit project pitch decks, and track your
                  progress across all I-IMPACT high school and youth leadership programs.
                </Text>
              </Box>

              <HStack gap="3">
                <Link href="/admin/assignments">
                  <Button
                    size="sm"
                    bg="rgba(255, 255, 255, 0.15)"
                    color="white"
                    _hover={{ bg: "rgba(255, 255, 255, 0.25)" }}
                    borderRadius="xl"
                    fontWeight="bold"
                    fontSize="xs"
                    backdropFilter="blur(8px)"
                    border="1px solid rgba(255, 255, 255, 0.2)"
                  >
                    Admin Hub
                  </Button>
                </Link>
                <Link href="/notifications">
                  <Button
                    size="sm"
                    bg="#FACC15"
                    color="#051B64"
                    _hover={{ bg: "#EAB308", transform: "translateY(-1px)" }}
                    borderRadius="xl"
                    fontWeight="bold"
                    fontSize="xs"
                  >
                    <HStack gap="1.5">
                      <SparklesIcon size={13} color="#051B64" />
                      <Text>All Notifications</Text>
                    </HStack>
                  </Button>
                </Link>
              </HStack>
            </Flex>
          </Box>

          {/* Track Filter Tabs */}
          <Flex
            mb="8"
            gap="2"
            overflowX="auto"
            pb="2"
            css={{
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
            }}
          >
            {TRACK_FILTERS.map((track) => {
              const isActive = selectedTrack === track
              return (
                <Button
                  key={track}
                  onClick={() => setSelectedTrack(track)}
                  size="sm"
                  borderRadius="full"
                  px="4"
                  py="2"
                  fontWeight="bold"
                  fontSize="xs"
                  bg={isActive ? "#051B64" : "white"}
                  color={isActive ? "white" : "gray.700"}
                  border="1px solid"
                  borderColor={isActive ? "#051B64" : "gray.200"}
                  _hover={{
                    bg: isActive ? "#0A2E8A" : "gray.50",
                    borderColor: isActive ? "#0A2E8A" : "#149191",
                  }}
                  boxShadow={isActive ? "0 4px 12px rgba(5, 27, 100, 0.15)" : "none"}
                  flexShrink={0}
                >
                  {track}
                </Button>
              )
            })}
          </Flex>

          {/* Main List */}
          {loading ? (
            <Flex justify="center" align="center" minH="300px" direction="column" gap="3">
              <Spinner color="#149191" size="xl" />
              <Text color="gray.500" fontSize="sm">
                Fetching latest assignments...
              </Text>
            </Flex>
          ) : filteredAssignments.length === 0 ? (
            <Box
              bg="white"
              borderRadius="2xl"
              p="12"
              textAlign="center"
              border="1px dashed"
              borderColor="gray.300"
            >
              <Box
                w="64px"
                h="64px"
                borderRadius="full"
                bg="rgba(20, 145, 145, 0.1)"
                color="#149191"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mx="auto"
                mb="4"
              >
                <GraduationCapIcon size={32} />
              </Box>
              <Heading as="h3" fontSize="lg" color="#051B64" mb="2">
                No Assignments Found for this Track
              </Heading>
              <Text fontSize="sm" color="gray.500" maxW="400px" mx="auto" mb="6">
                There are no open assignments or deliverables matching your selection right now.
              </Text>
              <Button
                size="sm"
                bg="#051B64"
                color="white"
                onClick={() => setSelectedTrack("All Tracks")}
                borderRadius="xl"
              >
                View All Tracks
              </Button>
            </Box>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
              {filteredAssignments.map((assignment) => {
                const isCompleted = submittedIds.includes(assignment.id)

                return (
                  <Box
                    key={assignment.id}
                    bg="white"
                    borderRadius="2xl"
                    p={{ base: "5", sm: "6" }}
                    border="1px solid"
                    borderColor={isCompleted ? "rgba(20, 145, 145, 0.4)" : "rgba(5, 27, 100, 0.08)"}
                    boxShadow={
                      isCompleted
                        ? "0 8px 25px -5px rgba(20, 145, 145, 0.15)"
                        : "0 10px 30px -10px rgba(5, 27, 100, 0.06)"
                    }
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    transition="all 0.2s ease"
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "0 15px 35px -10px rgba(5, 27, 100, 0.12)",
                    }}
                    position="relative"
                    overflow="hidden"
                  >
                    {isCompleted && (
                      <Box
                        position="absolute"
                        top="0"
                        right="0"
                        bg="#149191"
                        color="white"
                        fontSize="10px"
                        fontWeight="bold"
                        px="3"
                        py="1"
                        borderBottomLeftRadius="xl"
                        display="flex"
                        alignItems="center"
                        gap="1"
                      >
                        <CheckIcon size={12} color="white" />
                        SUBMITTED
                      </Box>
                    )}

                    <Box>
                      {/* Top Badges */}
                      <Flex justify="space-between" align="center" mb="3" flexWrap="wrap" gap="2">
                        <Badge
                          bg="rgba(20, 145, 145, 0.1)"
                          color="#149191"
                          px="2.5"
                          py="1"
                          borderRadius="md"
                          fontWeight="bold"
                          fontSize="xs"
                        >
                          {assignment.track}
                        </Badge>
                        {assignment.points && (
                          <Badge
                            bg="rgba(5, 27, 100, 0.06)"
                            color="#051B64"
                            px="2.5"
                            py="1"
                            borderRadius="md"
                            fontWeight="bold"
                            fontSize="xs"
                          >
                            {assignment.points} Points
                          </Badge>
                        )}
                      </Flex>

                      {/* Title */}
                      <Heading
                        as="h3"
                        fontSize={{ base: "lg", sm: "xl" }}
                        fontWeight="800"
                        color="#051B64"
                        mb="2"
                        lineHeight="1.3"
                      >
                        {assignment.title}
                      </Heading>

                      {/* Description */}
                      <Text fontSize="sm" color="gray.600" mb="4" lineHeight="1.5">
                        {assignment.description}
                      </Text>

                      {/* Instructions Box if present */}
                      {assignment.instructions && (
                        <Box
                          bg="gray.50"
                          p="3.5"
                          borderRadius="xl"
                          mb="4"
                          borderLeft="3px solid"
                          borderColor="#149191"
                        >
                          <Text fontSize="xs" fontWeight="bold" color="#051B64" mb="1">
                            Submission Guidelines:
                          </Text>
                          <Text fontSize="xs" color="gray.600" lineHeight="1.4">
                            {assignment.instructions}
                          </Text>
                        </Box>
                      )}
                    </Box>

                    {/* Bottom Metadata & Actions */}
                    <Box pt="4" borderTop="1px solid" borderColor="gray.100">
                      <Flex
                        direction={{ base: "column", sm: "row" }}
                        justify="space-between"
                        align={{ base: "flex-start", sm: "center" }}
                        gap="3"
                      >
                        <HStack gap="2" color="gray.500" fontSize="xs">
                          <ClockIcon size={14} color="#EF4444" />
                          <Text fontWeight="semibold">
                            Due: <Text as="span" color="gray.800">{assignment.dueDate}</Text>
                            {assignment.deadlineTime && ` (${assignment.deadlineTime})`}
                          </Text>
                        </HStack>

                        <HStack gap="2" w={{ base: "100%", sm: "auto" }} justify="flex-end">
                          <Button
                            size="sm"
                            variant={isCompleted ? "outline" : "solid"}
                            bg={isCompleted ? "white" : "#051B64"}
                            color={isCompleted ? "#149191" : "white"}
                            borderColor={isCompleted ? "#149191" : "transparent"}
                            _hover={{
                              bg: isCompleted ? "rgba(20, 145, 145, 0.05)" : "#0A2E8A",
                            }}
                            borderRadius="xl"
                            fontWeight="bold"
                            fontSize="xs"
                            onClick={() => handleMarkSubmitted(assignment.id)}
                          >
                            {isCompleted ? "Mark Pending" : "Mark as Submitted"}
                          </Button>

                          {assignment.resourceLink && (
                            <Link
                              href={assignment.resourceLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button
                                size="sm"
                                bg="rgba(20, 145, 145, 0.1)"
                                color="#149191"
                                _hover={{ bg: "rgba(20, 145, 145, 0.2)" }}
                                borderRadius="xl"
                                fontWeight="bold"
                                fontSize="xs"
                              >
                                <HStack gap="1">
                                  <Text>Resource</Text>
                                  <ExternalLinkIcon size={12} />
                                </HStack>
                              </Button>
                            </Link>
                          )}
                        </HStack>
                      </Flex>
                    </Box>
                  </Box>
                )
              })}
            </SimpleGrid>
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
