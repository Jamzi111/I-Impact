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
  Button,
} from "@chakra-ui/react"
import Image from "next/image"
import { ClockIcon, CalendarIcon, ArrowRightIcon, UsersIcon } from "@/components/icons"

export interface BlogPostItem {
  id: string
  title: string
  category: "announcements" | "stories" | "recaps" | "articles" | "opportunities" | "updates"
  categoryLabel: string
  date: string
  readTime: string
  author: string
  imageUrl: string
  excerpt: string
  fullContent?: string
}

export const ALL_BLOG_POSTS: BlogPostItem[] = [
  {
    id: "post-1",
    title: "From Surulere to Software: How 16-Year-Old Chidinma Built Her First Solar Prototype",
    category: "stories",
    categoryLabel: "Youth Stories",
    date: "October 2025",
    readTime: "3 Mins Read",
    author: "Maker Hub Coordinator",
    imageUrl: "/images/areas/skills-development.jpg",
    excerpt:
      "When Chidinma joined our maker cluster, she had never touched a breadboard. Ten weeks later, she engineered a low-cost solar soil irrigation monitor for her community.",
    fullContent: `
Sixteen-year-old Chidinma first encountered I-Impact Initiative during a secondary school robotics outreach at Community High School in Surulere. With zero prior coding experience, she was initially hesitant to step forward during hardware demonstration sessions.

### A Spark of Curiosity
"I always thought building hardware was only for people in foreign universities," Chidinma explains. "When our mentor handed me a microcontroller board and walked me through connecting an LED and a moisture sensor, something clicked."

### Building for Community Need
Living in an urban farming belt near the outskirts of Lagos, Chidinma noticed that local urban farmers often lost crops due to erratic watering schedules. Over 10 weeks of guided weekend mentoring, she designed and tested a solar-powered soil humidity sensor that signals optimal irrigation times.

Today, her prototype is being tested across three community vegetable gardens. Chidinma now serves as the student STEM captain in her school, peer-mentoring younger girls in introductory electronics.
    `,
  },
  {
    id: "post-2",
    title: "NEEDY NEEDS YOU 2025 Outreach Recap: Over 800 Families and Students Reached",
    category: "recaps",
    categoryLabel: "Event Recaps",
    date: "September 2025",
    readTime: "4 Mins Read",
    author: "Field Operations Desk",
    imageUrl: "/images/areas/leadership-community-iimpact.jpg",
    excerpt:
      "Our annual flagship grassroots charity outreach mobilized over 45 volunteer mentors to provide learning packages, backpacks, and sanitary supplies across Ikorodu districts.",
    fullContent: `
The 2025 edition of NEEDY NEEDS YOU concluded with profound milestones, touching the lives of more than 800 children, teenagers, and low-income families across vulnerable communities in Lagos State.

### Mobilizing Volunteer Power
Over 45 volunteer professionals, university scholars, and alumni gave their weekend to sort, package, and distribute educational hampers containing notebooks, pens, geometry sets, and backpacks.

### Dignity at the Core
"Our principle during NEEDY NEEDS YOU is that giving must always elevate human dignity, never diminish it," says our Field Director. "We don't simply drop supplies; we sit down with families, listen to parents, and connect students to our year-round mentorship network."
    `,
  },
  {
    id: "post-3",
    title: "Why Practical Mentorship Outperforms Classroom Theory for High Schoolers",
    category: "articles",
    categoryLabel: "Articles & Insights",
    date: "August 2025",
    readTime: "5 Mins Read",
    author: "Samuel Joseph",
    imageUrl: "/images/areas/mentorship-development.jpg",
    excerpt:
      "Curriculums teach formulas, but mentorship models character. An essay on why direct human connection remains the most potent lever for youth transformation in Africa.",
    fullContent: `
In many secondary schools across Africa, educational instruction is heavily tilted toward memorization rather than execution. While textbooks provide the intellectual foundation, they rarely teach a teenager how to navigate emotional setbacks, evaluate peer circles, or articulate personal values.

### The Power of Proximity
When a high school student interacts with a professional engineer, entrepreneur, or civic leader who grew up in a similar neighborhood, the student's horizon permanently expands. What was once abstract suddenly becomes achievable.

Mentorship does not replace formal schooling; it activates it. It provides the psychological safety net and moral compass required to translate classroom knowledge into courageous community leadership.
    `,
  },
  {
    id: "post-4",
    title: "Call for Volunteer Mentors: Join Our 2026 Secondary School Cohort",
    category: "opportunities",
    categoryLabel: "Opportunities",
    date: "November 2026",
    readTime: "2 Mins Read",
    author: "People & Safeguarding",
    imageUrl: "/images/events-hero-clean.jpg",
    excerpt:
      "Are you a working professional, educator, or engineer passionate about raising the next generation? Applications are now open for our 2026 mentor fellowship.",
    fullContent: `
I-Impact Initiative is inviting applications from committed professionals, entrepreneurs, engineers, and educators to join our 2026 Volunteer Mentorship Cohort.

### What Mentors Do:
- Commit 2 to 3 hours every alternate Saturday during the school term.
- Facilitate guided group discussions on leadership, ethics, and study discipline.
- Support student delegations preparing for science fairs and leadership summits.

### Safeguarding & Orientation:
All prospective mentors undergo verified background checks and complete our mandatory Youth Safeguarding and Child Protection training before assignment to partner schools.
    `,
  },
  {
    id: "post-5",
    title: "Quarterly Governance & Field Update: Expanding Maker Hubs to 12 Public Schools",
    category: "updates",
    categoryLabel: "Organisation Updates",
    date: "October 2026",
    readTime: "3 Mins Read",
    author: "Governance Directorate",
    imageUrl: "/images/events-hero-summit.jpg",
    excerpt:
      "A summary of our Q3 operational milestones, donor allocations, school alliances, and infrastructure rollouts across public secondary education clusters.",
    fullContent: `
As part of our commitment to transparent stewardship and operational accountability, here is a concise overview of our activities, partnerships, and program expansions for the third quarter of 2026.

### Key Milestones:
- **12 Public School Alliances**: Formalized agreements with secondary school authorities to establish on-campus weekend maker clubs.
- **Hardware Kit Distribution**: Distributed 240 microcontroller boards, soldering practice sets, and sensor modules.
- **Safeguarding Certification**: 100% of field volunteers completed updated child wellbeing and privacy training.
    `,
  },
  {
    id: "post-6",
    title: "Building Confident Communicators: Inside Our Student Speech Workshops",
    category: "stories",
    categoryLabel: "Youth Stories",
    date: "July 2025",
    readTime: "3 Mins Read",
    author: "Leadership Academy Faculty",
    imageUrl: "/images/areas/skills-development.jpg",
    excerpt:
      "Stage fright is the number one barrier holding young scholars back from advocating for themselves. Here is how our public speaking workshops break that fear.",
    fullContent: `
During our recent AS A TEEN regional masterclass, over 120 secondary school students participated in our intensive public speaking and persuasive debate clinic.

Through safe, encouraging peer exercises, students learned to formulate arguments, maintain confident eye contact, and speak on community issues that matter to them. The transformation from nervous hesitation to passionate, articulate advocacy was nothing short of extraordinary.
    `,
  },
]

