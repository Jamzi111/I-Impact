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
} from "@chakra-ui/react"
import Link from "next/link"
import {
  SearchIcon,
  FilterIcon,
  CopyIcon,
  CheckIcon,
  CloseIcon,
  EyeIcon,
  DownloadIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  ShieldIcon,
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

interface ApplicationItem {
  _id: string
  applicationReference: string
  pathway: string
  pathwayTitle: string
  applicantDetails: ApplicantDetails
  pathwayDetails: Record<string, any>
  status: "pending" | "reviewing" | "accepted" | "rejected"
  safeguardingAcknowledged: boolean
  submittedAt: string
  internalNotes?: string
  reviewedAt?: string
  reviewedBy?: string
  ipAddress?: string
}

interface StatusCounts {
  all: number
  pending: number
  reviewing: number
  accepted: number
  rejected: number
}

const PATHWAY_OPTIONS = [
  { value: "", label: "All Pathways" },
  { value: "mentorship", label: "Mentorship Cohort" },
  { value: "volunteering", label: "Community Volunteering" },
  { value: "partnerships", label: "Strategic Partnerships" },
  { value: "sponsorship", label: "Sponsorship & Grants" },
  { value: "speaking", label: "Guest Speaking" },
  { value: "ambassadors", label: "Campus Ambassadors" },
]

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<ApplicationItem[]>([])
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
  const [selectedPathway, setSelectedPathway] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // UI state
  const [loading, setLoading] = useState(true)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Drawer / Dossier Modal state
  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null)
  const [notesInput, setNotesInput] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [statusFeedback, setStatusFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true)
      setErrorMessage(null)

      const params = new URLSearchParams()
      if (search.trim()) params.append("search", search.trim())
      if (selectedPathway) params.append("pathway", selectedPathway)
      if (selectedStatus && selectedStatus !== "all") params.append("status", selectedStatus)
      params.append("page", page.toString())
      params.append("limit", "10")

      const res = await fetch(`/api/admin/applications?${params.toString()}`, {
        cache: "no-store",
      })

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`)
      }

      const data = await res.json()
      if (data.success) {
        setApplications(data.applications || [])
        setTotal(data.total || 0)
        setTotalPages(data.totalPages || 1)
        if (data.statusCounts) {
          setStatusCounts(data.statusCounts)
        }
      } else {
        setErrorMessage(data.error || "Failed to load applications")
      }
    } catch (err: any) {
      console.error("Failed to load applications:", err)
      setErrorMessage(err.message || "Failed to connect to the server.")
    } finally {
      setLoading(false)
    }
  }, [search, selectedPathway, selectedStatus, page])

  useEffect(() => {
    fetchApplications()
  }, [fetchApplications])

  // Reset to page 1 on filter changes
  const handleFilterPathway = (pathway: string) => {
    setSelectedPathway(pathway)
    setPage(1)
  }

  const handleFilterStatus = (status: string) => {
    setSelectedStatus(status)
    setPage(1)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }

  const handleCopy = (refCode: string) => {
    navigator.clipboard.writeText(refCode)
    setCopiedCode(refCode)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const openDossier = (app: ApplicationItem) => {
    setSelectedApp(app)
    setNotesInput(app.internalNotes || "")
    setStatusFeedback(null)
  }

  const closeDossier = () => {
    setSelectedApp(null)
    setStatusFeedback(null)
  }

  // Update status or notes
  const handleUpdateApplication = async (newStatus?: ApplicationItem["status"], saveNotesOnly = false) => {
    if (!selectedApp) return

    try {
      setIsUpdating(true)
      setStatusFeedback(null)

      const payload: { status?: string; internalNotes?: string; reviewedBy?: string } = {
        internalNotes: notesInput,
      }
      if (newStatus) {
        payload.status = newStatus
        payload.reviewedBy = "I-IMPACT Admin"
      }

      const res = await fetch(`/api/admin/applications/${selectedApp._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update application")
      }

      setStatusFeedback({
        type: "success",
        text: saveNotesOnly
          ? "Admin notes saved successfully."
          : `Status updated to ${newStatus?.toUpperCase()}.`,
      })

      // Update selectedApp in state
      setSelectedApp((prev) =>
        prev
          ? {
              ...prev,
              status: (newStatus || prev.status) as ApplicationItem["status"],
              internalNotes: notesInput,
              reviewedAt: new Date().toISOString(),
              reviewedBy: "I-IMPACT Admin",
            }
          : null
      )

      // Refresh list to update counts and tables
      fetchApplications()
    } catch (err: any) {
      setStatusFeedback({
        type: "error",
        text: err.message || "Failed to update record. Please try again.",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  // Export CSV of currently filtered view
  const handleExportCSV = () => {
    if (applications.length === 0) return

    const headers = [
      "Reference",
      "Full Name",
      "Email",
      "Phone",
      "Pathway",
      "City",
      "State",
      "Status",
      "Submitted At",
    ]
    const rows = applications.map((app) => [
      `"${app.applicationReference}"`,
      `"${app.applicantDetails?.fullName || ""}"`,
      `"${app.applicantDetails?.email || ""}"`,
      `"${app.applicantDetails?.phone || ""}"`,
      `"${app.pathwayTitle || app.pathway}"`,
      `"${app.applicantDetails?.city || ""}"`,
      `"${app.applicantDetails?.state || ""}"`,
      `"${app.status}"`,
      `"${new Date(app.submittedAt).toLocaleDateString()}"`,
    ])

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `i-impact-applications-${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return <Badge bg="#ECFDF5" color="#059669" border="1px solid #A7F3D0" px="2.5" py="0.5" borderRadius="full" fontSize="12px" fontWeight="600">Approved</Badge>
      case "reviewing":
        return <Badge bg="#EFF6FF" color="#2563EB" border="1px solid #BFDBFE" px="2.5" py="0.5" borderRadius="full" fontSize="12px" fontWeight="600">In Review</Badge>
      case "rejected":
        return <Badge bg="#FEF2F2" color="#DC2626" border="1px solid #FECACA" px="2.5" py="0.5" borderRadius="full" fontSize="12px" fontWeight="600">Rejected</Badge>
      default:
        return <Badge bg="#FFFBEB" color="#D97706" border="1px solid #FDE68A" px="2.5" py="0.5" borderRadius="full" fontSize="12px" fontWeight="600">Pending</Badge>
    }
  }

  const getPathwayBadge = (pathway: string, title?: string) => {
    const colors: Record<string, { bg: string; color: string; border: string }> = {
      mentorship: { bg: "#F5F3FF", color: "#7C3AED", border: "#DDD6FE" },
      volunteering: { bg: "#F0FDF4", color: "#16A34A", border: "#BBF7D0" },
      partnerships: { bg: "#EFF6FF", color: "#1D4ED8", border: "#BFDBFE" },
      sponsorship: { bg: "#ECFDF5", color: "#0D9488", border: "#99F6E4" },
      speaking: { bg: "#FFF7ED", color: "#EA580C", border: "#FFEDD5" },
      ambassadors: { bg: "#FDF2F8", color: "#DB2777", border: "#FBCFE8" },
    }
    const style = colors[pathway] || { bg: "#F1F5F9", color: "#475569", border: "#E2E8F0" }
    return (
      <Badge
        bg={style.bg}
        color={style.color}
        border={`1px solid ${style.border}`}
        px="2.5"
        py="0.5"
        borderRadius="md"
        fontSize="11.5px"
        fontWeight="600"
        textTransform="none"
      >
        {title || pathway}
      </Badge>
    )
  }

  return (
    <Box>
      {/* 1. Header & Actions */}
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
              Applications Management
            </Heading>
            <Badge bg="#F1F5F9" color="#051B64" fontSize="13px" fontWeight="700" px="2.5" py="0.5" borderRadius="full">
              {total} Total
            </Badge>
          </HStack>
          <Text fontSize="14px" color="#64748B" mt="1">
            Review, filter, and process submissions across all 6 participation pathways with direct database sync.
          </Text>
        </Box>

        <HStack gap="3" w={{ base: "full", md: "auto" }}>
          <Button
            size="sm"
            bg="white"
            color="#051B64"
            border="1px solid #E2E8F0"
            _hover={{ bg: "#F8FAFC", borderColor: "#CBD5E1" }}
            onClick={fetchApplications}
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
            disabled={applications.length === 0}
          >
            <HStack gap="1.5">
              <DownloadIcon size={14} color="white" />
              <Text>Export CSV</Text>
            </HStack>
          </Button>
        </HStack>
      </Flex>

      {/* Error or IP Authorization Banner */}
      {errorMessage && (
        <Box
          bg="#FEF2F2"
          border="1px solid #FECACA"
          p="4"
          borderRadius="12px"
          mb="6"
          color="#991B1B"
          fontSize="13.5px"
        >
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
          { key: "all", label: "All Submissions", count: statusCounts.all, color: "#64748B" },
          { key: "pending", label: "Pending", count: statusCounts.pending, color: "#D97706" },
          { key: "reviewing", label: "In Review", count: statusCounts.reviewing, color: "#2563EB" },
          { key: "accepted", label: "Approved", count: statusCounts.accepted, color: "#059669" },
          { key: "rejected", label: "Rejected", count: statusCounts.rejected, color: "#DC2626" },
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
              onClick={() => handleFilterStatus(tab.key)}
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

      {/* 3. Search and Pathway Selectors */}
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
        {/* Search input */}
        <Box position="relative" flex="1" w="full">
          <Box position="absolute" left="12px" top="11px" pointerEvents="none" color="#94A3B8">
            <SearchIcon size={16} />
          </Box>
          <Input
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by candidate name, email, phone, or reference code..."
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

        {/* Pathway filter */}
        <Box w={{ base: "full", sm: "240px" }}>
          <select
            value={selectedPathway}
            onChange={(e) => handleFilterPathway(e.target.value)}
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
            {PATHWAY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Box>
      </Flex>

      {/* 4. Applications Table */}
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
              Loading applications from database...
            </Text>
          </Flex>
        ) : applications.length === 0 ? (
          <Flex py="16" px="4" justify="center" align="center" direction="column" textAlign="center">
            <Box w="56px" h="56px" bg="#F1F5F9" borderRadius="full" display="flex" alignItems="center" justifyContent="center" mb="3" color="#64748B">
              <FilterIcon size={24} />
            </Box>
            <Heading as="h3" fontSize="16px" fontWeight="700" color="#0F172A">
              No applications found
            </Heading>
            <Text fontSize="13.5px" color="#64748B" maxW="400px" mt="1">
              {search || selectedPathway || selectedStatus !== "all"
                ? "No applications matched your active filters. Try clearing your search query or choosing another pathway."
                : "No submissions have been recorded in the database yet. When candidates apply on the public site, they will appear here immediately."}
            </Text>
            {(search || selectedPathway || selectedStatus !== "all") && (
              <Button
                size="sm"
                mt="4"
                bg="#051B64"
                color="white"
                _hover={{ bg: "#0A2580" }}
                onClick={() => {
                  setSearch("")
                  setSelectedPathway("")
                  setSelectedStatus("all")
                  setPage(1)
                }}
              >
                Clear all filters
              </Button>
            )}
          </Flex>
        ) : (
          <Box overflowX="auto">
            <Box as="table" w="full" style={{ borderCollapse: "collapse" }}>
              <Box as="thead" bg="#F8FAFC" borderBottom="1px solid #E2E8F0">
                <Box as="tr">
                  <Box as="th" textAlign="left" py="3.5" px="4" fontSize="12px" fontWeight="700" color="#475569" textTransform="uppercase" letterSpacing="0.05em">
                    Applicant
                  </Box>
                  <Box as="th" textAlign="left" py="3.5" px="4" fontSize="12px" fontWeight="700" color="#475569" textTransform="uppercase" letterSpacing="0.05em">
                    Pathway
                  </Box>
                  <Box as="th" textAlign="left" py="3.5" px="4" fontSize="12px" fontWeight="700" color="#475569" textTransform="uppercase" letterSpacing="0.05em">
                    Reference
                  </Box>
                  <Box as="th" textAlign="left" py="3.5" px="4" fontSize="12px" fontWeight="700" color="#475569" textTransform="uppercase" letterSpacing="0.05em">
                    Location
                  </Box>
                  <Box as="th" textAlign="left" py="3.5" px="4" fontSize="12px" fontWeight="700" color="#475569" textTransform="uppercase" letterSpacing="0.05em">
                    Submitted
                  </Box>
                  <Box as="th" textAlign="left" py="3.5" px="4" fontSize="12px" fontWeight="700" color="#475569" textTransform="uppercase" letterSpacing="0.05em">
                    Status
                  </Box>
                  <Box as="th" textAlign="right" py="3.5" px="4" fontSize="12px" fontWeight="700" color="#475569" textTransform="uppercase" letterSpacing="0.05em">
                    Actions
                  </Box>
                </Box>
              </Box>

              <Box as="tbody">
                {applications.map((app) => (
                  <Box
                    as="tr"
                    key={app._id}
                    borderBottom="1px solid #F1F5F9"
                    _hover={{ bg: "#F8FAFC" }}
                    transition="background 0.15s ease"
                  >
                    {/* Applicant details */}
                    <Box as="td" py="3.5" px="4">
                      <Text fontSize="14px" fontWeight="700" color="#0F172A">
                        {app.applicantDetails?.fullName || "Unnamed Candidate"}
                      </Text>
                      <Text fontSize="12.5px" color="#64748B">
                        {app.applicantDetails?.email || "—"}
                      </Text>
                    </Box>

                    {/* Pathway */}
                    <Box as="td" py="3.5" px="4">
                      {getPathwayBadge(app.pathway, app.pathwayTitle)}
                    </Box>

                    {/* Reference code */}
                    <Box as="td" py="3.5" px="4">
                      <HStack gap="1.5">
                        <Text fontFamily="mono" fontSize="12px" fontWeight="600" color="#334155">
                          {app.applicationReference}
                        </Text>
                        <Button
                          size="xs"
                          variant="ghost"
                          p="1"
                          h="auto"
                          minW="auto"
                          color={copiedCode === app.applicationReference ? "#10B981" : "#94A3B8"}
                          _hover={{ color: "#0F172A" }}
                          onClick={() => handleCopy(app.applicationReference)}
                          title="Copy reference code"
                        >
                          {copiedCode === app.applicationReference ? (
                            <CheckIcon size={13} color="#10B981" />
                          ) : (
                            <CopyIcon size={13} />
                          )}
                        </Button>
                      </HStack>
                    </Box>

                    {/* Location */}
                    <Box as="td" py="3.5" px="4">
                      <Text fontSize="13px" color="#334155">
                        {app.applicantDetails?.city ? `${app.applicantDetails.city}, ${app.applicantDetails.state}` : "—"}
                      </Text>
                    </Box>

                    {/* Submitted date */}
                    <Box as="td" py="3.5" px="4">
                      <Text fontSize="12.5px" color="#64748B">
                        {app.submittedAt
                          ? new Date(app.submittedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "—"}
                      </Text>
                    </Box>

                    {/* Status */}
                    <Box as="td" py="3.5" px="4">
                      {getStatusBadge(app.status)}
                    </Box>

                    {/* Actions */}
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
                        onClick={() => openDossier(app)}
                      >
                        <HStack gap="1.5">
                          <EyeIcon size={13} color="white" />
                          <Text>Review</Text>
                        </HStack>
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
              Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, total)} of {total} submissions
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

      {/* 6. Review Dossier Slide-Over / Modal */}
      {selectedApp && (
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
          onClick={closeDossier}
        >
          <Box
            w={{ base: "100%", md: "640px", lg: "700px" }}
            h="100%"
            bg="white"
            boxShadow="-10px 0 25px rgba(0,0,0,0.15)"
            overflowY="auto"
            onClick={(e) => e.stopPropagation()}
            p={{ base: "5", md: "8" }}
            display="flex"
            flexDirection="column"
          >
            {/* Modal Header */}
            <Flex justify="space-between" align="flex-start" pb="4" borderBottom="1px solid #E2E8F0" mb="6">
              <Box>
                <HStack gap="2" mb="1">
                  {getPathwayBadge(selectedApp.pathway, selectedApp.pathwayTitle)}
                  {getStatusBadge(selectedApp.status)}
                </HStack>
                <Heading as="h2" fontSize="20px" fontWeight="800" color="#0F172A">
                  {selectedApp.applicantDetails?.fullName || "Candidate Dossier"}
                </Heading>
                <HStack gap="2" mt="1">
                  <Text fontFamily="mono" fontSize="12px" color="#64748B">
                    {selectedApp.applicationReference}
                  </Text>
                  <Button
                    size="xs"
                    variant="ghost"
                    p="0"
                    h="auto"
                    color="#94A3B8"
                    _hover={{ color: "#0F172A" }}
                    onClick={() => handleCopy(selectedApp.applicationReference)}
                  >
                    <CopyIcon size={12} />
                  </Button>
                </HStack>
              </Box>

              <Button
                size="sm"
                variant="ghost"
                borderRadius="full"
                w="36px"
                h="36px"
                p="0"
                onClick={closeDossier}
                color="#64748B"
                _hover={{ bg: "#F1F5F9", color: "#0F172A" }}
              >
                <CloseIcon size={18} />
              </Button>
            </Flex>

            {/* Status Feedback alert */}
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
              {/* Section 1: Contact Information */}
              <Box bg="#F8FAFC" p="4" borderRadius="10px" border="1px solid #E2E8F0">
                <Text fontSize="12px" fontWeight="800" textTransform="uppercase" letterSpacing="0.05em" color="#64748B" mb="3">
                  Applicant Contact Information
                </Text>
                <Box
                  display="grid"
                  gridTemplateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }}
                  gap="3"
                  fontSize="13.5px"
                >
                  <Box>
                    <Text fontSize="11.5px" color="#64748B" fontWeight="600">Full Name</Text>
                    <Text fontWeight="600" color="#0F172A">{selectedApp.applicantDetails?.fullName}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="11.5px" color="#64748B" fontWeight="600">Email Address</Text>
                    <Text fontWeight="600" color="#051B64">
                      <a href={`mailto:${selectedApp.applicantDetails?.email}`}>
                        {selectedApp.applicantDetails?.email}
                      </a>
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="11.5px" color="#64748B" fontWeight="600">Phone / WhatsApp</Text>
                    <Text fontWeight="600" color="#0F172A">{selectedApp.applicantDetails?.phone}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="11.5px" color="#64748B" fontWeight="600">Location</Text>
                    <Text fontWeight="600" color="#0F172A">
                      {selectedApp.applicantDetails?.city}, {selectedApp.applicantDetails?.state},{" "}
                      {selectedApp.applicantDetails?.country}
                    </Text>
                  </Box>
                </Box>
              </Box>

              {/* Section 2: Pathway Specific Answers */}
              <Box>
                <Text fontSize="12px" fontWeight="800" textTransform="uppercase" letterSpacing="0.05em" color="#64748B" mb="3">
                  Pathway Responses & Documentation
                </Text>

                {selectedApp.pathwayDetails && Object.keys(selectedApp.pathwayDetails).length > 0 ? (
                  <VStack gap="3" align="stretch">
                    {Object.entries(selectedApp.pathwayDetails).map(([key, val]) => {
                      if (key.endsWith("Name")) return null

                      const formattedKey = key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())

                      const isFile =
                        typeof val === "string" && (val.startsWith("http") || val.startsWith("/uploads"))

                      return (
                        <Box key={key} p="3.5" bg="#FFFFFF" border="1px solid #E2E8F0" borderRadius="8px">
                          <Text fontSize="12px" fontWeight="700" color="#475569" mb="1">
                            {formattedKey}
                          </Text>
                          {isFile ? (
                            <HStack gap="2" mt="1">
                              <DownloadIcon size={15} color="#051B64" />
                              <Link
                                href={val}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "600",
                                  color: "#051B64",
                                  textDecoration: "underline",
                                }}
                              >
                                View / Download Attached Document
                              </Link>
                            </HStack>
                          ) : Array.isArray(val) ? (
                            <Flex wrap="wrap" gap="1.5" mt="1">
                              {val.map((item, idx) => (
                                <Badge key={idx} bg="#F1F5F9" color="#334155" fontSize="12px" px="2" py="0.5">
                                  {item}
                                </Badge>
                              ))}
                            </Flex>
                          ) : (
                            <Text fontSize="13.5px" color="#1E293B" whiteSpace="pre-wrap">
                              {String(val || "Not specified")}
                            </Text>
                          )}
                        </Box>
                      )
                    })}
                  </VStack>
                ) : (
                  <Text fontSize="13px" color="#94A3B8" fontStyle="italic">
                    No additional pathway questionnaire data recorded for this submission.
                  </Text>
                )}
              </Box>

              {/* Section 3: Safeguarding & Audit */}
              <Box bg="#F8FAFC" p="4" borderRadius="10px" border="1px solid #E2E8F0" fontSize="12px">
                <Text fontSize="11px" fontWeight="800" textTransform="uppercase" letterSpacing="0.05em" color="#64748B" mb="2">
                  Submission Metadata & Verification
                </Text>
                <HStack gap="4" wrap="wrap" color="#475569">
                  <HStack gap="1.5">
                    <ShieldIcon size={14} color="#10B981" />
                    <Text>Safeguarding Acknowledged</Text>
                  </HStack>
                  <HStack gap="1.5">
                    <ClockIcon size={14} color="#64748B" />
                    <Text>Submitted: {new Date(selectedApp.submittedAt).toLocaleString()}</Text>
                  </HStack>
                  {selectedApp.reviewedBy && (
                    <HStack gap="1.5">
                      <UserCheckIcon size={14} color="#2563EB" />
                      <Text>
                        Reviewed by: {selectedApp.reviewedBy} (
                        {selectedApp.reviewedAt ? new Date(selectedApp.reviewedAt).toLocaleDateString() : ""})
                      </Text>
                    </HStack>
                  )}
                </HStack>
              </Box>

              {/* Section 4: Internal Admin Notes */}
              <Box>
                <Text fontSize="12px" fontWeight="800" textTransform="uppercase" letterSpacing="0.05em" color="#64748B" mb="2">
                  Internal Review Notes (Admin Only)
                </Text>
                <Textarea
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="Add internal notes about this candidate (e.g., 'Passed phone screening', 'Assigned to STEM track', 'Follow-up needed regarding portfolio')..."
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
                  onClick={() => handleUpdateApplication(undefined, true)}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Saving..." : "Save Notes"}
                </Button>
              </Box>

              {/* Section 5: Status Change Action Bar */}
              <Box pt="4" borderTop="1px solid #E2E8F0">
                <Text fontSize="12px" fontWeight="800" textTransform="uppercase" letterSpacing="0.05em" color="#64748B" mb="3">
                  Administrative Decision
                </Text>
                <Flex wrap="wrap" gap="2">
                  <Button
                    size="sm"
                    bg="#10B981"
                    color="white"
                    _hover={{ bg: "#059669" }}
                    onClick={() => handleUpdateApplication("accepted")}
                    disabled={isUpdating || selectedApp.status === "accepted"}
                  >
                    Approve Application
                  </Button>
                  <Button
                    size="sm"
                    bg="#2563EB"
                    color="white"
                    _hover={{ bg: "#1D4ED8" }}
                    onClick={() => handleUpdateApplication("reviewing")}
                    disabled={isUpdating || selectedApp.status === "reviewing"}
                  >
                    Mark as In Review
                  </Button>
                  <Button
                    size="sm"
                    bg="#DC2626"
                    color="white"
                    _hover={{ bg: "#B91C1C" }}
                    onClick={() => handleUpdateApplication("rejected")}
                    disabled={isUpdating || selectedApp.status === "rejected"}
                  >
                    Reject Application
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    borderColor="#CBD5E1"
                    color="#64748B"
                    _hover={{ bg: "#F8FAFC" }}
                    onClick={() => handleUpdateApplication("pending")}
                    disabled={isUpdating || selectedApp.status === "pending"}
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
