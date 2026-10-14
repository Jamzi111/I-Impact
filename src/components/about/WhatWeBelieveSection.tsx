"use client"

import React from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  HStack,
  VStack,
} from "@chakra-ui/react"
import { useInView } from "@/hooks/useInView"
import { LiveDot } from "@/components/LiveDot"

export interface BeliefItem {
  id: string
  number: string
  title: string
  description: string
}

const BELIEFS: BeliefItem[] = [
  {
    id: "potential",
    number: "01",
    title: "Potential must be developed.",
    description:
      "Every young person deserves opportunities, guidance, and an environment that encourages growth and self-discovery.",
  },
  {
    id: "mindset",
    number: "02",
    title: "Mindset influences possibility.",
    description:
      "How young people perceive themselves, their circumstances, and their future can shape the choices they make and the possibilities they pursue.",
  },
  {
    id: "leadership",
    number: "03",
    title: "Age should not disqualify leadership.",
    description:
      "Young people can contribute ideas, solve problems, initiate change, and exercise meaningful leadership long before adulthood.",
  },
  {
    id: "excellence",
    number: "04",
    title: "Excellence is cultivated.",
    description:
      "Character, discipline, emotional intelligence, competence, and consistency can be learned and strengthened through intentional development.",
  },
  {
    id: "guidance",
    number: "05",
    title: "Young people need guidance, not merely instructions.",
    description:
      "Mentorship should help them think critically, ask better questions, make informed decisions, and develop the confidence to take responsibility for their lives.",
  },
  {
    id: "transformation",
    number: "06",
    title: "Transformation must extend beyond inspiration.",
    description:
      "Lasting growth requires learning, reflection, practical application, accountability, and consistent action.",
  },
  {
    id: "dignity",
    number: "07",
    title: "Every young person deserves dignity and the opportunity to grow.",
    description:
      "Background, present circumstances, or past mistakes should not be treated as the final definition of a person's future.",
  },
  {
    id: "empowerment",
    number: "08",
    title: "Empowered youth become catalysts for change.",
    description:
      "When young people are empowered to discover and develop their potential, they can become catalysts for positive change in their families, communities, and the world.",
  },
]