interface BlogFeedProps {
  searchQuery: string
  selectedCategory: string
  onSelectArticle: (article: BlogPostItem) => void
}

export function BlogFeed({
  searchQuery,
  selectedCategory,
  onSelectArticle,
}: BlogFeedProps) {
  const filteredPosts = ALL_BLOG_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory
    const matchesSearch =
      searchQuery.trim() === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <Box
      as="section"
      id="blog-feed"
      py={{ base: "12", sm: "14", md: "18" }}
      bg="#F8FAFC"
    >
      <Container
        maxW={{ base: "100%", sm: "640px", md: "768px", lg: "1140px", xl: "1240px" }}
        px={{ base: "4", sm: "6", md: "8" }}
      >
        <Flex justify="space-between" align="center" mb={{ base: "6", md: "8" }}>
          <Box>
            <Heading as="h2" fontSize={{ base: "20px", sm: "24px" }} fontWeight="800" color="#0F172A">
              Recent Dispatches & Articles
            </Heading>
            <Text fontSize="13px" color="#64748B">
              Showing {filteredPosts.length} articles
            </Text>
          </Box>
        </Flex>

        {filteredPosts.length === 0 ? (
          <Box
            p={{ base: "10", md: "16" }}
            bg="#FFFFFF"
            borderRadius="20px"
            border="1px solid #E2E8F0"
            textAlign="center"
          >
            <Text fontSize="16px" fontWeight="700" color="#1E293B" mb="2">
              No matching articles found
            </Text>
            <Text fontSize="13px" color="#64748B" maxW="420px" mx="auto">
              Try adjusting your search terms or clearing the filter category to see all stories.
            </Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: "6", md: "7" }}>
            {filteredPosts.map((post) => (
              <Box
                key={post.id}
                onClick={() => onSelectArticle(post)}
                borderRadius="22px"
                bg="#FFFFFF"
                border="1px solid"
                borderColor="#E2E8F0"
                overflow="hidden"
                cursor="pointer"
                transition="all 0.25s ease"
                display="flex"
                flexDirection="column"
                _hover={{
                  md: {
                    transform: "translateY(-3px)",
                    boxShadow: "0 14px 30px -10px rgba(5, 27, 100, 0.12)",
                    borderColor: "#149191",
                  },
                }}
              >
                {/* Post Image */}
                <Box position="relative" w="100%" h={{ base: "200px", sm: "210px" }} bg="#0F172A">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />

                  <Box
                    position="absolute"
                    top="12px"
                    left="12px"
                    px="2.5"
                    py="0.8"
                    borderRadius="full"
                    bg="rgba(5, 27, 100, 0.8)"
                    backdropFilter="blur(6px)"
                    color="#FFFFFF"
                    fontSize="10.5px"
                    fontWeight="800"
                    textTransform="uppercase"
                  >
                    {post.categoryLabel}
                  </Box>
                </Box>

                {/* Content Box */}
                <Box p="5" flex="1" display="flex" flexDirection="column" justifyContent="space-between">
                  <Box mb="3">
                    <HStack gap="2" color="#64748B" fontSize="11.5px" mb="2">
                      <Text fontWeight="600">{post.date}</Text>
                      <Text>•</Text>
                      <HStack gap="1">
                        <ClockIcon size={12} color="#94A3B8" />
                        <Text>{post.readTime}</Text>
                      </HStack>
                    </HStack>

                    <Heading as="h3" fontSize="16px" fontWeight="800" color="#0F172A" lineHeight="1.35" mb="2">
                      {post.title}
                    </Heading>

                    <Text
                      fontSize="12.5px"
                      color="#64748B"
                      lineHeight="1.5"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {post.excerpt}
                    </Text>
                  </Box>

                  <Flex
                    justify="space-between"
                    align="center"
                    pt="3"
                    borderTop="1px solid"
                    borderColor="#F1F5F9"
                    fontSize="12px"
                    color="#149191"
                    fontWeight="700"
                  >
                    <Text color="#64748B">By {post.author}</Text>
                    <HStack gap="1">
                      <Text>Read Article</Text>
                      <ArrowRightIcon size={12} />
                    </HStack>
                  </Flex>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  )
}
