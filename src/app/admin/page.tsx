"use client"

import React, { useState, useEffect } from "react"
import {
  Box,
  SimpleGrid,
  Flex,
  HStack,
  VStack,
  Text,
  Heading,
  Button,
  Badge,
} from "@chakra-ui/react"
import Link from "next/link"
import {
  FileTextIcon,
  UsersIcon,
  ClockIcon,
  CheckCircleIcon,
  RefreshCwIcon,
  ArrowRightIcon,
  SparklesIcon,
  GraduationCapIcon,
  BuildingIcon,
  HeartHandshakeIcon,
  MegaphoneIcon,
  ShieldCheckIcon,
} from "@/components/icons"

interface OverviewStats {
  totalApplications: number
  pendingApplications: number
  approvedApplications: number
  totalVolunteers: number
  totalSubscribers: number
}

interface PathwayBreakdown {
  mentorship: number
  volunteering: number
  partnerships: number
  sponsorship: number
  speaking: number
  ambassadors: number
}

interface RecentApp {
  _id: string
  applicationReference: string
  pathway: string
  pathwayTitle: string
  applicantDetails: {
    fullName: string
    email: string
    city: string
    state: string
    country: string
  }
  status: "pending" | "reviewing" | "accepted" | "rejected"
  submittedAt: string
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<OverviewStats>({
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    totalVolunteers: 0,
    totalSubscribers: 0,
  })
  const [pathwayBreakdown, setPathwayBreakdown] = useState<PathwayBreakdown>({
    mentorship: 0,
    volunteering: 0,
    partnerships: 0,
    sponsorship: 0,
    speaking: 0,
    ambassadors: 0,
  })
  const [recentApplications, setRecentApplications] = useState<RecentApp[]>([])
  const [loading, setLoading] = useState(true)
  const [errorNotice, setErrorNotice] = useState<string | null>(null)

