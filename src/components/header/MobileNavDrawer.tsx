"use client"

import React, { useState } from "react"
import { Box, Flex, Text, VStack, HStack, Button, Badge } from "@chakra-ui/react"
import Link from "next/link"
import Image from "next/image"
import {
  CloseIcon,
  ChevronDownIcon,
  SearchIcon,
  ArrowRightIcon,
  SunIcon,
  MoonIcon,
  SparklesIcon,
  VideoIcon,
} from "../icons"
import { NAV_ITEMS, NavItem } from "./NavDropdown"

interface MobileNavDrawerProps {
  isOpen: boolean
  onClose: () => void
  onOpenSearch?: () => void
  isDarkMode?: boolean
  onToggleTheme?: () => void
}

export function MobileNavDrawer({
  isOpen,
  onClose,
  isDarkMode,
  onToggleTheme,
}: MobileNavDrawerProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  if (!isOpen) return null

  const toggleAccordion = (label: string) => {
    setOpenAccordion(openAccordion === label ? null : label)
  }

  const filteredNavItems = searchQuery
    ? NAV_ITEMS.filter((item) => {
        const matchesLabel = item.label.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesChild = item.children?.some(
          (c) =>
            c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        return matchesLabel || matchesChild
      })
    : NAV_ITEMS

  return (
    <Box
      position="fixed"
      inset="0"
      zIndex={1100}
      display="flex"
      justifyContent="flex-end"
    >
      {/* Backdrop */}
      <Box
        position="absolute"
        inset="0"
        bg="rgba(5, 27, 100, 0.4)"
        backdropFilter="blur(6px)"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <Box
        position="relative"
        w="100%"
        maxW="360px"
        h="100%"
        bg="white"
        boxShadow="-10px 0 30px rgba(0, 0, 0, 0.15)"
        display="flex"
        flexDirection="column"
        zIndex={10}
        animation="slideLeft 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
      >
        {/* Drawer Header */}
        <Flex
          px="5"
          py="4"
          align="center"
          justify="space-between"
          borderBottom="1px solid"
          borderColor="gray.100"
        >
          <Link href="/" onClick={onClose} style={{ display: "flex", alignItems: "center" }}>
            <HStack
              gap="2"
              align="center"
              bg="linear-gradient(135deg, #051B64 0%, #030F3B 100%)"
              px="2.5"
              py="1.5"
              borderRadius="xl"
              boxShadow="0 2px 8px rgba(5, 27, 100, 0.15)"
              border="1px solid rgba(20, 145, 145, 0.3)"
            >
              <Box position="relative" w="24px" h="24px" flexShrink={0}>
                <Image
                  src="/iimpact-logo.png"
                  alt="I-Impact Icon"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </Box>
              <Box position="relative" w="100px" h="24px" flexShrink={0}>
                <Image
                  src="/iimpact-logo2.png"
                  alt="I-Impact - Raising Champions Everyday"
                  fill
                  style={{ objectFit: "contain", objectPosition: "left" }}
                />
              </Box>
            </HStack>
          </Link>

          <Box
            as="button"
            onClick={onClose}
            p="2"
            borderRadius="lg"
            color="gray.600"
            _hover={{ bg: "gray.100", color: "gray.900" }}
            cursor="pointer"
          >
            <CloseIcon size={18} />
          </Box>
        </Flex>

        {/* Live Search Input in Mobile Drawer */}
        <Box px="5" pt="4" pb="2">
          <Flex
            align="center"
            gap="2"
            px="3"
            py="2"
            borderRadius="xl"
            bg="gray.100"
            border="1px solid"
            borderColor="gray.200"
            _focusWithin={{ borderColor: "#149191", bg: "white" }}
          >
            <SearchIcon size={16} color="#149191" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search programs & events..."
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                fontSize: "13px",
                fontWeight: "500",
                color: "#1F2937",
                background: "transparent",
              }}
            />
            {searchQuery && (
              <Box
                as="button"
                onClick={() => setSearchQuery("")}
                p="0.5"
                color="gray.400"
                _hover={{ color: "gray.600" }}
                cursor="pointer"
              >
                <CloseIcon size={14} />
              </Box>
            )}
          </Flex>
        </Box>

        {/* Nav Items List with Accordions */}
        <Box flex="1" overflowY="auto" px="4" py="2">
          <VStack align="stretch" gap="1">
            {filteredNavItems.map((item: NavItem, idx) => {
              const hasChildren = item.children && item.children.length > 0
              const isExpanded = openAccordion === item.label || searchQuery.length > 0

              if (!hasChildren) {
                return (
                  <Link key={idx} href={item.href || "#"} onClick={onClose}>
                    <Flex
                      px="3"
                      py="2.5"
                      borderRadius="lg"
                      align="center"
                      justify="space-between"
                      fontSize="sm"
                      fontWeight="600"
                      color="gray.800"
                      _hover={{ bg: "rgba(20, 145, 145, 0.08)", color: "#149191" }}
                      cursor="pointer"
                    >
                      <Text>{item.label}</Text>
                      <ArrowRightIcon size={14} color="gray.400" />
                    </Flex>
                  </Link>
                )
              }

              return (
                <Box key={idx}>
                  <Flex
                    as="button"
                    onClick={() => toggleAccordion(item.label)}
                    w="100%"
                    px="3"
                    py="2.5"
                    borderRadius="lg"
                    align="center"
                    justify="space-between"
                    fontSize="sm"
                    fontWeight="600"
                    color={isExpanded ? "#149191" : "gray.800"}
                    bg={isExpanded ? "rgba(20, 145, 145, 0.06)" : "transparent"}
                    _hover={{ bg: "rgba(20, 145, 145, 0.08)", color: "#149191" }}
                    cursor="pointer"
                  >
                    <Text>{item.label}</Text>
                    <Box
                      transform={isExpanded ? "rotate(180deg)" : "rotate(0deg)"}
                      transition="transform 0.2s ease"
                    >
                      <ChevronDownIcon size={16} />
                    </Box>
                  </Flex>

                  {/* Sub-menu items */}
                  {isExpanded && item.children && (
                    <VStack align="stretch" gap="1" pl="3" pr="1" py="2">
                      {item.children.map((child, cIdx) => (
                        <Link key={cIdx} href={child.href} onClick={onClose}>
                          <Flex
                            p="2"
                            borderRadius="md"
                            gap="2.5"
                            align="center"
                            _hover={{ bg: "gray.100" }}
                            cursor="pointer"
                          >
                            {child.icon && (
                              <Box
                                p="1.5"
                                bg="white"
                                borderRadius="md"
                                boxShadow="xs"
                                display="flex"
                                alignItems="center"
                              >
                                {child.icon}
                              </Box>
                            )}
                            <Box flex="1">
                              <HStack gap="2">
                                <Text fontSize="xs" fontWeight="600" color="gray.800">
                                  {child.title}
                                </Text>
                                {child.badge && (
                                  <Badge
                                    bg="rgba(20, 145, 145, 0.15)"
                                    color="#149191"
                                    fontSize="9px"
                                    px="1.5"
                                  >
                                    {child.badge}
                                  </Badge>
                                )}
                              </HStack>
                              <Text fontSize="10px" color="gray.500" lineClamp={1}>
                                {child.description}
                              </Text>
                            </Box>
                          </Flex>
                        </Link>
                      ))}
                    </VStack>
                  )}
                </Box>
              )
            })}
          </VStack>

          {/* Highlight Card */}
          <Box
            mt="4"
            p="3.5"
            borderRadius="xl"
            bg="linear-gradient(135deg, #051B64 0%, #149191 100%)"
            color="white"
          >
            <HStack gap="1.5" mb="1">
              <SparklesIcon size={14} color="#FACC15" />
              <Text fontSize="xs" fontWeight="bold">
                Join Champion Mentorship
              </Text>
            </HStack>
            <Text fontSize="11px" color="whiteAlpha.900" mb="3">
              Applications for the 2026 youth cohort are currently open.
            </Text>
            <Link href="/programs/mentorship" onClick={onClose}>
              <Box
                as="button"
                w="100%"
                py="1.5"
                bg="white"
                color="#051B64"
                borderRadius="lg"
                fontSize="xs"
                fontWeight="bold"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                Apply for Mentorship
              </Box>
            </Link>
          </Box>
        </Box>

        {/* Drawer Bottom Actions */}
        <Box p="4" borderTop="1px solid" borderColor="gray.100" bg="gray.50">
          <VStack gap="2" w="100%">
            <Link href="/meet" style={{ width: "100%" }} onClick={onClose}>
              <Button
                w="100%"
                size="sm"
                bg="linear-gradient(135deg, #051B64 0%, #149191 100%)"
                color="white"
                _hover={{ bg: "#04154d" }}
                fontWeight="bold"
                borderRadius="lg"
              >
                <HStack gap="1.5">
                  <VideoIcon size={14} color="#FACC15" />
                  <Text>I-IMPACT MEET</Text>
                  <Box
                    bg="#EF4444"
                    color="white"
                    fontSize="9px"
                    px="1.5"
                    py="0.2"
                    borderRadius="full"
                    fontWeight="900"
                    letterSpacing="wider"
                  >
                    LIVE
                  </Box>
                </HStack>
              </Button>
            </Link>

            <Link href="/donate" style={{ width: "100%" }} onClick={onClose}>
              <Button
                w="100%"
                size="sm"
                bg="#149191"
                color="white"
                _hover={{ bg: "#107979" }}
                fontWeight="bold"
                borderRadius="lg"
              >
                Donate & Support
              </Button>
            </Link>

            <Link href="/get-involved" style={{ width: "100%" }} onClick={onClose}>
              <Button
                w="100%"
                size="sm"
                variant="outline"
                borderColor="#051B64"
                color="#051B64"
                _hover={{ bg: "rgba(5, 27, 100, 0.05)" }}
                fontWeight="bold"
                borderRadius="lg"
              >
                Get Involved
              </Button>
            </Link>
          </VStack>

          {/* Theme Toggle & Info */}
          {onToggleTheme && (
            <Flex justify="space-between" align="center" mt="3" pt="2">
              <Text fontSize="xs" color="gray.500">
                Mode: {isDarkMode ? "Dark" : "Light"}
              </Text>
              <Box
                as="button"
                onClick={onToggleTheme}
                p="1.5"
                borderRadius="md"
                bg="white"
                border="1px solid"
                borderColor="gray.200"
                cursor="pointer"
                color="gray.700"
              >
                {isDarkMode ? <SunIcon size={16} /> : <MoonIcon size={16} />}
              </Box>
            </Flex>
          )}
        </Box>
      </Box>
    </Box>
  )
}