export function WhatWeBelieveSection() {
  // Independent scroll observers so each segment triggers precisely as you scroll to it
  const { ref: headerRef, isInView: headerInView } = useInView({
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px",
    triggerOnce: false,
  })

  const { ref: beliefsRef, isInView: beliefsInView } = useInView({
    threshold: 0.05,
    rootMargin: "0px 0px -40px 0px",
    triggerOnce: false,
  })

  const { ref: closingRef, isInView: closingInView } = useInView({
    threshold: 0.15,
    rootMargin: "0px 0px -30px 0px",
    triggerOnce: false,
  })

  return (
    <Box
      as="section"
      id="beliefs"
      position="relative"
      py={{ base: "16", sm: "18", md: "22", lg: "26" }}
      bg="#F8FAFC"
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor="#EEF2F6"
      overflow="hidden"
    >
      <Container maxW="1200px" px={{ base: "5", sm: "6", md: "8", lg: "10" }}>
        
        {/* 1. Heading and Introduction: Triggers as soon as you scroll to the section top */}
        <VStack
          ref={headerRef}
          align="flex-start"
          textAlign="left"
          gap="3.5"
          maxW="780px"
          mb={{ base: "12", sm: "14", md: "18" }}
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1), transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
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
          >
            <LiveDot color="#0284C7" size={6} />
            <Text
              fontSize="11px"
              fontWeight="800"
              color="#051B64"
              letterSpacing="0.14em"
              textTransform="uppercase"
            >
              OUR CONVICTIONS
            </Text>
          </HStack>

          {/* Main Heading */}
          <Heading
            as="h2"
            fontSize={{ base: "28px", sm: "36px", md: "42px", lg: "46px" }}
            fontWeight="900"
            color="#051B64"
            lineHeight="1.15"
            letterSpacing="-0.025em"
          >
            What We Believe
          </Heading>

          {/* Intro Sentence */}
          <Text
            fontSize={{ base: "15px", sm: "16.5px", md: "17.5px" }}
            color="#475569"
            lineHeight="1.65"
            fontWeight="500"
          >
            Our work is guided by a set of convictions about young people, human potential, and the possibility of meaningful change.
          </Text>
        </VStack>

        {/* 2. Eight Beliefs: Staggered reveal triggered when scrolling to the beliefs grid */}
        <SimpleGrid
          ref={beliefsRef}
          columns={{ base: 1, md: 2 }}
          columnGap={{ base: "0", md: "12", lg: "16" }}
          rowGap={{ base: "8", sm: "9", md: "11" }}
        >
          {BELIEFS.map((belief, idx) => (
            <Box
              key={belief.id}
              pt={{ base: "4", md: "5" }}
              borderTop="1px solid"
              borderColor="#E2E8F0"
              style={{
                opacity: beliefsInView ? 1 : 0,
                transform: beliefsInView ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${idx * 0.1}s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${idx * 0.1}s`,
              }}
            >
              <VStack align="flex-start" gap="2.5">
                {/* Clean Monospace Number */}
                <Text
                  fontSize="13px"
                  fontWeight="800"
                  color="#0284C7"
                  fontFamily="monospace"
                  letterSpacing="0.08em"
                >
                  {belief.number}
                </Text>

                {/* Belief Title */}
                <Heading
                  as="h3"
                  fontSize={{ base: "17.5px", sm: "18.5px", md: "19.5px" }}
                  fontWeight="800"
                  color="#051B64"
                  lineHeight="1.3"
                  letterSpacing="-0.015em"
                >
                  {belief.title}
                </Heading>

                {/* Belief Description */}
                <Text
                  fontSize={{ base: "13.5px", sm: "14px", md: "14.5px" }}
                  color="#475569"
                  lineHeight="1.68"
                  fontWeight="450"
                >
                  {belief.description}
                </Text>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>

        {/* 3. Closing Statement: Line extension and text reveal triggered when scrolled into view */}
        <Box
          ref={closingRef}
          mt={{ base: "12", sm: "14", md: "18" }}
          pt={{ base: "8", md: "10" }}
          position="relative"
          style={{
            opacity: closingInView ? 1 : 0,
            transform: closingInView ? "translateY(0)" : "translateY(18px)",
            transition: "opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.3s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.3s",
          }}
        >
          {/* Thin brand-blue line extending gently into place */}
          <Box
            w="100%"
            h="1.5px"
            bg="linear-gradient(90deg, #0284C7 0%, rgba(14, 165, 233, 0.35) 60%, transparent 100%)"
            mb={{ base: "6", md: "8" }}
            style={{
              transformOrigin: "left",
              transform: closingInView ? "scaleX(1)" : "scaleX(0)",
              transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s",
            }}
          />

          <VStack align="flex-start" gap="2.5" maxW="840px">
            <Text
              fontSize="11.5px"
              fontWeight="800"
              color="#0284C7"
              letterSpacing="0.14em"
              textTransform="uppercase"
            >
              OUR CONVICTION
            </Text>

            <Heading
              as="h3"
              fontSize={{ base: "20px", sm: "24px", md: "27px" }}
              fontWeight="900"
              color="#051B64"
              lineHeight="1.3"
              letterSpacing="-0.02em"
            >
              Every young person deserves the opportunity to discover and develop their potential.
            </Heading>

            <Text
              fontSize={{ base: "13.5px", sm: "14.5px" }}
              color="#64748B"
              fontWeight="600"
            >
              This is the foundation of I IMPACT INITIATIVE.
            </Text>
          </VStack>
        </Box>

      </Container>
    </Box>
  )
}
