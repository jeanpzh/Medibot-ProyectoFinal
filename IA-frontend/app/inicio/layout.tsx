"use client";
import type React from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Heart, LogOutIcon, Phone, User } from "lucide-react";
import { SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function InicioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  console.log(user);
  return (
    <div className="min-h-screen flex flex-col p-8 bg-background text-foreground">
      <header className="w-full backdrop-blur-lg rounded-lg shadow-lg max-w-screen-xl mx-auto sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo y eslogan */}
          <div className="flex items-center space-x-3">
            <Heart className="h-8 w-8" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold">Medibot</h1>
              <p className="text-xs hidden sm:block">
                Tu salud, nuestra prioridad
              </p>
            </div>
          </div>

          {/* Navegación */}
          <nav className="flex items-center space-x-2 sm:space-x-3">
            <ThemeToggle />
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button>
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <SignOutButton>
                  <Button>
                    <LogOutIcon className="w-4 h-4 mr-2" />
                    Cerrar Sesión
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button size="sm" variant={"ghost"}>Iniciar Sesión</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm">Registrarse</Button>
                </SignUpButton>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="grow w-full">{children}</main>

      <footer className="w-full bg-muted border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Información de contacto */}
            <div className="flex items-center text-sm text-muted-foreground">
              <Phone className="w-4 h-4 mr-2" />
              <span>Contacto: +51 966 678 095</span>
            </div>

            <div className="text-center text-xs text-muted-foreground mt-6 pt-6 border-t">
              <p>
                © {new Date().getFullYear()} Medibot. Todos los derechos
                reservados.
              </p>
              <p className="mt-1">
                Plataforma médica para orientación y educación en salud.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
