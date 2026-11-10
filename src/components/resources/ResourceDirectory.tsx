"use client"

import React, { useState } from "react"
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
import {
  BookOpenIcon,
  HeadphonesIcon,
  FileTextIcon,
  TrophyIcon,
  DownloadIcon,
  PlayIcon,
  CheckCircleIcon,
  StarIcon,
  CloseIcon,
  ShareIcon,
  SparklesIcon,
} from "@/components/icons"

export interface ResourceItem {
  id: string
  title: string
  subtitle: string
  author: string
  category: "ebooks" | "podcasts" | "devotionals" | "toolkits" | "youth"
  categoryLabel: string
  format: "PDF E-Book" | "Audio / Podcast" | "Guide & Workbook" | "Daily Devotional" | "Video Masterclass"
  iconType: "book" | "audio" | "guide" | "devotional" | "video"
  pagesOrDuration: string
  price: "Free" | "Paid"
  priceLabel?: string
  description: string
  tableOfContents?: string[]
  accentColor: string
}

export const ALL_RESOURCES: ResourceItem[] = [
  {
    id: "res-1",
    title: "Daily Convictions: 30-Day Youth Devotional & Reflection Journal",
    subtitle: "A month of spiritual grounding, self-awareness, and purposeful living for teens.",
    author: "Samuel Joseph & The I-Impact Editorial Team",
    category: "devotionals",
    categoryLabel: "Devotionals",
    format: "Daily Devotional",
    iconType: "devotional",
    pagesOrDuration: "64 Pages • 30 Days",
    price: "Free",
    priceLabel: "Free Download",
    description:
      "A guided morning devotional helping young believers and seekers anchor their character in timeless moral values, handle peer pressure, and discover divine purpose in daily activities.",
    tableOfContents: [
      "Week 1: Identity & Knowing Who You Are",
      "Week 2: Discipline, Habits & Personal Integrity",
      "Week 3: Relationships, Friendships & Influence",
      "Week 4: Impact, Service & Leaving a Mark",
    ],
    accentColor: "#149191",
  },
  {
    id: "res-2",
    title: "Secondary School STEM & Innovation Project Guide",
    subtitle: "Step-by-step framework for building real-world science prototypes on modest budgets.",
    author: "Engr. T. Balogun & Maker Hub Facilitators",
    category: "toolkits",
    categoryLabel: "Leadership Toolkits",
    format: "Guide & Workbook",
    iconType: "guide",
    pagesOrDuration: "48 Pages",
    price: "Free",
    priceLabel: "Free Download",
    description:
      "Designed for teachers, student club captains, and curious makers. Covers safe experimentation, sourcing low-cost local components, and preparing for regional science exhibitions.",
    tableOfContents: [
      "Chapter 1: Defining Community Problems to Solve",
      "Chapter 2: Low-Cost Sensors & Microcontroller Basics",
      "Chapter 3: Safe Prototyping & Laboratory Protocols",
      "Chapter 4: Presenting Your Project to Judges & Donors",
    ],
    accentColor: "#0284C7",
  },
  {
    id: "res-3",
    title: "Voices of Impact: The Youth Leadership Podcast",
    subtitle: "In-depth conversations with young changemakers, tech founders, and community champions.",
    author: "Hosted by Samuel Joseph",
    category: "podcasts",
    categoryLabel: "Podcasts & Audio",
    format: "Audio / Podcast",
    iconType: "audio",
    pagesOrDuration: "8 Episodes • 35 mins avg",
    price: "Free",
    priceLabel: "Free Audio Stream",
    description:
      "Listen in as emerging leaders across Nigeria share how they navigated adversity, spearheaded youth initiatives in high school, and developed career clarity.",
    tableOfContents: [
      "Ep 1: The Anatomy of a Youth Movement",
      "Ep 2: Turning High School Ideas into Social Action",
      "Ep 3: Navigating African Education Realities with Grace",
      "Ep 4: Mental Resilience & Overcoming Imposter Syndrome",
    ],
    accentColor: "#7C3AED",
  },
  {
    id: "res-4",
    title: "Purpose & Peer Leadership Toolkit for Teenagers",
    subtitle: "Comprehensive curriculum workbook for student council captains and youth mentors.",
    author: "I-Impact Leadership Faculty",
    category: "ebooks",
    categoryLabel: "Guides & E-Books",
    format: "PDF E-Book",
    iconType: "book",
    pagesOrDuration: "96 Pages",
    price: "Paid",
    priceLabel: "₦3,500 / $5 (Partner Edition)",
    description:
      "Our premier institutional workbook licensed to private and international schools for student governance training, emotional intelligence, and conflict mediation.",
    tableOfContents: [
      "Module 1: Leading Without Title or Coercion",
      "Module 2: Emotional Intelligence & Empathy",
      "Module 3: Conflict Resolution in Peer Circles",
      "Module 4: Designing Inclusive School Activities",
    ],
    accentColor: "#D97706",
  },
  {
    id: "res-5",
    title: "The Mentor's Blueprint: Guiding Underserved Youth Effectively",
    subtitle: "Essential principles, child safeguarding policies, and active listening skills for mentors.",
    author: "I-Impact Safeguarding Directorate",
    category: "youth",
    categoryLabel: "Youth Development",
    format: "Guide & Workbook",
    iconType: "guide",
    pagesOrDuration: "38 Pages",
    price: "Free",
    priceLabel: "Free Download",
    description:
      "Mandatory reading for all volunteer mentors joining I-Impact cohorts. Focuses on boundaries, trauma-informed guidance, and empowering students to make self-directed choices.",
    tableOfContents: [
      "Part 1: The Role and Boundaries of an Impact Mentor",
      "Part 2: Mandatory Youth Safeguarding Guidelines",
      "Part 3: Goal Tracking & Progress Documentation",
      "Part 4: Handling Crisis & Referral Mechanisms",
    ],
    accentColor: "#059669",
  },
  {
    id: "res-6",
    title: "Public Speaking & Presentation Masterclass for Students",
    subtitle: "Conquer stage fright, articulate persuasive ideas, and pitch solutions with confidence.",
    author: "Samuel Joseph (Keynote Speaker)",
    category: "youth",
    categoryLabel: "Youth Development",
    format: "Video Masterclass",
    iconType: "video",
    pagesOrDuration: "4 Video Modules • 60 mins",
    price: "Free",
    priceLabel: "Free Video Series",
    description:
      "Practical stagecraft, vocal modulation, and speech structuring techniques recorded live at the AS A TEEN Leadership Summit.",
    tableOfContents: [
      "Session 1: Deconstructing Stage Fright & Nervous Energy",
      "Session 2: The 3-Part Speech Structure",
      "Session 3: Storytelling & Hooking Your Audience",
      "Session 4: Q&A Mastery & Impromptu Speaking",
    ],
    accentColor: "#E11D48",
  },
  {
    id: "res-7",
    title: "Career Discovery & University Transition Handbook",
    subtitle: "A practical roadmap for secondary school seniors choosing tertiary pathways.",
    author: "Academic Advisory Committee",
    category: "toolkits",
    categoryLabel: "Leadership Toolkits",
    format: "PDF E-Book",
    iconType: "book",
    pagesOrDuration: "54 Pages",
    price: "Free",
    priceLabel: "Free Download",
    description:
      "Demystifying university admissions, scholarships, emerging tech professions, vocational mastery, and building a resume before graduating secondary school.",
    tableOfContents: [
      "Section 1: Aligning Strengths with Future Industries",
      "Section 2: Scholarship Applications & Essay Crafting",
      "Section 3: First-Year University Survival Guide",
      "Section 4: Building Mentorship Networks Early",
    ],
    accentColor: "#2563EB",
  },
  {
    id: "res-8",
    title: "Community Outreach Strategy Guide for Student Clubs",
    subtitle: "How to organize grassroots service days (like NEEDY NEEDS YOU) in your own town.",
    author: "Community Impact Desk",
    category: "youth",
    categoryLabel: "Youth Development",
    format: "Guide & Workbook",
    iconType: "guide",
    pagesOrDuration: "32 Pages",
    price: "Free",
    priceLabel: "Free Download",
    description:
      "A step-by-step operational handbook for youth who want to organize charity drives, neighborhood cleanups, or textbook collections with maximum community dignity.",
    tableOfContents: [
      "Step 1: Identifying Genuine Community Needs",
      "Step 2: Mobilizing Student Volunteers & Safety",
      "Step 3: Transparent Accounting & Donor Updates",
      "Step 4: Measuring Lasting Dignity & Outcomes",
    ],
    accentColor: "#051B64",
  },
]