  const fetchOverviewData = async () => {
    setLoading(true)
    setErrorNotice(null)
    try {
      const res = await fetch("/api/admin/overview", { cache: "no-store" })
      const data = await res.json()

      if (data.stats) {
        setStats(data.stats)
      }
      if (data.pathwayBreakdown) {
        setPathwayBreakdown(data.pathwayBreakdown)
      }
      if (data.recentApplications) {
        setRecentApplications(data.recentApplications)
      }
      if (data.isDatabaseOffline) {
        setErrorNotice(data.error)
      }
    } catch (err: any) {
      setErrorNotice("Could not connect to overview API. Please check server logs.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOverviewData()
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return { label: "Approved", bg: "rgba(16, 185, 129, 0.15)", color: "#047857", border: "#10B981" }
      case "rejected":
        return { label: "Rejected", bg: "rgba(239, 68, 68, 0.15)", color: "#B91C1C", border: "#EF4444" }
      case "reviewing":
        return { label: "In Review", bg: "rgba(59, 130, 246, 0.15)", color: "#1D4ED8", border: "#3B82F6" }
      default:
        return { label: "Pending", bg: "rgba(245, 158, 11, 0.15)", color: "#B45309", border: "#F59E0B" }
    }
  }

  const PATHWAY_META = [
    { id: "mentorship", label: "Youth Mentorship", count: pathwayBreakdown.mentorship, icon: <HeartHandshakeIcon size={16} color="#149191" /> },
    { id: "volunteering", label: "Event Volunteering", count: pathwayBreakdown.volunteering, icon: <UsersIcon size={16} color="#051B64" /> },
    { id: "partnerships", label: "School Partnerships", count: pathwayBreakdown.partnerships, icon: <BuildingIcon size={16} color="#7C3AED" /> },
    { id: "sponsorship", label: "Programme Support", count: pathwayBreakdown.sponsorship, icon: <SparklesIcon size={16} color="#D97706" /> },
    { id: "speaking", label: "Speakers & Facilitators", count: pathwayBreakdown.speaking, icon: <MegaphoneIcon size={16} color="#059669" /> },
    { id: "ambassadors", label: "Campus Ambassadors", count: pathwayBreakdown.ambassadors, icon: <GraduationCapIcon size={16} color="#0284C7" /> },
  ]

  return (
    <Box maxW="1400px" mx="auto">
      {/* Top Banner Notice if MongoDB whitelist pending */}
      {errorNotice && (
        <Box
          bg="#FFFBEB"
          border="1px solid #FCD34D"
          borderRadius="14px"
          p="4"
          mb="6"
          boxShadow="0 2px 8px rgba(245, 158, 11, 0.08)"
        >
          <HStack gap="3" align="flex-start">
            <Box color="#D97706" mt="0.5">
              <ClockIcon size={18} />
            </Box>
            <VStack align="flex-start" gap="0.5">
              <Text fontSize="13px" fontWeight="800" color="#92400E">
                Database Notice
              </Text>
              <Text fontSize="12.5px" color="#B45309" lineHeight="1.4">
                {errorNotice}
              </Text>
            </VStack>
          </HStack>
        </Box>
      )}

      {/* Overview Header & Refresh Button */}
      <Flex
        direction={{ base: "column", sm: "row" }}
        justify="space-between"
        align={{ base: "flex-start", sm: "center" }}
        gap="3"
        mb="6"
      >
        <Box>
          <Heading as="h1" fontSize={{ base: "20px", sm: "24px" }} fontWeight="900" color="#051B64">
            System Dashboard
          </Heading>
          <Text fontSize="13px" color="#64748B" mt="0.5">
            Verified platform records connected to MongoDB Atlas
          </Text>
        </Box>

        <HStack gap="2.5">
          <Button
            size="sm"
            onClick={fetchOverviewData}
            variant="outline"
            borderColor="#CBD5E1"
            color="#475569"
            borderRadius="10px"
            h="36px"
            px="3.5"
            fontSize="12px"
            fontWeight="700"
            _hover={{ bg: "#FFFFFF", borderColor: "#149191", color: "#149191" }}
          >
            <HStack gap="1.5">
              <RefreshCwIcon size={13} />
              <Text>{loading ? "Refreshing..." : "Refresh Data"}</Text>
            </HStack>
          </Button>

          <Link href="/admin/applications">
            <Button
              size="sm"
              bg="#051B64"
              color="#FFFFFF"
              borderRadius="10px"
              h="36px"
              px="4"
              fontSize="12px"
              fontWeight="700"
              _hover={{ bg: "#04144A", transform: "translateY(-1px)" }}
              boxShadow="0 2px 6px rgba(5, 27, 100, 0.2)"
            >
              <HStack gap="1.5">
                <Text>View Applications</Text>
                <ArrowRightIcon size={12} />
              </HStack>
            </Button>
          </Link>
        </HStack>
      </Flex>

      {/* Section 1: The 4 Signature Statistic Cards */}
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="4" mb="8">
        {/* Card 1: Total Applications */}
        <Box
          bg="#FFFFFF"
          border="1.5px solid"
          borderColor="#E2E8F0"
          borderRadius="16px"
          p="5"
          boxShadow="0 4px 16px rgba(5, 27, 100, 0.04)"
          transition="all 0.2s ease"
          _hover={{ transform: "translateY(-2px)", boxShadow: "0 8px 24px rgba(5, 27, 100, 0.08)" }}
        >
          <Flex justify="space-between" align="center" mb="3">
            <Text fontSize="12px" fontWeight="700" color="#64748B" textTransform="uppercase" letterSpacing="0.05em">
              Total Applications
            </Text>
            <Box
              w="36px"
              h="36px"
              borderRadius="10px"
              bg="rgba(5, 27, 100, 0.08)"
              color="#051B64"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FileTextIcon size={18} />
            </Box>
          </Flex>
          <Text fontSize="28px" fontWeight="900" color="#051B64" lineHeight="1">
            {stats.totalApplications}
          </Text>
          <Text fontSize="11.5px" color="#64748B" mt="2">
            Across all 6 participation pathways
          </Text>
        </Box>

        {/* Card 2: Pending Review */}
        <Box
          bg="#FFFFFF"
          border="1.5px solid"
          borderColor={stats.pendingApplications > 0 ? "rgba(245, 158, 11, 0.4)" : "#E2E8F0"}
          borderRadius="16px"
          p="5"
          boxShadow="0 4px 16px rgba(5, 27, 100, 0.04)"
          transition="all 0.2s ease"
          _hover={{ transform: "translateY(-2px)", boxShadow: "0 8px 24px rgba(5, 27, 100, 0.08)" }}
        >
          <Flex justify="space-between" align="center" mb="3">
            <Text fontSize="12px" fontWeight="700" color="#B45309" textTransform="uppercase" letterSpacing="0.05em">
              Pending Review
            </Text>
            <Box
              w="36px"
              h="36px"
              borderRadius="10px"
              bg="rgba(245, 158, 11, 0.15)"
              color="#B45309"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <ClockIcon size={18} />
            </Box>
          </Flex>
          <Text fontSize="28px" fontWeight="900" color="#D97706" lineHeight="1">
            {stats.pendingApplications}
          </Text>
          <Text fontSize="11.5px" color="#92400E" mt="2">
            Awaiting administrator decision
          </Text>
        </Box>

        {/* Card 3: Approved Champions */}
        <Box
          bg="#FFFFFF"
          border="1.5px solid"
          borderColor="#E2E8F0"
          borderRadius="16px"
          p="5"
          boxShadow="0 4px 16px rgba(5, 27, 100, 0.04)"
          transition="all 0.2s ease"
          _hover={{ transform: "translateY(-2px)", boxShadow: "0 8px 24px rgba(5, 27, 100, 0.08)" }}
        >
          <Flex justify="space-between" align="center" mb="3">
            <Text fontSize="12px" fontWeight="700" color="#047857" textTransform="uppercase" letterSpacing="0.05em">
              Approved Champions
            </Text>
            <Box
              w="36px"
              h="36px"
              borderRadius="10px"
              bg="rgba(16, 185, 129, 0.15)"
              color="#047857"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <CheckCircleIcon size={18} />
            </Box>
          </Flex>
          <Text fontSize="28px" fontWeight="900" color="#047857" lineHeight="1">
            {stats.approvedApplications}
          </Text>
          <Text fontSize="11.5px" color="#059669" mt="2">
            Accepted into active cohorts
          </Text>
        </Box>

        {/* Card 4: Registered Volunteers */}
        <Box
          bg="#FFFFFF"
          border="1.5px solid"
          borderColor="#E2E8F0"
          borderRadius="16px"
          p="5"
          boxShadow="0 4px 16px rgba(5, 27, 100, 0.04)"
          transition="all 0.2s ease"
          _hover={{ transform: "translateY(-2px)", boxShadow: "0 8px 24px rgba(5, 27, 100, 0.08)" }}
        >
          <Flex justify="space-between" align="center" mb="3">
            <Text fontSize="12px" fontWeight="700" color="#149191" textTransform="uppercase" letterSpacing="0.05em">
              Registered Volunteers
            </Text>
            <Box
              w="36px"
              h="36px"
              borderRadius="10px"
              bg="rgba(20, 145, 145, 0.15)"
              color="#149191"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <UsersIcon size={18} />
            </Box>
          </Flex>
          <Text fontSize="28px" fontWeight="900" color="#0F766E" lineHeight="1">
            {stats.totalVolunteers}
          </Text>
          <Text fontSize="11.5px" color="#149191" mt="2">
            {stats.totalSubscribers} newsletter subscribers
          </Text>
        </Box>
      </SimpleGrid>

      {/* Section 2: Pathway Breakdown & Quick Actions */}
      <SimpleGrid columns={{ base: 1, lg: 3 }} gap="6" mb="8">
        {/* Left 2 Cols: Pathway Distribution */}
        <Box
          gridColumn={{ base: "span 1", lg: "span 2" }}
          bg="#FFFFFF"
          border="1.5px solid #E2E8F0"
          borderRadius="18px"
          p="6"
          boxShadow="0 4px 16px rgba(5, 27, 100, 0.03)"
        >
          <Flex justify="space-between" align="center" mb="4">
            <Box>
              <Heading as="h2" fontSize="15.5px" fontWeight="800" color="#051B64">
                Participation Pathway Distribution
              </Heading>
              <Text fontSize="12px" color="#64748B">
                Current applicant volume segmented by program track
              </Text>
            </Box>
            <Badge bg="rgba(20, 145, 145, 0.12)" color="#149191" fontSize="11px" fontWeight="800" px="2.5" py="1" borderRadius="md">
              6 Tracks
            </Badge>
          </Flex>

          <SimpleGrid columns={{ base: 2, sm: 3 }} gap="3" pt="2">
            {PATHWAY_META.map((item) => (
              <Box
                key={item.id}
                p="3.5"
                borderRadius="12px"
                bg="#F8FAFC"
                border="1px solid #E2E8F0"
                transition="all 0.15s ease"
                _hover={{ bg: "#FFFFFF", borderColor: "#149191", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
              >
                <HStack justify="space-between" align="center" mb="1.5">
                  <Box>{item.icon}</Box>
                  <Text fontSize="18px" fontWeight="900" color="#051B64">
                    {item.count}
                  </Text>
                </HStack>
                <Text fontSize="11.5px" fontWeight="700" color="#475569" lineHeight="1.3">
                  {item.label}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Right 1 Col: Quick Administrative Actions */}
        <Box
          bg="#FFFFFF"
          border="1.5px solid #E2E8F0"
          borderRadius="18px"
          p="6"
          boxShadow="0 4px 16px rgba(5, 27, 100, 0.03)"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box mb="4">
            <Heading as="h2" fontSize="15.5px" fontWeight="800" color="#051B64">
              Quick Actions
            </Heading>
            <Text fontSize="12px" color="#64748B" mt="0.5">
              Direct access to primary administrative workflows
            </Text>
          </Box>

          <VStack align="stretch" gap="2.5">
            <Link href="/admin/applications" style={{ textDecoration: "none" }}>
              <Flex
                align="center"
                justify="space-between"
                p="3"
                borderRadius="12px"
                bg="#F8FAFC"
                border="1px solid #E2E8F0"
                color="#051B64"
                _hover={{ bg: "#051B64", color: "#FFFFFF", borderColor: "#051B64" }}
                transition="all 0.15s ease"
              >
                <HStack gap="2.5">
                  <FileTextIcon size={16} />
                  <Text fontSize="12.5px" fontWeight="700">
                    Review Inbound Applications
                  </Text>
                </HStack>
                <ArrowRightIcon size={12} />
              </Flex>
            </Link>

            <Link href="/admin/events" style={{ textDecoration: "none" }}>
              <Flex
                align="center"
                justify="space-between"
                p="3"
                borderRadius="12px"
                bg="#F8FAFC"
                border="1px solid #E2E8F0"
                color="#051B64"
                _hover={{ bg: "#149191", color: "#FFFFFF", borderColor: "#149191" }}
                transition="all 0.15s ease"
              >
                <HStack gap="2.5">
                  <MegaphoneIcon size={16} />
                  <Text fontSize="12.5px" fontWeight="700">
                    Create / Manage Events
                  </Text>
                </HStack>
                <ArrowRightIcon size={12} />
              </Flex>
            </Link>

            <Link href="/admin/assignments" style={{ textDecoration: "none" }}>
              <Flex
                align="center"
                justify="space-between"
                p="3"
                borderRadius="12px"
                bg="#F8FAFC"
                border="1px solid #E2E8F0"
                color="#051B64"
                _hover={{ bg: "#047857", color: "#FFFFFF", borderColor: "#047857" }}
                transition="all 0.15s ease"
              >
                <HStack gap="2.5">
                  <GraduationCapIcon size={16} />
                  <Text fontSize="12.5px" fontWeight="700">
                    Student Homework Portal
                  </Text>
                </HStack>
                <ArrowRightIcon size={12} />
              </Flex>
            </Link>

            <Link href="/" target="_blank" style={{ textDecoration: "none" }}>
              <Flex
                align="center"
                justify="space-between"
                p="3"
                borderRadius="12px"
                bg="#F8FAFC"
                border="1px solid #E2E8F0"
                color="#475569"
                _hover={{ bg: "#F1F5F9", color: "#0F172A" }}
                transition="all 0.15s ease"
              >
                <HStack gap="2.5">
                  <ShieldCheckIcon size={16} />
                  <Text fontSize="12.5px" fontWeight="600">
                    Audit Public Website
                  </Text>
                </HStack>
                <ArrowRightIcon size={12} />
              </Flex>
            </Link>
          </VStack>
        </Box>
      </SimpleGrid>

      {/* Section 3: Recent Inbound Applications Table */}
      <Box
        bg="#FFFFFF"
        border="1.5px solid #E2E8F0"
        borderRadius="18px"
        p="6"
        boxShadow="0 4px 16px rgba(5, 27, 100, 0.03)"
      >
        <Flex
          direction={{ base: "column", sm: "row" }}
          justify="space-between"
          align={{ base: "flex-start", sm: "center" }}
          gap="3"
          mb="5"
        >
          <Box>
            <Heading as="h2" fontSize="16px" fontWeight="800" color="#051B64">
              Recent Application Submissions
            </Heading>
            <Text fontSize="12px" color="#64748B">
              Latest candidate expressions of interest stored in MongoDB Atlas
            </Text>
          </Box>

          <Link href="/admin/applications">
            <Button
              size="xs"
              variant="outline"
              borderColor="#CBD5E1"
              color="#051B64"
              fontWeight="700"
              fontSize="11.5px"
              h="30px"
              px="3"
              borderRadius="8px"
              _hover={{ bg: "#F8FAFC", borderColor: "#149191" }}
            >
              <HStack gap="1">
                <Text>View All Applications</Text>
                <ArrowRightIcon size={11} />
              </HStack>
            </Button>
          </Link>
        </Flex>

        {/* Table Container */}
        {recentApplications.length === 0 ? (
          <Box p="8" textAlign="center" borderRadius="12px" bg="#F8FAFC" border="1px dashed #CBD5E1">
            <Text fontSize="13.5px" fontWeight="700" color="#475569">
              {loading ? "Loading application records..." : "No applications submitted yet."}
            </Text>
            <Text fontSize="12px" color="#94A3B8" mt="1">
              When candidates apply via the Get Involved pathways, their records appear here instantly.
            </Text>
          </Box>
        ) : (
          <Box overflowX="auto">
            <Box as="table" w="100%" textAlign="left" borderCollapse="collapse">
              <Box as="thead">
                <Box as="tr" borderBottom="1px solid #E2E8F0" color="#64748B" fontSize="11px" fontWeight="800" textTransform="uppercase" letterSpacing="0.05em">
                  <Box as="th" py="3" px="3">Reference</Box>
                  <Box as="th" py="3" px="3">Candidate</Box>
                  <Box as="th" py="3" px="3">Pathway</Box>
                  <Box as="th" py="3" px="3">Location</Box>
                  <Box as="th" py="3" px="3">Date</Box>
                  <Box as="th" py="3" px="3">Status</Box>
                  <Box as="th" py="3" px="3" textAlign="right">Action</Box>
                </Box>
              </Box>
              <Box as="tbody">
                {recentApplications.map((app) => {
                  const statusBadge = getStatusBadge(app.status)
                  const dateStr = app.submittedAt
                    ? new Date(app.submittedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                    : "—"

                  return (
                    <Box
                      as="tr"
                      key={app._id}
                      borderBottom="1px solid #F1F5F9"
                      fontSize="12.5px"
                      _hover={{ bg: "#F8FAFC" }}
                      transition="background 0.15s ease"
                    >
                      <Box as="td" py="3.5" px="3" fontWeight="800" color="#051B64">
                        {app.applicationReference}
                      </Box>
                      <Box as="td" py="3.5" px="3">
                        <Text fontWeight="700" color="#0F172A">
                          {app.applicantDetails?.fullName || "—"}
                        </Text>
                        <Text fontSize="11px" color="#64748B">
                          {app.applicantDetails?.email || "—"}
                        </Text>
                      </Box>
                      <Box as="td" py="3.5" px="3">
                        <Badge
                          bg="rgba(20, 145, 145, 0.12)"
                          color="#0F766E"
                          fontSize="10.5px"
                          fontWeight="700"
                          px="2"
                          py="0.5"
                          borderRadius="md"
                        >
                          {app.pathwayTitle}
                        </Badge>
                      </Box>
                      <Box as="td" py="3.5" px="3" color="#475569">
                        {[app.applicantDetails?.city, app.applicantDetails?.state].filter(Boolean).join(", ") || "Nigeria"}
                      </Box>
                      <Box as="td" py="3.5" px="3" color="#64748B">
                        {dateStr}
                      </Box>
                      <Box as="td" py="3.5" px="3">
                        <Badge
                          bg={statusBadge.bg}
                          color={statusBadge.color}
                          border="1px solid"
                          borderColor={statusBadge.border}
                          fontSize="10.5px"
                          fontWeight="800"
                          px="2"
                          py="0.5"
                          borderRadius="full"
                        >
                          {statusBadge.label}
                        </Badge>
                      </Box>
                      <Box as="td" py="3.5" px="3" textAlign="right">
                        <Link href="/admin/applications">
                          <Button
                            size="xs"
                            variant="ghost"
                            color="#149191"
                            fontWeight="800"
                            fontSize="11.5px"
                            _hover={{ bg: "rgba(20, 145, 145, 0.1)", color: "#0F766E" }}
                          >
                            Review →
                          </Button>
                        </Link>
                      </Box>
                    </Box>
                  )
                })}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

