import { Box, Button, Heading, Text } from "@chakra-ui/react"

export default function Home() {
  return (
    <Box minH="100vh" p="10">
      <Heading color="teal.500">
        Impact Generation
      </Heading>

      <Text mt="4" fontSize="lg">
        Empowering the next generation to become something better.
      </Text>

      <Button mt="6" colorPalette="teal">
        Get Started
      </Button>
    </Box>
  )
}