interface ResourceDirectoryProps {
  searchQuery: string
  selectedCategory: string
  onSelectResource: (resource: ResourceItem) => void
}

export function ResourceDirectory({
  searchQuery,
  selectedCategory,
  onSelectResource,
}: ResourceDirectoryProps) {
  const filteredResources = ALL_RESOURCES.filter((res) => {
    const matchesCategory =
      selectedCategory === "all" || res.category === selectedCategory
    const matchesSearch =
      searchQuery.trim() === "" ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.author.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getIcon = (type: string, color: string) => {
    switch (type) {
      case "audio":
        return <HeadphonesIcon size={20} color={color} />
      case "video":
        return <PlayIcon size={20} color={color} />
      case "devotional":
        return <SparklesIcon size={20} color={color} />
      case "guide":
        return <FileTextIcon size={20} color={color} />
      default:
        return <BookOpenIcon size={20} color={color} />
    }
  }

  return (
    <Box
      as="section"
      id="resource-directory"
      py={{ base: "12", sm: "14", md: "18" }}
      bg="#F8FAFC"
    >
      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1140px", xl: "1240px" }}
        px={{ base: "4", sm: "6", md: "8" }}
      >
        {/* Header Bar */}
        <Flex
          justify="space-between"
          align={{ base: "flex-start", sm: "center" }}
          direction={{ base: "column", sm: "row" }}
          gap="3"
          mb={{ base: "6", md: "8" }}
        >
          <Box>
            <Heading as="h2" fontSize={{ base: "20px", sm: "24px" }} fontWeight="800" color="#0F172A">
              Available Library Materials
            </Heading>
            <Text fontSize="13px" color="#64748B">
              Showing {filteredResources.length} of {ALL_RESOURCES.length} publications
            </Text>
          </Box>
        </Flex>

        {filteredResources.length === 0 ? (
          <Box
            p={{ base: "10", md: "16" }}
            bg="#FFFFFF"
            borderRadius="20px"
            border="1px solid #E2E8F0"
            textAlign="center"
          >
            <Text fontSize="16px" fontWeight="700" color="#1E293B" mb="2">
              No matching resources found
            </Text>
            <Text fontSize="13px" color="#64748B" maxW="420px" mx="auto">
              Try adjusting your search terms or clearing category filters to browse all publications.
            </Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={{ base: "4", md: "5" }}>
            {filteredResources.map((res) => (
              <Box
                key={res.id}
                borderRadius="20px"
                bg="#FFFFFF"
                border="1px solid"
                borderColor="#E2E8F0"
                p="5"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                transition="all 0.2s ease"
                position="relative"
                _hover={{
                  md: {
                    borderColor: res.accentColor,
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 25px -8px rgba(15, 23, 42, 0.1)",
                  },
                }}
              >
                {/* Top Card Metadata */}
                <Box mb="4">
                  <Flex justify="space-between" align="center" mb="3">
                    <Box
                      w="40px"
                      h="40px"
                      borderRadius="12px"
                      bg={`${res.accentColor}15`}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {getIcon(res.iconType, res.accentColor)}
                    </Box>

                    <Box
                      px="2.5"
                      py="0.8"
                      borderRadius="full"
                      bg={res.price === "Free" ? "rgba(16, 185, 129, 0.12)" : "rgba(217, 119, 6, 0.12)"}
                      color={res.price === "Free" ? "#047857" : "#B45309"}
                      fontSize="10.5px"
                      fontWeight="800"
                    >
                      {res.priceLabel || res.price}
                    </Box>
                  </Flex>

                  <Text
                    fontSize="10.5px"
                    fontWeight="800"
                    letterSpacing="0.06em"
                    textTransform="uppercase"
                    color="#64748B"
                    mb="1"
                  >
                    {res.format}
                  </Text>

                  <Heading
                    as="h3"
                    fontSize="15.5px"
                    fontWeight="800"
                    color="#0F172A"
                    lineHeight="1.3"
                    mb="2"
                  >
                    {res.title}
                  </Heading>

                  <Text fontSize="12px" color="#64748B" lineHeight="1.5" mb="3">
                    {res.subtitle}
                  </Text>
                </Box>

                {/* Bottom Footer Info & Action */}
                <Box pt="3" borderTop="1px solid" borderColor="#F1F5F9">
                  <Flex justify="space-between" align="center" mb="3" fontSize="11px" color="#94A3B8">
                    <Text fontWeight="600">{res.pagesOrDuration}</Text>
                    <Text fontWeight="600" color="#64748B">{res.categoryLabel}</Text>
                  </Flex>

                  <Button
                    onClick={() => onSelectResource(res)}
                    w="100%"
                    h="38px"
                    bg="#051B64"
                    color="#FFFFFF"
                    fontSize="12.5px"
                    fontWeight="700"
                    borderRadius="10px"
                    _hover={{ bg: "#0A257F" }}
                    transition="all 0.15s ease"
                  >
                    <HStack gap="1.5">
                      <DownloadIcon size={14} />
                      <Text>{res.price === "Free" ? "Access / Download" : "View Details & Order"}</Text>
                    </HStack>
                  </Button>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  )
}

