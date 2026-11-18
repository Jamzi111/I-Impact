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
  Separator,
} from "@chakra-ui/react"
import {
  BarChartSquareIcon,
  RefreshCwIcon,
  DownloadIcon,
  CheckIcon,
  FileTextIcon,
  UsersIcon,
  MailIcon,
  TrendingUpIcon,
  MapPinIcon,
  ClipboardCheckIcon,
} from "@/components/icons"

// ─── Types ───────────────────────────────────────────────────────────────────

interface ReportSummary {
  totalApplications: number
  pendingCount: number
  reviewingCount: number
  acceptedCount: number
  rejectedCount: number
  last30DaysCount: number
  last90DaysCount: number
  totalSubscribers: number
  totalMessages: number
  overallAcceptanceRate: number
  generatedAt: string
}

interface PathwayStat {
  pathway: string
  count: number
  accepted: number
  pending: number
  acceptanceRate: number
}

interface MonthlyPoint {
  label: string
  total: number
  accepted: number
}

interface GeoEntry {
  name: string
  count: number
}

interface ReportData {
  summary: ReportSummary
  pathwayBreakdown: PathwayStat[]
  monthlyTrend: MonthlyPoint[]
  geographic: { states: GeoEntry[]; countries: GeoEntry[] }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const PATHWAY_LABELS: Record<string, string> = {
  mentorship: "Mentorship",
  volunteering: "Volunteering",
  partnerships: "Partnerships",
  sponsorship: "Sponsorship",
  speaking: "Speaking",
  ambassadors: "Campus Ambassadors",
}

const PATHWAY_COLORS: Record<string, string> = {
  mentorship: "#149191",
  volunteering: "#10B981",
  partnerships: "#6366F1",
  sponsorship: "#F59E0B",
  speaking: "#EC4899",
  ambassadors: "#051B64",
}

function StatCard({
  label,
  value,
  sub,
  color = "#051B64",
  icon,
}: {
  label: string
  value: string | number
  sub?: string
  color?: string
  icon: React.ReactNode
}) {
  return (
    <Box bg="white" p="5" borderRadius="xl" border="1px solid #E2E8F0" boxShadow="sm">
      <Flex justify="space-between" align="flex-start">
        <Box>
          <Text fontSize="11px" fontWeight="700" color="gray.500" textTransform="uppercase" letterSpacing="wider" mb="1">
            {label}
          </Text>
          <Text fontSize="2xl" fontWeight="900" color={color} lineHeight="1.1">
            {value}
          </Text>
          {sub && (
            <Text fontSize="11px" color="gray.500" mt="1">
              {sub}
            </Text>
          )}
        </Box>
        <Box p="2.5" bg={`${color}18`} borderRadius="lg" color={color}>
          {icon}
        </Box>
      </Flex>
    </Box>
  )
}

// Simple bar chart using CSS widths
function MiniBarChart({ data, max }: { data: { label: string; value: number; color: string }[]; max: number }) {
  return (
    <VStack align="stretch" gap="2.5">
      {data.map((d) => (
        <Box key={d.label}>
          <Flex justify="space-between" mb="1">
            <Text fontSize="12px" fontWeight="600" color="#374151">
              {d.label}
            </Text>
            <Text fontSize="12px" fontWeight="700" color={d.color}>
              {d.value}
            </Text>
          </Flex>
          <Box bg="#F1F5F9" borderRadius="full" h="8px" w="100%">
            <Box
              bg={d.color}
              h="8px"
              borderRadius="full"
              style={{ width: max > 0 ? `${Math.round((d.value / max) * 100)}%` : "0%" }}
              transition="width 0.6s ease"
            />
          </Box>
        </Box>
      ))}
    </VStack>
  )
}

// Monthly trend visual (mini sparkline using flex bars)
function TrendChart({ data }: { data: MonthlyPoint[] }) {
  const maxVal = Math.max(...data.map((d) => d.total), 1)
  return (
    <Box>
      <Flex align="flex-end" gap="1" h="80px" w="100%">
        {data.map((d, i) => (
          <Box key={i} flex="1" display="flex" flexDirection="column" alignItems="center" gap="1" h="100%">
            <Box
              flex="1"
              w="100%"
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
            >
              <Box
                bg={d.total > 0 ? "#149191" : "#E2E8F0"}
                borderRadius="3px 3px 0 0"
                style={{ height: `${Math.round((d.total / maxVal) * 100)}%`, minHeight: d.total > 0 ? "4px" : "2px" }}
                transition="height 0.5s ease"
                title={`${d.label}: ${d.total} submissions`}
              />
            </Box>
          </Box>
        ))}
      </Flex>
      <Flex gap="1" mt="2">
        {data.map((d, i) => (
          <Box key={i} flex="1" textAlign="center">
            <Text fontSize="9px" color="gray.400" fontWeight="600">
              {d.label.split(" ")[0]}
            </Text>
          </Box>
        ))}
      </Flex>
    </Box>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdminReportsPage() {
  const [data, setData] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [exporting, setExporting] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/reports")
      const json = await res.json()
      if (json.success) {
        setData(json)
      } else {
        setError(json.error || "Failed to load report data.")
      }
    } catch (e) {
      setError("Could not connect to the database. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // CSV Export
  const handleExportCSV = async () => {
    if (!data) return
    setExporting(true)
    try {
      const rows: string[][] = [
        ["I IMPACT – Impact & Reports Export"],
        ["Generated At", new Date(data.summary.generatedAt).toLocaleString()],
        [],
        ["SUMMARY"],
        ["Metric", "Value"],
        ["Total Applications", String(data.summary.totalApplications)],
        ["Pending", String(data.summary.pendingCount)],
        ["Under Review", String(data.summary.reviewingCount)],
        ["Accepted", String(data.summary.acceptedCount)],
        ["Rejected", String(data.summary.rejectedCount)],
        ["Submitted (Last 30 Days)", String(data.summary.last30DaysCount)],
        ["Submitted (Last 90 Days)", String(data.summary.last90DaysCount)],
        ["Newsletter Subscribers", String(data.summary.totalSubscribers)],
        ["Contact Messages", String(data.summary.totalMessages)],
        ["Overall Acceptance Rate", `${data.summary.overallAcceptanceRate}%`],
        [],
        ["PATHWAY BREAKDOWN"],
        ["Pathway", "Total Applications", "Accepted", "Pending", "Acceptance Rate"],
        ...data.pathwayBreakdown.map((p) => [
          PATHWAY_LABELS[p.pathway] || p.pathway,
          String(p.count),
          String(p.accepted),
          String(p.pending),
          `${p.acceptanceRate}%`,
        ]),
        [],
        ["MONTHLY SUBMISSION TREND"],
        ["Month", "Total Submissions", "Accepted"],
        ...data.monthlyTrend.map((m) => [m.label, String(m.total), String(m.accepted)]),
        [],
        ["TOP STATES"],
        ["State", "Applications"],
        ...data.geographic.states.map((s) => [s.name, String(s.count)]),
      ]

      const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n")
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `iimpact-report-${new Date().toISOString().split("T")[0]}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } finally {
      setExporting(false)
    }
  }

  const s = data?.summary

  return (
    <Box minH="100vh" bg="#F8FAFC" color="#0F172A" pb="20">
      {/* Page Header */}
      <Box
        bg="linear-gradient(135deg, #051B64 0%, #0a2a7a 100%)"
        color="white"
        py="6"
        px={{ base: "4", md: "8" }}
        borderBottom="1px solid rgba(255,255,255,0.1)"
      >
        <Container maxW="1300px">
          <Flex justify="space-between" align="center" wrap="wrap" gap="4">
            <HStack gap="3">
              <Box bg="rgba(20,145,145,0.3)" p="2.5" borderRadius="xl">
                <BarChartSquareIcon size={22} color="#34D399" />
              </Box>
              <Box>
                <Heading fontSize={{ base: "lg", md: "xl" }} fontWeight="800" color="white">
                  Impact &amp; Reports
                </Heading>
                <Text fontSize="xs" color="whiteAlpha.700">
                  Real metrics from MongoDB · refreshed on demand
                </Text>
              </Box>
            </HStack>

            <HStack gap="2" wrap="wrap">
              <Button
                size="sm"
                bg="rgba(255,255,255,0.12)"
                color="white"
                _hover={{ bg: "rgba(255,255,255,0.2)" }}
                borderRadius="lg"
                onClick={fetchData}
                disabled={loading}
                px="4"
                h="36px"
              >
                <HStack gap="1.5">
                  <RefreshCwIcon size={14} color="white" />
                  <Text fontSize="xs">{loading ? "Loading…" : "Refresh"}</Text>
                </HStack>
              </Button>

              <Button
                size="sm"
                bg="#10B981"
                color="white"
                fontWeight="700"
                _hover={{ bg: "#059669" }}
                borderRadius="lg"
                onClick={handleExportCSV}
                disabled={!data || exporting}
                px="4"
                h="36px"
              >
                <HStack gap="1.5">
                  <DownloadIcon size={14} color="white" />
                  <Text fontSize="xs">{exporting ? "Exporting…" : "Export CSV"}</Text>
                </HStack>
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Container maxW="1300px" py="8" px={{ base: "4", md: "8" }}>
        {/* Error State */}
        {error && (
          <Box
            mb="6"
            p="4"
            bg="#FEF2F2"
            border="1px solid #FECACA"
            borderRadius="xl"
            color="#991B1B"
          >
            <Text fontWeight="600" fontSize="sm">
              ⚠ {error}
            </Text>
          </Box>
        )}

        {/* Loading skeleton */}
        {loading && !data && (
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="4" mb="8">
            {[1, 2, 3, 4].map((i) => (
              <Box key={i} bg="white" p="5" borderRadius="xl" border="1px solid #E2E8F0" h="96px" opacity={0.5} />
            ))}
          </SimpleGrid>
        )}

        {data && (
          <>
            {/* ── KPI Cards ── */}
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="4" mb="8">
              <StatCard
                label="Total Applications"
                value={s!.totalApplications.toLocaleString()}
                sub={`${s!.last30DaysCount} in last 30 days`}
                color="#051B64"
                icon={<FileTextIcon size={18} />}
              />
              <StatCard
                label="Accepted Applicants"
                value={s!.acceptedCount.toLocaleString()}
                sub={`${s!.overallAcceptanceRate}% acceptance rate`}
                color="#10B981"
                icon={<CheckIcon size={18} />}
              />
              <StatCard
                label="Newsletter Subscribers"
                value={s!.totalSubscribers.toLocaleString()}
                sub="Active subscriptions"
                color="#149191"
                icon={<UsersIcon size={18} />}
              />
              <StatCard
                label="Contact Messages"
                value={s!.totalMessages.toLocaleString()}
                sub="Total enquiries received"
                color="#6366F1"
                icon={<MailIcon size={18} />}
              />
            </SimpleGrid>

            {/* ── Application Status Breakdown ── */}
            <SimpleGrid columns={{ base: 2, md: 4 }} gap="4" mb="8">
              {[
                { label: "Pending", count: s!.pendingCount, color: "#F59E0B", bg: "#FFFBEB" },
                { label: "Reviewing", count: s!.reviewingCount, color: "#6366F1", bg: "#EEF2FF" },
                { label: "Accepted", count: s!.acceptedCount, color: "#10B981", bg: "#F0FDF4" },
                { label: "Rejected", count: s!.rejectedCount, color: "#EF4444", bg: "#FEF2F2" },
              ].map((item) => (
                <Box
                  key={item.label}
                  bg={item.bg}
                  p="4"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor={`${item.color}30`}
                  textAlign="center"
                >
                  <Text fontSize="2xl" fontWeight="900" color={item.color}>
                    {item.count}
                  </Text>
                  <Text fontSize="12px" fontWeight="700" color="gray.600" mt="0.5">
                    {item.label}
                  </Text>
                  <Text fontSize="10px" color="gray.400" mt="0.5">
                    {s!.totalApplications > 0
                      ? `${Math.round((item.count / s!.totalApplications) * 100)}%`
                      : "0%"}{" "}
                    of total
                  </Text>
                </Box>
              ))}
            </SimpleGrid>

            {/* ── Two-column section: Trend + Pathways ── */}
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6" mb="8">
              {/* Monthly Trend */}
              <Box bg="white" p="6" borderRadius="2xl" border="1px solid #E2E8F0" boxShadow="sm">
                <HStack gap="2" mb="5">
                  <TrendingUpIcon size={18} color="#051B64" />
                  <Heading fontSize="md" fontWeight="800" color="#051B64">
                    Monthly Submission Trend
                  </Heading>
                </HStack>

                {data.monthlyTrend.length === 0 ? (
                  <Box py="10" textAlign="center">
                    <Text color="gray.400" fontSize="sm">
                      No submission data yet.
                    </Text>
                  </Box>
                ) : (
                  <>
                    <TrendChart data={data.monthlyTrend} />
                    <Separator my="4" />
                    <SimpleGrid columns={3} gap="4" mt="2">
                      {[...data.monthlyTrend].reverse().slice(0, 3).map((m) => (
                        <Box key={m.label} textAlign="center">
                          <Text fontSize="xs" color="gray.400" fontWeight="600">
                            {m.label}
                          </Text>
                          <Text fontSize="lg" fontWeight="900" color="#051B64">
                            {m.total}
                          </Text>
                          <Text fontSize="10px" color="#10B981" fontWeight="700">
                            {m.accepted} accepted
                          </Text>
                        </Box>
                      ))}
                    </SimpleGrid>
                  </>
                )}
              </Box>

              {/* Pathway Breakdown */}
              <Box bg="white" p="6" borderRadius="2xl" border="1px solid #E2E8F0" boxShadow="sm">
                <HStack gap="2" mb="5">
                  <ClipboardCheckIcon size={18} color="#051B64" />
                  <Heading fontSize="md" fontWeight="800" color="#051B64">
                    Applications by Pathway
                  </Heading>
                </HStack>

                {data.pathwayBreakdown.length === 0 ? (
                  <Box py="10" textAlign="center">
                    <Text color="gray.400" fontSize="sm">
                      No pathway data yet.
                    </Text>
                  </Box>
                ) : (
                  <>
                    <MiniBarChart
                      data={data.pathwayBreakdown.map((p) => ({
                        label: PATHWAY_LABELS[p.pathway] || p.pathway,
                        value: p.count,
                        color: PATHWAY_COLORS[p.pathway] || "#051B64",
                      }))}
                      max={Math.max(...data.pathwayBreakdown.map((p) => p.count), 1)}
                    />
                    <Separator my="4" />
                    <VStack align="stretch" gap="2">
                      {data.pathwayBreakdown.map((p) => (
                        <Flex key={p.pathway} justify="space-between" align="center">
                          <HStack gap="2">
                            <Box
                              w="10px"
                              h="10px"
                              borderRadius="full"
                              bg={PATHWAY_COLORS[p.pathway] || "#051B64"}
                            />
                            <Text fontSize="12px" fontWeight="600" color="#374151">
                              {PATHWAY_LABELS[p.pathway] || p.pathway}
                            </Text>
                          </HStack>
                          <HStack gap="3">
                            <Badge
                              bg="#F0FDF4"
                              color="#059669"
                              fontSize="10px"
                              fontWeight="700"
                              px="2"
                              borderRadius="md"
                            >
                              {p.acceptanceRate}% accepted
                            </Badge>
                            <Text fontSize="12px" fontWeight="700" color="#051B64">
                              {p.count}
                            </Text>
                          </HStack>
                        </Flex>
                      ))}
                    </VStack>
                  </>
                )}
              </Box>
            </SimpleGrid>

            {/* ── Geographic Distribution ── */}
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6" mb="8">
              {/* Top States */}
              <Box bg="white" p="6" borderRadius="2xl" border="1px solid #E2E8F0" boxShadow="sm">
                <HStack gap="2" mb="5">
                  <MapPinIcon size={18} color="#051B64" />
                  <Heading fontSize="md" fontWeight="800" color="#051B64">
                    Top States
                  </Heading>
                </HStack>
                {data.geographic.states.length === 0 ? (
                  <Box py="10" textAlign="center">
                    <Text color="gray.400" fontSize="sm">No geographic data yet.</Text>
                  </Box>
                ) : (
                  <MiniBarChart
                    data={data.geographic.states.map((s, i) => ({
                      label: s.name,
                      value: s.count,
                      color: i === 0 ? "#051B64" : i === 1 ? "#149191" : "#10B981",
                    }))}
                    max={Math.max(...data.geographic.states.map((s) => s.count), 1)}
                  />
                )}
              </Box>

              {/* Country Distribution */}
              <Box bg="white" p="6" borderRadius="2xl" border="1px solid #E2E8F0" boxShadow="sm">
                <HStack gap="2" mb="5">
                  <MapPinIcon size={18} color="#6366F1" />
                  <Heading fontSize="md" fontWeight="800" color="#051B64">
                    Country Distribution
                  </Heading>
                </HStack>
                {data.geographic.countries.length === 0 ? (
                  <Box py="10" textAlign="center">
                    <Text color="gray.400" fontSize="sm">No country data yet.</Text>
                  </Box>
                ) : (
                  <VStack align="stretch" gap="3">
                    {data.geographic.countries.map((c, i) => {
                      const pct =
                        s!.totalApplications > 0
                          ? Math.round((c.count / s!.totalApplications) * 100)
                          : 0
                      return (
                        <Box key={c.name}>
                          <Flex justify="space-between" mb="1">
                            <HStack gap="2">
                              <Box
                                w="6px"
                                h="6px"
                                borderRadius="full"
                                bg={i === 0 ? "#051B64" : i === 1 ? "#149191" : "#6366F1"}
                              />
                              <Text fontSize="12px" fontWeight="600" color="#374151">
                                {c.name}
                              </Text>
                            </HStack>
                            <HStack gap="2">
                              <Text fontSize="11px" color="gray.400">
                                {pct}%
                              </Text>
                              <Text fontSize="12px" fontWeight="700" color="#051B64">
                                {c.count}
                              </Text>
                            </HStack>
                          </Flex>
                          <Box bg="#F1F5F9" borderRadius="full" h="6px">
                            <Box
                              bg={i === 0 ? "#051B64" : i === 1 ? "#149191" : "#6366F1"}
                              h="6px"
                              borderRadius="full"
                              style={{ width: `${pct}%` }}
                              transition="width 0.5s ease"
                            />
                          </Box>
                        </Box>
                      )
                    })}
                  </VStack>
                )}
              </Box>
            </SimpleGrid>

            {/* ── Report Meta Footer ── */}
            <Box
              bg="white"
              p="5"
              borderRadius="xl"
              border="1px solid #E2E8F0"
              boxShadow="sm"
            >
              <Flex justify="space-between" align="center" wrap="wrap" gap="3">
                <HStack gap="2">
                  <FileTextIcon size={16} color="#149191" />
                  <Text fontSize="sm" fontWeight="600" color="#374151">
                    Report generated from live MongoDB Atlas data
                  </Text>
                </HStack>
                <HStack gap="4" wrap="wrap">
                  <Text fontSize="xs" color="gray.400">
                    Generated:{" "}
                    <strong>{new Date(s!.generatedAt).toLocaleString("en-NG", { timeZone: "Africa/Lagos" })}</strong>{" "}
                    WAT
                  </Text>
                  <Button
                    size="xs"
                    bg="#051B64"
                    color="white"
                    fontWeight="700"
                    onClick={handleExportCSV}
                    disabled={exporting}
                    px="4"
                    h="32px"
                  >
                    <HStack gap="1">
                      <DownloadIcon size={12} color="white" />
                      <Text>Download CSV Report</Text>
                    </HStack>
                  </Button>
                </HStack>
              </Flex>
            </Box>
          </>
        )}
      </Container>
    </Box>
  )
}

