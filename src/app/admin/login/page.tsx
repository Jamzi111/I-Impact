"use client"

import React, { useState, Suspense } from "react"
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
} from "@chakra-ui/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
  LockIcon,
  MailIcon,
  EyeIcon,
  EyeOffIcon,
  ArrowRightIcon,
  ShieldIcon,
  ShieldCheckIcon,
} from "@/components/icons"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get("from") || "/admin"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage(null)

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Authentication failed. Please check your credentials.")
      }

      // Hard redirect to load admin layout with session cookies set
      window.location.href = from
    } catch (err: any) {
      console.error("Login submission error:", err)
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.")
      setLoading(false)
    }
  }

  return (
    <Flex minH="100vh" direction={{ base: "column", lg: "row" }} bg="#FFFFFF">
      {/* ================= LEFT SIDE: Brand Showcase & Statement ================= */}
      <Box
        flex={{ base: "none", lg: "5" }}
        bg="linear-gradient(145deg, #020922 0%, #051B64 55%, #0B257A 100%)"
        color="white"
        p={{ base: "8", sm: "12", lg: "16" }}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        position="relative"
        overflow="hidden"
      >
        {/* Subtle decorative background glows */}
        <Box
          position="absolute"
          top="-15%"
          left="-10%"
          w="500px"
          h="500px"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(45, 212, 191, 0.15) 0%, transparent 70%)"
          pointerEvents="none"
        />
        <Box
          position="absolute"
          bottom="-15%"
          right="-10%"
          w="600px"
          h="600px"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(20, 145, 145, 0.2) 0%, transparent 70%)"
          pointerEvents="none"
        />

        {/* Top: Logo & Portal Tag */}
        <Box position="relative" zIndex={1}>
          <HStack gap="3" align="center" mb="8">
            <Box
              bg="white"
              px="3.5"
              py="2"
              borderRadius="12px"
              boxShadow="0 4px 14px rgba(0,0,0,0.2)"
              display="inline-flex"
              alignItems="center"
            >
              <Image
                src="/iimpact-logo2.png"
                alt="I-IMPACT Initiative Logo"
                width={120}
                height={34}
                style={{ height: "30px", width: "auto", objectFit: "contain" }}
                priority
              />
            </Box>

            <Badge
              bg="rgba(45, 212, 191, 0.15)"
              color="#2DD4BF"
              border="1px solid rgba(45, 212, 191, 0.3)"
              px="3"
              py="1"
              borderRadius="full"
              fontSize="11px"
              fontWeight="800"
              letterSpacing="0.08em"
              textTransform="uppercase"
            >
              ADMIN PORTAL
            </Badge>
          </HStack>
        </Box>

        {/* Middle: Welcome message & short statement about managing impact */}
        <Box position="relative" zIndex={1} my={{ base: "8", lg: "auto" }} maxW="540px">
          <Text
            fontSize="13px"
            fontWeight="800"
            color="#2DD4BF"
            textTransform="uppercase"
            letterSpacing="0.1em"
            mb="3"
          >
            I-IMPACT Leadership Workspace
          </Text>

          <Heading
            as="h1"
            fontSize={{ base: "28px", sm: "36px", xl: "42px" }}
            fontWeight="900"
            lineHeight="1.2"
            letterSpacing="-0.02em"
            color="#FFFFFF"
            mb="5"
          >
            Managing the Initiative&apos;s Impact Across Nigeria.
          </Heading>

          <Text fontSize={{ base: "14.5px", sm: "16px" }} color="#CBD5E1" lineHeight="1.7" mb="8">
            Welcome to the centralized administration portal. Coordinate youth empowerment
            cohorts, evaluate applications, manage regional conferences, and drive sustainable
            transformation across all 6 geopolitical zones.
          </Text>

          {/* Value highlights */}
          <VStack gap="3.5" align="stretch">
            <HStack gap="3">
              <Box
                w="24px"
                h="24px"
                borderRadius="full"
                bg="rgba(45, 212, 191, 0.2)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <ShieldCheckIcon size={14} color="#2DD4BF" />
              </Box>
              <Text fontSize="13.5px" color="#E2E8F0" fontWeight="600">
                Authorized invitation-based personnel access
              </Text>
            </HStack>

            <HStack gap="3">
              <Box
                w="24px"
                h="24px"
                borderRadius="full"
                bg="rgba(45, 212, 191, 0.2)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <ShieldCheckIcon size={14} color="#2DD4BF" />
              </Box>
              <Text fontSize="13.5px" color="#E2E8F0" fontWeight="600">
                End-to-end applicant tracking and cohort admissions
              </Text>
            </HStack>

            <HStack gap="3">
              <Box
                w="24px"
                h="24px"
                borderRadius="full"
                bg="rgba(45, 212, 191, 0.2)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <ShieldCheckIcon size={14} color="#2DD4BF" />
              </Box>
              <Text fontSize="13.5px" color="#E2E8F0" fontWeight="600">
                Real-time regional event management and live broadcasts
              </Text>
            </HStack>
          </VStack>
        </Box>

        {/* Bottom: Confidentiality & Copyright */}
        <Box position="relative" zIndex={1} pt={{ base: "6", lg: "8" }} borderTop="1px solid rgba(255,255,255,0.12)">
          <Text fontSize="12px" color="#94A3B8">
            &copy; {new Date().getFullYear()} I-IMPACT Initiative. Private & Confidential. All rights reserved.
          </Text>
        </Box>
      </Box>

      {/* ================= RIGHT SIDE: Clean Login Form ================= */}
      <Box
        flex={{ base: "none", lg: "6" }}
        bg="#F8FAFC"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={{ base: "6", sm: "10", md: "14", xl: "16" }}
      >
        <Box w="full" maxW="440px">
          {/* Mobile-only logo view */}
          <Box display={{ base: "block", lg: "none" }} mb="6" textAlign="center">
            <Box
              bg="white"
              px="4"
              py="2"
              borderRadius="12px"
              border="1px solid #E2E8F0"
              display="inline-flex"
              alignItems="center"
              boxShadow="0 2px 8px rgba(0,0,0,0.06)"
            >
              <Image
                src="/iimpact-logo2.png"
                alt="I-IMPACT Initiative Logo"
                width={120}
                height={34}
                style={{ height: "30px", width: "auto", objectFit: "contain" }}
              />
            </Box>
          </Box>

          {/* Form Card */}
          <Box
            bg="white"
            borderRadius="20px"
            p={{ base: "6", sm: "9" }}
            border="1px solid #E2E8F0"
            boxShadow="0 10px 30px rgba(15, 23, 42, 0.05)"
          >
            {/* Header */}
            <VStack gap="1.5" align="flex-start" mb="6">
              <Heading as="h2" fontSize="22px" fontWeight="800" color="#0F172A">
                Administrator Sign In
              </Heading>
              <Text fontSize="13.5px" color="#64748B">
                Please enter your credentials to access the management portal.
              </Text>
            </VStack>

            {/* Error Notification */}
            {errorMessage && (
              <Box
                bg="#FEF2F2"
                border="1px solid #FECACA"
                p="3.5"
                borderRadius="10px"
                mb="5"
                color="#991B1B"
                fontSize="13px"
                fontWeight="600"
              >
                {errorMessage}
              </Box>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <VStack gap="4.5" align="stretch">
                {/* Email Address */}
                <Box>
                  <Text as="label" fontSize="13px" fontWeight="700" color="#334155" mb="1.5" display="block">
                    Email address
                  </Text>
                  <Box position="relative">
                    <Box position="absolute" left="14px" top="13px" color="#94A3B8" pointerEvents="none">
                      <MailIcon size={16} />
                    </Box>
                    <Input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@i-impact.org"
                      pl="42px"
                      pr="14px"
                      h="46px"
                      fontSize="14px"
                      bg="#FFFFFF"
                      borderColor="#CBD5E1"
                      borderRadius="10px"
                      _focus={{ borderColor: "#051B64", boxShadow: "0 0 0 1px #051B64" }}
                    />
                  </Box>
                </Box>

                {/* Password */}
                <Box>
                  <Text as="label" fontSize="13px" fontWeight="700" color="#334155" mb="1.5" display="block">
                    Password
                  </Text>
                  <Box position="relative">
                    <Box position="absolute" left="14px" top="13px" color="#94A3B8" pointerEvents="none">
                      <LockIcon size={16} />
                    </Box>
                    <Input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      pl="42px"
                      pr="44px"
                      h="46px"
                      fontSize="14px"
                      bg="#FFFFFF"
                      borderColor="#CBD5E1"
                      borderRadius="10px"
                      _focus={{ borderColor: "#051B64", boxShadow: "0 0 0 1px #051B64" }}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      position="absolute"
                      right="8px"
                      top="8px"
                      p="1.5"
                      h="30px"
                      w="30px"
                      minW="auto"
                      color="#64748B"
                      _hover={{ color: "#0F172A", bg: "#F1F5F9" }}
                      borderRadius="md"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                    </Button>
                  </Box>
                </Box>

                {/* Remember Me & Forgot Password Row */}
                <Flex justify="space-between" align="center" pt="0.5">
                  <HStack gap="2" as="label" cursor="pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      style={{
                        width: "16px",
                        height: "16px",
                        accentColor: "#051B64",
                        cursor: "pointer",
                        borderRadius: "4px",
                      }}
                    />
                    <Text fontSize="13px" color="#475569" fontWeight="600">
                      Remember me
                    </Text>
                  </HStack>

                  <Link
                    href="/admin/forgot-password"
                    style={{
                      fontSize: "13px",
                      color: "#051B64",
                      fontWeight: "700",
                      textDecoration: "none",
                    }}
                  >
                    Forgot password?
                  </Link>
                </Flex>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  w="full"
                  h="48px"
                  bg="#051B64"
                  color="white"
                  borderRadius="10px"
                  fontSize="14px"
                  fontWeight="700"
                  _hover={{ bg: "#0A2580" }}
                  _active={{ bg: "#031245" }}
                  boxShadow="0 4px 12px rgba(5, 27, 100, 0.2)"
                  disabled={loading}
                  mt="2"
                >
                  {loading ? (
                    <HStack gap="2">
                      <Spinner size="xs" color="white" />
                      <Text>Authenticating...</Text>
                    </HStack>
                  ) : (
                    <HStack gap="2">
                      <Text>Sign in</Text>
                      <ArrowRightIcon size={15} />
                    </HStack>
                  )}
                </Button>
              </VStack>
            </form>

            {/* Authorized Personnel Notice (Strictly No Public Registration) */}
            <Box
              mt="6"
              pt="5"
              borderTop="1px solid #F1F5F9"
              textAlign="center"
            >
              <HStack justify="center" gap="1.5" color="#64748B" mb="1">
                <ShieldIcon size={14} color="#64748B" />
                <Text fontSize="12px" fontWeight="700" textTransform="uppercase" letterSpacing="0.04em">
                  Restricted Environment
                </Text>
              </HStack>
              <Text fontSize="12px" color="#64748B" lineHeight="1.5">
                Authorized personnel only. Access is restricted to approved I&nbsp;IMPACT administrators.
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <Box
          minH="100vh"
          bg="#F8FAFC"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <HStack gap="3">
            <Spinner size="sm" color="#051B64" />
            <Text color="#051B64" fontSize="14px" fontWeight="600">
              Loading Administrator Portal...
            </Text>
          </HStack>
        </Box>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
