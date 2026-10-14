"use client"

import React from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  HStack,
  VStack,
} from "@chakra-ui/react"
import {
  BrainIcon,
  TrophyIcon,
  CompassIcon,
  ShieldCheckIcon,
  HeartHandshakeIcon,
  RocketIcon,
} from "@/components/icons"
import { useInView } from "@/hooks/useInView"
import { LiveDot } from "@/components/LiveDot"

export interface ValueCardItem {
  id: string
  title: string
  description: string
  icon: (props: { size?: number; color?: string }) => React.ReactNode
  accentColor: string
  cardBg: string
  cardBorder: string
  borderHover: string
  glowColor: string
}

const VALUES: ValueCardItem[] = [
  {
    id: "mindset",
    title: "Mindset Transformation",
    description:
      "Meaningful change begins with how we think. We encourage curiosity, critical thinking, self-awareness, and the courage to challenge limiting beliefs.",
    icon: (props) => <BrainIcon size={22} {...props} />,
    accentColor: "#4F46E5",
    cardBg: "linear-gradient(180deg, #F5F7FF 0%, #EEF2FF 100%)",
    cardBorder: "rgba(99, 102, 241, 0.22)",
    borderHover: "rgba(79, 70, 229, 0.65)",
    glowColor: "rgba(79, 70, 229, 0.28)",
  },
  {
    id: "excellence",
    title: "Excellence",
    description:
      "We inspire young people to pursue growth, discipline, and high standards in their character, decisions, relationships, and responsibilities.",
    icon: (props) => <TrophyIcon size={22} {...props} />,
    accentColor: "#B45309",
    cardBg: "linear-gradient(180deg, #FFFDF5 0%, #FEF3C7 100%)",
    cardBorder: "rgba(217, 119, 6, 0.25)",
    borderHover: "rgba(217, 119, 6, 0.65)",
    glowColor: "rgba(217, 119, 6, 0.28)",
  },
  {
    id: "purpose",
    title: "Purpose",
    description:
      "We help young people discover their strengths, clarify their direction, and make intentional decisions aligned with their values and aspirations.",
    icon: (props) => <CompassIcon size={22} {...props} />,
    accentColor: "#0284C7",
    cardBg: "linear-gradient(180deg, #F6FAFE 0%, #E0F2FE 100%)",
    cardBorder: "rgba(2, 132, 199, 0.22)",
    borderHover: "rgba(2, 132, 199, 0.65)",
    glowColor: "rgba(2, 132, 199, 0.28)",
  },
  {
    id: "leadership",
    title: "Leadership",
    description:
      "We develop young people who take responsibility, serve with integrity, think independently, and use their influence to create positive change.",
    icon: (props) => <ShieldCheckIcon size={22} {...props} />,
    accentColor: "#051B64",
    cardBg: "linear-gradient(180deg, #F8FAFD 0%, #E8EEFA 100%)",
    cardBorder: "rgba(5, 27, 100, 0.2)",
    borderHover: "rgba(5, 27, 100, 0.6)",
    glowColor: "rgba(5, 27, 100, 0.28)",
  },
  {
    id: "empathy",
    title: "Empathy and Inclusion",
    description:
      "We value every young person's dignity, experiences, and potential, creating environments where people feel respected, heard, and encouraged to grow.",
    icon: (props) => <HeartHandshakeIcon size={22} {...props} />,
    accentColor: "#E11D48",
    cardBg: "linear-gradient(180deg, #FFF7F8 0%, #FFE4E6 100%)",
    cardBorder: "rgba(225, 29, 72, 0.22)",
    borderHover: "rgba(225, 29, 72, 0.65)",
    glowColor: "rgba(225, 29, 72, 0.28)",
  },
  {
    id: "innovation",
    title: "Innovation and Impact",
    description:
      "We welcome fresh ideas, question ineffective norms, and encourage practical solutions to challenges facing young people and their communities.",
    icon: (props) => <RocketIcon size={22} {...props} />,
    accentColor: "#0D9488",
    cardBg: "linear-gradient(180deg, #F6FEFB 0%, #CCFBF1 100%)",
    cardBorder: "rgba(13, 148, 136, 0.22)",
    borderHover: "rgba(13, 148, 136, 0.65)",
    glowColor: "rgba(13, 148, 136, 0.28)",
  },
]

