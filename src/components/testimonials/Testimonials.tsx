"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  HStack,
  VStack,
  Button,
} from "@chakra-ui/react"
import Image from "next/image"
import { StarIcon, QuoteIcon, ArrowLeftIcon, ArrowRightIcon, SparklesIcon } from "@/components/icons"

export interface TestimonialItem {
  id: string
  headline: string
  quote: string
  initials: string
  image: string
  rating?: number
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "1",
    headline: "“I began to see myself differently.”",
    quote:
      "The mentorship experience helped me reflect on my mindset, understand myself better, and become more intentional about my choices and goals.",
    initials: "E. B.",
    image: "/vheer-image-1.jpeg",
    rating: 5,
  },
  {
    id: "2",
    headline: "“It was more than motivation; it was growth.”",
    quote:
      "I learned that personal development requires more than feeling inspired. It requires discipline, reflection, and the willingness to apply what you learn in everyday life.",
    initials: "G. A.",
    image: "/vheer-image-2.jpeg",
    rating: 5,
  },
  {
    id: "3",
    headline: "“Young people deserve spaces like this.”",
    quote:
      "I IMPACT represents an opportunity for young people to learn, ask questions, develop their abilities, and receive guidance as they navigate important stages of their lives.",
    initials: "C. O.",
    image: "/vheer-image-3.jpeg",
    rating: 5,
  },
]

