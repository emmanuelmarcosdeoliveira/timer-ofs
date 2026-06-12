//import Home from './Home'

import { ThemeProvider } from "styled-components";
import { CyclesContextProvider } from "./context/CycleContext";
import { defaultTheme } from "./styles/themes/theme";
import  Router  from './router/index'
import { GlobalStyles } from "./styles/global";
export function App() {
    return (
    <ThemeProvider theme={defaultTheme}>
      <CyclesContextProvider>
        <Router />
      </CyclesContextProvider>
      <GlobalStyles />
    </ThemeProvider>
  )
}
