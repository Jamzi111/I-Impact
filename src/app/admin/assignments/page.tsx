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
  Input,
  Textarea,
} from "@chakra-ui/react"
import Link from "next/link"
import {
  GraduationCapIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  CalendarIcon,
  ClockIcon,
  CheckIcon,
  ExternalLinkIcon,
  ArrowRightIcon,
} from "@/components/icons"
import { AssignmentItem } from "@/types/assignment"

const TRACK_OPTIONS = [
  "Leadership & Civic Action",
  "STEM Innovation Lab",
  "Mentorship Cohort 2026",
  "Career Foundations",
  "Creative & Media Arts",
  "Financial Literacy & Enterprise",
]

export default function AdminAssignmentsPage() {
  const [assignments, setAssignments] = useState<AssignmentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Form modal state
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    track: TRACK_OPTIONS[0],
    description: "",
    instructions: "",
    dueDate: "",
    deadlineTime: "11:59 PM WAT",
    points: 100,
    submissionUrl: "/assignments",
    resourceLink: "",
    status: "active" as "active" | "completed" | "archived",
  })

  const fetchAssignments = async () => {
    setLoading(true)
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
      showMessage("error", "Failed to fetch assignments from server.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAssignments()
  }, [])

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 5000)
  }

  const handleOpenCreate = () => {
    setEditingId(null)
    setFormData({
      title: "",
      track: TRACK_OPTIONS[0],
      description: "",
      instructions: "",
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      deadlineTime: "11:59 PM WAT",
      points: 100,
      submissionUrl: "/assignments",
      resourceLink: "",
      status: "active",
    })
    setIsFormOpen(true)
  }

  const handleOpenEdit = (item: AssignmentItem) => {
    setEditingId(item.id)
    setFormData({
      title: item.title,
      track: item.track,
      description: item.description || "",
      instructions: item.instructions || "",
      dueDate: item.dueDate || "",
      deadlineTime: item.deadlineTime || "11:59 PM WAT",
      points: item.points || 100,
      submissionUrl: item.submissionUrl || "/assignments",
      resourceLink: item.resourceLink || "",
      status: item.status || "active",
    })
    setIsFormOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.track || !formData.dueDate) {
      showMessage("error", "Please fill in all required fields (Title, Track, Due Date).")
      return
    }

    setSaving(true)
    try {
      if (editingId) {
        // Update
        const res = await fetch(`/api/assignments/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
        const data = await res.json()
        if (data.success) {
          showMessage("success", "Assignment updated & notifications updated successfully!")
          setIsFormOpen(false)
          fetchAssignments()
        } else {
          showMessage("error", data.error || "Failed to update assignment.")
        }
      } else {
        // Create
        const res = await fetch("/api/assignments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
        const data = await res.json()
        if (data.success) {
          showMessage(
            "success",
            "Assignment created! Notification has been broadcasted to all students."
          )
          setIsFormOpen(false)
          fetchAssignments()
        } else {
          showMessage("error", data.error || "Failed to create assignment.")
        }
      }
    } catch (err) {
      console.error("Save error:", err)
      showMessage("error", "Server connection error.")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this assignment?")) return
    try {
      const res = await fetch(`/api/assignments/${id}`, { method: "DELETE" })
      const data = await res.json()
      if (data.success) {
        showMessage("success", "Assignment deleted.")
        fetchAssignments()
      } else {
        showMessage("error", data.error || "Failed to delete assignment.")
      }
    } catch {
      showMessage("error", "Failed to delete assignment.")
    }
  }

  return (
    <Box minH="100vh" bg="#F1F5F9" pb="24">
      {/* Admin Top Header */}
      <Box bg="#051B64" color="white" py="4" borderBottom="1px solid rgba(255,255,255,0.1)">
        <Container maxW="1280px" px={{ base: "4", md: "8" }}>
          <Flex justify="space-between" align="center" flexWrap="wrap" gap="3">
            <HStack gap="3">
              <Link href="/">
                <Text fontSize="lg" fontWeight="900" color="#149191" cursor="pointer">
                  I-IMPACT
                </Text>
              </Link>
              <Text color="gray.400" fontSize="sm">
                /
              </Text>
              <Text fontSize="sm" fontWeight="bold" color="white">
                Admin Portal
              </Text>
            </HStack>

            {/* Admin Nav Tabs */}
            <HStack gap="2">
              <Link href="/admin/events">
                <Button
                  size="xs"
                  bg="rgba(255,255,255,0.1)"
                  color="white"
                  _hover={{ bg: "rgba(255,255,255,0.2)" }}
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
                  bg="#149191"
                  color="white"
                  _hover={{ bg: "#0d6d6d" }}
                  borderRadius="lg"
                  fontSize="xs"
                >
                  <HStack gap="1.5">
                    <GraduationCapIcon size={12} />
                    <Text>Assignments</Text>
                  </HStack>
                </Button>
              </Link>

              <Link href="/assignments">
                <Button
                  size="xs"
                  bg="transparent"
                  color="gray.300"
                  _hover={{ color: "white" }}
                  borderRadius="lg"
                  fontSize="xs"
                >
                  <HStack gap="1">
                    <Text>View Public Portal</Text>
                    <ExternalLinkIcon size={10} />
                  </HStack>
                </Button>
              </Link>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Main Admin Content */}
      <Container maxW="1280px" px={{ base: "4", md: "8" }} pt="8">
        {/* Banner */}
        <Flex
          justify="space-between"
          align={{ base: "flex-start", sm: "center" }}
          direction={{ base: "column", sm: "row" }}
          gap="4"
          mb="8"
          bg="white"
          p={{ base: "6", md: "8" }}
          borderRadius="2xl"
          boxShadow="0 4px 20px rgba(5, 27, 100, 0.05)"
        >
          <Box>
            <HStack gap="2" mb="1">
              <Badge bg="rgba(20, 145, 145, 0.15)" color="#149191" px="2.5" py="1" borderRadius="md" fontWeight="bold" fontSize="xs">
                REAL-TIME NOTIFICATION DISPATCH
              </Badge>
              <Badge bg="gray.100" color="gray.600" px="2" py="1" borderRadius="md" fontSize="xs">
                {assignments.length} Total Assignments
              </Badge>
            </HStack>
            <Heading as="h1" fontSize={{ base: "xl", sm: "2xl", md: "3xl" }} color="#051B64" fontWeight="800">
              Manage Cohort Assignments & Tasks
            </Heading>
            <Text fontSize="sm" color="gray.600" mt="1">
              Whenever you create or edit an assignment here, a notification is immediately pushed to all users.
            </Text>
          </Box>

          <Button
            size="md"
            bg="linear-gradient(135deg, #149191 0%, #0d6d6d 100%)"
            color="white"
            _hover={{ transform: "translateY(-1px)", boxShadow: "0 8px 20px rgba(20, 145, 145, 0.3)" }}
            borderRadius="xl"
            fontWeight="bold"
            fontSize="sm"
            onClick={handleOpenCreate}
          >
            <HStack gap="2">
              <PlusIcon size={16} />
              <Text>Add New Assignment</Text>
            </HStack>
          </Button>
        </Flex>

        {/* Message Banner */}
        {message && (
          <Box
            p="4"
            mb="6"
            borderRadius="xl"
            bg={message.type === "success" ? "green.50" : "red.50"}
            border="1px solid"
            borderColor={message.type === "success" ? "green.200" : "red.200"}
            color={message.type === "success" ? "green.800" : "red.800"}
            fontSize="sm"
            fontWeight="semibold"
          >
            {message.text}
          </Box>
        )}

        {/* Form Modal / Drawer */}
        {isFormOpen && (
          <Box
            bg="white"
            borderRadius="2xl"
            p={{ base: "6", md: "8" }}
            mb="8"
            border="2px solid"
            borderColor="#149191"
            boxShadow="0 20px 40px -10px rgba(20, 145, 145, 0.15)"
          >
            <Flex justify="space-between" align="center" mb="6" pb="4" borderBottom="1px solid" borderColor="gray.100">
              <Heading as="h2" fontSize="xl" color="#051B64" fontWeight="800">
                {editingId ? "Edit Assignment" : "Create New Cohort Assignment"}
              </Heading>
              <Button size="xs" variant="ghost" onClick={() => setIsFormOpen(false)}>
                Cancel
              </Button>
            </Flex>

            <form onSubmit={handleSubmit}>
              <VStack align="stretch" gap="5">
                <SimpleGrid columns={{ base: 1, md: 2 }} gap="5">
                  <Box>
                    <Text fontSize="xs" fontWeight="bold" color="#051B64" mb="1.5">
                      Assignment Title *
                    </Text>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Module 2: Community Impact Pitch Deck"
                      size="sm"
                      borderRadius="lg"
                      bg="gray.50"
                      required
                    />
                  </Box>

                  <Box>
                    <Text fontSize="xs" fontWeight="bold" color="#051B64" mb="1.5">
                      Track / Category *
                    </Text>
                    <select
                      value={formData.track}
                      onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                      style={{
                        width: "100%",
                        height: "36px",
                        padding: "0 12px",
                        borderRadius: "8px",
                        backgroundColor: "#F8FAFC",
                        border: "1px solid #E2E8F0",
                        fontSize: "14px",
                        color: "#1E293B",
                        outline: "none",
                      }}
                    >
                      {TRACK_OPTIONS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </Box>
                </SimpleGrid>

                <Box>
                  <Text fontSize="xs" fontWeight="bold" color="#051B64" mb="1.5">
                    Short Description
                  </Text>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Briefly explain the goal and scope of this assignment..."
                    rows={2}
                    size="sm"
                    borderRadius="lg"
                    bg="gray.50"
                  />
                </Box>

                <Box>
                  <Text fontSize="xs" fontWeight="bold" color="#051B64" mb="1.5">
                    Detailed Guidelines & Instructions
                  </Text>
                  <Textarea
                    value={formData.instructions}
                    onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                    placeholder="Step-by-step submission instructions, formatting requirements, file types..."
                    rows={3}
                    size="sm"
                    borderRadius="lg"
                    bg="gray.50"
                  />
                </Box>

                <SimpleGrid columns={{ base: 1, sm: 3 }} gap="4">
                  <Box>
                    <Text fontSize="xs" fontWeight="bold" color="#051B64" mb="1.5">
                      Due Date *
                    </Text>
                    <Input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      size="sm"
                      borderRadius="lg"
                      bg="gray.50"
                      required
                    />
                  </Box>

                  <Box>
                    <Text fontSize="xs" fontWeight="bold" color="#051B64" mb="1.5">
                      Deadline Time
                    </Text>
                    <Input
                      value={formData.deadlineTime}
                      onChange={(e) => setFormData({ ...formData, deadlineTime: e.target.value })}
                      placeholder="11:59 PM WAT"
                      size="sm"
                      borderRadius="lg"
                      bg="gray.50"
                    />
                  </Box>

                  <Box>
                    <Text fontSize="xs" fontWeight="bold" color="#051B64" mb="1.5">
                      Points / Weight
                    </Text>
                    <Input
                      type="number"
                      value={formData.points}
                      onChange={(e) => setFormData({ ...formData, points: Number(e.target.value) || 0 })}
                      placeholder="100"
                      size="sm"
                      borderRadius="lg"
                      bg="gray.50"
                    />
                  </Box>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4">
                  <Box>
                    <Text fontSize="xs" fontWeight="bold" color="#051B64" mb="1.5">
                      Resource / Template Link (Optional)
                    </Text>
                    <Input
                      value={formData.resourceLink}
                      onChange={(e) => setFormData({ ...formData, resourceLink: e.target.value })}
                      placeholder="https://drive.google.com/..."
                      size="sm"
                      borderRadius="lg"
                      bg="gray.50"
                    />
                  </Box>

                  <Box>
                    <Text fontSize="xs" fontWeight="bold" color="#051B64" mb="1.5">
                      Submission Portal URL
                    </Text>
                    <Input
                      value={formData.submissionUrl}
                      onChange={(e) => setFormData({ ...formData, submissionUrl: e.target.value })}
                      placeholder="/assignments"
                      size="sm"
                      borderRadius="lg"
                      bg="gray.50"
                    />
                  </Box>
                </SimpleGrid>

                <Flex justify="flex-end" gap="3" pt="4" borderTop="1px solid" borderColor="gray.100">
                  <Button size="sm" variant="outline" onClick={() => setIsFormOpen(false)} borderRadius="xl">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    bg="#149191"
                    color="white"
                    _hover={{ bg: "#0d6d6d" }}
                    borderRadius="xl"
                    fontWeight="bold"
                    loading={saving}
                  >
                    <HStack gap="1.5">
                      <CheckIcon size={14} color="white" />
                      <Text>{editingId ? "Save Changes" : "Publish & Notify Students"}</Text>
                    </HStack>
                  </Button>
                </Flex>
              </VStack>
            </form>
          </Box>
        )}

        {/* Assignments List */}
        <VStack align="stretch" gap="4">
          {loading ? (
            <Box py="12" textAlign="center">
              <Text color="gray.500">Loading assignments...</Text>
            </Box>
          ) : assignments.length === 0 ? (
            <Box bg="white" p="12" borderRadius="2xl" textAlign="center">
              <Text color="gray.500" mb="4">
                No assignments created yet.
              </Text>
              <Button size="sm" bg="#149191" color="white" onClick={handleOpenCreate} borderRadius="xl">
                Create First Assignment
              </Button>
            </Box>
          ) : (
            assignments.map((item) => (
              <Box
                key={item.id}
                bg="white"
                p={{ base: "5", sm: "6" }}
                borderRadius="2xl"
                boxShadow="0 2px 10px rgba(5, 27, 100, 0.04)"
                border="1px solid"
                borderColor="gray.100"
              >
                <Flex
                  direction={{ base: "column", md: "row" }}
                  justify="space-between"
                  align={{ base: "flex-start", md: "center" }}
                  gap="4"
                >
                  <Box flex="1">
                    <HStack gap="2" mb="2">
                      <Badge bg="rgba(20, 145, 145, 0.12)" color="#149191" px="2.5" py="0.5" borderRadius="md" fontWeight="bold" fontSize="xs">
                        {item.track}
                      </Badge>
                      <Badge bg="rgba(5, 27, 100, 0.08)" color="#051B64" px="2" py="0.5" borderRadius="md" fontSize="xs" fontWeight="bold">
                        {item.points || 100} PTS
                      </Badge>
                      <Badge bg="green.50" color="green.700" px="2" py="0.5" borderRadius="md" fontSize="xs">
                        {item.status || "active"}
                      </Badge>
                    </HStack>

                    <Heading as="h3" fontSize="lg" color="#051B64" fontWeight="800" mb="1">
                      {item.title}
                    </Heading>

                    <Text fontSize="xs" color="gray.600" mb="2" maxW="750px">
                      {item.description}
                    </Text>

                    <HStack gap="3" fontSize="xs" color="gray.500">
                      <HStack gap="1">
                        <CalendarIcon size={12} color="#149191" />
                        <Text>Due: {item.dueDate} ({item.deadlineTime})</Text>
                      </HStack>
                    </HStack>
                  </Box>

                  <HStack gap="2">
                    <Button
                      size="sm"
                      variant="outline"
                      borderColor="gray.200"
                      color="gray.700"
                      _hover={{ bg: "gray.50" }}
                      borderRadius="xl"
                      fontSize="xs"
                      onClick={() => handleOpenEdit(item)}
                    >
                      <HStack gap="1.5">
                        <EditIcon size={13} />
                        <Text>Edit</Text>
                      </HStack>
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      borderColor="red.200"
                      color="red.600"
                      _hover={{ bg: "red.50" }}
                      borderRadius="xl"
                      fontSize="xs"
                      onClick={() => handleDelete(item.id)}
                    >
                      <HStack gap="1.5">
                        <TrashIcon size={13} />
                        <Text>Delete</Text>
                      </HStack>
                    </Button>
                  </HStack>
                </Flex>
              </Box>
            ))
          )}
        </VStack>
      </Container>
    </Box>
  )
}
