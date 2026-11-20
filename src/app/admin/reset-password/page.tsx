"use client"

import React, { useState, Suspense } from "react"
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Input,
  HStack,
  Spinner,
} from "@chakra-ui/react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ShieldIcon,
} from "@/components/icons"

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token") || ""

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!token) {
      setErrorMessage("Missing or invalid password reset token.")
      return
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.")
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please verify and re-enter.")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/admin/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update password. Link may be expired.")
      }

      setSuccess(true)
    } catch (err: any) {
      console.error("Reset password error:", err)
      setErrorMessage(err.message || "Failed to reset password. Please try again.")
    } finally {
      setLoading(false)
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
      <Box w="full" maxW="440px">
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
          p={{ base: "6", sm: "8" }}
          border="1px solid #E2E8F0"
          boxShadow="0 10px 30px rgba(15, 23, 42, 0.05)"
        >
          {success ? (
            <VStack gap="4" textAlign="center" py="4">
              <Box
                w="48px"
                h="48px"
                borderRadius="full"
                bg="#ECFDF5"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="#059669"
              >
                <CheckCircleIcon size={28} />
              </Box>

              <Heading as="h2" fontSize="20px" fontWeight="800" color="#0F172A">
                Password Reset Successfully
              </Heading>

              <Text fontSize="13.5px" color="#64748B" lineHeight="1.6">
                Your administrator credentials have been securely updated. You can now sign in with your new password.
              </Text>

              <Link href="/admin/login" style={{ textDecoration: "none", width: "100%" }}>
                <Button
                  w="full"
                  h="46px"
                  bg="#051B64"
                  color="white"
                  borderRadius="10px"
                  fontSize="14px"
                  fontWeight="700"
                  _hover={{ bg: "#0A2580" }}
                  mt="2"
                >
                  <HStack gap="2">
                    <Text>Sign in to Dashboard</Text>
                    <ArrowRightIcon size={14} />
                  </HStack>
                </Button>
              </Link>
            </VStack>
          ) : (
            <>
              <VStack gap="1.5" align="flex-start" mb="6">
                <Heading as="h2" fontSize="22px" fontWeight="800" color="#0F172A">
                  Set New Password
                </Heading>
                <Text fontSize="13.5px" color="#64748B">
                  Create a strong password for your administrator account.
                </Text>
              </VStack>

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

              {!token ? (
                <VStack gap="4" py="3" textAlign="center">
                  <Text fontSize="13.5px" color="#991B1B">
                    Invalid or missing recovery token. Please request a new password recovery link.
                  </Text>
                  <Link href="/admin/forgot-password" style={{ textDecoration: "none", width: "100%" }}>
                    <Button w="full" h="44px" bg="#051B64" color="white" borderRadius="10px" fontSize="13.5px">
                      Request New Link
                    </Button>
                  </Link>
                </VStack>
              ) : (
                <form onSubmit={handleSubmit}>
                  <VStack gap="4.5" align="stretch">
                    {/* New Password */}
                    <Box>
                      <Text as="label" fontSize="13px" fontWeight="700" color="#334155" mb="1.5" display="block">
                        New Password
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

                    {/* Confirm Password */}
                    <Box>
                      <Text as="label" fontSize="13px" fontWeight="700" color="#334155" mb="1.5" display="block">
                        Confirm New Password
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
                          placeholder="Re-enter new password"
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
                      h="46px"
                      bg="#051B64"
                      color="white"
                      borderRadius="10px"
                      fontSize="14px"
                      fontWeight="700"
                      _hover={{ bg: "#0A2580" }}
                      disabled={loading}
                      mt="1"
                    >
                      {loading ? (
                        <HStack gap="2">
                          <Spinner size="xs" color="white" />
                          <Text>Updating Password...</Text>
                        </HStack>
                      ) : (
                        "Reset Password"
                      )}
                    </Button>
                  </VStack>
                </form>
              )}

              <Box mt="6" pt="5" borderTop="1px solid #F1F5F9" textAlign="center">
                <HStack justify="center" gap="1.5" color="#64748B" mb="1">
                  <ShieldIcon size={14} color="#64748B" />
                  <Text fontSize="12px" fontWeight="700" textTransform="uppercase" letterSpacing="0.04em">
                    Secure Encryption
                  </Text>
                </HStack>
                <Text fontSize="12px" color="#64748B" lineHeight="1.5">
                  Passwords are salted and cryptographically hashed before saving.
                </Text>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default function AdminResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <Box minH="100vh" bg="#F8FAFC" display="flex" alignItems="center" justifyContent="center">
          <Spinner size="sm" color="#051B64" />
        </Box>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  )
}

