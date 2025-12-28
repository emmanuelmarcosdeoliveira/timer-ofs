import { ThemeProvider } from 'styled-components'
import Router from './router'
import { GlobalStyles } from './styles/global'
import { defaultTheme } from './styles/themes/theme'
//import Home from './Home'

export function App() {
  return (
    // <Home />
    <ThemeProvider theme={defaultTheme}>
      <Router />
      <GlobalStyles />
    </ThemeProvider>
  )
}
