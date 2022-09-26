import { AppThemeProvider } from "../contexts/ThemeContext";
import type { AppProps } from "next/app";
import { CssBaseline } from "@mui/material";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppThemeProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </AppThemeProvider>
  );
}

export default MyApp;
