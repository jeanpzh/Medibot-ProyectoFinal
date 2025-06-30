import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import "@fontsource-variable/manrope";

export const metadata: Metadata = {
  title: "Medibot - Tu Asistente de Salud IA",
  description:
    "Plataforma médica inteligente para evaluación de síntomas y orientación de salud",
  keywords: ["salud", "medicina", "IA", "síntomas", "diagnóstico", "COVID-19"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
