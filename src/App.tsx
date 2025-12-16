import { ThemeProvider } from "styled-components";
import Button from "./components/Button";
import { GlobalStyles } from "./styles/global";
import { defaultTheme } from "./styles/themes/theme";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Button />
      <Button />
      <Button />
    </ThemeProvider>
  );
}
