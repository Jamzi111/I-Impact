"use client"

import React, { useState, useEffect, Suspense } from "react"
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Input,
  Badge,
  Spinner,
} from "@chakra-ui/react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import {
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  CloseIcon,
} from "@/components/icons"

interface InviteData {
  name: string
  email: string
  role: string
  roleLabel: string
}

function AcceptInviteContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token") || ""

  const [validating, setValidating] = useState(true)
  const [invite, setInvite] = useState<InviteData | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) {
      setValidationError("Missing invitation token. Please check your invitation email.")
      setValidating(false)
      return
    }

    const validateToken = async () => {
      try {
        setValidating(true)
        const res = await fetch(`/api/admin/auth/accept-invite?token=${encodeURIComponent(token)}`)
        const data = await res.json()

        if (!res.ok || !data.success) {
          throw new Error(data.error || "Invalid or expired invitation token.")
        }

        setInvite(data.invite)
      } catch (err: any) {
        setValidationError(err.message || "Failed to validate invitation.")
      } finally {
        setValidating(false)
      }
    }

    validateToken()
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    if (password.length < 8) {
      setFormError("Password must be at least 8 characters long.")
      return
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match. Please re-enter.")
      return
    }

    try {
      setSubmitting(true)
      const res = await fetch("/api/admin/auth/accept-invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to activate administrator account.")
      }

      // Hard redirect to load full admin workspace with cookies
      window.location.href = "/admin"
    } catch (err: any) {
      setFormError(err.message || "An unexpected error occurred. Please try again.")
      setSubmitting(false)
    }
  }

  return (
    <Box
      minH="100vh"
      bg="#F8FAFC"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={{ base: "4", sm: "6" }}
    >
      <Box w="full" maxW="480px">
        {/* Brand Logo */}
        <Box textAlign="center" mb="6">
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
              priority
            />
          </Box>
        </Box>

        {/* Card */}
        <Box
          bg="white"
          borderRadius="20px"
          p={{ base: "6", sm: "9" }}
          border="1px solid #E2E8F0"
          boxShadow="0 10px 30px rgba(15, 23, 42, 0.05)"
        >
          {validating ? (
            <VStack gap="4" py="10" textAlign="center">
              <Spinner size="lg" color="#051B64" />
              <Text fontSize="14px" fontWeight="600" color="#475569">
                Verifying your invitation credentials...
              </Text>
            </VStack>
          ) : validationError ? (
            <VStack gap="4" py="4" textAlign="center">
              <Box
                w="52px"
                h="52px"
                borderRadius="full"
                bg="#FEF2F2"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="#EF4444"
              >
                <CloseIcon size={24} />
              </Box>

              <Heading as="h2" fontSize="20px" fontWeight="800" color="#0F172A">
                Invitation Invalid or Expired
              </Heading>

              <Text fontSize="13.5px" color="#64748B" lineHeight="1.6">
                {validationError}
              </Text>

              <Link href="/admin/login" style={{ textDecoration: "none", width: "100%" }}>
                <Button
                  w="full"
                  h="44px"
                  bg="#051B64"
                  color="white"
                  borderRadius="10px"
                  fontSize="13.5px"
                  fontWeight="700"
                  _hover={{ bg: "#0A2580" }}
                  mt="2"
                >
                  Return to Admin Sign In
                </Button>
              </Link>
            </VStack>
          ) : invite ? (
            <>
              {/* Header */}
              <VStack gap="1.5" align="flex-start" mb="5">
                <HStack gap="2">
                  <Badge
                    bg="#EFF6FF"
                    color="#1D4ED8"
                    border="1px solid #BFDBFE"
                    px="2.5"
                    py="0.5"
                    borderRadius="full"
                    fontSize="11px"
                    fontWeight="800"
                    textTransform="uppercase"
                  >
                    INVITATION ACCEPTED
                  </Badge>
                </HStack>
                <Heading as="h2" fontSize="22px" fontWeight="800" color="#0F172A">
                  Welcome, {invite.name}!
                </Heading>
                <Text fontSize="13.5px" color="#64748B">
                  Set up your administrator password to activate your portal access.
                </Text>
              </VStack>

              {/* Verified Invite Details Bar */}
              <Box bg="#F8FAFC" p="4" borderRadius="12px" border="1px solid #E2E8F0" mb="5">
                <HStack justify="space-between" wrap="wrap" gap="3">
                  <Box>
                    <Text fontSize="11px" color="#64748B" fontWeight="700" textTransform="uppercase">
                      Email Address
                    </Text>
                    <Text fontSize="13.5px" fontWeight="700" color="#051B64">
                      {invite.email}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="11px" color="#64748B" fontWeight="700" textTransform="uppercase">
                      Assigned Role
                    </Text>
                    <Badge
                      bg="#ECFDF5"
                      color="#059669"
                      border="1px solid #A7F3D0"
                      px="2.5"
                      py="0.5"
                      borderRadius="md"
                      fontSize="12px"
                      fontWeight="700"
                    >
                      {invite.roleLabel}
                    </Badge>
                  </Box>
                </HStack>
              </Box>

              {formError && (
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
                  {formError}
                </Box>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <VStack gap="4" align="stretch">
                  <Box>
                    <Text as="label" fontSize="13px" fontWeight="700" color="#334155" mb="1.5" display="block">
                      Create Password
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
                        placeholder="At least 8 characters"
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

                  <Box>
                    <Text as="label" fontSize="13px" fontWeight="700" color="#334155" mb="1.5" display="block">
                      Confirm Password
                    </Text>
                    <Box position="relative">
                      <Box position="absolute" left="14px" top="13px" color="#94A3B8" pointerEvents="none">
                        <LockIcon size={16} />
                      </Box>
                      <Input
                        type={showPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"
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
                    disabled={submitting}
                    mt="2"
                  >
                    {submitting ? (
                      <HStack gap="2">
                        <Spinner size="xs" color="white" />
                        <Text>Activating Account...</Text>
                      </HStack>
                    ) : (
                      <HStack gap="2">
                        <Text>Complete Setup & Enter Dashboard</Text>
                        <ArrowRightIcon size={15} />
                      </HStack>
                    )}
                  </Button>
                </VStack>
              </form>

              <Box mt="6" pt="5" borderTop="1px solid #F1F5F9" textAlign="center">
                <HStack justify="center" gap="1.5" color="#64748B" mb="1">
                  <ShieldCheckIcon size={15} color="#059669" />
                  <Text fontSize="12px" fontWeight="700" textTransform="uppercase" letterSpacing="0.04em">
                    Encrypted Verification
                  </Text>
                </HStack>
                <Text fontSize="12px" color="#64748B" lineHeight="1.5">
                  Your credentials are encrypted and authenticated directly with I-IMPACT servers.
                </Text>
              </Box>
            </>
          ) : null}
        </Box>
      </Box>
    </Box>
  )
}

export default function AcceptInvitePage() {
  return (
    <Suspense
      fallback={
        <Box minH="100vh" bg="#F8FAFC" display="flex" alignItems="center" justifyContent="center">
          <Spinner size="sm" color="#051B64" />
        </Box>
      }
    >
      <AcceptInviteContent />
    </Suspense>
  )
}

