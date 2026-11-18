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
import {
  MailIcon,
  PhoneIcon,
  CheckIcon,
  CloseIcon,
  ClockIcon,
  FilterIcon,
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from "@/components/icons"

interface MessageItem {
  _id: string
  fullName: string
  email: string
  phone?: string
  organization?: string
  category: "partnerships" | "mentorship" | "donors" | "media" | "general"
  categoryLabel?: string
  message: string
  status: "unread" | "read" | "replied" | "archived"
  submittedAt: string
  internalNotes?: string
  repliedAt?: string
  repliedBy?: string
}

interface StatusCounts {
  all: number
  unread: number
  read: number
  replied: number
  archived: number
}

const CATEGORY_OPTIONS = [
  { value: "", label: "All Categories" },
  { value: "partnerships", label: "Schools & Hubs" },
  { value: "mentorship", label: "Youth Mentorship" },
  { value: "donors", label: "Donors & Grants" },
  { value: "media", label: "Media & Speaking" },
  { value: "general", label: "General Inquiry" },
]

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<MessageItem[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [statusCounts, setStatusCounts] = useState<StatusCounts>({
    all: 0,
    unread: 0,
    read: 0,
    replied: 0,
    archived: 0,
  })

  // Filters
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // UI state
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Drawer / modal view
  const [activeMessage, setActiveMessage] = useState<MessageItem | null>(null)
  const [notesInput, setNotesInput] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [statusFeedback, setStatusFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true)
      setErrorMessage(null)

      const params = new URLSearchParams()
      if (search.trim()) params.append("search", search.trim())
      if (selectedCategory) params.append("category", selectedCategory)
      if (selectedStatus && selectedStatus !== "all") params.append("status", selectedStatus)
      params.append("page", page.toString())
      params.append("limit", "10")

      const res = await fetch(`/api/admin/messages?${params.toString()}`, {
        cache: "no-store",
      })

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`)
      }

      const data = await res.json()
      if (data.success) {
        setMessages(data.messages || [])
        setTotal(data.total || 0)
        setTotalPages(data.totalPages || 1)
        if (data.statusCounts) {
          setStatusCounts(data.statusCounts)
        }
      } else {
        setErrorMessage(data.error || "Failed to load messages")
      }
    } catch (err: any) {
      console.error("Failed to load messages:", err)
      setErrorMessage(err.message || "Failed to connect to the server.")
    } finally {
      setLoading(false)
    }
  }, [search, selectedCategory, selectedStatus, page])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  const openMessage = async (msg: MessageItem) => {
    setActiveMessage(msg)
    setNotesInput(msg.internalNotes || "")
    setStatusFeedback(null)

    // Automatically mark as read if it was unread
    if (msg.status === "unread") {
      try {
        await fetch(`/api/admin/messages/${msg._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "read" }),
        })
        setActiveMessage((prev) => (prev ? { ...prev, status: "read" } : null))
        setMessages((prev) =>
          prev.map((item) => (item._id === msg._id ? { ...item, status: "read" } : item))
        )
        setStatusCounts((prev) => ({
          ...prev,
          unread: Math.max(0, prev.unread - 1),
          read: prev.read + 1,
        }))
      } catch (e) {
        console.error("Auto mark read error:", e)
      }
    }
  }

  const closeMessage = () => {
    setActiveMessage(null)
    setStatusFeedback(null)
  }

  const handleUpdateMessage = async (newStatus?: MessageItem["status"], saveNotesOnly = false) => {
    if (!activeMessage) return

    try {
      setIsUpdating(true)
      setStatusFeedback(null)

      const payload: { status?: string; internalNotes?: string; repliedBy?: string } = {
        internalNotes: notesInput,
      }
      if (newStatus) {
        payload.status = newStatus
        if (newStatus === "replied") {
          payload.repliedBy = "I-IMPACT Team"
        }
      }

      const res = await fetch(`/api/admin/messages/${activeMessage._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update message")
      }

      setStatusFeedback({
        type: "success",
        text: saveNotesOnly ? "Admin notes updated." : `Status marked as ${newStatus?.toUpperCase()}.`,
      })

      setActiveMessage((prev) =>
        prev
          ? {
              ...prev,
              status: (newStatus || prev.status) as MessageItem["status"],
              internalNotes: notesInput,
              repliedAt: newStatus === "replied" ? new Date().toISOString() : prev.repliedAt,
              repliedBy: newStatus === "replied" ? "I-IMPACT Team" : prev.repliedBy,
            }
          : null
      )

      fetchMessages()
    } catch (err: any) {
      setStatusFeedback({
        type: "error",
        text: err.message || "Failed to update record.",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unread":
        return <Badge bg="#FEF3C7" color="#D97706" border="1px solid #FDE68A" px="2.5" py="0.5" borderRadius="full" fontSize="12px" fontWeight="700">New / Unread</Badge>
      case "read":
        return <Badge bg="#F1F5F9" color="#475569" border="1px solid #CBD5E1" px="2.5" py="0.5" borderRadius="full" fontSize="12px" fontWeight="600">Read</Badge>
      case "replied":
        return <Badge bg="#ECFDF5" color="#059669" border="1px solid #A7F3D0" px="2.5" py="0.5" borderRadius="full" fontSize="12px" fontWeight="700">Replied</Badge>
      case "archived":
        return <Badge bg="#F8FAFC" color="#94A3B8" border="1px solid #E2E8F0" px="2.5" py="0.5" borderRadius="full" fontSize="12px">Archived</Badge>
      default:
        return null
    }
  }

  const getCategoryBadge = (category: string, label?: string) => {
    const colors: Record<string, { bg: string; color: string; border: string }> = {
      partnerships: { bg: "#EFF6FF", color: "#1D4ED8", border: "#BFDBFE" },
      mentorship: { bg: "#F5F3FF", color: "#7C3AED", border: "#DDD6FE" },
      donors: { bg: "#ECFDF5", color: "#0D9488", border: "#99F6E4" },
      media: { bg: "#FFF7ED", color: "#EA580C", border: "#FFEDD5" },
      general: { bg: "#F1F5F9", color: "#475569", border: "#E2E8F0" },
    }
    const style = colors[category] || colors.general
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
      >
        {label || category}
      </Badge>
    )
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
              Contact Messages
            </Heading>
            <Badge bg="#F1F5F9" color="#051B64" fontSize="13px" fontWeight="700" px="2.5" py="0.5" borderRadius="full">
              {total} Total
            </Badge>
          </HStack>
          <Text fontSize="14px" color="#64748B" mt="1">
            Manage incoming enquiries from schools, youth leaders, prospective donors, and media partners.
          </Text>
        </Box>

        <HStack gap="3">
          <Button
            size="sm"
            bg="white"
            color="#051B64"
            border="1px solid #E2E8F0"
            _hover={{ bg: "#F8FAFC", borderColor: "#CBD5E1" }}
            onClick={fetchMessages}
            disabled={loading}
            px="4"
            h="36px"
          >
            {loading ? "Refreshing..." : "Refresh Inbox"}
          </Button>
        </HStack>
      </Flex>

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
          { key: "all", label: "All Enquiries", count: statusCounts.all, color: "#64748B" },
          { key: "unread", label: "Unread", count: statusCounts.unread, color: "#D97706" },
          { key: "read", label: "Read", count: statusCounts.read, color: "#475569" },
          { key: "replied", label: "Replied", count: statusCounts.replied, color: "#059669" },
          { key: "archived", label: "Archived", count: statusCounts.archived, color: "#94A3B8" },
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

      {/* 3. Search & Category Selectors */}
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
            placeholder="Search messages by sender name, email, organization, or keywords..."
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
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value)
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
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Box>
      </Flex>

      {/* 4. Messages Table */}
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
              Loading inbox from MongoDB Atlas...
            </Text>
          </Flex>
        ) : messages.length === 0 ? (
          <Flex py="16" px="4" justify="center" align="center" direction="column" textAlign="center">
            <Box w="56px" h="56px" bg="#F1F5F9" borderRadius="full" display="flex" alignItems="center" justifyContent="center" mb="3" color="#64748B">
              <MailIcon size={24} />
            </Box>
            <Heading as="h3" fontSize="16px" fontWeight="700" color="#0F172A">
              No messages found
            </Heading>
            <Text fontSize="13.5px" color="#64748B" maxW="400px" mt="1">
              {search || selectedCategory || selectedStatus !== "all"
                ? "No contact submissions matched your filters. Try clearing your search query."
                : "No contact messages have been received yet. When visitors submit via the Contact Us form, they will appear here instantly."}
            </Text>
          </Flex>
        ) : (
          <Box overflowX="auto">
            <Box as="table" w="full" style={{ borderCollapse: "collapse" }}>
              <Box as="thead" bg="#F8FAFC" borderBottom="1px solid #E2E8F0">
                <Box as="tr">
                  <Box as="th" textAlign="left" py="3.5" px="4" fontSize="12px" fontWeight="700" color="#475569" textTransform="uppercase" letterSpacing="0.05em">
                    Sender
                  </Box>
                  <Box as="th" textAlign="left" py="3.5" px="4" fontSize="12px" fontWeight="700" color="#475569" textTransform="uppercase" letterSpacing="0.05em">
                    Category
                  </Box>
                  <Box as="th" textAlign="left" py="3.5" px="4" fontSize="12px" fontWeight="700" color="#475569" textTransform="uppercase" letterSpacing="0.05em">
                    Message Preview
                  </Box>
                  <Box as="th" textAlign="left" py="3.5" px="4" fontSize="12px" fontWeight="700" color="#475569" textTransform="uppercase" letterSpacing="0.05em">
                    Received
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
                {messages.map((msg) => (
                  <Box
                    as="tr"
                    key={msg._id}
                    borderBottom="1px solid #F1F5F9"
                    _hover={{ bg: "#F8FAFC" }}
                    bg={msg.status === "unread" ? "#FFFDF5" : "transparent"}
                    cursor="pointer"
                    onClick={() => openMessage(msg)}
                    transition="background 0.15s ease"
                  >
                    <Box as="td" py="3.5" px="4">
                      <HStack gap="2">
                        {msg.status === "unread" && (
                          <Box w="7px" h="7px" borderRadius="full" bg="#D97706" flexShrink={0} />
                        )}
                        <Box>
                          <Text fontSize="14px" fontWeight={msg.status === "unread" ? "800" : "600"} color="#0F172A">
                            {msg.fullName}
                          </Text>
                          <Text fontSize="12px" color="#64748B">
                            {msg.organization || msg.email}
                          </Text>
                        </Box>
                      </HStack>
                    </Box>

                    <Box as="td" py="3.5" px="4">
                      {getCategoryBadge(msg.category, msg.categoryLabel)}
                    </Box>

                    <Box as="td" py="3.5" px="4" maxW="320px">
                      <Text fontSize="13px" color="#334155" truncate>
                        {msg.message}
                      </Text>
                    </Box>

                    <Box as="td" py="3.5" px="4">
                      <Text fontSize="12.5px" color="#64748B">
                        {new Date(msg.submittedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </Text>
                    </Box>

                    <Box as="td" py="3.5" px="4">
                      {getStatusBadge(msg.status)}
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
                          openMessage(msg)
                        }}
                      >
                        Read
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
              Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, total)} of {total} messages
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

      {/* 6. Message Viewer Slide-Over */}
      {activeMessage && (
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
          onClick={closeMessage}
        >
          <Box
            w={{ base: "100%", md: "600px" }}
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
                  {getCategoryBadge(activeMessage.category, activeMessage.categoryLabel)}
                  {getStatusBadge(activeMessage.status)}
                </HStack>
                <Heading as="h2" fontSize="20px" fontWeight="800" color="#0F172A">
                  {activeMessage.fullName}
                </Heading>
                {activeMessage.organization && (
                  <Text fontSize="13px" fontWeight="600" color="#64748B">
                    {activeMessage.organization}
                  </Text>
                )}
              </Box>

              <Button
                size="sm"
                variant="ghost"
                borderRadius="full"
                w="36px"
                h="36px"
                p="0"
                onClick={closeMessage}
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
              {/* Contact info bar */}
              <Box bg="#F8FAFC" p="4" borderRadius="10px" border="1px solid #E2E8F0" fontSize="13.5px">
                <HStack justify="space-between" wrap="wrap" gap="3">
                  <Box>
                    <Text fontSize="11px" color="#64748B" fontWeight="700" textTransform="uppercase">
                      Email Address
                    </Text>
                    <Text fontWeight="700" color="#051B64">
                      <a href={`mailto:${activeMessage.email}?subject=Re:%20I-IMPACT%20Initiative%20Enquiry`}>
                        {activeMessage.email}
                      </a>
                    </Text>
                  </Box>
                  {activeMessage.phone && (
                    <Box>
                      <Text fontSize="11px" color="#64748B" fontWeight="700" textTransform="uppercase">
                        Phone / WhatsApp
                      </Text>
                      <Text fontWeight="600" color="#0F172A">
                        {activeMessage.phone}
                      </Text>
                    </Box>
                  )}
                  <Box>
                    <Text fontSize="11px" color="#64748B" fontWeight="700" textTransform="uppercase">
                      Received At
                    </Text>
                    <Text color="#475569">
                      {new Date(activeMessage.submittedAt).toLocaleString()}
                    </Text>
                  </Box>
                </HStack>
              </Box>

              {/* Message body */}
              <Box>
                <Text fontSize="12px" fontWeight="800" textTransform="uppercase" letterSpacing="0.05em" color="#64748B" mb="2">
                  Message Content
                </Text>
                <Box
                  bg="#FFFFFF"
                  p="4"
                  borderRadius="10px"
                  border="1px solid #E2E8F0"
                  fontSize="14px"
                  color="#1E293B"
                  lineHeight="1.7"
                  whiteSpace="pre-wrap"
                >
                  {activeMessage.message}
                </Box>
              </Box>

              {/* Quick Reply Button */}
              <Box>
                <a
                  href={`mailto:${activeMessage.email}?subject=Re:%20I-IMPACT%20Initiative%20Inquiry%20(${activeMessage.categoryLabel || "Response"})`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    w="full"
                    h="44px"
                    bg="#051B64"
                    color="white"
                    _hover={{ bg: "#0A2580" }}
                    borderRadius="10px"
                    fontSize="14px"
                    fontWeight="700"
                  >
                    <HStack gap="2">
                      <MailIcon size={16} />
                      <Text>Reply via Email Client</Text>
                    </HStack>
                  </Button>
                </a>
              </Box>

              {/* Internal Notes */}
              <Box>
                <Text fontSize="12px" fontWeight="800" textTransform="uppercase" letterSpacing="0.05em" color="#64748B" mb="2">
                  Internal Notes (Admin Only)
                </Text>
                <Textarea
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="Record internal team notes (e.g. 'Replied via WhatsApp', 'Referred to partnerships team')..."
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
                  onClick={() => handleUpdateMessage(undefined, true)}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Saving..." : "Save Notes"}
                </Button>
              </Box>

              {/* Status Change Buttons */}
              <Box pt="4" borderTop="1px solid #E2E8F0">
                <Text fontSize="12px" fontWeight="800" textTransform="uppercase" letterSpacing="0.05em" color="#64748B" mb="3">
                  Update Status
                </Text>
                <Flex wrap="wrap" gap="2">
                  <Button
                    size="sm"
                    bg="#10B981"
                    color="white"
                    _hover={{ bg: "#059669" }}
                    onClick={() => handleUpdateMessage("replied")}
                    disabled={isUpdating || activeMessage.status === "replied"}
                  >
                    Mark as Replied
                  </Button>
                  <Button
                    size="sm"
                    bg="#475569"
                    color="white"
                    _hover={{ bg: "#334155" }}
                    onClick={() => handleUpdateMessage("archived")}
                    disabled={isUpdating || activeMessage.status === "archived"}
                  >
                    Archive Message
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    borderColor="#CBD5E1"
                    color="#64748B"
                    _hover={{ bg: "#F8FAFC" }}
                    onClick={() => handleUpdateMessage("unread")}
                    disabled={isUpdating || activeMessage.status === "unread"}
                  >
                    Mark as Unread
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

