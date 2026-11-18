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
  ShieldIcon,
} from "@/components/icons"

interface ApplicantDetails {
  fullName: string
  email: string
  phone: string
  city: string
  state: string
  country: string
}

interface AmbassadorItem {
  _id: string
  applicationReference: string
  pathway: string
  pathwayTitle: string
  applicantDetails: ApplicantDetails
  pathwayDetails: {
    affiliation?: string
    preferredRepresentation?: string
    campusOrCommunityName?: string
    mobilizationPlan?: string
    socialReach?: string
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

const SPHERE_OPTIONS = [
  { value: "", label: "All Spheres" },
  { value: "University or campus", label: "University & Campus" },
  { value: "Secondary school", label: "Secondary Schools" },
  { value: "Local community", label: "Local Community" },
  { value: "Online community", label: "Digital / Online Networks" },
]

export default function AdminAmbassadorsPage() {
  const [ambassadors, setAmbassadors] = useState<AmbassadorItem[]>([])
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
  const [selectedSphere, setSelectedSphere] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // UI state
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Drawer modal
  const [activeAmbassador, setActiveAmbassador] = useState<AmbassadorItem | null>(null)
  const [notesInput, setNotesInput] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [statusFeedback, setStatusFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const fetchAmbassadors = useCallback(async () => {
    try {
      setLoading(true)
      setErrorMessage(null)

      const params = new URLSearchParams()
      params.append("pathway", "ambassadors")
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
        if (selectedSphere) {
          list = list.filter((item: AmbassadorItem) =>
            item.pathwayDetails?.preferredRepresentation
              ?.toLowerCase()
              .includes(selectedSphere.toLowerCase())
          )
        }
        setAmbassadors(list)
        setTotal(data.total || 0)
        setTotalPages(data.totalPages || 1)
        if (data.statusCounts) {
          setStatusCounts(data.statusCounts)
        }
      } else {
        setErrorMessage(data.error || "Failed to load ambassadors")
      }
    } catch (err: any) {
      console.error("Failed to load ambassadors:", err)
      setErrorMessage(err.message || "Failed to connect to the server.")
    } finally {
      setLoading(false)
    }
  }, [search, selectedSphere, selectedStatus, page])

  useEffect(() => {
    fetchAmbassadors()
  }, [fetchAmbassadors])

  const openAmbassador = (amb: AmbassadorItem) => {
    setActiveAmbassador(amb)
    setNotesInput(amb.internalNotes || "")
    setStatusFeedback(null)
  }

  const closeAmbassador = () => {
    setActiveAmbassador(null)
    setStatusFeedback(null)
  }

  const handleUpdateAmbassador = async (newStatus?: AmbassadorItem["status"], saveNotesOnly = false) => {
    if (!activeAmbassador) return

    try {
      setIsUpdating(true)
      setStatusFeedback(null)

      const payload: { status?: string; internalNotes?: string; reviewedBy?: string } = {
        internalNotes: notesInput,
      }
      if (newStatus) {
        payload.status = newStatus
        payload.reviewedBy = "I-IMPACT Ambassador Lead"
      }

      const res = await fetch(`/api/admin/applications/${activeAmbassador._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update record")
      }

      setStatusFeedback({
        type: "success",
        text: saveNotesOnly ? "Ambassador notes saved." : `Status updated to ${newStatus?.toUpperCase()}.`,
      })

      setActiveAmbassador((prev) =>
        prev
          ? {
              ...prev,
              status: (newStatus || prev.status) as AmbassadorItem["status"],
              internalNotes: notesInput,
              reviewedAt: new Date().toISOString(),
              reviewedBy: "I-IMPACT Ambassador Lead",
            }
          : null
      )

      fetchAmbassadors()
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
    if (ambassadors.length === 0) return

    const headers = ["Reference", "Full Name", "Email", "Phone", "Affiliation / Campus", "Sphere", "Location", "Status"]
    const rows = ambassadors.map((amb) => [
      `"${amb.applicationReference}"`,
      `"${amb.applicantDetails?.fullName || ""}"`,
      `"${amb.applicantDetails?.email || ""}"`,
      `"${amb.applicantDetails?.phone || ""}"`,
      `"${amb.pathwayDetails?.affiliation || amb.pathwayDetails?.campusOrCommunityName || ""}"`,
      `"${amb.pathwayDetails?.preferredRepresentation || ""}"`,
      `"${amb.applicantDetails?.city || ""}, ${amb.applicantDetails?.state || ""}"`,
      `"${amb.status}"`,
    ])

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `i-impact-ambassadors-${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return <Badge bg="#ECFDF5" color="#059669" border="1px solid #A7F3D0" px="2.5" py="0.5" borderRadius="full" fontSize="12px" fontWeight="700">Certified Ambassador</Badge>
      case "reviewing":
        return <Badge bg="#EFF6FF" color="#2563EB" border="1px solid #BFDBFE" px="2.5" py="0.5" borderRadius="full" fontSize="12px" fontWeight="600">In Interview</Badge>
      case "rejected":
        return <Badge bg="#FEF2F2" color="#DC2626" border="1px solid #FECACA" px="2.5" py="0.5" borderRadius="full" fontSize="12px">Deactivated</Badge>
      default:
        return <Badge bg="#FFFBEB" color="#D97706" border="1px solid #FDE68A" px="2.5" py="0.5" borderRadius="full" fontSize="12px" fontWeight="600">Pending Screening</Badge>
    }
  }

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
              Campus & Community Ambassadors
            </Heading>
            <Badge bg="#F1F5F9" color="#051B64" fontSize="13px" fontWeight="700" px="2.5" py="0.5" borderRadius="full">
              {total} Candidates
            </Badge>
          </HStack>
          <Text fontSize="14px" color="#64748B" mt="1">
            Manage institutional representatives mobilizing youth across universities, secondary schools, and local hubs.
          </Text>
        </Box>

        <HStack gap="3">
          <Button
            size="sm"
            bg="white"
            color="#051B64"
            border="1px solid #E2E8F0"
            _hover={{ bg: "#F8FAFC", borderColor: "#CBD5E1" }}
            onClick={fetchAmbassadors}
            disabled={loading}
            px="4"
            h="36px"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </Button>
          <Button
            size="sm"
            bg="#051B64"
            color="white"
            _hover={{ bg: "#0A2580" }}
            onClick={handleExportCSV}
            disabled={ambassadors.length === 0}
            px="4"
            h="36px"
          >
            <HStack gap="1.5">
              <DownloadIcon size={14} color="white" />
              <Text>Export CSV</Text>
            </HStack>
          </Button>
        </HStack>
      </Flex>

      {/* KPI Cards */}
      <SimpleGrid columns={{ base: 2, lg: 4 }} gap="3.5" mb="6">
        <Box bg="white" p="4" borderRadius="12px" border="1px solid #E2E8F0">
          <Text fontSize="11.5px" fontWeight="700" color="#64748B" textTransform="uppercase">Total Applicants</Text>
          <Text fontSize="22px" fontWeight="900" color="#051B64" mt="1">{statusCounts.all}</Text>
        </Box>
        <Box bg="white" p="4" borderRadius="12px" border="1px solid #E2E8F0">
          <Text fontSize="11.5px" fontWeight="700" color="#059669" textTransform="uppercase">Certified Ambassadors</Text>
          <Text fontSize="22px" fontWeight="900" color="#059669" mt="1">{statusCounts.accepted}</Text>
        </Box>
        <Box bg="white" p="4" borderRadius="12px" border="1px solid #E2E8F0">
          <Text fontSize="11.5px" fontWeight="700" color="#D97706" textTransform="uppercase">Pending Screening</Text>
          <Text fontSize="22px" fontWeight="900" color="#D97706" mt="1">{statusCounts.pending}</Text>
        </Box>
        <Box bg="white" p="4" borderRadius="12px" border="1px solid #E2E8F0">
          <Text fontSize="11.5px" fontWeight="700" color="#2563EB" textTransform="uppercase">In Interview</Text>
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
          { key: "all", label: "All Candidates", count: statusCounts.all, color: "#64748B" },
          { key: "accepted", label: "Certified", count: statusCounts.accepted, color: "#059669" },
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

      {/* 3. Search & Sphere Filters */}
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
            placeholder="Search ambassadors by candidate name, institution, campus, city..."
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

        <Box w={{ base: "full", sm: "240px" }}>
          <select
            value={selectedSphere}
            onChange={(e) => {
              setSelectedSphere(e.target.value)
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
            {SPHERE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Box>
      </Flex>

      {/* 4. Ambassadors Table */}
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
              Loading ambassador submissions from MongoDB Atlas...
            </Text>
          </Flex>
        ) : ambassadors.length === 0 ? (
          <Flex py="16" px="4" justify="center" align="center" direction="column" textAlign="center">
            <Box w="56px" h="56px" bg="#F1F5F9" borderRadius="full" display="flex" alignItems="center" justifyContent="center" mb="3" color="#64748B">
              <UsersIcon size={24} />
            </Box>
            <Heading as="h3" fontSize="16px" fontWeight="700" color="#0F172A">
              No ambassadors found
            </Heading>
            <Text fontSize="13.5px" color="#64748B" maxW="400px" mt="1">
              {search || selectedSphere || selectedStatus !== "all"
                ? "No candidates matched your active filters. Try clearing your search query."
                : "No ambassador applications have been recorded yet. When youth apply to represent their campus, they will appear here."}
            </Text>
          </Flex>
        ) : (
          <Box overflowX="auto">
            <Box as="table" w="full" style={{ borderCollapse: "collapse" }}>
              <Box as="thead" bg="#F8FAFC" borderBottom="1px solid #E2E8F0">
                <Box as="tr">
                  <Box as="th" textAlign="left" py={3.5} px={4} fontSize="12px" fontWeight="700" color="#475569" textTransform="uppercase" letterSpacing="0.05em">
                    Ambassador
                  </Box>
                  <Box as="th" textAlign="left" py={3.5} px={4} fontSize="12px" fontWeight="700" color="#475569" textTransform="uppercase" letterSpacing="0.05em">
                    Campus / Institution
                  </Box>
                  <Box as="th" textAlign="left" py={3.5} px={4} fontSize="12px" fontWeight="700" color="#475569" textTransform="uppercase" letterSpacing="0.05em">
                    Sphere
                  </Box>
                  <Box as="th" textAlign="left" py={3.5} px={4} fontSize="12px" fontWeight="700" color="#475569" textTransform="uppercase" letterSpacing="0.05em">
                    Location
                  </Box>
                  <Box as="th" textAlign="left" py={3.5} px={4} fontSize="12px" fontWeight="700" color="#475569" textTransform="uppercase" letterSpacing="0.05em">
                    Status
                  </Box>
                  <Box as="th" textAlign="right" py={3.5} px={4} fontSize="12px" fontWeight="700" color="#475569" textTransform="uppercase" letterSpacing="0.05em">
                    Action
                  </Box>
                </Box>
              </Box>

              <Box as="tbody">
                {ambassadors.map((amb) => (
                  <Box
                    as="tr"
                    key={amb._id}
                    borderBottom="1px solid #F1F5F9"
                    _hover={{ bg: "#F8FAFC" }}
                    cursor="pointer"
                    onClick={() => openAmbassador(amb)}
                    transition="background 0.15s ease"
                  >
                    <Box as="td" py={3.5} px={4}>
                      <Text fontSize="14px" fontWeight="700" color="#0F172A">
                        {amb.applicantDetails?.fullName}
                      </Text>
                      <Text fontSize="12px" color="#64748B">
                        {amb.applicantDetails?.email}
                      </Text>
                    </Box>

                    <Box as="td" py={3.5} px={4}>
                      <Text fontSize="13px" fontWeight="600" color="#051B64">
                        {amb.pathwayDetails?.affiliation || amb.pathwayDetails?.campusOrCommunityName || "Campus Representative"}
                      </Text>
                    </Box>

                    <Box as="td" py={3.5} px={4}>
                      <Badge bg="#F0FDFA" color="#0D9488" border="1px solid #99F6E4" fontSize="11.5px" px="2.5" py="0.5" borderRadius="md">
                        {amb.pathwayDetails?.preferredRepresentation || "Campus"}
                      </Badge>
                    </Box>

                    <Box as="td" py={3.5} px={4}>
                      <Text fontSize="12.5px" color="#475569">
                        {amb.applicantDetails?.city ? `${amb.applicantDetails.city}, ${amb.applicantDetails.state}` : "—"}
                      </Text>
                    </Box>

                    <Box as="td" py={3.5} px={4}>
                      {getStatusBadge(amb.status)}
                    </Box>

                    <Box as="td" py={3.5} px={4} textAlign="right">
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
                          openAmbassador(amb)
                        }}
                      >
                        Review
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
              Showing {(page - 1) * 12 + 1} to {Math.min(page * 12, total)} of {total} candidates
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

      {/* 6. Ambassador Review Drawer */}
      {activeAmbassador && (
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
          onClick={closeAmbassador}
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
                  <Badge bg="#F0FDFA" color="#0D9488" border="1px solid #99F6E4" px="2.5" py="0.5" borderRadius="md" fontSize="12px" fontWeight="700">
                    Campus Ambassador
                  </Badge>
                  {getStatusBadge(activeAmbassador.status)}
                </HStack>
                <Heading as="h2" fontSize="20px" fontWeight="800" color="#0F172A">
                  {activeAmbassador.applicantDetails?.fullName}
                </Heading>
                <Text fontFamily="mono" fontSize="12px" color="#64748B" mt="1">
                  {activeAmbassador.applicationReference}
                </Text>
              </Box>

              <Button
                size="sm"
                variant="ghost"
                borderRadius="full"
                w="36px"
                h="36px"
                p="0"
                onClick={closeAmbassador}
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
              {/* Contact Bar */}
              <Box bg="#F8FAFC" p="4" borderRadius="10px" border="1px solid #E2E8F0" fontSize="13px">
                <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3" mb="3">
                  <Box>
                    <Text fontSize="11px" color="#64748B" fontWeight="700" textTransform="uppercase">Email</Text>
                    <Text fontWeight="700" color="#051B64">{activeAmbassador.applicantDetails?.email}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="11px" color="#64748B" fontWeight="700" textTransform="uppercase">Phone</Text>
                    <Text fontWeight="600" color="#0F172A">{activeAmbassador.applicantDetails?.phone}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="11px" color="#64748B" fontWeight="700" textTransform="uppercase">Campus / Affiliation</Text>
                    <Text fontWeight="700" color="#0D9488">
                      {activeAmbassador.pathwayDetails?.affiliation || "Not specified"}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="11px" color="#64748B" fontWeight="700" textTransform="uppercase">Sphere</Text>
                    <Text fontWeight="600" color="#0F172A">
                      {activeAmbassador.pathwayDetails?.preferredRepresentation || "Campus"}
                    </Text>
                  </Box>
                </SimpleGrid>

                <HStack gap="2.5" pt="2" borderTop="1px solid #E2E8F0">
                  <a
                    href={getWhatsAppLink(activeAmbassador.applicantDetails?.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ flex: 1, textDecoration: "none" }}
                  >
                    <Button w="full" size="xs" bg="#10B981" color="white" _hover={{ bg: "#059669" }} h="32px">
                      <HStack gap="1.5">
                        <PhoneIcon size={12} />
                        <Text>WhatsApp Direct</Text>
                      </HStack>
                    </Button>
                  </a>
                  <a
                    href={`mailto:${activeAmbassador.applicantDetails?.email}?subject=I-IMPACT%20Initiative%20Campus%20Ambassador%20Screening`}
                    style={{ flex: 1, textDecoration: "none" }}
                  >
                    <Button w="full" size="xs" bg="#051B64" color="white" _hover={{ bg: "#0A2580" }} h="32px">
                      <HStack gap="1.5">
                        <MailIcon size={12} />
                        <Text>Email Candidate</Text>
                      </HStack>
                    </Button>
                  </a>
                </HStack>
              </Box>

              {/* All Pathway Responses */}
              {activeAmbassador.pathwayDetails && Object.keys(activeAmbassador.pathwayDetails).length > 0 && (
                <Box>
                  <Text fontSize="12px" fontWeight="800" textTransform="uppercase" letterSpacing="0.05em" color="#64748B" mb="3">
                    Application Questionnaire Responses
                  </Text>
                  <VStack gap="3" align="stretch">
                    {Object.entries(activeAmbassador.pathwayDetails).map(([key, val]) => {
                      if (key.endsWith("Name") || key === "affiliation" || key === "preferredRepresentation") return null

                      const formattedKey = key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())

                      return (
                        <Box key={key} p="3.5" bg="#FFFFFF" border="1px solid #E2E8F0" borderRadius="8px">
                          <Text fontSize="12px" fontWeight="700" color="#475569" mb="1">
                            {formattedKey}
                          </Text>
                          <Text fontSize="13px" color="#1E293B" whiteSpace="pre-wrap" lineHeight="1.6">
                            {String(val || "—")}
                          </Text>
                        </Box>
                      )
                    })}
                  </VStack>
                </Box>
              )}

              {/* Coordinator Notes */}
              <Box>
                <Text fontSize="12px" fontWeight="800" textTransform="uppercase" letterSpacing="0.05em" color="#64748B" mb="2">
                  Campus Coordinator Notes
                </Text>
                <Textarea
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="e.g. 'Passed interview, assigned as UNILAG Chapter Lead', 'Sent ambassador handbook'..."
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
                  onClick={() => handleUpdateAmbassador(undefined, true)}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Saving..." : "Save Notes"}
                </Button>
              </Box>

              {/* Status Action Buttons */}
              <Box pt="4" borderTop="1px solid #E2E8F0">
                <Text fontSize="12px" fontWeight="800" textTransform="uppercase" letterSpacing="0.05em" color="#64748B" mb="3">
                  Certification Decision
                </Text>
                <Flex wrap="wrap" gap="2">
                  <Button
                    size="sm"
                    bg="#10B981"
                    color="white"
                    _hover={{ bg: "#059669" }}
                    onClick={() => handleUpdateAmbassador("accepted")}
                    disabled={isUpdating || activeAmbassador.status === "accepted"}
                  >
                    Certify Ambassador
                  </Button>
                  <Button
                    size="sm"
                    bg="#2563EB"
                    color="white"
                    _hover={{ bg: "#1D4ED8" }}
                    onClick={() => handleUpdateAmbassador("reviewing")}
                    disabled={isUpdating || activeAmbassador.status === "reviewing"}
                  >
                    Mark In Screening
                  </Button>
                  <Button
                    size="sm"
                    bg="#DC2626"
                    color="white"
                    _hover={{ bg: "#B91C1C" }}
                    onClick={() => handleUpdateAmbassador("rejected")}
                    disabled={isUpdating || activeAmbassador.status === "rejected"}
                  >
                    Deactivate
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    borderColor="#CBD5E1"
                    color="#64748B"
                    _hover={{ bg: "#F8FAFC" }}
                    onClick={() => handleUpdateAmbassador("pending")}
                    disabled={isUpdating || activeAmbassador.status === "pending"}
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

