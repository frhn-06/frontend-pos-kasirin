import "@/styles/globals.css";
import type { AppProps } from "next/app";
import * as React from "react";

import {HeroUIProvider} from "@heroui/react"
import AppShell from "@/components/commons/AppShell";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return(
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <AppShell>
          <Component {...pageProps} />        
        </AppShell>
      </HeroUIProvider>
    </QueryClientProvider>
  )
}
