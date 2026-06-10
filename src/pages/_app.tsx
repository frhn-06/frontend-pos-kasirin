import "@/styles/globals.css";
import type { AppProps } from "next/app";
import * as React from "react";

import {HeroUIProvider} from "@heroui/react"
import AppShell from "@/components/commons/AppShell";

import { SessionProvider } from "next-auth/react";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import ToasterProvider from "@/context/toasterContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      staleTime: 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
    },
    mutations: {
      retry: false,
    }
  }
});

export default function App({ Component, pageProps }: AppProps) {
  return(
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>
          <ToasterProvider>
            <AppShell>
              <Component {...pageProps} />        
            </AppShell>
          </ToasterProvider>
        </HeroUIProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
