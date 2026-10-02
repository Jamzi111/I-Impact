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

export function Header() {
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
        bg={
          isScrolled
            ? "rgba(255, 255, 255, 0.94)"
            : "transparent"
        }
        backdropFilter={isScrolled ? "blur(16px)" : "none"}
        borderBottom="1px solid"
        borderColor={isScrolled ? "rgba(5, 27, 100, 0.08)" : "transparent"}
        boxShadow={
          isScrolled
            ? "0 10px 30px -10px rgba(5, 27, 100, 0.08)"
            : "none"
        }
        transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
      >
        <Container maxW="1440px" px={{ base: "3", md: "4" }} py={{ base: "2", md: "2" }}>
          <Flex align="center" justify="space-between" gap={{ base: "2", md: "2.5" }}>
            {/* Brand Logo - Sitting directly on the header without background container */}
            <Link href="/" style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
              <Box
                position="relative"
                h={{ base: "32px", sm: "36px", md: "42px" }}
                w={{ base: "130px", sm: "155px", md: "180px" }}
                cursor="pointer"
                userSelect="none"
                transition="transform 0.2s ease, opacity 0.2s ease"
                _hover={{
                  transform: "scale(1.02)",
                  opacity: 0.9,
                }}
              >
                <Image
                  src="/iimpact-logo2.png"
                  alt="I-Impact - Raising Champions Everyday"
                  fill
                  sizes="(max-width: 768px) 155px, 180px"
                  style={{ objectFit: "contain", objectPosition: "left" }}
                  priority
                />
              </Box>
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
      />
    </Box>
  )
}
