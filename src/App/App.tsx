import {Box, Image, Grid, GridItem, useColorModeValue, HStack, useColorMode} from "@chakra-ui/react"
import {MoonIcon, SunIcon} from "@chakra-ui/icons"
import React from "react"

import logo from "../assets/logo.png"
import Card from "../components/Card/Card"
import {useGetCandidates} from "../context/hooks"
import {steps} from "../types/types"

const App = () => {
  const getCandidates = useGetCandidates()
  const bg = useColorModeValue("#FFF5EB", "#151515")
  const bgLogo = useColorModeValue("transparent", "#FFF5EB")
  const color = useColorModeValue("#242424", "#FBFBFB")
  const {colorMode, toggleColorMode} = useColorMode()

  return (
    <Box bg={bg} minHeight="100vh" transition="0.2s ease-in-out" w="100%">
      <HStack h="50px" justify="space-between" m="auto" padding={2} w={["90%", null, "96%"]}>
        <Box bg={bgLogo} borderRadius="sm" marginY="auto" p={1}>
          <Image h="40px" margin="auto" src={logo} />
        </Box>
        <Box as="button" color={color} onClick={toggleColorMode}>
          {colorMode === "light" && <MoonIcon alt="Dark mode icon" />}
          {colorMode !== "light" && <SunIcon alt="Light mode icon" />}
        </Box>
      </HStack>
      <Box m="auto" mt={4} p={1} w={["90%", null, "96%"]}>
        <Grid gap={2} templateColumns={["repeat(1, 1fr)", null, "repeat(5, 1fr)"]}>
          {steps.map((elem) => {
            return (
              <GridItem key={elem}>
                <Card candidates={getCandidates(elem)} title={elem} />
              </GridItem>
            )
          })}
        </Grid>
      </Box>
    </Box>
  )
}

export default App
