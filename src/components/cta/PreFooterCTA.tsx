"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  VStack,
  Button,
} from "@chakra-ui/react"
import Link from "next/link"
import {
  GraduationCapIcon,
  HeartHandshakeIcon,
  HeartIcon,
  BuildingIcon,
  ArrowRightIcon,
} from "@/components/icons"

interface PathwayOption {
  id: string
  icon: React.ReactNode
  iconBg: string
  accentColor: string
  barGradient: string
  title: string
  description: string
  buttonText: string
  buttonBg: string
  buttonColor: string
  buttonHoverBg: string
  href: string
}

const PATHWAY_OPTIONS: PathwayOption[] = [
  {
    id: "youth",
    icon: <GraduationCapIcon size={20} color="#10B981" />,
    iconBg: "rgba(16, 185, 129, 0.15)",
    accentColor: "#10B981",
    barGradient: "linear-gradient(90deg, #10B981 0%, #149191 100%)",
    title: "For Youth & Students",
    description:
      "Gain admission into free digital bootcamps, leadership academies, and connect with direct mentors who guide your life pathway.",
    buttonText: "Join Next Cohort",
    buttonBg: "#051B64",
    buttonColor: "#FFFFFF",
    buttonHoverBg: "#0A247A",
    href: "/events",
  },
  {
    id: "professionals",
    icon: <HeartHandshakeIcon size={20} color="#6366F1" />,
    iconBg: "rgba(99, 102, 241, 0.14)",
    accentColor: "#6366F1",
    barGradient: "linear-gradient(90deg, #6366F1 0%, #047857 100%)",
    title: "For Professionals",
    description:
      "Invest 2–4 hours monthly to mentor a passionate Nigerian youth in tech, career direction, entrepreneurship, or governance.",
    buttonText: "Become a Mentor",
    buttonBg: "#047857",
    buttonColor: "#FFFFFF",
    buttonHoverBg: "#065F46",
    href: "/contact",
  },
  {
    id: "supporters",
    icon: <HeartIcon size={20} color="#E11D48" />,
    iconBg: "rgba(225, 29, 72, 0.13)",
    accentColor: "#E11D48",
    barGradient: "linear-gradient(90deg, #F43F5E 0%, #BE123C 100%)",
    title: "For Supporters & Donors",
    description:
      "Support our outreaches with resources, learning kits, logistics, or gifts to empower vulnerable and ambitious youths.",
    buttonText: "Support Our Mission",
    buttonBg: "#BE123C",
    buttonColor: "#FFFFFF",
    buttonHoverBg: "#9F1239",
    href: "/contact",
  },
  {
    id: "organizations",
    icon: <BuildingIcon size={20} color="#D97706" />,
    iconBg: "rgba(245, 158, 11, 0.15)",
    accentColor: "#D97706",
    barGradient: "linear-gradient(90deg, #F59E0B 0%, #051B64 100%)",
    title: "For Organizations",
    description:
      "Sponsor an entire cohort, equip an underserved rural school with digital gear, or power an upcoming AS A TEEN summit city.",
    buttonText: "Partner or Sponsor",
    buttonBg: "#EEF2FF",
    buttonColor: "#051B64",
    buttonHoverBg: "#E0E7FF",
    href: "/contact",
  },
]

