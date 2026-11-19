"use client"

import React, { useState, useEffect } from "react"
import {
  Box,
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
  Spinner,
} from "@chakra-ui/react"
import {
  BellIcon,
  PlusIcon,
  TrashIcon,
  RefreshCwIcon,
  CheckIcon,
  ExternalLinkIcon,
  MailIcon,
  UsersIcon,
  CalendarIcon,
  SparklesIcon,
} from "@/components/icons"

interface AdminNotificationItem {
  _id: string
  title: string
  description: string
  category: "Group Call" | "Announcement" | "Event" | "Assignment" | "Cohort"
  type: string
  href?: string
  actionLabel?: string
  emailBroadcastSent: boolean
  emailRecipientCount: number
  sentAt?: string
  createdAt: string
}

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<AdminNotificationItem[]>([])
  const [subscriberCount, setSubscriberCount] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Group Call" as "Group Call" | "Announcement" | "Event" | "Assignment" | "Cohort",
    href: "",
    actionLabel: "Join Call / View Details",
    broadcastEmail: true,
  })

  const fetchNotifications = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/notifications")
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setNotifications(data.notifications || [])
          setSubscriberCount(data.activeSubscribersCount || 0)
        }
      }
    } catch (err) {
      console.error("Failed to load notifications:", err)
      showMessage("error", "Failed to fetch notifications from MongoDB.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 6000)
  }

  const handleOpenCreate = () => {
    setFormData({
      title: "",
      description: "",
      category: "Group Call",
      href: "",
      actionLabel: "Join Call / View Details",
      broadcastEmail: true,
    })
    setIsFormOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.description.trim()) {
      showMessage("error", "Title and description are required.")
      return
    }

    setSaving(true)
    try {
      const res = await fetch("/api/admin/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        showMessage(
          "success",
          formData.broadcastEmail
            ? `Notification published to site & email broadcast queued for ${subscriberCount} subscribers!`
            : "Notification published to website successfully!"
        )
        setIsFormOpen(false)
        fetchNotifications()
      } else {
        showMessage("error", data.error || "Failed to create notification.")
      }
    } catch (err) {
      console.error("Error creating notification:", err)
      showMessage("error", "An unexpected error occurred.")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete notification "${title}"? It will be removed from the public website immediately.`)) {
      return
    }

    try {
      const res = await fetch(`/api/admin/notifications?id=${id}`, {
        method: "DELETE",
      })

      const data = await res.json()
      if (res.ok && data.success) {
        showMessage("success", "Notification removed from website.")
        setNotifications((prev) => prev.filter((n) => n._id !== id))
      } else {
        showMessage("error", data.error || "Failed to delete notification.")
      }
    } catch (err) {
      showMessage("error", "Failed to delete notification.")
    }
  }

  const getCategoryBadgeStyle = (cat: string) => {
    switch (cat) {
      case "Group Call":
        return { bg: "#EFF6FF", color: "#1D4ED8", border: "#BFDBFE" }
      case "Announcement":
        return { bg: "#F0FDF4", color: "#047857", border: "#A7F3D0" }
      case "Event":
        return { bg: "#FEF3C7", color: "#B45309", border: "#FDE68A" }
      case "Assignment":
        return { bg: "#F3E8FF", color: "#7E22CE", border: "#E9D5FF" }
      case "Cohort":
        return { bg: "#FFF1F2", color: "#BE123C", border: "#FECDD3" }
      default:
        return { bg: "#F1F5F9", color: "#475569", border: "#E2E8F0" }
    }
  }

  return (
    <Box maxW="1400px" mx="auto">
      {/* Toast Alert Message */}
      {message && (
        <Box
          position="fixed"
          top="80px"
          right="24px"
          zIndex={9999}
          bg={message.type === "success" ? "#047857" : "#DC2626"}
          color="white"
          px="5"
          py="3"
          borderRadius="xl"
          boxShadow="0 10px 25px rgba(0,0,0,0.2)"
          fontSize="sm"
          fontWeight="700"
          display="flex"
          alignItems="center"
          gap="2"
        >
          {message.type === "success" ? <CheckIcon size={16} /> : "⚠️"}
          <Text>{message.text}</Text>
        </Box>
      )}

      {/* Header & Main Stats Bar */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "flex-start", md: "center" }}
        gap="4"
        mb="6"
      >
        <Box>
          <HStack gap="2.5" align="center">
            <Box
              w="36px"
              h="36px"
              borderRadius="lg"
              bg="#051B64"
              color="#2DD4BF"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <BellIcon size={20} />
            </Box>
            <Box>
              <Heading fontSize={{ base: "xl", sm: "2xl" }} fontWeight="900" color="#051B64">
                Notifications & Broadcasts
              </Heading>
              <Text fontSize="xs" color="gray.500">
                Publish on-site notifications and email blasts to newsletter subscribers
              </Text>
            </Box>
          </HStack>
        </Box>

        <HStack gap="3" wrap="wrap">
          <Button
            size="sm"
            variant="outline"
            onClick={fetchNotifications}
            disabled={loading}
            fontSize="xs"
            fontWeight="700"
            color="#051B64"
            borderColor="#CBD5E1"
            h="38px"
            px="4"
            borderRadius="lg"
            _hover={{ bg: "#F8FAFC" }}
          >
            <HStack gap="1.5">
              <RefreshCwIcon size={14} />
              <Text>{loading ? "Syncing..." : "Refresh"}</Text>
            </HStack>
          </Button>

          <Button
            size="sm"
            bg="#051B64"
            color="white"
            onClick={handleOpenCreate}
            fontSize="xs"
            fontWeight="700"
            h="38px"
            px="5"
            borderRadius="lg"
            _hover={{ bg: "#030F38" }}
            boxShadow="0 4px 14px rgba(5, 27, 100, 0.25)"
          >
            <HStack gap="1.5">
              <PlusIcon size={14} />
              <Text>Send New Broadcast</Text>
            </HStack>
          </Button>
        </HStack>
      </Flex>

      {/* Overview Metric Cards */}
      <SimpleGrid columns={{ base: 1, sm: 3 }} gap="4" mb="8">
        <Box bg="white" p="5" borderRadius="xl" border="1px solid #E2E8F0" boxShadow="sm">
          <HStack justify="space-between" align="flex-start">
            <Box>
              <Text fontSize="11px" fontWeight="700" color="gray.500" textTransform="uppercase" letterSpacing="0.05em">
                Active Subscribers
              </Text>
              <Heading fontSize="2xl" fontWeight="900" color="#051B64" mt="1">
                {subscriberCount}
              </Heading>
              <Text fontSize="xs" color="#10B981" fontWeight="600" mt="1">
                Will receive email broadcasts
              </Text>
            </Box>
            <Box p="2.5" borderRadius="lg" bg="#ECFDF5" color="#10B981">
              <UsersIcon size={20} />
            </Box>
          </HStack>
        </Box>

        <Box bg="white" p="5" borderRadius="xl" border="1px solid #E2E8F0" boxShadow="sm">
          <HStack justify="space-between" align="flex-start">
            <Box>
              <Text fontSize="11px" fontWeight="700" color="gray.500" textTransform="uppercase" letterSpacing="0.05em">
                Total Published
              </Text>
              <Heading fontSize="2xl" fontWeight="900" color="#051B64" mt="1">
                {notifications.length}
              </Heading>
              <Text fontSize="xs" color="gray.500" fontWeight="600" mt="1">
                Active on public site
              </Text>
            </Box>
            <Box p="2.5" borderRadius="lg" bg="#EFF6FF" color="#1D4ED8">
              <BellIcon size={20} />
            </Box>
          </HStack>
        </Box>

        <Box bg="white" p="5" borderRadius="xl" border="1px solid #E2E8F0" boxShadow="sm">
          <HStack justify="space-between" align="flex-start">
            <Box>
              <Text fontSize="11px" fontWeight="700" color="gray.500" textTransform="uppercase" letterSpacing="0.05em">
                Email Blasts Sent
              </Text>
              <Heading fontSize="2xl" fontWeight="900" color="#051B64" mt="1">
                {notifications.filter((n) => n.emailBroadcastSent).length}
              </Heading>
              <Text fontSize="xs" color="#149191" fontWeight="600" mt="1">
                Delivered to community
              </Text>
            </Box>
            <Box p="2.5" borderRadius="lg" bg="#F0FDFA" color="#149191">
              <MailIcon size={20} />
            </Box>
          </HStack>
        </Box>
      </SimpleGrid>

      {/* Broadcasts List Table / Cards */}
      <Box bg="white" borderRadius="2xl" border="1px solid #E2E8F0" boxShadow="sm" overflow="hidden">
        <Box p="5" borderBottom="1px solid #E2E8F0">
          <Flex justify="space-between" align="center">
            <Heading fontSize="md" fontWeight="800" color="#051B64">
              Published Broadcasts & Notifications
            </Heading>
            <Badge bg="#F8FAFC" color="#64748B" px="2.5" py="1" borderRadius="md" border="1px solid #E2E8F0" fontSize="xs">
              {notifications.length} Records
            </Badge>
          </Flex>
        </Box>

        {loading ? (
          <Flex justify="center" align="center" py="16">
            <Spinner size="lg" color="#051B64" />
          </Flex>
        ) : notifications.length === 0 ? (
          <Box textAlign="center" py="16" px="4">
            <Box
              w="54px"
              h="54px"
              borderRadius="full"
              bg="#F1F5F9"
              color="#94A3B8"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mx="auto"
              mb="3"
            >
              <BellIcon size={26} />
            </Box>
            <Heading fontSize="md" color="#051B64" mb="1">
              No notifications published yet
            </Heading>
            <Text fontSize="xs" color="gray.500" maxW="400px" mx="auto" mb="4">
              Click &quot;Send New Broadcast&quot; above to publish an update for upcoming group calls, cohort briefings, or general announcements.
            </Text>
            <Button size="sm" bg="#051B64" color="white" onClick={handleOpenCreate} px="5">
              Create First Broadcast
            </Button>
          </Box>
        ) : (
          <VStack gap="0" align="stretch">
            {notifications.map((notif, idx) => {
              const badgeStyle = getCategoryBadgeStyle(notif.category)
              return (
                <Box
                  key={notif._id}
                  p={{ base: "4", sm: "5" }}
                  borderBottom={idx !== notifications.length - 1 ? "1px solid #F1F5F9" : "none"}
                  _hover={{ bg: "#F8FAFC" }}
                  transition="all 0.15s ease"
                >
                  <Flex
                    direction={{ base: "column", md: "row" }}
                    justify="space-between"
                    align={{ base: "flex-start", md: "center" }}
                    gap="3"
                  >
                    <Box flex="1">
                      <HStack gap="2.5" mb="1.5" wrap="wrap">
                        <Badge
                          bg={badgeStyle.bg}
                          color={badgeStyle.color}
                          border={`1px solid ${badgeStyle.border}`}
                          fontSize="11px"
                          fontWeight="800"
                          px="2"
                          py="0.5"
                          borderRadius="md"
                        >
                          {notif.category}
                        </Badge>

                        {notif.emailBroadcastSent ? (
                          <Badge bg="#ECFDF5" color="#047857" border="1px solid #A7F3D0" fontSize="10.5px" px="2" py="0.5">
                            ✉️ Emailed to {notif.emailRecipientCount} subscribers
                          </Badge>
                        ) : (
                          <Badge bg="#F1F5F9" color="#64748B" fontSize="10.5px" px="2" py="0.5">
                            🌐 Site Only
                          </Badge>
                        )}

                        <Text fontSize="11px" color="gray.400">
                          {new Date(notif.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Text>
                      </HStack>

                      <Heading fontSize="sm" fontWeight="800" color="#051B64" mb="1">
                        {notif.title}
                      </Heading>

                      <Text fontSize="xs" color="gray.600" lineHeight="1.6" maxW="850px">
                        {notif.description}
                      </Text>

                      {notif.href && (
                        <HStack gap="1" mt="2">
                          <ExternalLinkIcon size={12} color="#149191" />
                          <a
                            href={notif.href}
                            target="_blank"
                            rel="noreferrer"
                            style={{ fontSize: "11px", color: "#149191", fontWeight: "700" }}
                          >
                            Link: {notif.href}
                          </a>
                        </HStack>
                      )}
                    </Box>

                    {/* Actions */}
                    <HStack gap="2" alignSelf={{ base: "flex-end", md: "center" }}>
                      <Button
                        size="xs"
                        variant="ghost"
                        color="#DC2626"
                        h="32px"
                        px="3"
                        _hover={{ bg: "#FEE2E2" }}
                        onClick={() => handleDelete(notif._id, notif.title)}
                      >
                        <HStack gap="1.5">
                          <TrashIcon size={13} />
                          <Text>Delete</Text>
                        </HStack>
                      </Button>
                    </HStack>
                  </Flex>
                </Box>
              )
            })}
          </VStack>
        )}
      </Box>

      {/* Broadcast Creation Modal */}
      {isFormOpen && (
        <Box
          position="fixed"
          inset="0"
          w="100vw"
          h="100vh"
          bg="rgba(5, 27, 100, 0.65)"
          backdropFilter="blur(6px)"
          zIndex={9999}
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={{ base: "3", sm: "4", md: "6" }}
        >
          <Box
            bg="white"
            borderRadius="2xl"
            maxW="650px"
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
                  Send Community Broadcast
                </Heading>
                <Text fontSize="xs" color="gray.500">
                  Publish to on-site notifications and email all subscribers
                </Text>
              </Box>
              <Button size="sm" variant="ghost" onClick={() => setIsFormOpen(false)}>
                ✕ Close
              </Button>
            </Flex>

            <form onSubmit={handleSubmit}>
              <VStack gap="4" align="stretch">
                {/* Category Selection */}
                <Box>
                  <Text fontSize="xs" fontWeight="700" color="gray.700" mb="1">
                    Notification Category *
                  </Text>
                  <select
                    value={formData.category}
                    onChange={(e: any) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as any,
                        actionLabel:
                          e.target.value === "Group Call"
                            ? "Join Google Meet Call"
                            : e.target.value === "Event"
                            ? "View Event Details"
                            : "View Details",
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: "8px",
                      border: "1px solid #CBD5E1",
                      fontSize: "13.5px",
                      backgroundColor: "#F8FAFC",
                      outline: "none",
                      color: "#051B64",
                      fontWeight: "600",
                    }}
                  >
                    <option value="Group Call">Group Call (e.g. Upcoming Mentorship Call)</option>
                    <option value="Announcement">Announcement (General Community Update)</option>
                    <option value="Event">Event (Conference / Summit Notice)</option>
                    <option value="Cohort">Cohort Briefing (Cohort Schedule / Notice)</option>
                    <option value="Assignment">Assignment Deadline Notice</option>
                  </select>
                </Box>

                {/* Title */}
                <Box>
                  <Text fontSize="xs" fontWeight="700" color="gray.700" mb="1">
                    Title *
                  </Text>
                  <Input
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Upcoming Cohort Group Call: Mentorship & Strategy Session"
                    fontSize="sm"
                    bg="gray.50"
                    pl="3"
                  />
                </Box>

                {/* Description */}
                <Box>
                  <Text fontSize="xs" fontWeight="700" color="gray.700" mb="1">
                    Message / Details *
                  </Text>
                  <Textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Provide full details: date, time, topics, and expectations for the group call or announcement..."
                    fontSize="sm"
                    bg="gray.50"
                    pl="3"
                  />
                </Box>

                {/* Link URL (Optional) */}
                <Box>
                  <Text fontSize="xs" fontWeight="700" color="gray.700" mb="1">
                    Action Link / Meeting URL (Optional)
                  </Text>
                  <Input
                    value={formData.href}
                    onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                    placeholder="e.g. https://meet.google.com/xyz-abc or /programs"
                    fontSize="sm"
                    bg="gray.50"
                    pl="3"
                  />
                  <Text fontSize="10.5px" color="gray.500" mt="1">
                    Recipients and website visitors can click this to join your Google Meet or open the page.
                  </Text>
                </Box>

                {/* Action Label */}
                <Box>
                  <Text fontSize="xs" fontWeight="700" color="gray.700" mb="1">
                    Button Label
                  </Text>
                  <Input
                    value={formData.actionLabel}
                    onChange={(e) => setFormData({ ...formData, actionLabel: e.target.value })}
                    placeholder="e.g. Join Google Meet Call"
                    fontSize="sm"
                    bg="gray.50"
                    pl="3"
                  />
                </Box>

                {/* Email Broadcast Checkbox */}
                <Box
                  p="4"
                  bg="#EFF6FF"
                  borderRadius="xl"
                  border="1.5px solid #BFDBFE"
                >
                  <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={formData.broadcastEmail}
                      onChange={(e) => setFormData({ ...formData, broadcastEmail: e.target.checked })}
                      style={{ width: "18px", height: "18px", accentColor: "#051B64", marginTop: "2px" }}
                    />
                    <Box>
                      <Text fontSize="xs" fontWeight="800" color="#1E40AF">
                        Send email blast to all {subscriberCount} newsletter subscribers
                      </Text>
                      <Text fontSize="11px" color="#3B82F6" mt="0.5">
                        Active subscribers in your MongoDB database will receive this message as a branded email notification.
                      </Text>
                    </Box>
                  </label>
                </Box>

                {/* Actions */}
                <HStack justify="flex-end" gap="3" pt="4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsFormOpen(false)}
                    px="5"
                    h="40px"
                    fontWeight="600"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    bg="#051B64"
                    color="white"
                    fontWeight="700"
                    _hover={{ bg: "#04144a" }}
                    disabled={saving}
                    px="6"
                    h="40px"
                  >
                    {saving ? "Publishing & Sending..." : "Publish Broadcast"}
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

