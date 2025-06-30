import { InfoCard } from "@/components/InfoCard";
import {
  Activity,
  AlertTriangle,
  Heart,
  Home,
  Pill,
  Shield,
  Stethoscope,
} from "lucide-react";
import type { TreatmentPlan } from "../types";

interface TreatmentPlanDetailsProps {
  plan: TreatmentPlan;
}

export const TreatmentPlanDetails = ({ plan }: TreatmentPlanDetailsProps) => {
  const isPositive = plan.status === "positive";

  const sections = [
    {
      title: "Análisis de Síntomas y Factores de Riesgo",
      description:
        "Evaluación de tu situación basada en el resultado predictivo y tu historial.",
      icon: Stethoscope,
      content: plan.symptoms_analysis,
      variant: "destructive",
    },
    {
      title: "Análisis del Monitoreo Reciente",
      description: "Observación de tendencias en tus signos vitales.",
      icon: Activity,
      content: plan.monitoring_analysis,
      variant: "warning",
    },
    {
      title: "Recomendaciones de Monitoreo y Atención",
      description: "Acciones inmediatas para controlar tu salud.",
      icon: Heart,
      content: plan.monitoring_recommendations,
      variant: "info",
    },
    {
      title: "Medidas de Prevención y Autocuidado",
      description:
        "Recomendaciones para tu bienestar y la protección de los demás.",
      icon: Shield,
      content: plan.prevention_measures,
      variant: "success",
    },
  ];

  if (isPositive) {
    sections.push(
      {
        title: "Medicamentos y Tratamiento",
        description: "Tratamiento farmacológico para COVID-19.",
        icon: Pill,
        content: plan.medications,
        variant: "primary",
      },
      {
        title: "Cuidados en Casa",
        description: "Manejo de síntomas y cuidados en el hogar.",
        icon: Home,
        content: plan.homecare,
        variant: "primary",
      },
      {
        title: "Signos de Alarma",
        description: "Síntomas que requieren atención médica urgente.",
        icon: AlertTriangle,
        content: plan.warning_signs,
        variant: "destructive",
      }
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {sections.map((section, index) => (
        <InfoCard
          key={index}
          title={section.title}
          description={section.description}
          icon={section.icon}
          content={section.content}
          variant={section.variant as any}
        />
      ))}
    </div>
  );
};
