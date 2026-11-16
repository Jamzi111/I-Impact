"use client"

import React, { useState, useEffect, useCallback } from "react"
import {
  Box,
  Heading,
  Text,
  Flex,
  HStack,
  VStack,
  Button,
  Input,
  Badge,
  Spinner,
  Textarea,
  SimpleGrid,
} from "@chakra-ui/react"
import Link from "next/link"
import {
  UsersIcon,
  SearchIcon,
  FilterIcon,
  CheckIcon,
  CloseIcon,
  ClockIcon,
  DownloadIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PhoneIcon,
  MailIcon,
  UserCheckIcon,
} from "@/components/icons"

interface ApplicantDetails {
  fullName: string
  email: string
  phone: string
  city: string
  state: string
  country: string
}

interface VolunteerItem {
  _id: string
  applicationReference: string
  pathway: string
  pathwayTitle: string
  applicantDetails: ApplicantDetails
  pathwayDetails: {
    areasOfInterest?: string[]
    previousVolunteeringExperience?: string
    availabilitySchedule?: string
    availabilityFrequency?: string
    motivationForVolunteering?: string
    portfolioOrSocialUrl?: string
    [key: string]: any
  }
  status: "pending" | "reviewing" | "accepted" | "rejected"
  safeguardingAcknowledged: boolean
  submittedAt: string
  internalNotes?: string
  reviewedAt?: string
  reviewedBy?: string
}

interface StatusCounts {
  all: number
  pending: number
  reviewing: number
  accepted: number
  rejected: number
}

const INTEREST_AREAS = [
  { value: "", label: "All Interest Areas" },
  { value: "Event planning and coordination", label: "Event Planning & Coordination" },
  { value: "Registration and attendee support", label: "Registration & Attendee Support" },
  { value: "Media, photography and videography", label: "Media & Videography" },
  { value: "Social media and communications", label: "Social Media & Comms" },
  { value: "Logistics and operations", label: "Logistics & Operations" },
  { value: "Technical support", label: "Technical Support" },
  { value: "General volunteering", label: "General Volunteering" },
]