export function OurValuesSection() {
  const { ref, isInView } = useInView({
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px",
    triggerOnce: false,
  })

  return (
    <Box
      ref={ref}
      as="section"
      id="values"
      position="relative"
      py={{ base: "12", sm: "14", md: "18", lg: "20" }}
      bg="#FFFFFF"
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor="#F1F5F9"
      overflow="hidden"
    >
      {/* Subtle ambient lighting */}
      <Box
        position="absolute"
        top="8%"
        left="50%"
        transform="translateX(-50%)"
        w={{ base: "320px", md: "780px" }}
        h={{ base: "180px", md: "320px" }}
        bg="radial-gradient(ellipse, rgba(20, 145, 145, 0.04) 0%, rgba(5, 27, 100, 0.03) 60%, transparent 80%)"
        filter="blur(70px)"
        pointerEvents="none"
        zIndex={0}
      />

      <Container maxW="1200px" px={{ base: "4", sm: "6", md: "8" }} position="relative" zIndex={1}>
        {/* Section Header */}
        <VStack
          align="center"
          textAlign="center"
          gap="2.5"
          mb={{ base: "8", sm: "10", md: "12" }}
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Eyebrow Badge */}
          <HStack
            bg="rgba(5, 27, 100, 0.05)"
            border="1px solid rgba(5, 27, 100, 0.12)"
            px="3.5"
            py="1"
            borderRadius="full"
            gap="2"
            boxShadow="0 2px 6px rgba(5, 27, 100, 0.03)"
          >
            <LiveDot color="#149191" size={6} />
            <Text
              fontSize="11px"
              fontWeight="800"
              color="#051B64"
              letterSpacing="0.12em"
              textTransform="uppercase"
            >
              OUR VALUES
            </Text>
          </HStack>

          {/* Main Heading */}
          <Heading
            as="h2"
            fontSize={{ base: "24px", sm: "28px", md: "34px", lg: "38px" }}
            fontWeight="900"
            color="#051B64"
            lineHeight="1.2"
            letterSpacing="-0.025em"
            maxW="680px"
          >
            The principles behind every Champion.
          </Heading>

          {/* Subtitle */}
          <Text
            fontSize={{ base: "14px", sm: "15px" }}
            color="#64748B"
            maxW="600px"
            lineHeight="1.55"
            fontWeight="500"
          >
            Our values shape how we think, how we lead, how we grow, and how we make a difference.
          </Text>
        </VStack>

        {/* Six Cards Grid: Whole card tinted in each value's distinct pastel color */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: "4", sm: "5", lg: "6" }}>
          {VALUES.map((val, idx) => (
            <Box
              key={val.id}
              role="group"
              bg={val.cardBg}
              p={{ base: "4.5", sm: "5", md: "5.5" }}
              borderRadius="18px"
              border="1.5px solid"
              borderColor={val.cardBorder}
              boxShadow="0 3px 12px -2px rgba(5, 27, 100, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)"
              position="relative"
              cursor="pointer"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(18px)",
                transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.08 + idx * 0.08}s, transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.32s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.32s ease`,
              }}
              _hover={{
                transform: "translateY(-14px)",
                borderColor: val.borderHover,
                boxShadow: `0 26px 46px -10px ${val.glowColor}, 0 10px 24px -4px rgba(5, 27, 100, 0.08)`,
              }}
            >
              {/* Interactive Icon Container with responsive hover animation */}
              <Flex
                w="46px"
                h="46px"
                borderRadius="13px"
                bg="#FFFFFF"
                border="1.5px solid"
                borderColor={val.cardBorder}
                align="center"
                justify="center"
                color={val.accentColor}
                boxShadow="0 2px 8px rgba(0, 0, 0, 0.04)"
                mb="3.5"
                transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                _groupHover={{
                  transform: "scale(1.12) translateY(-3px)",
                  bg: val.accentColor,
                  color: "#FFFFFF",
                  borderColor: val.accentColor,
                  boxShadow: `0 8px 20px -2px ${val.glowColor}`,
                }}
                _hover={{
                  transform: "scale(1.18) rotate(4deg) translateY(-4px)",
                  boxShadow: `0 10px 24px -2px ${val.glowColor}`,
                }}
              >
                {val.icon({ size: 22, color: "currentColor" })}
              </Flex>

              {/* Value Title */}
              <Heading
                as="h3"
                fontSize={{ base: "17.5px", sm: "18.5px" }}
                fontWeight="800"
                color="#051B64"
                mb="2"
                lineHeight="1.3"
                letterSpacing="-0.015em"
                transition="color 0.25s ease"
              >
                {val.title}
              </Heading>

              {/* Value Description */}
              <Text
                fontSize={{ base: "13px", sm: "13.5px" }}
                color="#334155"
                lineHeight="1.6"
                fontWeight="450"
              >
                {val.description}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

// Backward-compatible alias
export const CoreValues = OurValuesSection
