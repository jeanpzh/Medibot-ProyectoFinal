"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Activity,
  Heart,
  Shield,
  TrendingUp,
  User,
  Stethoscope,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  BookOpen,
  Plus,
  Pill,
  LineChart,
  Info,
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { getDashboardStats, addSectionVisit } from "@/app/actions";

interface DashboardStats {
  totalEvaluations: number;
  lastEvaluation: string | null;
  riskLevel: "Alto" | "Bajo" | null;
  completedModules: number;
  visitedSections: string[];
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  color = "blue",
}: {
  title: string;
  value: string | number;
  icon: any;
  trend?: string;
  color?: string;
}) => (
  <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {trend && (
            <p className="text-xs text-muted-foreground mt-1">{trend}</p>
          )}
        </div>
        <div
          className={`p-3 rounded-full bg-${color}-100 dark:bg-${color}-900/20`}
        >
          <Icon
            className={`h-6 w-6 text-${color}-600 dark:text-${color}-400`}
          />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function DashboardPage() {
  const { user } = useUser();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStats = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getDashboardStats();
      if (data.error) {
        throw new Error(data.error);
      }
      setStats(data);
    } catch (err: any) {
      console.error("Error loading dashboard stats:", err);
      setError(
        "No se pudieron cargar las estadísticas del dashboard. Por favor, intenta de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();

    const handleEvaluationCompleted = () => {
      loadStats();
    };

    window.addEventListener("evaluationCompleted", handleEvaluationCompleted);

    return () => {
      window.removeEventListener(
        "evaluationCompleted",
        handleEvaluationCompleted
      );
    };
  }, [loadStats]);

  const handleNavigation = async (path: string, sectionKey: string) => {
    await addSectionVisit(sectionKey);
    router.push(path);
  };

  const moduleCards = [
    {
      title: "Diagnóstico COVID-19",
      description:
        "Realiza una evaluación completa de síntomas con nuestro algoritmo de IA médica para obtener una orientación personalizada.",
      link: "/dashboard/evaluacion",
      icon: Stethoscope,
      buttonText: "Iniciar Evaluación",
      priority: true,
      color: "blue",
      sectionKey: "evaluacion",
    },
    {
      title: "Tratamiento",
      description:
        "Accede a recomendaciones de tratamiento personalizadas basadas en tu evaluación de síntomas y perfil médico.",
      link: "/dashboard/tratamiento",
      icon: Pill,
      buttonText: "Ver Tratamientos",
      color: "green",
      sectionKey: "tratamiento",
    },
    {
      title: "Prevención",
      description:
        "Aprende las mejores prácticas y protocolos actualizados para protegerte a ti y a tu familia del COVID-19.",
      link: "/dashboard/prevencion",
      icon: Shield,
      buttonText: "Ver Guía de Prevención",
      color: "purple",
      sectionKey: "prevencion",
    },
    {
      title: "Monitoreo de Síntomas",
      description:
        "Herramientas para el seguimiento diario de síntomas y recomendaciones basadas en tu estado de salud.",
      link: "/dashboard/monitoreo",
      icon: LineChart,
      buttonText: "Comenzar Monitoreo",
      color: "orange",
      sectionKey: "monitoreo",
    },
    {
      title: "Explicación COVID-19",
      description:
        "Información científica actualizada sobre COVID-19, variantes, tratamientos e investigación médica.",
      link: "/dashboard/explicacion",
      icon: Info,
      buttonText: "Explorar Información",
      color: "indigo",
      sectionKey: "explicacion",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] space-y-4">
        <Activity className="h-16 w-16 text-blue-500 animate-pulse" />
        <h2 className="text-2xl font-semibold">Cargando Dashboard</h2>
        <p className="text-lg text-muted-foreground">
          Cargando tu panel médico...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] space-y-4 text-center">
        <AlertTriangle className="h-16 w-16 text-destructive" />
        <h2 className="text-2xl font-semibold">Ocurrió un Error</h2>
        <p className="text-lg text-muted-foreground">{error}</p>
        <Button onClick={loadStats}>Reintentar</Button>
      </div>
    );
  }

  if (!user || !stats) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] space-y-4">
        <User className="h-16 w-16 text-muted-foreground" />
        <p className="text-lg text-muted-foreground">
          No se pudo cargar el perfil del usuario.
        </p>
      </div>
    );
  }

  const getRiskColor = (level: "Alto" | "Bajo" | null) => {
    if (level === "Alto") return "text-destructive";
    if (level === "Bajo") return "text-green-600";
    return "text-muted-foreground";
  };

  const getRiskText = (level: "Alto" | "Bajo" | null) => {
    if (!level) return "Sin datos";
    return `Riesgo ${level}`;
  };

  const isModuleCompleted = (sectionKey: string) => {
    return stats.visitedSections.includes(sectionKey);
  };

  const getRecommendations = () => {
    if (stats.totalEvaluations === 0) {
      return "Comienza con una evaluación de síntomas para obtener recomendaciones personalizadas.";
    }

    if (stats.riskLevel === "Alto") {
      return "Tu última evaluación indica riesgo alto. Considera consultar con un profesional de la salud.";
    }

    if (stats.completedModules < 3) {
      return "Explora más módulos educativos para una comprensión integral de COVID-19.";
    }

    return "¡Excelente progreso! Mantén tus conocimientos actualizados con evaluaciones regulares.";
  };

  // Calculate progress percentage (max 100%)
  const progressPercentage = Math.min(
    Math.round((stats.completedModules / 5) * 100),
    100
  );
  const displayName =
    user.firstName ||
    user.emailAddresses[0]?.emailAddress.split("@")[0] ||
    "Usuario";

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div>
          <h1 className="text-4xl font-bold ">Bienvenido, {displayName}</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Tu centro de salud digital personalizado
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Evaluaciones Realizadas"
          value={stats.totalEvaluations}
          icon={BarChart3}
          trend="Total acumulado"
          color="blue"
        />
        <StatCard
          title="Última Evaluación"
          value={
            stats.lastEvaluation
              ? new Date(stats.lastEvaluation).toLocaleString()
              : "Nunca"
          }
          icon={Clock}
          trend={stats.lastEvaluation ? "Fecha y hora" : "Sin evaluaciones"}
          color="green"
        />
        <StatCard
          title="Nivel de Riesgo"
          value={getRiskText(stats.riskLevel)}
          icon={TrendingUp}
          trend="Basado en última evaluación"
          color={getRiskColor(stats.riskLevel)}
        />
        <StatCard
          title="Progreso Educativo"
          value={`${stats.completedModules}/5`}
          icon={BookOpen}
          trend="Módulos explorados"
          color="purple"
        />
      </div>

      {/* Progress Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Tu Progreso de Salud</span>
          </CardTitle>
          <CardDescription>
            Completa todos los módulos para una experiencia integral
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Progreso general</span>
              <span>{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                {isModuleCompleted("evaluacion") ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Plus className="h-4 w-4 text-gray-400" />
                )}
                <span
                  className={
                    isModuleCompleted("evaluacion")
                      ? "text-green-600 font-medium"
                      : ""
                  }
                >
                  Diagnóstico
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {isModuleCompleted("tratamiento") ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Plus className="h-4 w-4 text-gray-400" />
                )}
                <span
                  className={
                    isModuleCompleted("tratamiento")
                      ? "text-green-600 font-medium"
                      : ""
                  }
                >
                  Tratamiento
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {isModuleCompleted("prevencion") ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Plus className="h-4 w-4 text-gray-400" />
                )}
                <span
                  className={
                    isModuleCompleted("prevencion")
                      ? "text-green-600 font-medium"
                      : ""
                  }
                >
                  Prevención
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {isModuleCompleted("monitoreo") ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Plus className="h-4 w-4 text-gray-400" />
                )}
                <span
                  className={
                    isModuleCompleted("monitoreo")
                      ? "text-green-600 font-medium"
                      : ""
                  }
                >
                  Monitoreo
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {isModuleCompleted("explicacion") ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Plus className="h-4 w-4 text-gray-400" />
                )}
                <span
                  className={
                    isModuleCompleted("explicacion")
                      ? "text-green-600 font-medium"
                      : ""
                  }
                >
                  Explicación
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Card */}
      <Card className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Info className="h-5 w-5 text-blue-600" />
            <span>Recomendaciones Personalizadas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{getRecommendations()}</p>
        </CardContent>
      </Card>

      {/* Module Cards */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
          <Activity className="h-6 w-6 text-blue-600" />
          <span>Módulos Disponibles</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moduleCards.map((card) => {
            const isCompleted = isModuleCompleted(card.sectionKey);
            return (
              <Card
                key={card.title}
                className={`hover:shadow-lg transition-all duration-300 hover:scale-105 ${
                  card.priority
                    ? "ring-2 ring-blue-500 bg-blue-50/50 dark:bg-blue-950/20"
                    : isCompleted
                    ? "ring-2 ring-green-500 bg-green-50/50 dark:bg-green-950/20"
                    : "border-gray-200 bg-white dark:bg-slate-800"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${
                          card.priority
                            ? "bg-blue-100 dark:bg-blue-900/30"
                            : isCompleted
                            ? "bg-green-100 dark:bg-green-900/30"
                            : card.color === "green"
                            ? "bg-green-100 dark:bg-green-900/20"
                            : card.color === "purple"
                            ? "bg-purple-100 dark:bg-purple-900/20"
                            : card.color === "orange"
                            ? "bg-orange-100 dark:bg-orange-900/20"
                            : "bg-indigo-100 dark:bg-indigo-900/20"
                        }`}
                      >
                        <card.icon
                          className={`h-5 w-5 ${
                            card.priority
                              ? "text-blue-600 dark:text-blue-400"
                              : isCompleted
                              ? "text-green-600 dark:text-green-400"
                              : card.color === "green"
                              ? "text-green-600 dark:text-green-400"
                              : card.color === "purple"
                              ? "text-purple-600 dark:text-purple-400"
                              : card.color === "orange"
                              ? "text-orange-600 dark:text-orange-400"
                              : "text-indigo-600 dark:text-indigo-400"
                          }`}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <span>{card.title}</span>
                          {isCompleted && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </CardTitle>
                        {card.priority && (
                          <Badge variant="secondary" className="mt-1">
                            Recomendado
                          </Badge>
                        )}
                        {isCompleted && (
                          <Badge
                            variant="outline"
                            className="mt-1 text-green-600 border-green-600"
                          >
                            Completado
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="mb-4 text-sm leading-relaxed">
                    {card.description}
                  </CardDescription>
                  <Link
                    href={card.link}
                    onClick={() => {
                      // Mark section as visited when clicking the link
                      setTimeout(() => {
                        handleNavigation(card.link, card.sectionKey);
                      }, 100);
                    }}
                  >
                    <Button
                      className={`w-full ${
                        card.priority
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : isCompleted
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : card.color === "green"
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : card.color === "purple"
                          ? "bg-purple-600 hover:bg-purple-700 text-white"
                          : card.color === "orange"
                          ? "bg-orange-600 hover:bg-orange-700 text-white"
                          : "bg-indigo-600 hover:bg-indigo-700 text-white"
                      }`}
                    >
                      {isCompleted ? "Revisar" : card.buttonText}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Important Notice */}
      <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800 dark:text-amber-200">
          <strong>Aviso Médico Importante:</strong> Medibot es una herramienta
          de orientación educativa basada en inteligencia artificial. No
          sustituye el diagnóstico, tratamiento o consejo médico profesional.
          Ante síntomas graves o dudas, consulte inmediatamente con un
          profesional de la salud.
        </AlertDescription>
      </Alert>

      {/* Quick Actions */}
      <Card className="bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold">
                ¿Tienes síntomas preocupantes?
              </h3>
              <p className="text-muted-foreground">
                Realiza una evaluación rápida ahora
              </p>
            </div>
            <Link href="/dashboard/evaluacion">
              <button className="p-[3px] relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="px-8 py-2  bg-black rounded-[6px] flex items-center relative group transition duration-200 text-white hover:bg-transparent">
                  <Stethoscope className="mr-2 h-4 w-4" />
                  Evaluación Rápida
                </div>
              </button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
