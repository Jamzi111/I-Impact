"use client"

import React, { useState, useEffect } from "react"
import { Box, Flex, HStack, Button, Text, Container } from "@chakra-ui/react"
import Link from "next/link"
import Image from "next/image"
import {
  MenuIcon,
  SparklesIcon,
  VideoIcon,
} from "../icons"
import { NavDropdownItem, NAV_ITEMS } from "./NavDropdown"
import { SearchPopover } from "./SearchPopover"
import { MobileNavDrawer } from "./MobileNavDrawer"
import { NotificationsPopover } from "./NotificationsPopover"

export function Header({ variant = "default" }: { variant?: "default" | "dark" | "frosted" | "event" | "white" } = {}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isWhiteNav = variant === "white"
  const isEventVariant = variant === "event"
  const isDarkNav = variant === "dark"
  const isNavActive = isScrolled || variant === "frosted" || isDarkNav || isEventVariant || isWhiteNav

  // Background: crisp solid white for "white" variant, #F4F8FE for event at top, transparent for default, white when scrolled
  const headerBg = isWhiteNav
    ? "#FFFFFF"
    : isEventVariant
    ? isScrolled
      ? "rgba(255, 255, 255, 0.95)"
      : "#F4F8FE"
    : isDarkNav
    ? "rgba(6, 11, 25, 0.94)"
    : isNavActive
    ? "rgba(255, 255, 255, 0.95)"
    : "transparent"

  const headerBorder = isWhiteNav
    ? "1px solid rgba(5, 27, 100, 0.08)"
    : isEventVariant || isNavActive
    ? "1px solid rgba(5, 27, 100, 0.08)"
    : isDarkNav
    ? "1px solid rgba(255, 255, 255, 0.1)"
    : "1px solid transparent"

  const headerShadow = isWhiteNav
    ? "0 4px 20px -5px rgba(5, 27, 100, 0.08)"
    : isEventVariant || isNavActive
    ? "0 10px 30px -10px rgba(5, 27, 100, 0.08)"
    : isDarkNav
    ? "0 10px 30px -10px rgba(0, 0, 0, 0.5)"
    : "none"

  return (
    <Box
      as="header"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex={900}
      w="100%"
      transition="all 0.3s ease"
    >
      {/* Main Navbar */}
      <Box
        bg={headerBg}
        backdropFilter="blur(16px)"
        borderBottom={headerBorder}
        boxShadow={headerShadow}
        transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
      >
        <Container
          maxW={{ base: "1480px", lg: "100%", xl: "1440px", "2xl": "1560px" }}
          px={{ base: "4", sm: "6", md: "8", lg: "3", xl: "4", "2xl": "6" }}
          py={{ base: "3", sm: "3.5", md: "4", lg: "2.5", xl: "3" }}
        >
          <Flex
            align="center"
            justify="space-between"
            w="100%"
            maxW="100%"
          >
            {/* Brand Logo - Exact same as homepage when on event variant */}
            <Link href="/" style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
              <Box
                position="relative"
                h={{ base: "44px", sm: "48px", md: "52px", lg: "40px", xl: "44px", "2xl": "48px" }}
                w={{ base: "155px", sm: "170px", md: "190px", lg: "140px", xl: "160px", "2xl": "180px" }}
                cursor="pointer"
                userSelect="none"
                bg={isDarkNav ? "rgba(255, 255, 255, 0.96)" : "transparent"}
                px={isDarkNav ? "2.5" : "0"}
                py={isDarkNav ? "1" : "0"}
                borderRadius={isDarkNav ? "lg" : "none"}
                boxShadow={isDarkNav ? "0 2px 8px rgba(0, 0, 0, 0.25)" : "none"}
                transition="transform 0.2s ease, opacity 0.2s ease"
                _hover={{
                  transform: "scale(1.02)",
                  opacity: 0.95,
                }}
              >
                <Image
                  src="/iimpact-logo2.png"
                  alt="I-Impact - Raising Champions Everyday"
                  fill
                  sizes="(max-width: 768px) 170px, 200px"
                  style={{ objectFit: "contain", objectPosition: isDarkNav ? "center" : "left" }}
                  priority
                />
              </Box>
            </Link>

            {/* Desktop Navigation & Actions Cluster (Reduced space between Contact and Search) */}
            <HStack
              display={{ base: "none", lg: "flex" }}
              align="center"
              gap={{ lg: "1.5", xl: "2", "2xl": "3" }}
              flexShrink={0}
            >
              {/* Desktop Navigation Links with Dropdowns */}
              <HStack
                as="nav"
                gap={{ lg: "0.15", xl: "0.25", "2xl": "0.5" }}
                align="center"
                flexWrap="nowrap"
              >
                {NAV_ITEMS.map((item, index) => (
                  <NavDropdownItem key={index} item={item} isDarkNav={isDarkNav} />
                ))}
              </HStack>

              {/* Desktop Right Side Actions */}
              <HStack
                gap={{ lg: "1", xl: "1.5" }}
                align="center"
                flexShrink={0}
              >
                {/* Search Popover (Icon button with attached floating dropdown) */}
                <SearchPopover isDarkNav={isDarkNav} />

                {/* Notifications Popover */}
                <NotificationsPopover isDarkNav={isDarkNav} />

                {/* Desktop CTA Button: I-IMPACT MEET (Positioned right before Donate) */}
                <Box flexShrink={0}>
                  <Link href="/meet">
                    <Button
                      size="xs"
                      h={{ lg: "26px", xl: "28px" }}
                      bg="linear-gradient(135deg, #051B64 0%, #149191 100%)"
                      color="white"
                      _hover={{
                        transform: "translateY(-1px)",
                        boxShadow: "0 3px 8px rgba(20, 145, 145, 0.35)",
                      }}
                      _active={{ transform: "translateY(0)" }}
                      borderRadius="full"
                      fontWeight="bold"
                      px={{ lg: "2", xl: "2.5" }}
                      fontSize={{ lg: "9.5px", xl: "10.5px" }}
                      transition="all 0.2s ease"
                      boxShadow="0 1px 4px rgba(5, 27, 100, 0.2)"
                    >
                      <HStack gap="1">
                        <VideoIcon size={10} color="#FACC15" />
                        <Text fontSize={{ lg: "9.5px", xl: "10.5px" }}>I-IMPACT MEET</Text>
                        <Box
                          bg="#EF4444"
                          color="white"
                          fontSize="7px"
                          px="1"
                          py="0.1"
                          borderRadius="full"
                          fontWeight="900"
                          letterSpacing="wider"
                          lineHeight="1"
                        >
                          LIVE
                        </Box>
                      </HStack>
                    </Button>
                  </Link>
                </Box>

                {/* Desktop CTA Button: Donate / Support */}
                <Box flexShrink={0}>
                  <Link href="/donate">
                    <Button
                      size="xs"
                      h={{ lg: "26px", xl: "28px" }}
                      bg="linear-gradient(135deg, #149191 0%, #0d6d6d 100%)"
                      color="white"
                      _hover={{
                        bg: "linear-gradient(135deg, #107979 0%, #095252 100%)",
                        transform: "translateY(-1px)",
                        boxShadow: "0 3px 8px rgba(20, 145, 145, 0.35)",
                      }}
                      _active={{ transform: "translateY(0)" }}
                      borderRadius="full"
                      fontWeight="bold"
                      px={{ lg: "2.5", xl: "3" }}
                      fontSize={{ lg: "10px", xl: "11px" }}
                      transition="all 0.2s ease"
                      boxShadow="0 1px 4px rgba(20, 145, 145, 0.25)"
                    >
                      <HStack gap="1">
                        <SparklesIcon size={10} color="#FACC15" />
                        <Text fontSize={{ lg: "10px", xl: "11px" }}>Donate</Text>
                      </HStack>
                    </Button>
                  </Link>
                </Box>
              </HStack>
            </HStack>

            {/* Mobile Actions: Search, Notifications & Hamburger Button */}
            <HStack
              gap={{ base: "1", sm: "1.5" }}
              align="center"
              display={{ base: "flex", lg: "none" }}
              flexShrink={0}
            >
              <SearchPopover isDarkNav={isDarkNav} />
              <NotificationsPopover isDarkNav={isDarkNav} />
              <Box
                as="button"
                aria-label="Open Mobile Menu"
                onClick={() => setIsMobileMenuOpen(true)}
                display="flex"
                alignItems="center"
                justifyContent="center"
                p="2"
                borderRadius="lg"
                color={isDarkNav ? "#FFFFFF" : "gray.700"}
                _hover={{ bg: isDarkNav ? "rgba(255, 255, 255, 0.12)" : "gray.100", color: "#149191" }}
                cursor="pointer"
                transition="all 0.2s"
              >
                <MenuIcon size={24} />
              </Box>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Mobile Navigation Drawer */}
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </Box>
  )
}