export default function AdminVolunteersPage() {
  const [volunteers, setVolunteers] = useState<VolunteerItem[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [statusCounts, setStatusCounts] = useState<StatusCounts>({
    all: 0,
    pending: 0,
    reviewing: 0,
    accepted: 0,
    rejected: 0,
  })

  // Filters
  const [search, setSearch] = useState("")
  const [selectedInterest, setSelectedInterest] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // UI state
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Drawer modal
  const [activeVolunteer, setActiveVolunteer] = useState<VolunteerItem | null>(null)
  const [notesInput, setNotesInput] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [statusFeedback, setStatusFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const fetchVolunteers = useCallback(async () => {
    try {
      setLoading(true)
      setErrorMessage(null)

      const params = new URLSearchParams()
      params.append("pathway", "volunteering")
      if (search.trim()) params.append("search", search.trim())
      if (selectedStatus && selectedStatus !== "all") params.append("status", selectedStatus)
      params.append("page", page.toString())
      params.append("limit", "12")

      const res = await fetch(`/api/admin/applications?${params.toString()}`, {
        cache: "no-store",
      })

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`)
      }

      const data = await res.json()
      if (data.success) {
        let list = data.applications || []
        // Client-side filtering by specific interest area if selected
        if (selectedInterest) {
          list = list.filter((item: VolunteerItem) =>
            item.pathwayDetails?.areasOfInterest?.some((area) =>
              area.toLowerCase().includes(selectedInterest.toLowerCase())
            )
          )
        }
        setVolunteers(list)
        setTotal(data.total || 0)
        setTotalPages(data.totalPages || 1)
        if (data.statusCounts) {
          setStatusCounts(data.statusCounts)
        }
      } else {
        setErrorMessage(data.error || "Failed to load volunteers")
      }
    } catch (err: any) {
      console.error("Failed to load volunteers:", err)
      setErrorMessage(err.message || "Failed to connect to the server.")
    } finally {
      setLoading(false)
    }
  }, [search, selectedInterest, selectedStatus, page])

  useEffect(() => {
    fetchVolunteers()
  }, [fetchVolunteers])

  const openVolunteer = (vol: VolunteerItem) => {
    setActiveVolunteer(vol)
    setNotesInput(vol.internalNotes || "")
    setStatusFeedback(null)
  }

  const closeVolunteer = () => {
    setActiveVolunteer(null)
    setStatusFeedback(null)
  }

  const handleUpdateVolunteer = async (newStatus?: VolunteerItem["status"], saveNotesOnly = false) => {
    if (!activeVolunteer) return

    try {
      setIsUpdating(true)
      setStatusFeedback(null)

      const payload: { status?: string; internalNotes?: string; reviewedBy?: string } = {
        internalNotes: notesInput,
      }
      if (newStatus) {
        payload.status = newStatus
        payload.reviewedBy = "I-IMPACT Volunteer Coordinator"
      }

      const res = await fetch(`/api/admin/applications/${activeVolunteer._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update volunteer record")
      }

      setStatusFeedback({
        type: "success",
        text: saveNotesOnly ? "Volunteer assignment notes saved." : `Status marked as ${newStatus?.toUpperCase()}.`,
      })

      setActiveVolunteer((prev) =>
        prev
          ? {
              ...prev,
              status: (newStatus || prev.status) as VolunteerItem["status"],
              internalNotes: notesInput,
              reviewedAt: new Date().toISOString(),
              reviewedBy: "I-IMPACT Volunteer Coordinator",
            }
          : null
      )

      fetchVolunteers()
    } catch (err: any) {
      setStatusFeedback({
        type: "error",
        text: err.message || "Failed to update record.",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleExportCSV = () => {
    if (volunteers.length === 0) return

    const headers = ["Reference", "Full Name", "Email", "Phone", "Location", "Interests", "Availability", "Status"]
    const rows = volunteers.map((vol) => [
      `"${vol.applicationReference}"`,
      `"${vol.applicantDetails?.fullName || ""}"`,
      `"${vol.applicantDetails?.email || ""}"`,
      `"${vol.applicantDetails?.phone || ""}"`,
      `"${vol.applicantDetails?.city || ""}, ${vol.applicantDetails?.state || ""}"`,
      `"${vol.pathwayDetails?.areasOfInterest?.join("; ") || ""}"`,
      `"${vol.pathwayDetails?.availabilitySchedule || ""}"`,
      `"${vol.status}"`,
    ])

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `i-impact-volunteers-${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return <Badge bg="#ECFDF5" color="#059669" border="1px solid #A7F3D0" px="2.5" py="0.5" borderRadius="full" fontSize="12px" fontWeight="700">Active / Approved</Badge>
      case "reviewing":
        return <Badge bg="#EFF6FF" color="#2563EB" border="1px solid #BFDBFE" px="2.5" py="0.5" borderRadius="full" fontSize="12px" fontWeight="600">In Screening</Badge>
      case "rejected":
        return <Badge bg="#FEF2F2" color="#DC2626" border="1px solid #FECACA" px="2.5" py="0.5" borderRadius="full" fontSize="12px">Deactivated</Badge>
      default:
        return <Badge bg="#FFFBEB" color="#D97706" border="1px solid #FDE68A" px="2.5" py="0.5" borderRadius="full" fontSize="12px" fontWeight="600">Pending Review</Badge>
    }
  }

  // Format phone number for WhatsApp link
  const getWhatsAppLink = (phone?: string) => {
    if (!phone) return ""
    const digits = phone.replace(/[^0-9]/g, "")
    const formatted = digits.startsWith("0") ? `234${digits.slice(1)}` : digits
    return `https://wa.me/${formatted}?text=Hello%20from%20I-IMPACT%20Initiative!`
  }

  return (
    <Box>
      {/* 1. Header */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "flex-start", md: "center" }}
        gap="4"
        mb="6"
      >
        <Box>
          <HStack gap="3">
            <Heading as="h1" fontSize={{ base: "22px", md: "26px" }} fontWeight="800" color="#0F172A">
              Volunteers Management
            </Heading>
            <Badge bg="#F1F5F9" color="#051B64" fontSize="13px" fontWeight="700" px="2.5" py="0.5" borderRadius="full">
              {total} Registered
            </Badge>
          </HStack>
          <Text fontSize="14px" color="#64748B" mt="1">
            Manage volunteer profiles, availability schedules, department assignments, and screening status.
          </Text>
        </Box>

        <HStack gap="3">
          <Button
            size="sm"
            bg="white"
            color="#051B64"
            border="1px solid #E2E8F0"
            _hover={{ bg: "#F8FAFC", borderColor: "#CBD5E1" }}
            onClick={fetchVolunteers}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </Button>
          <Button
            size="sm"
            bg="#051B64"
            color="white"
            _hover={{ bg: "#0A2580" }}
            onClick={handleExportCSV}
            disabled={volunteers.length === 0}
          >
            <HStack gap="1.5">
              <DownloadIcon size={14} color="white" />
              <Text>Export Roster</Text>
            </HStack>
          </Button>
        </HStack>
      </Flex>

      {/* KPI Cards */}
      <SimpleGrid columns={{ base: 2, lg: 4 }} gap="3.5" mb="6">
        <Box bg="white" p="4" borderRadius="12px" border="1px solid #E2E8F0">
          <Text fontSize="11.5px" fontWeight="700" color="#64748B" textTransform="uppercase">Total Volunteers</Text>
          <Text fontSize="22px" fontWeight="900" color="#051B64" mt="1">{statusCounts.all}</Text>
        </Box>
        <Box bg="white" p="4" borderRadius="12px" border="1px solid #E2E8F0">
          <Text fontSize="11.5px" fontWeight="700" color="#059669" textTransform="uppercase">Active / Approved</Text>
          <Text fontSize="22px" fontWeight="900" color="#059669" mt="1">{statusCounts.accepted}</Text>
        </Box>
        <Box bg="white" p="4" borderRadius="12px" border="1px solid #E2E8F0">
          <Text fontSize="11.5px" fontWeight="700" color="#D97706" textTransform="uppercase">Pending Screening</Text>
          <Text fontSize="22px" fontWeight="900" color="#D97706" mt="1">{statusCounts.pending}</Text>
        </Box>
        <Box bg="white" p="4" borderRadius="12px" border="1px solid #E2E8F0">
          <Text fontSize="11.5px" fontWeight="700" color="#2563EB" textTransform="uppercase">In Screening</Text>
          <Text fontSize="22px" fontWeight="900" color="#2563EB" mt="1">{statusCounts.reviewing}</Text>
        </Box>
      </SimpleGrid>

      {/* Error or IP Notice */}
      {errorMessage && (
        <Box bg="#FEF2F2" border="1px solid #FECACA" p="4" borderRadius="12px" mb="6" color="#991B1B" fontSize="13.5px">
          <HStack align="flex-start" gap="3">
            <Text fontWeight="700">Notice:</Text>
            <Text>{errorMessage}</Text>
          </HStack>
        </Box>
      )}

      {/* 2. Status Filter Tabs */}
      <Flex
        overflowX="auto"
        borderBottom="1px solid #E2E8F0"
        pb="3"
        mb="6"
        gap="2"
        css={{
          "&::-webkit-scrollbar": { display: "none" },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {[
          { key: "all", label: "All Volunteers", count: statusCounts.all, color: "#64748B" },
          { key: "accepted", label: "Active / Approved", count: statusCounts.accepted, color: "#059669" },
          { key: "pending", label: "Pending", count: statusCounts.pending, color: "#D97706" },
          { key: "reviewing", label: "In Screening", count: statusCounts.reviewing, color: "#2563EB" },
          { key: "rejected", label: "Deactivated", count: statusCounts.rejected, color: "#DC2626" },
        ].map((tab) => {
          const isActive = selectedStatus === tab.key
          return (
            <Button
              key={tab.key}
              size="sm"
              variant="ghost"
              px="4"
              py="2"
              borderRadius="full"
              fontSize="13px"
              fontWeight={isActive ? "700" : "500"}
              bg={isActive ? "#051B64" : "white"}
              color={isActive ? "white" : "#475569"}
              border={isActive ? "1px solid #051B64" : "1px solid #E2E8F0"}
              _hover={{ bg: isActive ? "#051B64" : "#F8FAFC" }}
              onClick={() => {
                setSelectedStatus(tab.key)
                setPage(1)
              }}
              flexShrink={0}
            >
              <HStack gap="2">
                <Text>{tab.label}</Text>
                <Box
                  as="span"
                  fontSize="11.5px"
                  fontWeight="700"
                  px="1.5"
                  py="0.2"
                  borderRadius="full"
                  bg={isActive ? "rgba(255,255,255,0.2)" : "#F1F5F9"}
                  color={isActive ? "white" : tab.color}
                >
                  {tab.count}
                </Box>
              </HStack>
            </Button>
          )
        })}
      </Flex>

      {/* 3. Search & Interest Filter */}
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap="3"
        mb="5"
        bg="white"
        p="4"
        borderRadius="12px"
        border="1px solid #E2E8F0"
        align="center"
      >
        <Box position="relative" flex="1" w="full">
          <Box position="absolute" left="12px" top="11px" pointerEvents="none" color="#94A3B8">
            <SearchIcon size={16} />
          </Box>
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            placeholder="Search volunteers by name, email, phone, city, or state..."
            pl="38px"
            pr="32px"
            h="40px"
            fontSize="13.5px"
            borderColor="#E2E8F0"
            borderRadius="8px"
            _focus={{ borderColor: "#051B64", boxShadow: "0 0 0 1px #051B64" }}
          />
          {search && (
            <Button
              size="xs"
              variant="ghost"
              position="absolute"
              right="8px"
              top="10px"
              color="#94A3B8"
              _hover={{ color: "#0F172A" }}
              onClick={() => {
                setSearch("")
                setPage(1)
              }}
            >
              <CloseIcon size={14} />
            </Button>
          )}
        </Box>

        <Box w={{ base: "full", sm: "260px" }}>
          <select
            value={selectedInterest}
            onChange={(e) => {
              setSelectedInterest(e.target.value)
              setPage(1)
            }}
            style={{
              width: "100%",
              height: "40px",
              padding: "0 12px",
              fontSize: "13.5px",
              backgroundColor: "white",
              color: "#0F172A",
              border: "1px solid #E2E8F0",
              borderRadius: "8px",
              outline: "none",
              cursor: "pointer",
            }}
          >
            {INTEREST_AREAS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Box>
      </Flex>

      {/* 4. Volunteers Table */}
      <Box
        bg="white"
        borderRadius="12px"
        border="1px solid #E2E8F0"
        overflow="hidden"
        boxShadow="0 1px 3px rgba(0,0,0,0.02)"
      >
        {loading ? (
          <Flex py="16" justify="center" align="center" direction="column" gap="3">
            <Spinner size="lg" color="#051B64" />
            <Text fontSize="14px" color="#64748B">
              Loading volunteer records from MongoDB Atlas...
            </Text>
          </Flex>
        ) : volunteers.length === 0 ? (
          <Flex py="16" px="4" justify="center" align="center" direction="column" textAlign="center">
            <Box w="56px" h="56px" bg="#F1F5F9" borderRadius="full" display="flex" alignItems="center" justifyContent="center" mb="3" color="#64748B">
              <UsersIcon size={24} />
            </Box>
            <Heading as="h3" fontSize="16px" fontWeight="700" color="#0F172A">
              No volunteer submissions found
            </Heading>
            <Text fontSize="13.5px" color="#64748B" maxW="400px" mt="1">
              {search || selectedInterest || selectedStatus !== "all"
                ? "No volunteers matched your active filters. Try clearing your search query."
                : "No volunteer applications have been recorded in the database yet. When volunteers apply on the public site, they will appear here automatically."}
            </Text>
          </Flex>
        ) : (
          <Box overflowX="auto">
            <Box as="table" w="full" style={{ borderCollapse: "collapse" }}>
              <Box as="thead" bg="#F8FAFC" borderBottom="1px solid #E2E8F0">
                <Box as="tr">
                  <Box as="th" textAlign="left" py="3.5" px="4" fontSize="12px" fontWeight="700" color="#475569" textTransform="uppercase" letterSpacing="0.05em">
                    Volunteer
                  </Box>
                  <Box as="th" textAlign="left" py="3.5" px="4" fontSize="12px" fontWeight="700" color="#475569" textTransform="uppercase" letterSpacing="0.05em">
                    Interest Areas
                  </Box>
                  <Box as="th" textAlign="left" py="3.5" px="4" fontSize="12px" fontWeight="700" color="#475569" textTransform="uppercase" letterSpacing="0.05em">
                    Availability
                  </Box>
                  <Box as="th" textAlign="left" py="3.5" px="4" fontSize="12px" fontWeight="700" color="#475569" textTransform="uppercase" letterSpacing="0.05em">
                    Location
                  </Box>
                  <Box as="th" textAlign="left" py="3.5" px="4" fontSize="12px" fontWeight="700" color="#475569" textTransform="uppercase" letterSpacing="0.05em">
                    Status
                  </Box>
                  <Box as="th" textAlign="right" py="3.5" px="4" fontSize="12px" fontWeight="700" color="#475569" textTransform="uppercase" letterSpacing="0.05em">
                    Action
                  </Box>
                </Box>
              </Box>

              <Box as="tbody">
                {volunteers.map((vol) => (
                  <Box
                    as="tr"
                    key={vol._id}
                    borderBottom="1px solid #F1F5F9"
                    _hover={{ bg: "#F8FAFC" }}
                    cursor="pointer"
                    onClick={() => openVolunteer(vol)}
                    transition="background 0.15s ease"
                  >
                    <Box as="td" py="3.5" px="4">
                      <Text fontSize="14px" fontWeight="700" color="#0F172A">
                        {vol.applicantDetails?.fullName}
                      </Text>
                      <Text fontSize="12px" color="#64748B">
                        {vol.applicantDetails?.email}
                      </Text>
                    </Box>

                    <Box as="td" py="3.5" px="4" maxW="260px">
                      <Flex wrap="wrap" gap="1">
                        {vol.pathwayDetails?.areasOfInterest && vol.pathwayDetails.areasOfInterest.length > 0 ? (
                          vol.pathwayDetails.areasOfInterest.slice(0, 2).map((area, i) => (
                            <Badge key={i} bg="#F0FDF4" color="#16A34A" border="1px solid #BBF7D0" fontSize="11px" px="2" py="0.2" borderRadius="md">
                              {area}
                            </Badge>
                          ))
                        ) : (
                          <Text fontSize="12.5px" color="#94A3B8">General</Text>
                        )}
                        {(vol.pathwayDetails?.areasOfInterest?.length || 0) > 2 && (
                          <Badge bg="#F1F5F9" color="#64748B" fontSize="11px" px="1.5" py="0.2" borderRadius="md">
                            +{(vol.pathwayDetails?.areasOfInterest?.length || 0) - 2} more
                          </Badge>
                        )}
                      </Flex>
                    </Box>

                    <Box as="td" py="3.5" px="4">
                      <Text fontSize="12.5px" color="#334155" fontWeight="600">
                        {vol.pathwayDetails?.availabilitySchedule || "Flexible"}
                      </Text>
                    </Box>

                    <Box as="td" py="3.5" px="4">
                      <Text fontSize="12.5px" color="#475569">
                        {vol.applicantDetails?.city ? `${vol.applicantDetails.city}, ${vol.applicantDetails.state}` : "—"}
                      </Text>
                    </Box>

                    <Box as="td" py="3.5" px="4">
                      {getStatusBadge(vol.status)}
                    </Box>

                    <Box as="td" py="3.5" px="4" textAlign="right">
                      <Button
                        size="xs"
                        bg="#051B64"
                        color="white"
                        _hover={{ bg: "#0A2580" }}
                        px="3"
                        py="1.5"
                        borderRadius="md"
                        fontSize="12px"
                        fontWeight="600"
                        onClick={(e) => {
                          e.stopPropagation()
                          openVolunteer(vol)
                        }}
                      >
                        Manage
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        )}

        {/* 5. Pagination */}
        {!loading && totalPages > 1 && (
          <Flex
            justify="space-between"
            align="center"
            px="4"
            py="3.5"
            borderTop="1px solid #E2E8F0"
            bg="#FAFAFA"
            direction={{ base: "column", sm: "row" }}
            gap="3"
          >
            <Text fontSize="13px" color="#64748B">
              Showing {(page - 1) * 12 + 1} to {Math.min(page * 12, total)} of {total} volunteers
            </Text>

            <HStack gap="2">
              <Button
                size="sm"
                bg="white"
                border="1px solid #E2E8F0"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                fontSize="12.5px"
              >
                <HStack gap="1">
                  <ChevronLeftIcon size={14} />
                  <Text>Previous</Text>
                </HStack>
              </Button>
              <Text fontSize="13px" fontWeight="600" color="#334155" px="2">
                Page {page} of {totalPages}
              </Text>
              <Button
                size="sm"
                bg="white"
                border="1px solid #E2E8F0"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                fontSize="12.5px"
              >
                <HStack gap="1">
                  <Text>Next</Text>
                  <ChevronRightIcon size={14} />
                </HStack>
              </Button>
            </HStack>
          </Flex>
        )}
      </Box>

      {/* 6. Volunteer Management Drawer */}
      {activeVolunteer && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(15, 23, 42, 0.65)"
          zIndex={9999}
          display="flex"
          justifyContent="flex-end"
          onClick={closeVolunteer}
        >
          <Box
            w={{ base: "100%", md: "640px" }}
            h="100%"
            bg="white"
            boxShadow="-10px 0 25px rgba(0,0,0,0.15)"
            overflowY="auto"
            onClick={(e) => e.stopPropagation()}
            p={{ base: "5", md: "8" }}
            display="flex"
            flexDirection="column"
          >
            {/* Header */}
            <Flex justify="space-between" align="flex-start" pb="4" borderBottom="1px solid #E2E8F0" mb="6">
              <Box>
                <HStack gap="2" mb="1.5">
                  <Badge bg="#F0FDF4" color="#16A34A" border="1px solid #BBF7D0" px="2.5" py="0.5" borderRadius="md" fontSize="12px" fontWeight="700">
                    Volunteer
                  </Badge>
                  {getStatusBadge(activeVolunteer.status)}
                </HStack>
                <Heading as="h2" fontSize="20px" fontWeight="800" color="#0F172A">
                  {activeVolunteer.applicantDetails?.fullName}
                </Heading>
                <Text fontFamily="mono" fontSize="12px" color="#64748B" mt="1">
                  {activeVolunteer.applicationReference}
                </Text>
              </Box>

              <Button
                size="sm"
                variant="ghost"
                borderRadius="full"
                w="36px"
                h="36px"
                p="0"
                onClick={closeVolunteer}
                color="#64748B"
                _hover={{ bg: "#F1F5F9", color: "#0F172A" }}
              >
                <CloseIcon size={18} />
              </Button>
            </Flex>

            {statusFeedback && (
              <Box
                bg={statusFeedback.type === "success" ? "#ECFDF5" : "#FEF2F2"}
                border={`1px solid ${statusFeedback.type === "success" ? "#A7F3D0" : "#FECACA"}`}
                p="3.5"
                borderRadius="8px"
                mb="5"
                fontSize="13px"
                fontWeight="600"
                color={statusFeedback.type === "success" ? "#065F46" : "#991B1B"}
              >
                {statusFeedback.text}
              </Box>
            )}

            <VStack gap="6" align="stretch" flex="1">
              {/* Contact Bar & Direct Action Channels */}
              <Box bg="#F8FAFC" p="4" borderRadius="10px" border="1px solid #E2E8F0" fontSize="13px">
                <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3" mb="3">
                  <Box>
                    <Text fontSize="11px" color="#64748B" fontWeight="700" textTransform="uppercase">Email</Text>
                    <Text fontWeight="700" color="#051B64">{activeVolunteer.applicantDetails?.email}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="11px" color="#64748B" fontWeight="700" textTransform="uppercase">Phone</Text>
                    <Text fontWeight="600" color="#0F172A">{activeVolunteer.applicantDetails?.phone}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="11px" color="#64748B" fontWeight="700" textTransform="uppercase">Location</Text>
                    <Text fontWeight="600" color="#0F172A">
                      {activeVolunteer.applicantDetails?.city}, {activeVolunteer.applicantDetails?.state}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="11px" color="#64748B" fontWeight="700" textTransform="uppercase">Registered Date</Text>
                    <Text color="#475569">{new Date(activeVolunteer.submittedAt).toLocaleDateString()}</Text>
                  </Box>
                </SimpleGrid>

                <HStack gap="2.5" pt="2" borderTop="1px solid #E2E8F0">
                  <a
                    href={getWhatsAppLink(activeVolunteer.applicantDetails?.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ flex: 1, textDecoration: "none" }}
                  >
                    <Button w="full" size="xs" bg="#10B981" color="white" _hover={{ bg: "#059669" }} h="32px">
                      <HStack gap="1.5">
                        <PhoneIcon size={12} />
                        <Text>WhatsApp Chat</Text>
                      </HStack>
                    </Button>
                  </a>
                  <a
                    href={`mailto:${activeVolunteer.applicantDetails?.email}?subject=I-IMPACT%20Initiative%20Volunteer%20Welcome`}
                    style={{ flex: 1, textDecoration: "none" }}
                  >
                    <Button w="full" size="xs" bg="#051B64" color="white" _hover={{ bg: "#0A2580" }} h="32px">
                      <HStack gap="1.5">
                        <MailIcon size={12} />
                        <Text>Send Email</Text>
                      </HStack>
                    </Button>
                  </a>
                </HStack>
              </Box>

              {/* Areas of interest */}
              <Box>
                <Text fontSize="12px" fontWeight="800" textTransform="uppercase" letterSpacing="0.05em" color="#64748B" mb="2">
                  Volunteer Interests & Skills
                </Text>
                <Flex wrap="wrap" gap="1.5">
                  {activeVolunteer.pathwayDetails?.areasOfInterest && activeVolunteer.pathwayDetails.areasOfInterest.length > 0 ? (
                    activeVolunteer.pathwayDetails.areasOfInterest.map((area, i) => (
                      <Badge key={i} bg="#F0FDF4" color="#16A34A" border="1px solid #BBF7D0" fontSize="12px" px="2.5" py="1" borderRadius="md">
                        {area}
                      </Badge>
                    ))
                  ) : (
                    <Text fontSize="13px" color="#94A3B8">General volunteering</Text>
                  )}
                </Flex>
              </Box>

              {/* Availability */}
              <Box bg="#FFFFFF" p="3.5" borderRadius="8px" border="1px solid #E2E8F0">
                <Text fontSize="12px" fontWeight="700" color="#475569" mb="1">
                  Availability Schedule
                </Text>
                <Text fontSize="13.5px" color="#0F172A" fontWeight="600">
                  {activeVolunteer.pathwayDetails?.availabilitySchedule || "Not specified"} (
                  {activeVolunteer.pathwayDetails?.availabilityFrequency || "As needed"})
                </Text>
              </Box>

              {/* Experience */}
              {activeVolunteer.pathwayDetails?.previousVolunteeringExperience && (
                <Box bg="#FFFFFF" p="3.5" borderRadius="8px" border="1px solid #E2E8F0">
                  <Text fontSize="12px" fontWeight="700" color="#475569" mb="1">
                    Previous Volunteer Experience
                  </Text>
                  <Text fontSize="13px" color="#334155" lineHeight="1.6" whiteSpace="pre-wrap">
                    {activeVolunteer.pathwayDetails.previousVolunteeringExperience}
                  </Text>
                </Box>
              )}

              {/* Motivation */}
              {activeVolunteer.pathwayDetails?.motivationForVolunteering && (
                <Box bg="#FFFFFF" p="3.5" borderRadius="8px" border="1px solid #E2E8F0">
                  <Text fontSize="12px" fontWeight="700" color="#475569" mb="1">
                    Motivation & Personal Drive
                  </Text>
                  <Text fontSize="13px" color="#334155" lineHeight="1.6" whiteSpace="pre-wrap">
                    {activeVolunteer.pathwayDetails.motivationForVolunteering}
                  </Text>
                </Box>
              )}

              {/* Portfolio Link */}
              {activeVolunteer.pathwayDetails?.portfolioOrSocialUrl && (
                <Box bg="#FFFFFF" p="3.5" borderRadius="8px" border="1px solid #E2E8F0">
                  <Text fontSize="12px" fontWeight="700" color="#475569" mb="1">
                    Portfolio / Social Profile
                  </Text>
                  <Link
                    href={activeVolunteer.pathwayDetails.portfolioOrSocialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "13px", color: "#051B64", fontWeight: "600", textDecoration: "underline" }}
                  >
                    {activeVolunteer.pathwayDetails.portfolioOrSocialUrl}
                  </Link>
                </Box>
              )}

              {/* Internal Department / Responsibility Assignment Notes */}
              <Box>
                <Text fontSize="12px" fontWeight="800" textTransform="uppercase" letterSpacing="0.05em" color="#64748B" mb="2">
                  Department Assignment & Coordinator Notes
                </Text>
                <Textarea
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="e.g. 'Assigned to Registration Lead at Nov 2026 Summit', 'Completed briefing call', 'Badge printed'..."
                  fontSize="13.5px"
                  rows={3}
                  borderColor="#CBD5E1"
                  _focus={{ borderColor: "#051B64" }}
                  mb="2"
                />
                <Button
                  size="xs"
                  bg="#F1F5F9"
                  color="#051B64"
                  border="1px solid #CBD5E1"
                  _hover={{ bg: "#E2E8F0" }}
                  onClick={() => handleUpdateVolunteer(undefined, true)}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Saving..." : "Save Assignment Notes"}
                </Button>
              </Box>

              {/* Status Action Buttons */}
              <Box pt="4" borderTop="1px solid #E2E8F0">
                <Text fontSize="12px" fontWeight="800" textTransform="uppercase" letterSpacing="0.05em" color="#64748B" mb="3">
                  Volunteer Status
                </Text>
                <Flex wrap="wrap" gap="2">
                  <Button
                    size="sm"
                    bg="#10B981"
                    color="white"
                    _hover={{ bg: "#059669" }}
                    onClick={() => handleUpdateVolunteer("accepted")}
                    disabled={isUpdating || activeVolunteer.status === "accepted"}
                  >
                    Approve / Activate
                  </Button>
                  <Button
                    size="sm"
                    bg="#2563EB"
                    color="white"
                    _hover={{ bg: "#1D4ED8" }}
                    onClick={() => handleUpdateVolunteer("reviewing")}
                    disabled={isUpdating || activeVolunteer.status === "reviewing"}
                  >
                    Mark In Screening
                  </Button>
                  <Button
                    size="sm"
                    bg="#DC2626"
                    color="white"
                    _hover={{ bg: "#B91C1C" }}
                    onClick={() => handleUpdateVolunteer("rejected")}
                    disabled={isUpdating || activeVolunteer.status === "rejected"}
                  >
                    Deactivate
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    borderColor="#CBD5E1"
                    color="#64748B"
                    _hover={{ bg: "#F8FAFC" }}
                    onClick={() => handleUpdateVolunteer("pending")}
                    disabled={isUpdating || activeVolunteer.status === "pending"}
                  >
                    Reset to Pending
                  </Button>
                </Flex>
              </Box>
            </VStack>
          </Box>
        </Box>
      )}
    </Box>
  )
}

