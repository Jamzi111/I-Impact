"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react"
import Link from "next/link"
import Image from "next/image"
import {
  SparklesIcon,
  HeartHandshakeIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from "@/components/icons"

export function OurImpact() {
  const [inView, setInView] = useState(false)
  const [animatedCount, setAnimatedCount] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        } else {
          setInView(false)
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -30px 0px",
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

  // Smooth count-up for the headline stat number
  useEffect(() => {
    if (!inView) {
      setAnimatedCount(0)
      return
    }

    let startTime: number | null = null
    const duration = 1600
    const target = 25000
    let animationFrameId: number

    const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3)

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(progress)
      const value = Math.floor(easedProgress * target)

      setAnimatedCount(value)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setAnimatedCount(target)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [inView])

  return (
    <Box
      as="section"
      id="our-impact"
      ref={sectionRef}
      position="relative"
      bg="white"
      pt={{ base: "8", sm: "10", md: "12", lg: "16" }}
      pb={{ base: "4", sm: "5", md: "6" }}
      overflow="hidden"
    >
      {/* Subtle background ambient light */}
      <Box
        position="absolute"
        top="20%"
        left="-5%"
        w={{ base: "250px", md: "400px" }}
        h={{ base: "250px", md: "400px" }}
        bg="radial-gradient(circle, rgba(20, 145, 145, 0.08) 0%, transparent 70%)"
        filter="blur(40px)"
        pointerEvents="none"
        className="animate-pulse-glow"
      />

      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1120px", xl: "1160px" }}
        px={{ base: "4", sm: "6", md: "8" }}
      >
        <Flex
          direction={{ base: "column", lg: "row" }}
          align="center"
          justify="center"
          gap={{ base: "10", md: "12", lg: "12", xl: "14" }}
        >
          {/* Left Column: Image with Floating Badges & Hover Dynamics */}
          <Box
            flex={{ base: "1", lg: "0.95" }}
            w="100%"
            maxW={{ base: "100%", sm: "480px", md: "520px", lg: "480px", xl: "500px" }}
            mx={{ base: "auto", lg: "0" }}
            position="relative"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0) scale(1)" : "translateX(-30px) scale(0.96)",
              transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Decorative colored glow ring behind photo */}
            <Box
              position="absolute"
              inset="-6px"
              borderRadius={{ base: "22px", md: "26px" }}
              bg="linear-gradient(135deg, rgba(20, 145, 145, 0.25) 0%, rgba(5, 27, 100, 0.12) 100%)"
              filter="blur(10px)"
              zIndex={0}
            />

            {/* Main Image Container */}
            <Box
              position="relative"
              zIndex={1}
              w="100%"
              h={{ base: "250px", sm: "300px", md: "340px", lg: "360px", xl: "380px" }}
              borderRadius={{ base: "18px", md: "22px" }}
              overflow="hidden"
              boxShadow="0 18px 36px -10px rgba(5, 27, 100, 0.18)"
              border="1px solid"
              borderColor="rgba(255, 255, 255, 0.9)"
              transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
              _hover={{
                transform: "scale(1.02)",
                boxShadow: "0 22px 42px -10px rgba(5, 27, 100, 0.24)",
              }}
            >
              <Image
                src="/iimpact-kids.png"
                alt="I-Impact Champions - Young girls smiling in I-Impact shirts"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                style={{
                  objectFit: "cover",
                  objectPosition: "center 20%",
                  transition: "transform 0.6s ease",
                }}
              />
              
              {/* Subtle inner dark gradient on bottom for contrast */}
              <Box
                position="absolute"
                inset="0"
                bg="linear-gradient(180deg, transparent 65%, rgba(5, 27, 100, 0.35) 100%)"
                pointerEvents="none"
              />
            </Box>

            {/* Floating Badge 1: Top Right (Sparkles & Reached Count) */}
            <Box
              position="absolute"
              top={{ base: "-10px", sm: "-14px", md: "-16px" }}
              right={{ base: "0px", sm: "-10px", md: "-14px" }}
              zIndex={3}
              bg="rgba(255, 255, 255, 0.95)"
              backdropFilter="blur(12px)"
              border="1px solid"
              borderColor="rgba(20, 145, 145, 0.25)"
              boxShadow="0 12px 24px -6px rgba(5, 27, 100, 0.14)"
              borderRadius="14px"
              px={{ base: "3", sm: "3.5" }}
              py={{ base: "2", sm: "2.5" }}
              className="animate-float-slow"
              transition="all 0.3s ease"
              _hover={{
                transform: "scale(1.05) translateY(-2px)",
                borderColor: "#149191",
              }}
            >
              <HStack gap="2.5" align="center">
                <Box
                  p="2"
                  borderRadius="10px"
                  bg="rgba(245, 158, 11, 0.12)"
                  color="#D97706"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <SparklesIcon size={16} />
                </Box>
                <VStack align="flex-start" gap="0">
                  <Text fontSize={{ base: "12px", sm: "13px" }} fontWeight="800" color="#051B64" lineHeight="1.1">
                    25k+ Champions
                  </Text>
                  <Text fontSize="10px" color="#64748B" fontWeight="600">
                    6 Geopolitical Zones
                  </Text>
                </VStack>
              </HStack>
            </Box>

            {/* Floating Badge 2: Bottom Left (HeartHandshake & Grassroots) */}
            <Box
              position="absolute"
              bottom={{ base: "-12px", sm: "-16px", md: "-18px" }}
              left={{ base: "0px", sm: "-8px", md: "-12px" }}
              zIndex={3}
              bg="rgba(255, 255, 255, 0.95)"
              backdropFilter="blur(12px)"
              border="1px solid"
              borderColor="rgba(5, 27, 100, 0.12)"
              boxShadow="0 12px 24px -6px rgba(5, 27, 100, 0.14)"
              borderRadius="14px"
              px={{ base: "3", sm: "3.5" }}
              py={{ base: "2", sm: "2.5" }}
              className="animate-float-reverse"
              transition="all 0.3s ease"
              _hover={{
                transform: "scale(1.05) translateY(-2px)",
                borderColor: "#051B64",
              }}
            >
              <HStack gap="2.5" align="center">
                <Box
                  p="2"
                  borderRadius="10px"
                  bg="rgba(20, 145, 145, 0.12)"
                  color="#149191"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <HeartHandshakeIcon size={16} />
                </Box>
                <VStack align="flex-start" gap="0">
                  <Text fontSize={{ base: "12px", sm: "13px" }} fontWeight="800" color="#051B64" lineHeight="1.1">
                    100% Direct Practice
                  </Text>
                  <Text fontSize="10px" color="#64748B" fontWeight="600">
                    Sustainable Relief & Growth
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </Box>

          {/* Right Column: Staggered Content & Animated Counter */}
          <Box
            flex={{ base: "1", lg: "1" }}
            w="100%"
            maxW={{ base: "100%", sm: "520px", lg: "490px", xl: "520px" }}
            mx={{ base: "auto", lg: "0" }}
          >
            <VStack align="flex-start" gap={{ base: "3.5", md: "4" }} textAlign="left">
              {/* Category Pill Tag */}
              <Box
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(12px)",
                  transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
                }}
              >
                <HStack
                  display="inline-flex"
                  gap="2"
                  px="3"
                  py="1"
                  bg="rgba(20, 145, 145, 0.08)"
                  borderRadius="full"
                  border="1px solid"
                  borderColor="rgba(20, 145, 145, 0.2)"
                >
                  <Box
                    w="7px"
                    h="7px"
                    borderRadius="full"
                    bg="#149191"
                    className="animate-pulse-glow"
                  />
                  <Text
                    fontSize="11px"
                    fontWeight="800"
                    color="#149191"
                    letterSpacing="0.08em"
                    textTransform="uppercase"
                  >
                    TRANSFORMING COMMUNITIES
                  </Text>
                </HStack>
              </Box>

              {/* Heading */}
              <Box
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(14px)",
                  transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
                }}
              >
                <Heading
                  as="h2"
                  color="#051B64"
                  fontSize={{ base: "26px", sm: "30px", md: "34px", lg: "38px" }}
                  fontWeight="900"
                  lineHeight="1.15"
                  letterSpacing="-0.02em"
                >
                  Our impact
                </Heading>
              </Box>

              {/* Bold Lead Sentence with Animated Number Counter */}
              <Box
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
                }}
              >
                <Text
                  color="#051B64"
                  fontSize={{ base: "15px", sm: "16px", md: "17px", lg: "17.5px" }}
                  fontWeight="700"
                  lineHeight="1.45"
                >
                  We’ve worked on improving the lives of over{" "}
                  <Box
                    as="span"
                    color="#149191"
                    fontWeight="900"
                    px="1.5"
                    py="0.5"
                    borderRadius="md"
                    bg="rgba(20, 145, 145, 0.08)"
                    display="inline-block"
                    fontVariantNumeric="tabular-nums"
                  >
                    {animatedCount.toLocaleString()}+
                  </Box>{" "}
                  young people through direct practice.
                </Text>
              </Box>

              {/* Description Paragraph */}
              <Box
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s",
                }}
              >
                <Text
                  color="#4B5563"
                  fontSize={{ base: "13.5px", sm: "14px", md: "14.5px" }}
                  lineHeight="1.65"
                  fontWeight="400"
                >
                  Young people from different backgrounds have a huge impact on us and all our activities. They highlight those parts of the society that are broken, so we can help them in all possible ways to regain hope and flourish in life.
                </Text>
              </Box>

              {/* Quick Feature Chips */}
              <Box
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(14px)",
                  transition: "opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s",
                }}
              >
                <Flex wrap="wrap" gap="2" pt="1">
                  {[
                    "Youth Mentorship",
                    "Grassroots Relief",
                    "Leadership Sprints",
                  ].map((tag) => (
                    <HStack
                      key={tag}
                      gap="1.5"
                      px="2.5"
                      py="1"
                      bg="#F4F8FE"
                      borderRadius="8px"
                      border="1px solid"
                      borderColor="rgba(5, 27, 100, 0.06)"
                    >
                      <CheckCircleIcon size={13} color="#149191" />
                      <Text fontSize="11.5px" fontWeight="600" color="#051B64">
                        {tag}
                      </Text>
                    </HStack>
                  ))}
                </Flex>
              </Box>

              {/* Read More Button with Slide Hover Effect */}
              <Box
                pt={{ base: "1.5", md: "2" }}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(14px)",
                  transition: "opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s",
                }}
              >
                <Link href="/about/impact">
                  <Button
                    variant="outline"
                    border="2px solid #051B64"
                    bg="transparent"
                    color="#051B64"
                    fontWeight="700"
                    fontSize={{ base: "12px", sm: "12.5px", md: "13px" }}
                    letterSpacing="0.08em"
                    textTransform="uppercase"
                    px={{ base: "6", md: "7" }}
                    py={{ base: "4.5", md: "5" }}
                    borderRadius="md"
                    transition="all 0.25s ease"
                    _hover={{
                      bg: "#051B64",
                      color: "#FFFFFF",
                      borderColor: "#051B64",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 18px -3px rgba(5, 27, 100, 0.28)",
                      "& .btn-icon": {
                        transform: "translateX(4px)",
                      },
                    }}
                    _active={{
                      transform: "translateY(0)",
                    }}
                  >
                    <HStack gap="2">
                      <Text>READ MORE</Text>
                      <Box
                        className="btn-icon"
                        transition="transform 0.2s ease"
                        display="inline-flex"
                        alignItems="center"
                      >
                        <ArrowRightIcon size={14} />
                      </Box>
                    </HStack>
                  </Button>
                </Link>
              </Box>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

