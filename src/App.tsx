import { ThemeProvider } from 'styled-components'
import Router from './router'
import { GlobalStyles } from './styles/global'
import { defaultTheme } from './styles/themes/theme'
import { CyclesContextProvider } from './context/CycleContext'
//import Home from './Home'

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
