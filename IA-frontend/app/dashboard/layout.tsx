"use client";

import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Heart, LogOut, Home } from "lucide-react";
import { SignOutButton, useUser } from "@clerk/nextjs";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useUser();

  const userName =
    user?.firstName ||
    user?.emailAddresses[0]?.emailAddress.split("@")[0] ||
    "Usuario";

  return (
    <div className="min-h-screen bg-background max-w-screen-xl mx-auto flex flex-col">
      <header className="border-b bg-card shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors"
            >
              <Heart className="h-5 w-5 text-primary" />
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Medibot
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {userName && (
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-[16px] font-medium">{userName}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground"
                >
                  <Home className="h-5 w-5" />
                </Button>
              </Link>
              <SignOutButton redirectUrl="/inicio">
                <Button
                  variant={"ghost"}
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Cerrar Sesión</span>
                </Button>
              </SignOutButton>
            </div>
          </div>
        </div>
      </header>

      <main className="grow container mx-auto px-4 py-8">{children}</main>

      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="h-4 w-4 text-primary" />
            <span className="font-medium">Medibot</span>
          </div>
          <p>
            © {new Date().getFullYear()} Medibot - Plataforma Médica Inteligente
          </p>
          <p className="mt-1 max-w-md mx-auto">
            Esta herramienta es solo para fines informativos y educativos. No
            reemplaza el consejo médico profesional.
          </p>
        </div>
      </footer>
    </div>
  );
}
