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
  SimpleGrid,
} from "@chakra-ui/react"
import {
  DatabaseIcon,
  ShieldIcon,
  CheckIcon,
  DownloadIcon,
  ClockIcon,
  UserCheckIcon,
  UsersIcon,
  PlusIcon,
  CloseIcon,
  MailIcon,
  ShieldCheckIcon,
} from "@/components/icons"

interface SystemSettingsData {
  database: {
    status: "connected" | "disconnected"
    databaseName: string
    pingMs: number
    host: string
    collections: {
      applications: number
      subscribers: number
      contact_messages: number
    }
  }
  system: {
    nodeVersion: string
    environment: string
    uptimeSeconds: number
    timestamp: string
  }
}

interface AdminUser {
  _id: string
  name: string
  email: string
  role: "superadmin" | "admin" | "reviewer" | "content_manager"
  isActive: boolean
  lastLogin?: string
  createdAt?: string
}

interface AdminInviteItem {
  _id: string
  name: string
  email: string
  role: "superadmin" | "admin" | "reviewer" | "content_manager"
  status: "pending" | "accepted" | "revoked" | "expired"
  invitedBy: string
  expiresAt: string
  createdAt: string
  token: string
}

const ROLE_INFO: Record<string, { label: string; bg: string; color: string; border: string; desc: string }> = {
  superadmin: {
    label: "Super Admin",
    bg: "#EFF6FF",
    color: "#1D4ED8",
    border: "#BFDBFE",
    desc: "Complete control over administrators, settings, and full system.",
  },
  admin: {
    label: "Administrator",
    bg: "#ECFDF5",
    color: "#059669",
    border: "#A7F3D0",
    desc: "Manage applications, volunteers, cohorts, events, and notifications.",
  },
  reviewer: {
    label: "Reviewer",
    bg: "#FEF3C7",
    color: "#D97706",
    border: "#FDE68A",
    desc: "View and evaluate candidate applications and submissions.",
  },
  content_manager: {
    label: "Content Manager",
    bg: "#F5F3FF",
    color: "#7C3AED",
    border: "#DDD6FE",
    desc: "Manage live event banners, broadcasts, and media news content.",
  },
}

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<"team" | "system">("team")

  // System Health state
  const [systemData, setSystemData] = useState<SystemSettingsData | null>(null)
  const [loadingSystem, setLoadingSystem] = useState(false)
  const [systemNotice, setSystemNotice] = useState<string | null>(null)
  const [exportingType, setExportingType] = useState<string | null>(null)

  // Team & Invites state
  const [admins, setAdmins] = useState<AdminUser[]>([])
  const [invites, setInvites] = useState<AdminInviteItem[]>([])
  const [currentRole, setCurrentRole] = useState<string>("admin")
  const [currentAdminId, setCurrentAdminId] = useState<string>("")
  const [loadingTeam, setLoadingTeam] = useState(true)
  const [teamNotice, setTeamNotice] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Invite Modal state
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [inviteName, setInviteName] = useState("")
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState<"superadmin" | "admin" | "reviewer" | "content_manager">("admin")
  const [submittingInvite, setSubmittingInvite] = useState(false)

  // Action busy states
  const [actionBusyId, setActionBusyId] = useState<string | null>(null)

  // Fetch Team Data
  const fetchTeam = useCallback(async () => {
    try {
      setLoadingTeam(true)
      const res = await fetch("/api/admin/team", { cache: "no-store" })
      const json = await res.json()
      if (json.success) {
        setAdmins(json.admins || [])
        setInvites(json.invites || [])
        setCurrentRole(json.currentRole || "admin")
        setCurrentAdminId(json.currentAdminId || "")
      } else {
        setTeamNotice({ type: "error", text: json.error || "Failed to load administration team." })
      }
    } catch (err: any) {
      console.error("Team fetch error:", err)
      setTeamNotice({ type: "error", text: err.message || "Failed to connect to team endpoints." })
    } finally {
      setLoadingTeam(false)
    }
  }, [])

  // Fetch System Settings
  const fetchSystem = useCallback(async () => {
    try {
      setLoadingSystem(true)
      setSystemNotice(null)
      const res = await fetch("/api/admin/settings", { cache: "no-store" })
      const json = await res.json()
      if (json.success) {
        setSystemData(json)
      } else {
        setSystemNotice(json.error || "Failed to inspect database")
        if (json.database) setSystemData(json)
      }
    } catch (err: any) {
      console.error("Settings fetch error:", err)
      setSystemNotice(err.message || "Failed to connect to system endpoints.")
    } finally {
      setLoadingSystem(false)
    }
  }, [])

  useEffect(() => {
    fetchTeam()
    fetchSystem()
  }, [fetchTeam, fetchSystem])

  // Send Invitation
  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteName.trim() || !inviteEmail.trim()) return

    try {
      setSubmittingInvite(true)
      setTeamNotice(null)

      const res = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: inviteName.trim(),
          email: inviteEmail.trim(),
          role: inviteRole,
        }),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to dispatch invitation.")
      }

      setTeamNotice({
        type: "success",
        text: `Invitation link dispatched to ${inviteEmail}. Valid for 7 days.`,
      })
      setIsInviteModalOpen(false)
      setInviteName("")
      setInviteEmail("")
      setInviteRole("admin")
      fetchTeam()
    } catch (err: any) {
      setTeamNotice({ type: "error", text: err.message || "Could not send invitation." })
    } finally {
      setSubmittingInvite(false)
    }
  }

  // Resend Invite
  const handleResendInvite = async (inviteId: string) => {
    try {
      setActionBusyId(inviteId)
      setTeamNotice(null)
      const res = await fetch(`/api/admin/team/invite/${inviteId}`, { method: "POST" })
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to resend invitation.")
      }
      setTeamNotice({ type: "success", text: data.message || "Invitation resent." })
      fetchTeam()
    } catch (err: any) {
      setTeamNotice({ type: "error", text: err.message })
    } finally {
      setActionBusyId(null)
    }
  }

  // Revoke Invite
  const handleRevokeInvite = async (inviteId: string) => {
    if (!confirm("Are you sure you want to revoke this pending invitation?")) return

    try {
      setActionBusyId(inviteId)
      setTeamNotice(null)
      const res = await fetch(`/api/admin/team/invite/${inviteId}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to revoke invitation.")
      }
      setTeamNotice({ type: "success", text: "Invitation revoked successfully." })
      fetchTeam()
    } catch (err: any) {
      setTeamNotice({ type: "error", text: err.message })
    } finally {
      setActionBusyId(null)
    }
  }

  // Toggle Admin Active Status
  const handleToggleAdminStatus = async (admin: AdminUser) => {
    const nextStatus = !admin.isActive
    const promptText = nextStatus
      ? `Re-activate administrator account for ${admin.name}?`
      : `Suspend administrator account for ${admin.name}? They will lose portal access immediately.`

    if (!confirm(promptText)) return

    try {
      setActionBusyId(admin._id)
      setTeamNotice(null)
      const res = await fetch(`/api/admin/team/${admin._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: nextStatus }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update account.")
      }
      setTeamNotice({
        type: "success",
        text: `Account for ${admin.name} is now ${nextStatus ? "active" : "suspended"}.`,
      })
      fetchTeam()
    } catch (err: any) {
      setTeamNotice({ type: "error", text: err.message })
    } finally {
      setActionBusyId(null)
    }
  }

  // Change Admin Role
  const handleChangeRole = async (adminId: string, newRole: string) => {
    try {
      setActionBusyId(adminId)
      setTeamNotice(null)
      const res = await fetch(`/api/admin/team/${adminId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update role.")
      }
      setTeamNotice({ type: "success", text: "Administrator role updated." })
      fetchTeam()
    } catch (err: any) {
      setTeamNotice({ type: "error", text: err.message })
    } finally {
      setActionBusyId(null)
    }
  }

  // Delete Admin
  const handleDeleteAdmin = async (admin: AdminUser) => {
    if (!confirm(`Permanently remove administrator account for ${admin.name} (${admin.email})?`)) {
      return
    }

    try {
      setActionBusyId(admin._id)
      setTeamNotice(null)
      const res = await fetch(`/api/admin/team/${admin._id}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete account.")
      }
      setTeamNotice({ type: "success", text: `Administrator ${admin.email} removed.` })
      fetchTeam()
    } catch (err: any) {
      setTeamNotice({ type: "error", text: err.message })
    } finally {
      setActionBusyId(null)
    }
  }

  // Export handlers
  const handleExportData = async (type: "applications" | "subscribers" | "messages") => {
    try {
      setExportingType(type)
      if (type === "applications") {
        const res = await fetch("/api/admin/applications?limit=1000")
        const json = await res.json()
        const apps = json.applications || []
        const headers = ["Reference", "Name", "Email", "Phone", "Pathway", "City", "State", "Status", "Date"]
        const rows = apps.map((a: any) => [
          `"${a.applicationReference}"`,
          `"${a.applicantDetails?.fullName || ""}"`,
          `"${a.applicantDetails?.email || ""}"`,
          `"${a.applicantDetails?.phone || ""}"`,
          `"${a.pathwayTitle || a.pathway}"`,
          `"${a.applicantDetails?.city || ""}"`,
          `"${a.applicantDetails?.state || ""}"`,
          `"${a.status}"`,
          `"${new Date(a.submittedAt).toLocaleDateString()}"`,
        ])
        downloadCSV(`i-impact-applications-backup-${new Date().toISOString().slice(0, 10)}.csv`, headers, rows)
      } else if (type === "messages") {
        const res = await fetch("/api/admin/messages?limit=1000")
        const json = await res.json()
        const msgs = json.messages || []
        const headers = ["Date", "Name", "Email", "Phone", "Organization", "Category", "Message", "Status"]
        const rows = msgs.map((m: any) => [
          `"${new Date(m.submittedAt).toLocaleDateString()}"`,
          `"${m.fullName}"`,
          `"${m.email}"`,
          `"${m.phone || ""}"`,
          `"${m.organization || ""}"`,
          `"${m.categoryLabel || m.category}"`,
          `"${(m.message || "").replace(/"/g, '""')}"`,
          `"${m.status}"`,
        ])
        downloadCSV(`i-impact-messages-backup-${new Date().toISOString().slice(0, 10)}.csv`, headers, rows)
      }
    } catch (e) {
      console.error("Export error:", e)
    } finally {
      setExportingType(null)
    }
  }

  const downloadCSV = (filename: string, headers: string[], rows: string[][]) => {
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")
    const encoded = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encoded)
    link.setAttribute("download", filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    return `${h}h ${m}m`
  }

  const isSuperAdmin = currentRole === "superadmin"

  return (
    <Box>
      {/* 1. Page Header */}
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
              Settings & Administration
            </Heading>
            <Badge bg="#F1F5F9" color="#051B64" fontSize="12px" fontWeight="700" px="2.5" py="0.5" borderRadius="full">
              {activeTab === "team" ? `${admins.length} Administrators` : "Atlas Connected"}
            </Badge>
          </HStack>
          <Text fontSize="14px" color="#64748B" mt="1">
            Private invitation-based team access control, role permissions, and system diagnostics.
          </Text>
        </Box>

        {activeTab === "team" && isSuperAdmin && (
          <Button
            bg="#051B64"
            color="white"
            _hover={{ bg: "#0A2580" }}
            px="4"
            py="2"
            h="40px"
            borderRadius="8px"
            fontSize="13.5px"
            fontWeight="700"
            onClick={() => setIsInviteModalOpen(true)}
          >
            <HStack gap="2">
              <PlusIcon size={16} />
              <Text>Invite Administrator</Text>
            </HStack>
          </Button>
        )}
      </Flex>

      {/* 2. Top Navigation Tabs */}
      <Flex borderBottom="1px solid #E2E8F0" mb="6" gap="3">
        <Button
          variant="ghost"
          px="4"
          py="2.5"
          h="42px"
          borderRadius="0"
          borderBottom={activeTab === "team" ? "2px solid #051B64" : "2px solid transparent"}
          color={activeTab === "team" ? "#051B64" : "#64748B"}
          fontWeight={activeTab === "team" ? "800" : "600"}
          fontSize="14px"
          _hover={{ bg: "transparent", color: "#051B64" }}
          onClick={() => setActiveTab("team")}
        >
          <HStack gap="2">
            <UsersIcon size={16} />
            <Text>Admin Management</Text>
            <Badge
              bg={activeTab === "team" ? "#EFF6FF" : "#F1F5F9"}
              color={activeTab === "team" ? "#1D4ED8" : "#64748B"}
              fontSize="11px"
              borderRadius="full"
              px="2"
            >
              {admins.length}
            </Badge>
          </HStack>
        </Button>

        <Button
          variant="ghost"
          px="4"
          py="2.5"
          h="42px"
          borderRadius="0"
          borderBottom={activeTab === "system" ? "2px solid #051B64" : "2px solid transparent"}
          color={activeTab === "system" ? "#051B64" : "#64748B"}
          fontWeight={activeTab === "system" ? "800" : "600"}
          fontSize="14px"
          _hover={{ bg: "transparent", color: "#051B64" }}
          onClick={() => setActiveTab("system")}
        >
          <HStack gap="2">
            <DatabaseIcon size={16} />
            <Text>System Health & Backups</Text>
          </HStack>
        </Button>
      </Flex>

      {/* Global Notifications */}
      {teamNotice && (
        <Box
          bg={teamNotice.type === "success" ? "#ECFDF5" : "#FEF2F2"}
          border={`1px solid ${teamNotice.type === "success" ? "#A7F3D0" : "#FECACA"}`}
          p="3.5"
          borderRadius="10px"
          mb="6"
          color={teamNotice.type === "success" ? "#065F46" : "#991B1B"}
          fontSize="13.5px"
          fontWeight="600"
        >
          <HStack justify="space-between">
            <Text>{teamNotice.text}</Text>
            <Button
              size="xs"
              variant="ghost"
              p="1"
              h="auto"
              minW="auto"
              onClick={() => setTeamNotice(null)}
              color="inherit"
            >
              <CloseIcon size={14} />
            </Button>
          </HStack>
        </Box>
      )}

      {/* ================= TAB 1: TEAM & INVITATION MANAGEMENT ================= */}
      {activeTab === "team" && (
        <VStack gap="6" align="stretch">
          {/* Permission Info Callout */}
          <Box bg="#FFFFFF" p="5" borderRadius="14px" border="1px solid #E2E8F0">
            <Flex justify="space-between" align={{ base: "flex-start", sm: "center" }} wrap="wrap" gap="3">
              <HStack gap="3">
                <Box
                  w="38px"
                  h="38px"
                  borderRadius="10px"
                  bg="#EFF6FF"
                  color="#1D4ED8"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <ShieldCheckIcon size={20} color="#1D4ED8" />
                </Box>
                <Box>
                  <Text fontSize="14px" fontWeight="800" color="#0F172A">
                    Private Invitation Portal Protocol
                  </Text>
                  <Text fontSize="12.5px" color="#64748B">
                    Public registration is disabled. Administrator accounts can only be activated via verified invitation links.
                  </Text>
                </Box>
              </HStack>

              <Badge
                bg={isSuperAdmin ? "#EFF6FF" : "#F1F5F9"}
                color={isSuperAdmin ? "#1D4ED8" : "#475569"}
                border={`1px solid ${isSuperAdmin ? "#BFDBFE" : "#CBD5E1"}`}
                px="3"
                py="1"
                borderRadius="full"
                fontSize="12px"
                fontWeight="700"
              >
                Logged in as: {ROLE_INFO[currentRole]?.label || currentRole}
              </Badge>
            </Flex>
          </Box>

          {/* Active Administrators Roster */}
          <Box bg="white" borderRadius="16px" border="1px solid #E2E8F0" overflow="hidden">
            <Flex justify="space-between" align="center" p="5" borderBottom="1px solid #E2E8F0">
              <Box>
                <Heading as="h2" fontSize="16px" fontWeight="800" color="#0F172A">
                  Active Administrators ({admins.length})
                </Heading>
                <Text fontSize="12.5px" color="#64748B" mt="0.5">
                  Verified staff members with current management console permissions.
                </Text>
              </Box>

              <Button
                size="sm"
                variant="outline"
                borderColor="#CBD5E1"
                fontSize="12.5px"
                px="3"
                py="1.5"
                h="34px"
                borderRadius="md"
                onClick={fetchTeam}
                disabled={loadingTeam}
              >
                {loadingTeam ? "Refreshing..." : "Refresh Roster"}
              </Button>
            </Flex>

            {loadingTeam && admins.length === 0 ? (
              <Box p="10" textAlign="center">
                <Spinner size="md" color="#051B64" />
                <Text fontSize="13px" color="#64748B" mt="3">
                  Loading administrator accounts...
                </Text>
              </Box>
            ) : (
              <Box overflowX="auto">
                <Box as="table" w="full" fontSize="13.5px" textAlign="left" borderCollapse="collapse">
                  <Box as="thead" bg="#F8FAFC" borderBottom="1px solid #E2E8F0">
                    <Box as="tr">
                      <Box as="th" py="3.5" px="5" fontSize="11.5px" fontWeight="700" color="#475569" textTransform="uppercase">
                        Administrator
                      </Box>
                      <Box as="th" py="3.5" px="4" fontSize="11.5px" fontWeight="700" color="#475569" textTransform="uppercase">
                        Assigned Role
                      </Box>
                      <Box as="th" py="3.5" px="4" fontSize="11.5px" fontWeight="700" color="#475569" textTransform="uppercase">
                        Status
                      </Box>
                      <Box as="th" py="3.5" px="4" fontSize="11.5px" fontWeight="700" color="#475569" textTransform="uppercase">
                        Last Active
                      </Box>
                      {isSuperAdmin && (
                        <Box as="th" py="3.5" px="5" textAlign="right" fontSize="11.5px" fontWeight="700" color="#475569" textTransform="uppercase">
                          Actions
                        </Box>
                      )}
                    </Box>
                  </Box>

                  <Box as="tbody">
                    {admins.map((adm) => {
                      const isSelf = adm._id === currentAdminId
                      const roleConfig = ROLE_INFO[adm.role] || ROLE_INFO.admin
                      const isBusy = actionBusyId === adm._id

                      return (
                        <Box as="tr" key={adm._id} borderBottom="1px solid #F1F5F9" _hover={{ bg: "#FAFAFA" }}>
                          {/* Name & Email */}
                          <Box as="td" py="3.5" px="5">
                            <HStack gap="2.5">
                              <Box
                                w="34px"
                                h="34px"
                                borderRadius="full"
                                bg="#EFF6FF"
                                color="#1D4ED8"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                fontWeight="800"
                                fontSize="13px"
                              >
                                {adm.name.charAt(0).toUpperCase()}
                              </Box>
                              <Box>
                                <HStack gap="2">
                                  <Text fontWeight="700" color="#0F172A">
                                    {adm.name}
                                  </Text>
                                  {isSelf && (
                                    <Badge bg="#051B64" color="white" fontSize="10px" px="1.5" py="0.2" borderRadius="full">
                                      You
                                    </Badge>
                                  )}
                                </HStack>
                                <Text fontSize="12px" color="#64748B">
                                  {adm.email}
                                </Text>
                              </Box>
                            </HStack>
                          </Box>

                          {/* Role Selector or Badge */}
                          <Box as="td" py="3.5" px="4">
                            {isSuperAdmin && !isSelf ? (
                              <select
                                value={adm.role}
                                onChange={(e) => handleChangeRole(adm._id, e.target.value)}
                                disabled={isBusy}
                                style={{
                                  fontSize: "12.5px",
                                  fontWeight: "700",
                                  padding: "4px 8px",
                                  borderRadius: "6px",
                                  border: `1px solid ${roleConfig.border}`,
                                  backgroundColor: roleConfig.bg,
                                  color: roleConfig.color,
                                  cursor: "pointer",
                                  outline: "none",
                                }}
                              >
                                <option value="superadmin">Super Admin</option>
                                <option value="admin">Administrator</option>
                                <option value="reviewer">Reviewer</option>
                                <option value="content_manager">Content Manager</option>
                              </select>
                            ) : (
                              <Badge
                                bg={roleConfig.bg}
                                color={roleConfig.color}
                                border={`1px solid ${roleConfig.border}`}
                                px="2.5"
                                py="1"
                                borderRadius="md"
                                fontSize="12px"
                                fontWeight="700"
                              >
                                {roleConfig.label}
                              </Badge>
                            )}
                          </Box>

                          {/* Status */}
                          <Box as="td" py="3.5" px="4">
                            <Badge
                              bg={adm.isActive ? "#ECFDF5" : "#FEF2F2"}
                              color={adm.isActive ? "#059669" : "#DC2626"}
                              border={`1px solid ${adm.isActive ? "#A7F3D0" : "#FECACA"}`}
                              px="2"
                              py="0.5"
                              borderRadius="full"
                              fontSize="11.5px"
                              fontWeight="700"
                            >
                              {adm.isActive ? "Active" : "Suspended"}
                            </Badge>
                          </Box>

                          {/* Last Login */}
                          <Box as="td" py="3.5" px="4">
                            <Text fontSize="12px" color="#64748B">
                              {adm.lastLogin ? new Date(adm.lastLogin).toLocaleDateString() : "Never"}
                            </Text>
                          </Box>

                          {/* Actions */}
                          {isSuperAdmin && (
                            <Box as="td" py="3.5" px="5" textAlign="right">
                              {isSelf ? (
                                <Text fontSize="12px" color="#94A3B8" fontStyle="italic">
                                  Primary Session
                                </Text>
                              ) : (
                                <HStack justify="flex-end" gap="2">
                                  <Button
                                    size="xs"
                                    variant="outline"
                                    borderColor="#CBD5E1"
                                    color={adm.isActive ? "#DC2626" : "#059669"}
                                    _hover={{ bg: adm.isActive ? "#FEF2F2" : "#ECFDF5" }}
                                    px="2.5"
                                    py="1"
                                    h="28px"
                                    borderRadius="md"
                                    onClick={() => handleToggleAdminStatus(adm)}
                                    disabled={isBusy}
                                  >
                                    {adm.isActive ? "Suspend" : "Activate"}
                                  </Button>
                                  <Button
                                    size="xs"
                                    bg="#FEF2F2"
                                    color="#991B1B"
                                    border="1px solid #FECACA"
                                    _hover={{ bg: "#FEE2E2" }}
                                    px="2.5"
                                    py="1"
                                    h="28px"
                                    borderRadius="md"
                                    onClick={() => handleDeleteAdmin(adm)}
                                    disabled={isBusy}
                                  >
                                    Delete
                                  </Button>
                                </HStack>
                              )}
                            </Box>
                          )}
                        </Box>
                      )
                    })}
                  </Box>
                </Box>
              </Box>
            )}
          </Box>

          {/* Pending Invitations Table */}
          <Box bg="white" borderRadius="16px" border="1px solid #E2E8F0" overflow="hidden">
            <Flex justify="space-between" align="center" p="5" borderBottom="1px solid #E2E8F0">
              <Box>
                <Heading as="h2" fontSize="16px" fontWeight="800" color="#0F172A">
                  Pending Invitations ({invites.filter((i) => i.status === "pending").length})
                </Heading>
                <Text fontSize="12.5px" color="#64748B" mt="0.5">
                  Invitations sent to prospective administrators awaiting verification.
                </Text>
              </Box>
            </Flex>

            {invites.length === 0 ? (
              <Box p="8" textAlign="center" color="#64748B" fontSize="13px">
                No active administrator invitations. Click &quot;Invite Administrator&quot; above to add personnel.
              </Box>
            ) : (
              <Box overflowX="auto">
                <Box as="table" w="full" fontSize="13px" textAlign="left" borderCollapse="collapse">
                  <Box as="thead" bg="#F8FAFC" borderBottom="1px solid #E2E8F0">
                    <Box as="tr">
                      <Box as="th" py="3.5" px="5" fontSize="11.5px" fontWeight="700" color="#475569" textTransform="uppercase">
                        Invitee
                      </Box>
                      <Box as="th" py="3.5" px="4" fontSize="11.5px" fontWeight="700" color="#475569" textTransform="uppercase">
                        Role
                      </Box>
                      <Box as="th" py="3.5" px="4" fontSize="11.5px" fontWeight="700" color="#475569" textTransform="uppercase">
                        Invited By
                      </Box>
                      <Box as="th" py="3.5" px="4" fontSize="11.5px" fontWeight="700" color="#475569" textTransform="uppercase">
                        Expires In
                      </Box>
                      <Box as="th" py="3.5" px="4" fontSize="11.5px" fontWeight="700" color="#475569" textTransform="uppercase">
                        Status
                      </Box>
                      {isSuperAdmin && (
                        <Box as="th" py="3.5" px="5" textAlign="right" fontSize="11.5px" fontWeight="700" color="#475569" textTransform="uppercase">
                          Actions
                        </Box>
                      )}
                    </Box>
                  </Box>

                  <Box as="tbody">
                    {invites.map((inv) => {
                      const isExpired = new Date(inv.expiresAt) < new Date()
                      const isPending = inv.status === "pending" && !isExpired
                      const roleConfig = ROLE_INFO[inv.role] || ROLE_INFO.admin
                      const isBusy = actionBusyId === inv._id

                      return (
                        <Box as="tr" key={inv._id} borderBottom="1px solid #F1F5F9" _hover={{ bg: "#FAFAFA" }}>
                          <Box as="td" py="3.5" px="5">
                            <Text fontWeight="700" color="#0F172A">{inv.name}</Text>
                            <Text fontSize="12px" color="#64748B">{inv.email}</Text>
                          </Box>

                          <Box as="td" py="3.5" px="4">
                            <Badge
                              bg={roleConfig.bg}
                              color={roleConfig.color}
                              border={`1px solid ${roleConfig.border}`}
                              px="2"
                              py="0.5"
                              borderRadius="md"
                              fontSize="11.5px"
                              fontWeight="700"
                            >
                              {roleConfig.label}
                            </Badge>
                          </Box>

                          <Box as="td" py="3.5" px="4">
                            <Text color="#475569" fontSize="12.5px">{inv.invitedBy || "Super Admin"}</Text>
                          </Box>

                          <Box as="td" py="3.5" px="4">
                            <Text color="#64748B" fontSize="12px">
                              {new Date(inv.expiresAt).toLocaleDateString()}
                            </Text>
                          </Box>

                          <Box as="td" py="3.5" px="4">
                            {inv.status === "accepted" ? (
                              <Badge bg="#ECFDF5" color="#059669" border="1px solid #A7F3D0" px="2" py="0.5" borderRadius="full">
                                Accepted
                              </Badge>
                            ) : inv.status === "revoked" ? (
                              <Badge bg="#FEF2F2" color="#991B1B" border="1px solid #FECACA" px="2" py="0.5" borderRadius="full">
                                Revoked
                              </Badge>
                            ) : isExpired ? (
                              <Badge bg="#F1F5F9" color="#64748B" border="1px solid #CBD5E1" px="2" py="0.5" borderRadius="full">
                                Expired
                              </Badge>
                            ) : (
                              <Badge bg="#FEF3C7" color="#D97706" border="1px solid #FDE68A" px="2" py="0.5" borderRadius="full">
                                Pending Verification
                              </Badge>
                            )}
                          </Box>

                          {isSuperAdmin && (
                            <Box as="td" py="3.5" px="5" textAlign="right">
                              {isPending ? (
                                <HStack justify="flex-end" gap="2">
                                  <Button
                                    size="xs"
                                    bg="#051B64"
                                    color="white"
                                    _hover={{ bg: "#0A2580" }}
                                    px="2.5"
                                    py="1"
                                    h="28px"
                                    borderRadius="md"
                                    onClick={() => handleResendInvite(inv._id)}
                                    disabled={isBusy}
                                  >
                                    Resend
                                  </Button>
                                  <Button
                                    size="xs"
                                    variant="outline"
                                    borderColor="#CBD5E1"
                                    color="#991B1B"
                                    _hover={{ bg: "#FEF2F2" }}
                                    px="2.5"
                                    py="1"
                                    h="28px"
                                    borderRadius="md"
                                    onClick={() => handleRevokeInvite(inv._id)}
                                    disabled={isBusy}
                                  >
                                    Revoke
                                  </Button>
                                </HStack>
                              ) : (
                                <Button
                                  size="xs"
                                  variant="ghost"
                                  color="#94A3B8"
                                  _hover={{ color: "#EF4444" }}
                                  onClick={() => handleRevokeInvite(inv._id)}
                                  disabled={isBusy}
                                >
                                  Remove
                                </Button>
                              )}
                            </Box>
                          )}
                        </Box>
                      )
                    })}
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </VStack>
      )}

      {/* ================= TAB 2: SYSTEM HEALTH & BACKUPS ================= */}
      {activeTab === "system" && (
        <VStack gap="6" align="stretch">
          {/* MongoDB Atlas Live Health Card */}
          <Box bg="white" borderRadius="16px" border="1px solid #E2E8F0" p="6">
            <Flex justify="space-between" align={{ base: "flex-start", sm: "center" }} mb="4" wrap="wrap" gap="2">
              <HStack gap="3">
                <Box
                  w="42px"
                  h="42px"
                  borderRadius="10px"
                  bg="#ECFDF5"
                  color="#059669"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <DatabaseIcon size={22} color="#059669" />
                </Box>
                <Box>
                  <Heading as="h2" fontSize="17px" fontWeight="800" color="#0F172A">
                    MongoDB Atlas Production Database
                  </Heading>
                  <Text fontSize="12.5px" color="#64748B">
                    Cluster: {systemData?.database?.host || "cluster0.pwjztnh.mongodb.net"}
                  </Text>
                </Box>
              </HStack>

              <HStack gap="2">
                <Box
                  w="8px"
                  h="8px"
                  borderRadius="full"
                  bg={systemData?.database?.status === "connected" ? "#10B981" : "#EF4444"}
                />
                <Text
                  fontSize="13px"
                  fontWeight="700"
                  color={systemData?.database?.status === "connected" ? "#059669" : "#DC2626"}
                >
                  {systemData?.database?.status === "connected" ? "Live & Healthy" : "Offline / Unreachable"}
                </Text>
              </HStack>
            </Flex>

            <SimpleGrid columns={{ base: 2, sm: 4 }} gap="3.5" pt="4" borderTop="1px solid #F1F5F9">
              <Box bg="#F8FAFC" p="3.5" borderRadius="10px">
                <Text fontSize="11px" fontWeight="700" color="#64748B" textTransform="uppercase">Database Name</Text>
                <Text fontSize="14px" fontWeight="700" color="#0F172A" mt="0.5">
                  {systemData?.database?.databaseName || "iimpact_database"}
                </Text>
              </Box>
              <Box bg="#F8FAFC" p="3.5" borderRadius="10px">
                <Text fontSize="11px" fontWeight="700" color="#64748B" textTransform="uppercase">Latency (Ping)</Text>
                <Text fontSize="14px" fontWeight="700" color="#059669" mt="0.5">
                  {systemData?.database?.pingMs !== undefined ? `${systemData.database.pingMs} ms` : "—"}
                </Text>
              </Box>
              <Box bg="#F8FAFC" p="3.5" borderRadius="10px">
                <Text fontSize="11px" fontWeight="700" color="#64748B" textTransform="uppercase">Applications Docs</Text>
                <Text fontSize="14px" fontWeight="700" color="#051B64" mt="0.5">
                  {systemData?.database?.collections?.applications ?? 0}
                </Text>
              </Box>
              <Box bg="#F8FAFC" p="3.5" borderRadius="10px">
                <Text fontSize="11px" fontWeight="700" color="#64748B" textTransform="uppercase">Subscribers Docs</Text>
                <Text fontSize="14px" fontWeight="700" color="#051B64" mt="0.5">
                  {systemData?.database?.collections?.subscribers ?? 0}
                </Text>
              </Box>
            </SimpleGrid>
          </Box>

          {/* System Runtime & Architecture */}
          <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
            <Box bg="white" borderRadius="16px" border="1px solid #E2E8F0" p="6">
              <HStack gap="2.5" mb="4">
                <ShieldIcon size={20} color="#051B64" />
                <Heading as="h3" fontSize="16px" fontWeight="800" color="#0F172A">
                  Environment & Engine
                </Heading>
              </HStack>

              <VStack gap="3" align="stretch" fontSize="13px">
                <Flex justify="space-between" py="2" borderBottom="1px solid #F1F5F9">
                  <Text color="#64748B">Framework</Text>
                  <Text fontWeight="700" color="#0F172A">Next.js 16 (App Router)</Text>
                </Flex>
                <Flex justify="space-between" py="2" borderBottom="1px solid #F1F5F9">
                  <Text color="#64748B">Node Runtime</Text>
                  <Text fontWeight="700" color="#0F172A">{systemData?.system?.nodeVersion || process.version}</Text>
                </Flex>
                <Flex justify="space-between" py="2" borderBottom="1px solid #F1F5F9">
                  <Text color="#64748B">Deployment Target</Text>
                  <Text fontWeight="700" color="#0F172A">Vercel Serverless Edge</Text>
                </Flex>
                <Flex justify="space-between" py="2">
                  <Text color="#64748B">Process Uptime</Text>
                  <Text fontWeight="700" color="#0F172A">
                    {systemData?.system?.uptimeSeconds ? formatUptime(systemData.system.uptimeSeconds) : "Active"}
                  </Text>
                </Flex>
              </VStack>
            </Box>

            <Box bg="white" borderRadius="16px" border="1px solid #E2E8F0" p="6">
              <HStack gap="2.5" mb="4">
                <DownloadIcon size={20} color="#051B64" />
                <Heading as="h3" fontSize="16px" fontWeight="800" color="#0F172A">
                  Data Backup & Export Center
                </Heading>
              </HStack>
              <Text fontSize="13px" color="#64748B" mb="4">
                Download snapshot backups of all verified organization records in standardized CSV format.
              </Text>

              <VStack gap="2.5" align="stretch">
                <Button
                  size="sm"
                  variant="outline"
                  borderColor="#CBD5E1"
                  color="#0F172A"
                  _hover={{ bg: "#F8FAFC" }}
                  onClick={() => handleExportData("applications")}
                  disabled={exportingType === "applications"}
                >
                  <HStack justify="space-between" w="full">
                    <Text fontSize="12.5px" fontWeight="700">Export All Applications (CSV)</Text>
                    <DownloadIcon size={14} color="#64748B" />
                  </HStack>
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  borderColor="#CBD5E1"
                  color="#0F172A"
                  _hover={{ bg: "#F8FAFC" }}
                  onClick={() => handleExportData("messages")}
                  disabled={exportingType === "messages"}
                >
                  <HStack justify="space-between" w="full">
                    <Text fontSize="12.5px" fontWeight="700">Export Contact Inquiries (CSV)</Text>
                    <DownloadIcon size={14} color="#64748B" />
                  </HStack>
                </Button>
              </VStack>
            </Box>
          </SimpleGrid>

          {/* Governance Notice */}
          <Box bg="#F8FAFC" borderRadius="16px" border="1px solid #E2E8F0" p="6">
            <HStack gap="2.5" mb="2">
              <CheckIcon size={18} color="#059669" />
              <Heading as="h4" fontSize="15px" fontWeight="800" color="#0F172A">
                Security & Compliance Governance
              </Heading>
            </HStack>
            <Text fontSize="13px" color="#64748B" lineHeight="1.6">
              All applicant data, phone numbers, and identity files are stored with end-to-end encrypted transport to MongoDB Atlas. Public submissions are protected with client honeypots, email formatting checks, and duplicate-submission throttling. Administrative status updates are logged with review timestamps to preserve an audit trail.
            </Text>
          </Box>
        </VStack>
      )}

      {/* ================= INVITE ADMINISTRATOR MODAL ================= */}
      {isInviteModalOpen && (
        <Box
          position="fixed"
          inset="0"
          bg="rgba(15, 23, 42, 0.65)"
          zIndex={9999}
          display="flex"
          alignItems="center"
          justifyContent="center"
          p="4"
          onClick={() => !submittingInvite && setIsInviteModalOpen(false)}
        >
          <Box
            bg="white"
            borderRadius="20px"
            maxW="520px"
            w="full"
            p={{ base: "6", sm: "8" }}
            boxShadow="0 25px 50px -12px rgba(0,0,0,0.25)"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <Flex justify="space-between" align="center" pb="4" borderBottom="1px solid #E2E8F0" mb="5">
              <HStack gap="2.5">
                <Box
                  w="36px"
                  h="36px"
                  borderRadius="10px"
                  bg="#EFF6FF"
                  color="#1D4ED8"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <MailIcon size={18} />
                </Box>
                <Box>
                  <Heading as="h3" fontSize="18px" fontWeight="800" color="#0F172A">
                    Invite Administrator
                  </Heading>
                  <Text fontSize="12.5px" color="#64748B">
                    Send an authorized invitation link via email.
                  </Text>
                </Box>
              </HStack>

              <Button
                size="sm"
                variant="ghost"
                borderRadius="full"
                w="32px"
                h="32px"
                p="0"
                onClick={() => !submittingInvite && setIsInviteModalOpen(false)}
                color="#64748B"
              >
                <CloseIcon size={16} />
              </Button>
            </Flex>

            {/* Invite Form */}
            <form onSubmit={handleSendInvite}>
              <VStack gap="4" align="stretch">
                {/* Name */}
                <Box>
                  <Text as="label" fontSize="13px" fontWeight="700" color="#334155" mb="1" display="block">
                    Full Name <Text as="span" color="#EF4444">*</Text>
                  </Text>
                  <Input
                    required
                    value={inviteName}
                    onChange={(e) => setInviteName(e.target.value)}
                    placeholder="e.g. Dr. Ngozi Adeleke"
                    h="44px"
                    px="3.5"
                    fontSize="13.5px"
                    borderColor="#CBD5E1"
                    borderRadius="8px"
                    _focus={{ borderColor: "#051B64" }}
                  />
                </Box>

                {/* Email */}
                <Box>
                  <Text as="label" fontSize="13px" fontWeight="700" color="#334155" mb="1" display="block">
                    Email Address <Text as="span" color="#EF4444">*</Text>
                  </Text>
                  <Input
                    type="email"
                    required
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="ngozi@i-impact.org"
                    h="44px"
                    px="3.5"
                    fontSize="13.5px"
                    borderColor="#CBD5E1"
                    borderRadius="8px"
                    _focus={{ borderColor: "#051B64" }}
                  />
                </Box>

                {/* Role */}
                <Box>
                  <Text as="label" fontSize="13px" fontWeight="700" color="#334155" mb="1" display="block">
                    Role & Permissions
                  </Text>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as any)}
                    style={{
                      width: "100%",
                      height: "44px",
                      padding: "0 12px",
                      fontSize: "13.5px",
                      fontWeight: "600",
                      borderRadius: "8px",
                      border: "1px solid #CBD5E1",
                      backgroundColor: "white",
                      color: "#0F172A",
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="admin">Administrator (Manage applications, events, messages, broadcasts)</option>
                    <option value="reviewer">Reviewer (View & review applicant submissions)</option>
                    <option value="content_manager">Content Manager (Manage events, banners & media)</option>
                    <option value="superadmin">Super Admin (Full system & administrator control)</option>
                  </select>
                  <Text fontSize="11.5px" color="#64748B" mt="1.5">
                    {ROLE_INFO[inviteRole]?.desc}
                  </Text>
                </Box>

                {/* Security Callout */}
                <Box bg="#F8FAFC" p="3.5" borderRadius="8px" border="1px solid #E2E8F0">
                  <Text fontSize="12px" color="#475569" lineHeight="1.5">
                    A secure, single-use invitation link valid for <strong>7 days</strong> will be dispatched to this email. The recipient will use it to create their password and verify their account.
                  </Text>
                </Box>

                {/* Actions */}
                <Flex justify="flex-end" gap="2.5" pt="2">
                  <Button
                    variant="outline"
                    borderColor="#CBD5E1"
                    px="4"
                    py="2"
                    h="40px"
                    borderRadius="8px"
                    fontSize="13px"
                    fontWeight="600"
                    onClick={() => setIsInviteModalOpen(false)}
                    disabled={submittingInvite}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    bg="#051B64"
                    color="white"
                    _hover={{ bg: "#0A2580" }}
                    px="5"
                    py="2"
                    h="40px"
                    borderRadius="8px"
                    fontSize="13px"
                    fontWeight="700"
                    disabled={submittingInvite}
                  >
                    {submittingInvite ? (
                      <HStack gap="2">
                        <Spinner size="xs" color="white" />
                        <Text>Dispatching Invite...</Text>
                      </HStack>
                    ) : (
                      "Send Invitation Link"
                    )}
                  </Button>
                </Flex>
              </VStack>
            </form>
          </Box>
        </Box>
      )}
    </Box>
  )
}
