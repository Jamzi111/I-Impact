"use client"

import React, { useState, useEffect } from "react"
import { Box, Flex, HStack, Button, Text, Container } from "@chakra-ui/react"
import Link from "next/link"
import Image from "next/image"
import {
  MenuIcon,
  SunIcon,
  MoonIcon,
  SparklesIcon,
  VideoIcon,
} from "../icons"
import { NavDropdownItem, NAV_ITEMS } from "./NavDropdown"
import { SearchPopover } from "./SearchPopover"
import { MobileNavDrawer } from "./MobileNavDrawer"
import { NotificationsPopover } from "./NotificationsPopover"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

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

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev)
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark")
    }
  }

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex={900}
      w="100%"
      transition="all 0.3s ease"
    >
      {/* Main Navbar */}
      <Box
        bg={
          isScrolled
            ? "rgba(255, 255, 255, 0.92)"
            : "rgba(255, 255, 255, 0.98)"
        }
        backdropFilter={isScrolled ? "blur(16px)" : "none"}
        borderBottom="1px solid"
        borderColor={isScrolled ? "rgba(5, 27, 100, 0.08)" : "gray.100"}
        boxShadow={
          isScrolled
            ? "0 10px 30px -10px rgba(5, 27, 100, 0.08)"
            : "0 1px 2px rgba(0, 0, 0, 0.02)"
        }
        transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
      >
        <Container maxW="1440px" px={{ base: "3", md: "4" }} py={{ base: "2", md: "2" }}>
          <Flex align="center" justify="space-between" gap={{ base: "2", md: "2.5" }}>
            {/* Brand Logos inside a sleek navy/teal capsule */}
            <Link href="/" style={{ flexShrink: 0 }}>
              <HStack
                gap="2"
                align="center"
                cursor="pointer"
                userSelect="none"
                bg="linear-gradient(135deg, #051B64 0%, #030F3B 100%)"
                px={{ base: "2", md: "3" }}
                py={{ base: "1", md: "1.5" }}
                borderRadius="xl"
                boxShadow="0 2px 8px rgba(5, 27, 100, 0.15)"
                border="1px solid rgba(20, 145, 145, 0.3)"
                transition="all 0.2s ease"
                _hover={{
                  transform: "scale(1.02)",
                  borderColor: "rgba(20, 145, 145, 0.6)",
                  boxShadow: "0 4px 12px rgba(5, 27, 100, 0.25)",
                }}
              >
                {/* Left Logo Icon */}
                <Box
                  position="relative"
                  w={{ base: "28px", md: "34px" }}
                  h={{ base: "28px", md: "34px" }}
                  flexShrink={0}
                >
                  <Image
                    src="/iimpact-logo.png"
                    alt="I-Impact Icon"
                    fill
                    sizes="34px"
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </Box>

                {/* Main Logo / Tagline Beside It */}
                <Box
                  position="relative"
                  h={{ base: "24px", md: "28px" }}
                  w={{ base: "110px", md: "130px" }}
                  flexShrink={0}
                >
                  <Image
                    src="/iimpact-logo2.png"
                    alt="I-Impact - Raising Champions Everyday"
                    fill
                    sizes="(max-width: 768px) 110px, 130px"
                    style={{ objectFit: "contain", objectPosition: "left" }}
                    priority
                  />
                </Box>
              </HStack>
            </Link>

            {/* Desktop Navigation Links with Dropdowns */}
            <HStack
              as="nav"
              gap="0.5"
              display={{ base: "none", lg: "flex" }}
              align="center"
              flexWrap="nowrap"
            >
              {NAV_ITEMS.map((item, index) => (
                <NavDropdownItem key={index} item={item} />
              ))}
            </HStack>

            {/* Right Side Actions */}
            <HStack gap={{ base: "1", sm: "1.5" }} align="center" flexShrink={0}>
              {/* Search Popover (Icon button with attached floating dropdown) */}
              <SearchPopover />

              {/* Notifications Popover */}
              <NotificationsPopover />

              {/* Dark / Light Mode Switch (Desktop only, mobile has it in drawer) */}
              <Box
                as="button"
                aria-label="Toggle Color Theme"
                onClick={toggleTheme}
                p="1"
                borderRadius="md"
                color="gray.600"
                _hover={{ bg: "gray.100", color: "#149191" }}
                cursor="pointer"
                display={{ base: "none", lg: "flex" }}
                alignItems="center"
                justifyContent="center"
                transition="all 0.2s"
              >
                {isDarkMode ? <SunIcon size={15} /> : <MoonIcon size={15} />}
              </Box>

              {/* Desktop CTA Button: I-IMPACT MEET (Positioned right before Donate) */}
              <Box display={{ base: "none", lg: "block" }} flexShrink={0}>
                <Link href="/meet">
                  <Button
                    size="xs"
                    h="26px"
                    bg="linear-gradient(135deg, #051B64 0%, #149191 100%)"
                    color="white"
                    _hover={{
                      transform: "translateY(-1px)",
                      boxShadow: "0 3px 8px rgba(20, 145, 145, 0.35)",
                    }}
                    _active={{ transform: "translateY(0)" }}
                    borderRadius="full"
                    fontWeight="bold"
                    px="2"
                    fontSize="10px"
                    transition="all 0.2s ease"
                    boxShadow="0 1px 4px rgba(5, 27, 100, 0.2)"
                  >
                    <HStack gap="1">
                      <VideoIcon size={10} color="#FACC15" />
                      <Text fontSize="10px">I-IMPACT MEET</Text>
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
              <Box display={{ base: "none", lg: "block" }} flexShrink={0}>
                <Link href="/donate">
                  <Button
                    size="xs"
                    h="26px"
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
                    px="2.5"
                    fontSize="10.5px"
                    transition="all 0.2s ease"
                    boxShadow="0 1px 4px rgba(20, 145, 145, 0.25)"
                  >
                    <HStack gap="1">
                      <SparklesIcon size={10} color="#FACC15" />
                      <Text fontSize="10.5px">Donate</Text>
                    </HStack>
                  </Button>
                </Link>
              </Box>

              {/* Mobile Menu Hamburger Button */}
              <Box
                as="button"
                aria-label="Open Mobile Menu"
                onClick={() => setIsMobileMenuOpen(true)}
                display={{ base: "flex", lg: "none" }}
                alignItems="center"
                justifyContent="center"
                p="1.5"
                borderRadius="lg"
                color="gray.700"
                _hover={{ bg: "gray.100", color: "#149191" }}
                cursor="pointer"
                transition="all 0.2s"
              >
                <MenuIcon size={20} />
              </Box>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Mobile Navigation Drawer */}
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />
    </Box>
  )
}
