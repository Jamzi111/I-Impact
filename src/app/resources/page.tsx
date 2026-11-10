"use client"

import React, { useState } from "react"
import { Box } from "@chakra-ui/react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PreFooterCTA } from "@/components/cta"
import {
  ResourcesHero,
  FeaturedResource,
  ResourceDirectory,
  ResourceContributeBanner,
  ResourcePreviewModal,
} from "@/components/resources"

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedResource, setSelectedResource] = useState<any | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const handleOpenPreview = (res: any) => {
    setSelectedResource(res)
    setIsPreviewOpen(true)
  }

  const handleClosePreview = () => {
    setIsPreviewOpen(false)
    setSelectedResource(null)
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
      {/* Universal Fixed Header - White variant */}
      <Header variant="white" />

      <Box as="main" flex="1" overflowX="hidden" w="100%" maxW="100%">
        {/* 1. Resources Hero with Search & Filter */}
        <ResourcesHero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* 2. Flagship Featured Resource Spotlight */}
        <FeaturedResource onOpenPreview={handleOpenPreview} />

        {/* 3. Searchable Resource Directory Grid */}
        <ResourceDirectory
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onSelectResource={handleOpenPreview}
        />

        {/* 4. Curriculum & Author Contribution Banner */}
        <ResourceContributeBanner />

        {/* 5. PreFooter Call to Action */}
        <PreFooterCTA />
      </Box>

      {/* Universal Footer */}
      <Footer />

      {/* Interactive Resource Detail & Download Modal */}
      <ResourcePreviewModal
        resource={selectedResource}
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
      />
    </Box>
  )
}

