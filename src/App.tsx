import { ThemeProvider } from 'styled-components'
import Router from './router'
import { GlobalStyles } from './styles/global'
import { defaultTheme } from './styles/themes/theme'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Router />
      <GlobalStyles />
    </ThemeProvider>
  )
}
