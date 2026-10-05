"use client"

import React, { useState, useEffect, useRef } from "react"
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
  Input,
  Textarea,
  Separator,
} from "@chakra-ui/react"
import Link from "next/link"
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  MegaphoneIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  FileTextIcon,
  DownloadIcon,
  CheckIcon,
  ExternalLinkIcon,
  SettingsIcon,
  UploadIcon,
  EyeIcon,
  RefreshCwIcon,
  ArrowRightIcon,
} from "@/components/icons"
import { ConferenceBanner } from "@/components/conference"
import { EventItem } from "@/types/event"

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [activeEvent, setActiveEvent] = useState<EventItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Modal / Form state
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  // Form fields
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    badge: "ANNUAL FLAGSHIP YOUTH CONGRESS",
    startDate: "",
    endDate: "",
    dateDisplay: "",
    timeDisplay: "9:00 AM WAT",
    countdownTarget: "",
    venue: "",
    attendeeBadge: "2,500+ Registered Teens",
    description: "",
    registrationUrl: "/programs",
    registrationBtnText: "Register Free Now",
    agendaBtnText: "View Conference Agenda",
    programDocumentUrl: "",
    programDocumentName: "",
    bannerImageUrl: "",
    isActive: false,
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch events list
  const fetchEvents = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/events")
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setEvents(data.events || [])
          setActiveEvent(data.activeEvent || null)
        }
      }
    } catch (err) {
      console.error("Failed to load events:", err)
      showMessage("error", "Failed to fetch events from server.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 5000)
  }

  // Open form for new event
  const handleOpenCreate = () => {
    setEditingId(null)
    setFormData({
      title: "",
      subtitle: "",
      badge: "ANNUAL FLAGSHIP YOUTH CONGRESS",
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      dateDisplay: "",
      timeDisplay: "9:00 AM – 4:00 PM WAT",
      countdownTarget: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 16),
      venue: "Landmark Centre, Lagos & Virtual Worldwide",
      attendeeBadge: "2,500+ Registered Teens",
      description: "",
      registrationUrl: "/programs",
      registrationBtnText: "Register Free Now",
      agendaBtnText: "View Conference Agenda",
      programDocumentUrl: "",
      programDocumentName: "",
      bannerImageUrl: "",
      isActive: events.length === 0,
    })
    setIsFormOpen(true)
  }

  // Open form for editing
  const handleOpenEdit = (evt: EventItem) => {
    setEditingId(evt.id)
    // Convert ISO countdown target to YYYY-MM-DDTHH:MM for input datetime-local
    let targetFormatted = ""
    try {
      if (evt.countdownTarget) {
        targetFormatted = new Date(evt.countdownTarget).toISOString().slice(0, 16)
      }
    } catch (e) {
      targetFormatted = ""
    }

    setFormData({
      title: evt.title,
      subtitle: evt.subtitle || "",
      badge: evt.badge || "UPCOMING EVENT",
      startDate: evt.startDate || "",
      endDate: evt.endDate || "",
      dateDisplay: evt.dateDisplay || "",
      timeDisplay: evt.timeDisplay || "",
      countdownTarget: targetFormatted,
      venue: evt.venue || "",
      attendeeBadge: evt.attendeeBadge || "",
      description: evt.description || "",
      registrationUrl: evt.registrationUrl || "/programs",
      registrationBtnText: evt.registrationBtnText || "Register Free Now",
      agendaBtnText: evt.agendaBtnText || "View Conference Agenda",
      programDocumentUrl: evt.programDocumentUrl || "",
      programDocumentName: evt.programDocumentName || "",
      bannerImageUrl: evt.bannerImageUrl || "",
      isActive: evt.isActive || false,
    })
    setIsFormOpen(true)
  }

  // Handle Form Submit (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.dateDisplay.trim() || !formData.venue.trim()) {
      showMessage("error", "Please fill in all required fields (Title, Date display, and Venue).")
      return
    }

    setSaving(true)
    try {
      let countdownIso = ""
      if (formData.countdownTarget) {
        countdownIso = new Date(formData.countdownTarget).toISOString()
      } else if (formData.startDate) {
        countdownIso = new Date(`${formData.startDate}T09:00:00Z`).toISOString()
      } else {
        countdownIso = new Date().toISOString()
      }

      const payload = {
        ...formData,
        countdownTarget: countdownIso,
      }

      if (editingId) {
        // Update existing
        const res = await fetch(`/api/events/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        const data = await res.json()
        if (data.success) {
          showMessage("success", `Event "${formData.title}" updated successfully!`)
          setIsFormOpen(false)
          fetchEvents()
        } else {
          showMessage("error", data.error || "Failed to update event")
        }
      } else {
        // Create new
        const res = await fetch("/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        const data = await res.json()
        if (data.success) {
          showMessage("success", `Event "${formData.title}" created successfully!`)
          setIsFormOpen(false)
          fetchEvents()
        } else {
          showMessage("error", data.error || "Failed to create event")
        }
      }
    } catch (err) {
      console.error("Error saving event:", err)
      showMessage("error", "An unexpected error occurred while saving.")
    } finally {
      setSaving(false)
    }
  }

  // Handle Set Active
  const handleSetActive = async (id: string, title: string) => {
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "set-active" }),
      })
      const data = await res.json()
      if (data.success) {
        showMessage("success", `"${title}" is now the ACTIVE event on the homepage!`)
        fetchEvents()
      } else {
        showMessage("error", data.error || "Failed to activate event")
      }
    } catch (err) {
      console.error("Error setting active event:", err)
      showMessage("error", "Failed to activate event.")
    }
  }

  // Handle Delete Event
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return

    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (data.success) {
        showMessage("success", `Event "${title}" has been deleted.`)
        fetchEvents()
      } else {
        showMessage("error", data.error || "Failed to delete event")
      }
    } catch (err) {
      console.error("Error deleting event:", err)
      showMessage("error", "Failed to delete event.")
    }
  }

  // Handle File Upload (Soft Copy Program document or flyer)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const uploadForm = new FormData()
    uploadForm.append("file", file)

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadForm,
      })
      const data = await res.json()
      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          programDocumentUrl: data.url,
          programDocumentName: data.fileName,
          agendaBtnText: prev.agendaBtnText || "Download Program Soft Copy",
        }))
        showMessage("success", `Soft copy document "${file.name}" uploaded successfully!`)
      } else {
        showMessage("error", data.error || "Upload failed")
      }
    } catch (err) {
      console.error("Upload error:", err)
      showMessage("error", "Failed to upload document.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <Box minH="100vh" bg="#F8FAFC" color="#0F172A" pb="20">
      {/* Top Navigation Bar */}
      <Box bg="#051B64" color="white" borderBottom="1px solid rgba(255, 255, 255, 0.1)" py="4" px={{ base: "4", md: "8" }}>
        <Container maxW="1300px">
          <Flex justify="space-between" align="center" flexWrap="wrap" gap="3">
            <HStack gap="3">
              <Box bg="rgba(20, 145, 145, 0.3)" p="2" borderRadius="lg">
                <SettingsIcon size={22} color="#34D399" />
              </Box>
              <Box>
                <Heading fontSize={{ base: "lg", md: "xl" }} fontWeight="800" color="white">
                  Event Organizer Console
                </Heading>
                <Text fontSize="xs" color="whiteAlpha.700">
                  Manage Upcoming Events, Active Showcase & Real-Time Notifications
                </Text>
              </Box>
            </HStack>

            <HStack gap="2" flexWrap="wrap">
              <Link href="/admin/events">
                <Button
                  size="xs"
                  bg="#149191"
                  color="white"
                  borderRadius="lg"
                  fontSize="xs"
                >
                  <HStack gap="1.5">
                    <CalendarIcon size={12} />
                    <Text>Events</Text>
                  </HStack>
                </Button>
              </Link>

              <Link href="/admin/assignments">
                <Button
                  size="xs"
                  bg="rgba(255, 255, 255, 0.12)"
                  color="white"
                  _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}
                  borderRadius="lg"
                  fontSize="xs"
                >
                  <HStack gap="1.5">
                    <Text>Assignments</Text>
                  </HStack>
                </Button>
              </Link>

              <Link href="/">
                <Button
                  size="xs"
                  bg="rgba(255, 255, 255, 0.12)"
                  color="white"
                  border="1px solid rgba(255, 255, 255, 0.2)"
                  _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}
                  borderRadius="lg"
                  fontSize="xs"
                >
                  <HStack gap="1.5">
                    <EyeIcon size={12} color="white" />
                    <Text display={{ base: "none", sm: "inline" }}>View Live Website</Text>
                  </HStack>
                </Button>
              </Link>

              <Button
                size="xs"
                bg="#10B981"
                color="white"
                fontWeight="700"
                _hover={{ bg: "#059669" }}
                onClick={handleOpenCreate}
                borderRadius="lg"
                fontSize="xs"
              >
                <HStack gap="1.5">
                  <PlusIcon size={13} color="white" />
                  <Text>Add New Event</Text>
                </HStack>
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="1300px" py="8" px={{ base: "4", md: "8" }}>
        {/* Flash Notification Message */}
        {message && (
          <Box
            mb="6"
            p="4"
            borderRadius="xl"
            bg={message.type === "success" ? "#ECFDF5" : "#FEF2F2"}
            border="1px solid"
            borderColor={message.type === "success" ? "#A7F3D0" : "#FECACA"}
            color={message.type === "success" ? "#065F46" : "#991B1B"}
            boxShadow="sm"
          >
            <HStack gap="2.5">
              {message.type === "success" ? (
                <CheckIcon size={18} color="#059669" />
              ) : (
                <MegaphoneIcon size={18} color="#DC2626" />
              )}
              <Text fontWeight="600" fontSize="sm">
                {message.text}
              </Text>
            </HStack>
          </Box>
        )}

        {/* Overview Stats Cards */}
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="4" mb="8">
          <Box bg="white" p="5" borderRadius="xl" border="1px solid #E2E8F0" boxShadow="sm">
            <Text fontSize="xs" fontWeight="700" color="gray.500" textTransform="uppercase">
              Active Showcase Event
            </Text>
            <Text fontSize="lg" fontWeight="800" color="#051B64" mt="1" lineClamp={1}>
              {activeEvent ? activeEvent.title : "No Event Active"}
            </Text>
            <Text fontSize="xs" color="#10B981" fontWeight="600" mt="1">
              {activeEvent ? `Target: ${activeEvent.dateDisplay}` : "Set one below"}
            </Text>
          </Box>

          <Box bg="white" p="5" borderRadius="xl" border="1px solid #E2E8F0" boxShadow="sm">
            <Text fontSize="xs" fontWeight="700" color="gray.500" textTransform="uppercase">
              Total Managed Events
            </Text>
            <Text fontSize="2xl" fontWeight="900" color="#051B64" mt="1">
              {events.length}
            </Text>
            <Text fontSize="xs" color="gray.500" mt="1">
              Ready to switch anytime
            </Text>
          </Box>

          <Box bg="white" p="5" borderRadius="xl" border="1px solid #E2E8F0" boxShadow="sm">
            <Text fontSize="xs" fontWeight="700" color="gray.500" textTransform="uppercase">
              Soft Copy Program Document
            </Text>
            <Text fontSize="lg" fontWeight="800" color={activeEvent?.programDocumentUrl ? "#059669" : "#D97706"} mt="1">
              {activeEvent?.programDocumentUrl ? "Document Attached" : "None Attached"}
            </Text>
            <Text fontSize="xs" color="gray.500" mt="1">
              {activeEvent?.programDocumentName || "Upload soft copy PDF/Doc"}
            </Text>
          </Box>

          <Box bg="white" p="5" borderRadius="xl" border="1px solid #E2E8F0" boxShadow="sm">
            <Text fontSize="xs" fontWeight="700" color="gray.500" textTransform="uppercase">
              Registered Attendance Tag
            </Text>
            <Text fontSize="lg" fontWeight="800" color="#051B64" mt="1">
              {activeEvent?.attendeeBadge || "2,500+ Registered"}
            </Text>
            <Text fontSize="xs" color="gray.500" mt="1">
              Displayed live on banner
            </Text>
          </Box>
        </SimpleGrid>

        {/* Live Homepage Banner Preview Section */}
        <Box mb="10" bg="white" p={{ base: "4", md: "6" }} borderRadius="2xl" border="1px solid #E2E8F0" boxShadow="sm">
          <Flex justify="space-between" align="center" mb="4" wrap="wrap" gap="2">
            <HStack gap="2">
              <EyeIcon size={18} color="#051B64" />
              <Heading fontSize="md" fontWeight="800" color="#051B64">
                Live Banner Preview (What Visitors See on Homepage)
              </Heading>
            </HStack>
            <Button size="xs" variant="ghost" color="#10B981" onClick={fetchEvents}>
              <HStack gap="1">
                <RefreshCwIcon size={12} color="#10B981" />
                <Text>Refresh Preview</Text>
              </HStack>
            </Button>
          </Flex>

          <Box borderRadius="24px" overflow="hidden">
            <ConferenceBanner initialEvent={activeEvent || undefined} />
          </Box>
        </Box>

        {/* Events Management List */}
        <Box bg="white" borderRadius="2xl" border="1px solid #E2E8F0" p={{ base: "4", md: "6" }} boxShadow="sm">
          <Flex justify="space-between" align="center" mb="6" wrap="wrap" gap="3">
            <Box>
              <Heading fontSize="lg" fontWeight="800" color="#051B64">
                All Configured Events ({events.length})
              </Heading>
              <Text fontSize="xs" color="gray.500">
                Click <strong>&quot;Set as Active&quot;</strong> to instantly switch what appears on the public homepage.
              </Text>
            </Box>

            <Button
              size="sm"
              bg="#051B64"
              color="white"
              fontWeight="700"
              _hover={{ bg: "#04144a" }}
              onClick={handleOpenCreate}
            >
              <HStack gap="1.5">
                <PlusIcon size={14} color="white" />
                <Text>Create Another Event</Text>
              </HStack>
            </Button>
          </Flex>

          {loading ? (
            <Box py="12" textAlign="center">
              <Text color="gray.500" fontSize="sm">
                Loading events...
              </Text>
            </Box>
          ) : events.length === 0 ? (
            <Box py="12" textAlign="center" bg="gray.50" borderRadius="xl">
              <Text color="gray.600" fontWeight="600">
                No events found.
              </Text>
              <Button size="sm" mt="3" bg="#10B981" color="white" onClick={handleOpenCreate}>
                Create First Event
              </Button>
            </Box>
          ) : (
            <VStack gap="4" align="stretch">
              {events.map((evt) => (
                <Box
                  key={evt.id}
                  p="5"
                  borderRadius="xl"
                  border="1.5px solid"
                  borderColor={evt.isActive ? "#10B981" : "#E2E8F0"}
                  bg={evt.isActive ? "linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 100%)" : "white"}
                  transition="all 0.2s ease"
                  boxShadow={evt.isActive ? "0 4px 12px rgba(16, 185, 129, 0.1)" : "none"}
                >
                  <Flex
                    direction={{ base: "column", lg: "row" }}
                    justify="space-between"
                    align={{ base: "flex-start", lg: "center" }}
                    gap="4"
                  >
                    {/* Left details */}
                    <VStack align="flex-start" gap="2" maxW={{ base: "100%", lg: "650px" }}>
                      <HStack gap="2" wrap="wrap">
                        {evt.isActive ? (
                          <Badge bg="#10B981" color="white" px="2.5" py="1" borderRadius="full" fontSize="11px" fontWeight="800">
                            ★ ACTIVE ON HOMEPAGE
                          </Badge>
                        ) : (
                          <Badge bg="gray.200" color="gray.700" px="2.5" py="0.5" borderRadius="full" fontSize="10px" fontWeight="700">
                            INACTIVE
                          </Badge>
                        )}
                        <Badge bg="#FEF3C7" color="#92400E" px="2" py="0.5" borderRadius="md" fontSize="10px" fontWeight="700">
                          {evt.badge}
                        </Badge>
                        {evt.programDocumentUrl && (
                          <Badge bg="#E0E7FF" color="#3730A3" px="2" py="0.5" borderRadius="md" fontSize="10px" fontWeight="700">
                            📄 Soft Copy Uploaded
                          </Badge>
                        )}
                      </HStack>

                      <Heading fontSize="md" fontWeight="800" color="#051B64">
                        {evt.title}
                      </Heading>

                      {evt.subtitle && (
                        <Text fontSize="xs" color="gray.600" fontWeight="500">
                          {evt.subtitle}
                        </Text>
                      )}

                      <Flex wrap="wrap" gap="4" fontSize="xs" color="gray.600" pt="1">
                        <HStack gap="1">
                          <CalendarIcon size={14} color="#10B981" />
                          <Text fontWeight="600">{evt.dateDisplay}</Text>
                        </HStack>
                        <HStack gap="1">
                          <MapPinIcon size={14} color="#10B981" />
                          <Text>{evt.venue}</Text>
                        </HStack>
                        {evt.attendeeBadge && (
                          <HStack gap="1">
                            <UsersIcon size={14} color="#10B981" />
                            <Text>{evt.attendeeBadge}</Text>
                          </HStack>
                        )}
                      </Flex>

                      {/* Soft Copy Document link if attached */}
                      {evt.programDocumentUrl && (
                        <HStack gap="2" bg="gray.50" px="3" py="1.5" borderRadius="md" border="1px solid #E2E8F0" mt="1">
                          <FileTextIcon size={14} color="#059669" />
                          <Text fontSize="xs" color="gray.700" fontWeight="600" lineClamp={1}>
                            {evt.programDocumentName || "Official Program Document"}
                          </Text>
                          <a href={evt.programDocumentUrl} target="_blank" rel="noopener noreferrer" download>
                            <Button size="xs" variant="ghost" color="#059669" p="0" h="auto">
                              <HStack gap="1">
                                <DownloadIcon size={12} color="#059669" />
                                <Text fontSize="11px">Download</Text>
                              </HStack>
                            </Button>
                          </a>
                        </HStack>
                      )}
                    </VStack>

                    {/* Right actions */}
                    <HStack gap="2" wrap="wrap" alignSelf={{ base: "flex-start", lg: "center" }}>
                      {!evt.isActive && (
                        <Button
                          size="sm"
                          bg="#10B981"
                          color="white"
                          fontWeight="700"
                          _hover={{ bg: "#059669" }}
                          onClick={() => handleSetActive(evt.id, evt.title)}
                        >
                          <HStack gap="1">
                            <CheckIcon size={14} color="white" />
                            <Text>Set as Active</Text>
                          </HStack>
                        </Button>
                      )}

                      <Button
                        size="sm"
                        bg="gray.100"
                        color="#051B64"
                        fontWeight="600"
                        _hover={{ bg: "gray.200" }}
                        onClick={() => handleOpenEdit(evt)}
                      >
                        <HStack gap="1">
                          <EditIcon size={14} color="#051B64" />
                          <Text>Edit</Text>
                        </HStack>
                      </Button>

                      <Button
                        size="sm"
                        bg="#FEE2E2"
                        color="#DC2626"
                        fontWeight="600"
                        _hover={{ bg: "#FECACA" }}
                        onClick={() => handleDelete(evt.id, evt.title)}
                      >
                        <HStack gap="1">
                          <TrashIcon size={14} color="#DC2626" />
                          <Text>Delete</Text>
                        </HStack>
                      </Button>
                    </HStack>
                  </Flex>
                </Box>
              ))}
            </VStack>
          )}
        </Box>
      </Container>

      {/* Edit / Create Modal Form */}
      {isFormOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          w="100vw"
          h="100vh"
          bg="rgba(5, 27, 100, 0.65)"
          backdropFilter="blur(6px)"
          zIndex={100}
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={{ base: "3", sm: "4", md: "6" }}
        >
          <Box
            bg="white"
            borderRadius="2xl"
            maxW="720px"
            w="100%"
            maxH="90vh"
            overflowY="auto"
            p={{ base: "5", sm: "6", md: "8" }}
            boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            border="1px solid #E2E8F0"
          >
            <Flex justify="space-between" align="center" mb="4">
              <Box>
                <Heading fontSize="xl" fontWeight="900" color="#051B64">
                  {editingId ? "Edit Event Details" : "Add New Upcoming Event"}
                </Heading>
                <Text fontSize="xs" color="gray.500">
                  Update event details and soft copy program document
                </Text>
              </Box>
              <Button size="sm" variant="ghost" onClick={() => setIsFormOpen(false)}>
                ✕ Close
              </Button>
            </Flex>

            <form onSubmit={handleSubmit}>
              <VStack gap="4" align="stretch">
                {/* Event Title */}
                <Box>
                  <Text fontSize="xs" fontWeight="700" color="gray.700" mb="1">
                    Event Title *
                  </Text>
                  <Input
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. AS A TEEN Conference 2025: Unleashing The Extraordinary"
                    fontSize="sm"
                    bg="gray.50"
                  />
                </Box>

                {/* Subtitle / Theme */}
                <Box>
                  <Text fontSize="xs" fontWeight="700" color="gray.700" mb="1">
                    Subtitle / Theme (Optional)
                  </Text>
                  <Input
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="e.g. Raising Generational Champions & World Leaders"
                    fontSize="sm"
                    bg="gray.50"
                  />
                </Box>

                <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4">
                  {/* Badge Text */}
                  <Box>
                    <Text fontSize="xs" fontWeight="700" color="gray.700" mb="1">
                      Header Badge Category
                    </Text>
                    <Input
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      placeholder="e.g. ANNUAL FLAGSHIP YOUTH CONGRESS"
                      fontSize="sm"
                      bg="gray.50"
                    />
                  </Box>

                  {/* Attendee Badge */}
                  <Box>
                    <Text fontSize="xs" fontWeight="700" color="gray.700" mb="1">
                      Attendee / Highlight Tag
                    </Text>
                    <Input
                      value={formData.attendeeBadge}
                      onChange={(e) => setFormData({ ...formData, attendeeBadge: e.target.value })}
                      placeholder="e.g. 2,500+ Registered Teens"
                      fontSize="sm"
                      bg="gray.50"
                    />
                  </Box>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4">
                  {/* Date Display */}
                  <Box>
                    <Text fontSize="xs" fontWeight="700" color="gray.700" mb="1">
                      Date Display Text *
                    </Text>
                    <Input
                      required
                      value={formData.dateDisplay}
                      onChange={(e) => setFormData({ ...formData, dateDisplay: e.target.value })}
                      placeholder="e.g. November 15–17, 2025"
                      fontSize="sm"
                      bg="gray.50"
                    />
                  </Box>

                  {/* Time Display */}
                  <Box>
                    <Text fontSize="xs" fontWeight="700" color="gray.700" mb="1">
                      Time Display Text
                    </Text>
                    <Input
                      value={formData.timeDisplay}
                      onChange={(e) => setFormData({ ...formData, timeDisplay: e.target.value })}
                      placeholder="e.g. 9:00 AM – 4:00 PM WAT"
                      fontSize="sm"
                      bg="gray.50"
                    />
                  </Box>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4">
                  {/* Countdown Target (Datetime picker) */}
                  <Box>
                    <Text fontSize="xs" fontWeight="700" color="gray.700" mb="1">
                      Countdown Target Date & Time
                    </Text>
                    <Input
                      type="datetime-local"
                      value={formData.countdownTarget}
                      onChange={(e) => setFormData({ ...formData, countdownTarget: e.target.value })}
                      fontSize="sm"
                      bg="gray.50"
                    />
                  </Box>

                  {/* Venue */}
                  <Box>
                    <Text fontSize="xs" fontWeight="700" color="gray.700" mb="1">
                      Venue / Location *
                    </Text>
                    <Input
                      required
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      placeholder="e.g. Landmark Centre, Lagos & Virtual Worldwide"
                      fontSize="sm"
                      bg="gray.50"
                    />
                  </Box>
                </SimpleGrid>

                {/* Soft Copy Document Upload Section */}
                <Box p="4" bg="#F0FDF4" borderRadius="xl" border="1.5px dashed #10B981">
                  <Text fontSize="xs" fontWeight="800" color="#065F46" textTransform="uppercase" mb="1">
                    Official Program Document / Soft Copy
                  </Text>
                  <Text fontSize="xs" color="#047857" mb="3">
                    Upload the soft copy of the real program schedule, brochure, or flyer (PDF, DOCX, PNG, JPG). Visitors can download it right from the homepage banner.
                  </Text>

                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  />

                  <HStack gap="3" wrap="wrap">
                    <Button
                      type="button"
                      size="sm"
                      bg="#10B981"
                      color="white"
                      fontWeight="700"
                      _hover={{ bg: "#059669" }}
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                    >
                      <HStack gap="1.5">
                        <UploadIcon size={14} color="white" />
                        <Text>{uploading ? "Uploading..." : "Upload Soft Copy Document"}</Text>
                      </HStack>
                    </Button>

                    {formData.programDocumentUrl && (
                      <HStack gap="2" bg="white" px="3" py="1.5" borderRadius="md" border="1px solid #A7F3D0">
                        <FileTextIcon size={14} color="#059669" />
                        <Text fontSize="xs" color="#065F46" fontWeight="600" lineClamp={1} maxW="200px">
                          {formData.programDocumentName || "Uploaded Document"}
                        </Text>
                        <Button
                          type="button"
                          size="xs"
                          variant="ghost"
                          color="red.500"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              programDocumentUrl: "",
                              programDocumentName: "",
                            })
                          }
                        >
                          ✕ Remove
                        </Button>
                      </HStack>
                    )}
                  </HStack>

                  {/* Direct Document URL field as fallback */}
                  <Box mt="3">
                    <Text fontSize="11px" color="gray.600" mb="1">
                      Or enter custom document URL:
                    </Text>
                    <Input
                      value={formData.programDocumentUrl}
                      onChange={(e) => setFormData({ ...formData, programDocumentUrl: e.target.value })}
                      placeholder="e.g. /uploads/program_schedule.pdf or external Google Drive link"
                      fontSize="xs"
                      bg="white"
                    />
                  </Box>
                </Box>

                <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4">
                  {/* Registration CTA Button Text & URL */}
                  <Box>
                    <Text fontSize="xs" fontWeight="700" color="gray.700" mb="1">
                      Primary CTA Button Text
                    </Text>
                    <Input
                      value={formData.registrationBtnText}
                      onChange={(e) => setFormData({ ...formData, registrationBtnText: e.target.value })}
                      placeholder="e.g. Register Free Now"
                      fontSize="sm"
                      bg="gray.50"
                    />
                  </Box>

                  <Box>
                    <Text fontSize="xs" fontWeight="700" color="gray.700" mb="1">
                      Registration Link / Page URL
                    </Text>
                    <Input
                      value={formData.registrationUrl}
                      onChange={(e) => setFormData({ ...formData, registrationUrl: e.target.value })}
                      placeholder="e.g. /programs or https://eventbrite.com/..."
                      fontSize="sm"
                      bg="gray.50"
                    />
                  </Box>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4">
                  {/* Agenda CTA Button Text */}
                  <Box>
                    <Text fontSize="xs" fontWeight="700" color="gray.700" mb="1">
                      Secondary (Agenda) Button Text
                    </Text>
                    <Input
                      value={formData.agendaBtnText}
                      onChange={(e) => setFormData({ ...formData, agendaBtnText: e.target.value })}
                      placeholder="e.g. Download Program Soft Copy"
                      fontSize="sm"
                      bg="gray.50"
                    />
                  </Box>

                  {/* Active Toggle */}
                  <Box display="flex" alignItems="center" pt="6">
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                        style={{ width: "18px", height: "18px", accentColor: "#10B981" }}
                      />
                      <Text fontSize="xs" fontWeight="700" color="#051B64">
                        Set as Active Upcoming Event on Homepage
                      </Text>
                    </label>
                  </Box>
                </SimpleGrid>

                {/* Description */}
                <Box>
                  <Text fontSize="xs" fontWeight="700" color="gray.700" mb="1">
                    Event Description (Optional)
                  </Text>
                  <Textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of the event..."
                    fontSize="sm"
                    bg="gray.50"
                  />
                </Box>

                {/* Submit & Cancel Buttons */}
                <HStack justify="flex-end" gap="3" pt="4">
                  <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    bg="#051B64"
                    color="white"
                    fontWeight="700"
                    _hover={{ bg: "#04144a" }}
                    disabled={saving}
                  >
                    {saving ? "Saving..." : editingId ? "Save Changes" : "Create Event"}
                  </Button>
                </HStack>
              </VStack>
            </form>
          </Box>
        </Box>
      )}
    </Box>
  )
}
