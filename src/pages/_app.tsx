import { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import { CssBaseline } from "@mui/material";
import { AppThemeProvider } from "../contexts/ThemeContext";
import { AuthProvider } from "../contexts/AuthContext";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { NextPage } from "next";

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  
  return (
    <AppThemeProvider>
      <AuthProvider>
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </AuthProvider>
    </AppThemeProvider>
  );
}

export default MyApp;
