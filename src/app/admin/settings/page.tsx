"use client"

import React, { useState, useEffect } from "react"
import {
  Box,
  Heading,
  Text,
  Flex,
  HStack,
  VStack,
  Button,
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

export default function AdminSettingsPage() {
  const [data, setData] = useState<SystemSettingsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [errorNotice, setErrorNotice] = useState<string | null>(null)
  const [exportingType, setExportingType] = useState<string | null>(null)

  const fetchSettings = async () => {
    try {
      setLoading(true)
      setErrorNotice(null)
      const res = await fetch("/api/admin/settings", { cache: "no-store" })
      const json = await res.json()
      if (json.success) {
        setData(json)
      } else {
        setErrorNotice(json.error || "Failed to inspect database")
        if (json.database) setData(json)
      }
    } catch (err: any) {
      console.error("Settings fetch error:", err)
      setErrorNotice(err.message || "Failed to connect to system endpoints.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

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
              Settings & System Health
            </Heading>
            <Badge bg="#F1F5F9" color="#051B64" fontSize="13px" fontWeight="700" px="2.5" py="0.5" borderRadius="full">
              Atlas Connected
            </Badge>
          </HStack>
          <Text fontSize="14px" color="#64748B" mt="1">
            Real-time MongoDB Atlas status, verified collection metrics, and administrative data backups.
          </Text>
        </Box>

        <Button
          size="sm"
          bg="white"
          color="#051B64"
          border="1px solid #E2E8F0"
          _hover={{ bg: "#F8FAFC", borderColor: "#CBD5E1" }}
          onClick={fetchSettings}
          disabled={loading}
        >
          {loading ? "Inspecting..." : "Refresh Status"}
        </Button>
      </Flex>

      {/* Error or IP Notice */}
      {errorNotice && (
        <Box bg="#FEF2F2" border="1px solid #FECACA" p="4" borderRadius="12px" mb="6" color="#991B1B" fontSize="13.5px">
          <HStack align="flex-start" gap="3">
            <Text fontWeight="700">Notice:</Text>
            <Text>{errorNotice}</Text>
          </HStack>
        </Box>
      )}

      {/* 2. MongoDB Atlas Live Health Card */}
      <Box
        bg="white"
        borderRadius="16px"
        border="1px solid #E2E8F0"
        p="6"
        mb="6"
        boxShadow="0 1px 3px rgba(0,0,0,0.02)"
      >
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
                Cluster: {data?.database?.host || "cluster0.pwjztnh.mongodb.net"}
              </Text>
            </Box>
          </HStack>

          <HStack gap="2">
            <Box
              w="8px"
              h="8px"
              borderRadius="full"
              bg={data?.database?.status === "connected" ? "#10B981" : "#EF4444"}
            />
            <Text
              fontSize="13px"
              fontWeight="700"
              color={data?.database?.status === "connected" ? "#059669" : "#DC2626"}
            >
              {data?.database?.status === "connected" ? "Live & Healthy" : "Offline / Unreachable"}
            </Text>
          </HStack>
        </Flex>

        <SimpleGrid columns={{ base: 2, sm: 4 }} gap="3.5" pt="4" borderTop="1px solid #F1F5F9">
          <Box bg="#F8FAFC" p="3.5" borderRadius="10px">
            <Text fontSize="11px" fontWeight="700" color="#64748B" textTransform="uppercase">Database Name</Text>
            <Text fontSize="14px" fontWeight="700" color="#0F172A" mt="0.5">
              {data?.database?.databaseName || "iimpact_database"}
            </Text>
          </Box>
          <Box bg="#F8FAFC" p="3.5" borderRadius="10px">
            <Text fontSize="11px" fontWeight="700" color="#64748B" textTransform="uppercase">Latency (Ping)</Text>
            <Text fontSize="14px" fontWeight="700" color="#059669" mt="0.5">
              {data?.database?.pingMs !== undefined ? `${data.database.pingMs} ms` : "—"}
            </Text>
          </Box>
          <Box bg="#F8FAFC" p="3.5" borderRadius="10px">
            <Text fontSize="11px" fontWeight="700" color="#64748B" textTransform="uppercase">Applications Docs</Text>
            <Text fontSize="14px" fontWeight="700" color="#051B64" mt="0.5">
              {data?.database?.collections?.applications ?? 0}
            </Text>
          </Box>
          <Box bg="#F8FAFC" p="3.5" borderRadius="10px">
            <Text fontSize="11px" fontWeight="700" color="#64748B" textTransform="uppercase">Subscribers Docs</Text>
            <Text fontSize="14px" fontWeight="700" color="#051B64" mt="0.5">
              {data?.database?.collections?.subscribers ?? 0}
            </Text>
          </Box>
        </SimpleGrid>
      </Box>

      {/* 3. System Runtime & Architecture */}
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="6" mb="6">
        {/* Architecture details */}
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
              <Text fontWeight="700" color="#0F172A">{data?.system?.nodeVersion || process.version}</Text>
            </Flex>
            <Flex justify="space-between" py="2" borderBottom="1px solid #F1F5F9">
              <Text color="#64748B">Deployment Target</Text>
              <Text fontWeight="700" color="#0F172A">Vercel Serverless Edge</Text>
            </Flex>
            <Flex justify="space-between" py="2">
              <Text color="#64748B">Process Uptime</Text>
              <Text fontWeight="700" color="#0F172A">
                {data?.system?.uptimeSeconds ? formatUptime(data.system.uptimeSeconds) : "Active"}
              </Text>
            </Flex>
          </VStack>
        </Box>

        {/* Data Backup & Export Center */}
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

      {/* 4. Security & Safeguarding Notice */}
      <Box bg="#F8FAFC" borderRadius="16px" border="1px solid #E2E8F0" p="6">
        <HStack gap="2.5" mb="2">
          <CheckIcon size={18} color="#059669" />
          <Heading as="h4" fontSize="15px" fontWeight="800" color="#0F172A">
            Security & Compliance Governance
          </Heading>
        </HStack>
        <Text fontSize="13px" color="#64748B" lineHeight="1.6">
          All applicant data, phone numbers, and identity files are stored with end-to-end encrypted transport to MongoDB Atlas. Public submissions are protected with client honeypots, email formatting checks, and duplicate-submission throttling. Administrative status updates are logged with review timestamps to preserve an accurate audit trail.
        </Text>
      </Box>
    </Box>
  )
}