export function Testimonials() {
  const [inView, setInView] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      {
        threshold: 0.12,
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

  // Auto-cycle spotlight active card every 4.5 seconds
  useEffect(() => {
    if (isPaused || !inView) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 4500)

    return () => clearInterval(interval)
  }, [isPaused, inView])

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length)
  }

  return (
    <Box
      as="section"
      id="testimonials"
      ref={sectionRef}
      py={{ base: "12", sm: "14", md: "16", lg: "20" }}
      bg="linear-gradient(180deg, #EEF5F8 0%, #E2EDF2 100%)"
      position="relative"
      overflow="hidden"
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor="rgba(20, 145, 145, 0.12)"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Dynamic ambient floating orbs */}
      <Box
        position="absolute"
        top="-10%"
        left="20%"
        w="450px"
        h="450px"
        bg="radial-gradient(circle, rgba(20, 145, 145, 0.12) 0%, transparent 70%)"
        filter="blur(50px)"
        pointerEvents="none"
        className="animate-pulse-glow"
      />
      <Box
        position="absolute"
        bottom="-15%"
        right="15%"
        w="400px"
        h="400px"
        bg="radial-gradient(circle, rgba(5, 27, 100, 0.08) 0%, transparent 70%)"
        filter="blur(45px)"
        pointerEvents="none"
        className="animate-float-slow"
      />

      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1160px", xl: "1200px" }}
        px={{ base: "4", sm: "6", md: "8" }}
        position="relative"
        zIndex={1}
      >
        {/* Header Title Section with smooth slide-up reveal */}
        <VStack
          gap="2.5"
          textAlign="center"
          mb={{ base: "8", md: "10" }}
          maxW="680px"
          mx="auto"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <HStack
            bg="rgba(20, 145, 145, 0.1)"
            px="3"
            py="0.8"
            borderRadius="full"
            border="1px solid"
            borderColor="rgba(20, 145, 145, 0.2)"
            gap="1.5"
          >
            <SparklesIcon size={13} color="#149191" />
            <Text
              fontSize={{ base: "11px", sm: "11.5px" }}
              fontWeight="800"
              color="#149191"
              letterSpacing="0.12em"
              textTransform="uppercase"
            >
              TESTIMONIALS & STORIES
            </Text>
          </HStack>

          <Heading
            as="h2"
            fontSize={{ base: "24px", sm: "28px", md: "32px", lg: "36px" }}
            fontWeight="900"
            color="#051B64"
            letterSpacing="-0.025em"
            lineHeight="1.2"
          >
            Voices of Impact
          </Heading>
          <Text
            fontSize={{ base: "13.5px", sm: "14px", md: "15px" }}
            color="#4B5563"
            lineHeight="1.5"
          >
            Real stories and personal transformations from individuals empowered through our initiatives.
          </Text>
        </VStack>

        {/* Testimonials Grid with more compact, sleek cards */}
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: "5", lg: "6" }}>
          {TESTIMONIALS.map((item, index) => {
            const isActive = activeIndex === index
            return (
              <Box
                key={item.id}
                onClick={() => setActiveIndex(index)}
                cursor="pointer"
                bg="#FFFFFF"
                borderRadius="20px"
                p={{ base: "5", sm: "5.5", md: "6" }}
                border="1px solid"
                borderColor={isActive ? "rgba(20, 145, 145, 0.55)" : "rgba(20, 145, 145, 0.16)"}
                boxShadow={
                  isActive
                    ? "0 18px 36px -8px rgba(5, 27, 100, 0.14), 0 0 0 2px rgba(20, 145, 145, 0.25)"
                    : "0 6px 18px -3px rgba(5, 27, 100, 0.05), 0 2px 6px rgba(20, 145, 145, 0.03)"
                }
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                position="relative"
                overflow="hidden"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView
                    ? isActive
                      ? "translateY(-4px) scale(1.015)"
                      : "translateY(0) scale(1)"
                    : "translateY(28px) scale(0.97)",
                  transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 120}ms`,
                }}
                _hover={{
                  transform: "translateY(-6px) scale(1.02)",
                  boxShadow: "0 22px 42px -10px rgba(5, 27, 100, 0.16), 0 0 0 2px rgba(20, 145, 145, 0.4)",
                  borderColor: "#149191",
                }}
              >
                {/* Top Row: Stars + Animated Quote Icon */}
                <Box>
                  <Flex justify="space-between" align="center" mb="3">
                    <HStack gap="1">
                      {Array.from({ length: item.rating || 5 }).map((_, i) => (
                        <Box
                          key={i}
                          transition="transform 0.2s"
                          _hover={{ transform: "scale(1.2) rotate(10deg)" }}
                        >
                          <StarIcon size={15} color="#F59E0B" />
                        </Box>
                      ))}
                    </HStack>
                    <Box
                      color={isActive ? "#149191" : "rgba(20, 145, 145, 0.35)"}
                      transition="all 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
                      transform={isActive ? "scale(1.1) rotate(-5deg)" : "scale(1)"}
                    >
                      <QuoteIcon size={20} />
                    </Box>
                  </Flex>

                  {/* Headline Quote */}
                  <Text
                    fontSize={{ base: "15px", sm: "15.5px" }}
                    fontWeight="800"
                    color="#051B64"
                    lineHeight="1.3"
                    mb="2"
                  >
                    {item.headline}
                  </Text>

                  {/* Quote Text */}
                  <Text
                    fontSize={{ base: "13px", sm: "13.5px" }}
                    color="#4B5563"
                    lineHeight="1.55"
                    fontStyle="italic"
                  >
                    &ldquo;{item.quote}&rdquo;
                  </Text>
                </Box>

                {/* Bottom Author Row with photo and initials only */}
                <HStack gap="3" mt="4" pt="3.5" borderTop="1px solid" borderColor="#EDF2F7" align="center">
                  <Box
                    position="relative"
                    w="40px"
                    h="40px"
                    borderRadius="full"
                    overflow="hidden"
                    border="2px solid"
                    borderColor={isActive ? "#149191" : "rgba(20, 145, 145, 0.4)"}
                    boxShadow={isActive ? "0 0 0 3px rgba(20, 145, 145, 0.16)" : "0 2px 6px rgba(5, 27, 100, 0.08)"}
                    transition="all 0.35s ease"
                    flexShrink={0}
                  >
                    <Image
                      src={item.image}
                      alt={item.initials}
                      fill
                      sizes="40px"
                      style={{ objectFit: "cover" }}
                    />
                  </Box>

                  <VStack align="flex-start" gap="0">
                    <Text
                      fontSize="14px"
                      fontWeight="800"
                      color="#051B64"
                      lineHeight="1.2"
                    >
                      {item.initials}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            )
          })}
        </SimpleGrid>

        {/* Interactive Controls & Pagination Indicator */}
        <Flex justify="center" align="center" gap="3.5" mt={{ base: "8", md: "9" }}>
          {/* Prev Arrow */}
          <Button
            size="sm"
            w="34px"
            h="34px"
            p="0"
            borderRadius="full"
            bg="white"
            color="#051B64"
            border="1px solid"
            borderColor="rgba(20, 145, 145, 0.25)"
            boxShadow="0 2px 6px rgba(5, 27, 100, 0.05)"
            aria-label="Previous Testimonial"
            onClick={handlePrev}
            _hover={{
              bg: "#149191",
              color: "white",
              borderColor: "#149191",
              transform: "scale(1.08)",
            }}
            transition="all 0.2s"
          >
            <ArrowLeftIcon size={14} />
          </Button>

          {/* Dot Indicators */}
          <HStack gap="1.5">
            {TESTIMONIALS.map((_, i) => (
              <Box
                key={i}
                as="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setActiveIndex(i)}
                w={activeIndex === i ? "20px" : "7px"}
                h="7px"
                borderRadius="full"
                bg={activeIndex === i ? "#149191" : "rgba(20, 145, 145, 0.25)"}
                transition="all 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
                _hover={{ bg: "#149191" }}
              />
            ))}
          </HStack>

          {/* Next Arrow */}
          <Button
            size="sm"
            w="34px"
            h="34px"
            p="0"
            borderRadius="full"
            bg="white"
            color="#051B64"
            border="1px solid"
            borderColor="rgba(20, 145, 145, 0.25)"
            boxShadow="0 2px 6px rgba(5, 27, 100, 0.05)"
            aria-label="Next Testimonial"
            onClick={handleNext}
            _hover={{
              bg: "#149191",
              color: "white",
              borderColor: "#149191",
              transform: "scale(1.08)",
            }}
            transition="all 0.2s"
          >
            <ArrowRightIcon size={14} />
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}
