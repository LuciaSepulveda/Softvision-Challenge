import {ChakraProvider, extendTheme, ThemeConfig, ColorModeScript} from "@chakra-ui/react"
import React from "react"
import ReactDOM from "react-dom"

import {Provider as UserProvider} from "./context/context"
import App from "./App"

import "./theme.css"

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

const theme = extendTheme({config})

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <UserProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root"),
)
