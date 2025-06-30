import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Heart,
  Shield,
  Stethoscope,
  Activity,
  CheckCircle,
  AlertTriangle,
  Info,
  Brain,
  Clock,
  Users,
  User,
} from "lucide-react";
import Link from "next/link";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

// Componente del robot médico mejorado
const MedicalRobotIllustration = ({ className }: { className?: string }) => (
  <div className={`relative ${className || "w-60 h-60 md:w-80 md:h-80"}`}>
    {/* Cuerpo principal */}
    <div className="absolute inset-x-1/4 top-1/4 h-1/2 bg-linear-to-br from-blue-500 to-purple-600 rounded-t-full rounded-b-lg shadow-2xl">
      {/* Panel de control */}
      <div className="absolute inset-x-1/4 top-1/4 h-1/3 bg-slate-100 rounded-lg border-2 border-slate-300">
        <div className="flex justify-center items-center h-full space-x-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-75"></div>
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse delay-150"></div>
        </div>
      </div>
    </div>

    {/* Cabeza */}
    <div className="absolute inset-x-1/3 top-1/12 h-1/4 bg-linear-to-br from-slate-200 to-slate-300 rounded-full shadow-xl border-4 border-white">
      {/* Ojos */}
      <div className="absolute left-1/4 top-1/3 w-1/6 h-1/4 bg-blue-500 rounded-full animate-pulse"></div>
      <div className="absolute right-1/4 top-1/3 w-1/6 h-1/4 bg-blue-500 rounded-full animate-pulse"></div>
      {/* Antena */}
      <div className="absolute left-1/2 -top-2 w-1 h-4 bg-slate-400 rounded-full transform -translate-x-1/2">
        <div className="absolute -top-1 left-1/2 w-2 h-2 bg-red-500 rounded-full transform -translate-x-1/2 animate-ping"></div>
      </div>
    </div>

    {/* Base */}
    <div className="absolute inset-x-1/5 bottom-0 h-1/6 bg-linear-to-t from-slate-400 to-slate-300 rounded-t-lg shadow-lg"></div>

    {/* Brazos */}
    <div className="absolute top-1/3 -left-6 w-8 h-1/4 bg-linear-to-br from-slate-200 to-slate-300 rounded-lg shadow transform -rotate-12">
      <Stethoscope className="w-4 h-4 text-blue-600 absolute bottom-0 left-1/2 transform -translate-x-1/2" />
    </div>
    <div className="absolute top-1/3 -right-6 w-8 h-1/4 bg-linear-to-br from-slate-200 to-slate-300 rounded-lg shadow transform rotate-12">
      <Heart className="w-4 h-4 text-red-500 absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-pulse" />
    </div>
  </div>
);

export default function InicioPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 md:py-16">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between mb-20 md:mb-32 min-h-[70vh]">
        <div className="w-full lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
          <Badge
            variant="secondary"
            className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
          >
            <Brain className="w-4 h-4 mr-1" />
            Inteligencia Artificial Médica
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            <span className="block bg-clip-text ">MEDIBOT</span>
            <span className="block text-foreground text-3xl sm:text-4xl lg:text-5xl mt-2">
              Tu Asistente de Salud IA
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl">
            Obtén orientación médica inteligente las 24 horas. Nuestro sistema
            de IA analiza tus síntomas y te proporciona información confiable
            para cuidar tu salud.
          </p>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
          <MedicalRobotIllustration className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96" />
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">¿Por qué elegir Medibot?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tecnología médica avanzada al alcance de todos, diseñada para
            brindarte la mejor orientación de salud.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Brain,
              title: "IA Avanzada",
              description:
                "Algoritmos médicos de última generación para análisis preciso de síntomas",
              color: "text-blue-600",
            },
            {
              icon: Clock,
              title: "Disponible 24/7",
              description:
                "Acceso inmediato a orientación médica en cualquier momento del día",
              color: "text-green-600",
            },
            {
              icon: Shield,
              title: "Datos Seguros",
              description:
                "Tu información médica protegida con los más altos estándares de seguridad",
              color: "text-purple-600",
            },
            {
              icon: Activity,
              title: "Análisis Integral",
              description:
                "Evaluación completa de síntomas con recomendaciones personalizadas",
              color: "text-red-600",
            },
            {
              icon: Users,
              title: "Fácil de Usar",
              description:
                "Interfaz intuitiva diseñada para todas las edades y niveles tecnológicos",
              color: "text-orange-600",
            },
            {
              icon: Heart,
              title: "Orientación Confiable",
              description:
                "Información médica basada en evidencia científica actualizada",
              color: "text-pink-600",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  <span>{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Information Cards */}
      <section className="space-y-8 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {[
          {
            title: "Sobre Medibot",
            icon: Info,
            content:
              "Medibot es una plataforma médica de vanguardia que utiliza inteligencia artificial para ofrecerte orientación preliminar sobre tus síntomas. A través de una interfaz amigable e intuitiva, te ayudamos a entender mejor tu estado de salud y te proporcionamos información clara para tomar decisiones informadas.",
            color: "border-blue-200 bg-blue-50 dark:bg-blue-950/20",
            iconColor: "text-blue-600",
          },
          {
            title: "Capacidades de Medibot",
            icon: CheckCircle,
            color: "border-green-200 bg-green-50 dark:bg-green-950/20",
            iconColor: "text-green-600",
            list: [
              "Análisis inteligente de síntomas con IA médica avanzada",
              "Evaluación del nivel de urgencia y recomendaciones de acción",
              "Información educativa sobre condiciones de salud comunes",
              "Preparación para consultas médicas con preguntas relevantes",
              "Acceso 24/7 desde cualquier dispositivo con conexión a internet",
              "Historial de evaluaciones para seguimiento personal",
            ],
          },
          {
            title: "Limitaciones Importantes",
            icon: AlertTriangle,
            color: "border-amber-200 bg-amber-50 dark:bg-amber-950/20",
            iconColor: "text-amber-600",
            warning:
              "Medibot NO sustituye el diagnóstico, consejo o tratamiento médico profesional.",
            list: [
              "No proporciona diagnósticos médicos definitivos",
              "No debe usarse para emergencias médicas - contacta servicios de emergencia",
              "La precisión depende de la información que proporciones",
              "No considera tu historial médico completo",
              "Siempre consulta con profesionales de salud para decisiones médicas importantes",
            ],
          },
        ].map((item, index) => (
          <Card
            key={index}
            className={cn(
              `${item.color} hover:shadow-xl transition-all duration-300`,
              "w-full",
              index === 2 && "md:col-span-2 md:row-span-2 md:row-start-2"
            )}
          >
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <item.icon className={`h-7 w-7 ${item.iconColor}`} />
                <span>{item.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {item.content && (
                <p className="text-muted-foreground leading-relaxed">
                  {item.content}
                </p>
              )}
              {item.warning && (
                <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800 dark:text-red-200 font-semibold">
                    {item.warning}
                  </AlertDescription>
                </Alert>
              )}
              {item.list && (
                <ul className="space-y-2">
                  {item.list.map((point, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}
      </section>

      {/* CTA Section */}
      <section className="mt-20 text-center">
        <Card className="bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-none">
          <CardContent className="p-12">
            <h2 className="text-3xl font-bold mb-4">
              ¿Listo para cuidar tu salud?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Únete a miles de usuarios que ya confían en Medibot para obtener
              orientación médica inteligente y confiable.
            </p>
            <SignInButton mode="modal">
              <Button>
                <User className="w-4 h-4 mr-2" />
                Comenzar mi evaluación gratuita
              </Button>
            </SignInButton>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
