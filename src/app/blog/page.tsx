"use client"

import React, { useState } from "react"
import { Box } from "@chakra-ui/react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PreFooterCTA } from "@/components/cta"
import {
  BlogHero,
  FeaturedPost,
  BlogFeed,
  NewsletterCard,
  ArticleReaderModal,
} from "@/components/blog"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null)
  const [isReaderOpen, setIsReaderOpen] = useState(false)

  const handleOpenArticle = (art: any) => {
    setSelectedArticle(art)
    setIsReaderOpen(true)
  }

  const handleCloseReader = () => {
    setIsReaderOpen(false)
    setSelectedArticle(null)
  }

  return (
    <Box
      minH="100vh"
      bg="#FFFFFF"
      display="flex"
      flexDirection="column"
      overflowX="hidden"
      w="100%"
      maxW="100%"
    >
      {/* Universal Navigation Header - White variant */}
      <Header variant="white" />

      <Box as="main" flex="1" overflowX="hidden" w="100%" maxW="100%">
        {/* 1. Blog Hero with Search & Categories */}
        <BlogHero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* 2. Flagship Cover Story Spotlight */}
        <FeaturedPost onOpenArticle={handleOpenArticle} />

        {/* 3. Searchable & Filterable Dispatches Grid */}
        <BlogFeed
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onSelectArticle={handleOpenArticle}
        />

        {/* 4. "Stay Connected With I IMPACT" Newsletter Section */}
        <NewsletterCard />

        {/* 5. PreFooter Call to Action */}
        <PreFooterCTA />
      </Box>

      {/* Universal Footer */}
      <Footer />

      {/* Clean Full-Screen Article Reader Modal */}
      <ArticleReaderModal
        article={selectedArticle}
        isOpen={isReaderOpen}
        onClose={handleCloseReader}
      />
    </Box>
  )
}

