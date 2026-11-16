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
} from "@chakra-ui/react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { LockIcon, MailIcon, EyeIcon, EyeOffIcon, ArrowRightIcon } from "@/components/icons"

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
        throw new Error(data.error || "Authentication failed. Please verify your credentials.")
      }

      // Hard redirect to load admin layout with cookies set
      window.location.href = from
    } catch (err: any) {
      console.error("Login submission error:", err)
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.")
      setLoading(false)
    }
  }

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, #030F38 0%, #051B64 50%, #08298A 100%)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
      position="relative"
      overflow="hidden"
    >
      {/* Subtle background glow */}
      <Box
        position="absolute"
        top="-10%"
        right="-10%"
        w="500px"
        h="500px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(20, 145, 145, 0.15) 0%, transparent 70%)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="-15%"
        left="-10%"
        w="600px"
        h="600px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)"
        pointerEvents="none"
      />

      <Box
        w="full"
        maxW="440px"
        bg="white"
        borderRadius="24px"
        p={{ base: 6, sm: 8 }}
        boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.35)"
        position="relative"
        zIndex={1}
      >
        {/* Brand header */}
        <VStack gap="2" textAlign="center" mb="6">
          <Badge
            bg="#EFF6FF"
            color="#1D4ED8"
            border="1px solid #BFDBFE"
            px="3"
            py="1"
            borderRadius="full"
            fontSize="11.5px"
            fontWeight="800"
            letterSpacing="0.08em"
            textTransform="uppercase"
          >
            I-IMPACT INITIATIVE
          </Badge>

          <Heading as="h1" fontSize="24px" fontWeight="900" color="#051B64">
            Administrator Portal
          </Heading>
          <Text fontSize="13px" color="#64748B">
            Sign in to manage applications, volunteers, messages, and platform content.
          </Text>
        </VStack>

        {/* Error notification */}
        {errorMessage && (
          <Box
            bg="#FEF2F2"
            border="1px solid #FECACA"
            p="3.5"
            borderRadius="12px"
            mb="5"
            color="#991B1B"
            fontSize="13px"
            fontWeight="600"
          >
            {errorMessage}
          </Box>
        )}

        {/* Login form */}
        <form onSubmit={handleSubmit}>
          <VStack gap="4" align="stretch">
            {/* Email / Username */}
            <Box>
              <Text as="label" fontSize="12.5px" fontWeight="700" color="#334155" mb="1.5" display="block">
                Email or Username
              </Text>
              <Box position="relative">
                <Box position="absolute" left="12px" top="12px" color="#94A3B8" pointerEvents="none">
                  <MailIcon size={16} />
                </Box>
                <Input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@i-impact.org or admin"
                  pl="38px"
                  h="44px"
                  fontSize="14px"
                  borderColor="#CBD5E1"
                  borderRadius="10px"
                  _focus={{ borderColor: "#051B64", boxShadow: "0 0 0 1px #051B64" }}
                />
              </Box>
            </Box>

            {/* Password */}
            <Box>
              <Text as="label" fontSize="12.5px" fontWeight="700" color="#334155" mb="1.5" display="block">
                Password
              </Text>
              <Box position="relative">
                <Box position="absolute" left="12px" top="12px" color="#94A3B8" pointerEvents="none">
                  <LockIcon size={16} />
                </Box>
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  pl="38px"
                  pr="38px"
                  h="44px"
                  fontSize="14px"
                  borderColor="#CBD5E1"
                  borderRadius="10px"
                  _focus={{ borderColor: "#051B64", boxShadow: "0 0 0 1px #051B64" }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="xs"
                  position="absolute"
                  right="8px"
                  top="11px"
                  p="1"
                  h="auto"
                  minW="auto"
                  color="#94A3B8"
                  _hover={{ color: "#0F172A" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                </Button>
              </Box>
            </Box>

            {/* Remember Me */}
            <Flex justify="space-between" align="center" pt="1">
              <HStack gap="2" as="label" cursor="pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ width: "16px", height: "16px", accentColor: "#051B64", cursor: "pointer" }}
                />
                <Text fontSize="12.5px" color="#475569" fontWeight="600">
                  Keep me signed in (30 days)
                </Text>
              </HStack>
            </Flex>

            {/* Submit button */}
            <Button
              type="submit"
              w="full"
              h="46px"
              bg="#051B64"
              color="white"
              borderRadius="12px"
              fontSize="14px"
              fontWeight="800"
              _hover={{ bg: "#0A2580", transform: "translateY(-1px)" }}
              _active={{ transform: "translateY(0)" }}
              boxShadow="0 4px 14px rgba(5, 27, 100, 0.25)"
              disabled={loading}
              mt="2"
            >
              {loading ? (
                "Authenticating Credentials..."
              ) : (
                <HStack gap="2">
                  <Text>Sign In to Dashboard</Text>
                  <ArrowRightIcon size={14} />
                </HStack>
              )}
            </Button>
          </VStack>
        </form>

        {/* Initial login helper note */}
        <Box mt="6" p="3.5" bg="#F8FAFC" borderRadius="10px" border="1px solid #E2E8F0" fontSize="12px" color="#64748B">
          <Text fontWeight="700" color="#0F172A" mb="0.5">
            Default Administrator Credentials:
          </Text>
          <Text>
            Email: <Text as="span" fontWeight="700" color="#051B64">admin@i-impact.org</Text> (or username <Text as="span" fontWeight="700" color="#051B64">admin</Text>)
          </Text>
          <Text>
            Password: <Text as="span" fontWeight="700" color="#051B64">ImpactAdmin2026!</Text>
          </Text>
        </Box>

        {/* Back to public website */}
        <Box textAlign="center" mt="5">
          <Link href="/" style={{ fontSize: "12.5px", color: "#64748B", textDecoration: "none" }}>
            ← Return to I-IMPACT Public Website
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <Box
          minH="100vh"
          bg="linear-gradient(135deg, #030F38 0%, #051B64 50%, #08298A 100%)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="white" fontSize="14px" fontWeight="600">
            Loading Admin Portal...
          </Text>
        </Box>
      }
    >
      <LoginForm />
    </Suspense>
  )
}

