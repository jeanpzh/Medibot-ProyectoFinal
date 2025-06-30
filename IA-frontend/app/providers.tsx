"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";

function ClerkThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      localization={esES}
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
      afterSignOutUrl="/inicio"
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        variables: {
          colorPrimary: theme === "dark" ? "white" : "black",
          colorBackground: theme === "dark" ? "black" : "white",
          colorText: theme === "dark" ? "white" : "black",
          colorInputBackground: theme === "dark" ? "black" : "white",
          colorInputText: theme === "dark" ? "white" : "black",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ClerkThemeProvider>{children}</ClerkThemeProvider>
    </ThemeProvider>
  );
}