export function PreFooterCTA() {
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
      observer.disconnect()
    }
  }, [])

  return (
    <Box
      as="section"
      id="choose-pathway"
      ref={sectionRef}
      py={{ base: "12", sm: "14", md: "16", lg: "18" }}
      bg="linear-gradient(180deg, #FBFDFF 0%, #F5F9FE 100%)"
      position="relative"
      overflow="hidden"
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor="#F1F5F9"
    >
      {/* Ambient background glow */}
      <Box
        position="absolute"
        top="-15%"
        left="50%"
        transform="translateX(-50%)"
        w="900px"
        h="450px"
        bg="radial-gradient(ellipse, rgba(20, 145, 145, 0.06) 0%, transparent 70%)"
        filter="blur(60px)"
        pointerEvents="none"
      />

      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1160px", xl: "1280px" }}
        px={{ base: "4", sm: "6", md: "8" }}
        position="relative"
        zIndex={1}
      >
        {/* Header Title Section */}
        <VStack
          gap="2"
          textAlign="center"
          mb={{ base: "8", md: "10" }}
          maxW="680px"
          mx="auto"
          opacity={inView ? 1 : 0}
          transform={inView ? "translateY(0)" : "translateY(20px)"}
          transition="all 0.7s cubic-bezier(0.16, 1, 0.3, 1)"
        >
          <Text
            fontSize={{ base: "11px", sm: "11.5px" }}
            fontWeight="800"
            color="#149191"
            letterSpacing="0.12em"
            textTransform="uppercase"
          >
            YOUR STEP FORWARD
          </Text>

          <Heading
            as="h2"
            fontSize={{ base: "24px", sm: "28px", md: "32px", lg: "36px" }}
            fontWeight="900"
            color="#051B64"
            letterSpacing="-0.025em"
            lineHeight="1.2"
          >
            Choose Your Pathway to Impact
          </Heading>

          <Text
            fontSize={{ base: "13.5px", sm: "14px", md: "15px" }}
            color="#4B5563"
            lineHeight="1.55"
            maxW="640px"
          >
            Whether you are a student hungry for direction, a professional with wisdom to share, a supporter ready to give, or an organization eager to fuel the future.
          </Text>
        </VStack>

        {/* 4 Compact Action Cards Grid */}
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={{ base: "4", sm: "4.5", lg: "5" }}>
          {PATHWAY_OPTIONS.map((item, index) => (
            <Box
              key={item.id}
              role="group"
              bg="#FFFFFF"
              borderRadius="18px"
              p={{ base: "4.5", sm: "5", md: "5.5" }}
              border="1px solid"
              borderColor="#E2E8F0"
              boxShadow="0 4px 16px -2px rgba(5, 27, 100, 0.04)"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              position="relative"
              overflow="hidden"
              cursor="pointer"
              opacity={inView ? 1 : 0}
              transform={inView ? "translateY(0)" : "translateY(24px)"}
              transition={`opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 90}ms, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease`}
              _hover={{
                transform: "translateY(-6px) scale(1.012)",
                boxShadow: "0 18px 36px -8px rgba(5, 27, 100, 0.13), 0 0 0 1.5px rgba(20, 145, 145, 0.35)",
                borderColor: item.accentColor,
              }}
            >
              {/* Top accent reveal bar on hover */}
              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                h="3px"
                bg={item.barGradient}
                opacity="0"
                transition="opacity 0.3s ease"
                _groupHover={{ opacity: "1" }}
              />

              <Box>
                {/* Icon Badge */}
                <Flex
                  w="42px"
                  h="42px"
                  borderRadius="12px"
                  bg={item.iconBg}
                  align="center"
                  justify="center"
                  mb="3.5"
                  transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                  _groupHover={{
                    transform: "scale(1.1) rotate(4deg)",
                    boxShadow: "0 6px 14px -4px rgba(5, 27, 100, 0.12)",
                  }}
                >
                  {item.icon}
                </Flex>

                {/* Card Title */}
                <Heading
                  as="h3"
                  fontSize={{ base: "16px", sm: "16.5px", md: "17px" }}
                  fontWeight="800"
                  color="#051B64"
                  lineHeight="1.25"
                  mb="2"
                >
                  {item.title}
                </Heading>

                {/* Card Description */}
                <Text
                  fontSize={{ base: "12.5px", sm: "13px" }}
                  color="#64748B"
                  lineHeight="1.55"
                  mb="4.5"
                >
                  {item.description}
                </Text>
              </Box>

              {/* Action Button */}
              <Link href={item.href} style={{ width: "100%", display: "block" }}>
                <Button
                  w="100%"
                  h="38px"
                  bg={item.buttonBg}
                  color={item.buttonColor}
                  borderRadius="10px"
                  fontWeight="700"
                  fontSize="12.5px"
                  letterSpacing="0.01em"
                  transition="all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                  boxShadow={
                    item.buttonBg !== "#EEF2FF"
                      ? "0 4px 12px rgba(5, 27, 100, 0.1)"
                      : "none"
                  }
                  _hover={{
                    bg: item.buttonHoverBg,
                    transform: "translateY(-2px)",
                    boxShadow:
                      item.buttonBg !== "#EEF2FF"
                        ? "0 8px 18px rgba(5, 27, 100, 0.22)"
                        : "0 6px 12px rgba(5, 27, 100, 0.08)",
                  }}
                >
                  {item.buttonText}
                  <ArrowRightIcon size={12} style={{ marginLeft: "5px" }} />
                </Button>
              </Link>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
