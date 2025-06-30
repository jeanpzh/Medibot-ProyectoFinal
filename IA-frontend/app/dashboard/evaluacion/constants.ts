import {
  Activity,
  Thermometer,
  Heart,
  Plane,
  Users,
  MapPin,
  Brain,
} from "lucide-react";
import { Variable, Phase } from "./types";

export const variables: Variable[] = [
  {
    key: "breathing_problem",
    label: "Dificultad para respirar",
    icon: Activity,
    phase: 1,
    category: "Síntomas Respiratorios",
  },
  {
    key: "fever",
    label: "Fiebre",
    icon: Thermometer,
    phase: 1,
    category: "Síntomas Respiratorios",
  },
  {
    key: "dry_cough",
    label: "Tos seca",
    icon: Activity,
    phase: 1,
    category: "Síntomas Respiratorios",
  },
  {
    key: "sore_throat",
    label: "Dolor de garganta",
    icon: Activity,
    phase: 1,
    category: "Síntomas Respiratorios",
  },
  {
    key: "hyper_tension",
    label: "Hipertensión",
    icon: Heart,
    phase: 2,
    category: "Condiciones Médicas",
  },
  {
    key: "abroad_travel",
    label: "Viaje al extranjero reciente",
    icon: Plane,
    phase: 3,
    category: "Exposición y Contacto",
  },
  {
    key: "contact_with_covid_patient",
    label: "Contacto con paciente COVID-19",
    icon: Users,
    phase: 3,
    category: "Exposición y Contacto",
  },
  {
    key: "attended_large_gathering",
    label: "Asistencia a reuniones masivas",
    icon: Users,
    phase: 3,
    category: "Exposición y Contacto",
  },
  {
    key: "visited_public_exposed_places",
    label: "Visitas a lugares públicos expuestos",
    icon: MapPin,
    phase: 3,
    category: "Exposición y Contacto",
  },
  {
    key: "family_working_in_public_exposed_places",
    label: "Familiar trabaja en lugares públicos expuestos",
    icon: MapPin,
    phase: 3,
    category: "Exposición y Contacto",
  },
];

export const phases: Phase[] = [
  {
    id: 1,
    title: "Síntomas Respiratorios",
    description:
      "Evalúa los síntomas respiratorios que puedas estar experimentando",
    icon: Activity,
    color: "respiratory",
  },
  {
    id: 2,
    title: "Condiciones Médicas",
    description: "Información sobre condiciones médicas preexistentes",
    icon: Heart,
    color: "medical",
  },
  {
    id: 3,
    title: "Exposición y Contacto",
    description: "Historial de exposición y contactos de riesgo",
    icon: Users,
    color: "exposure",
  },
  {
    id: 4,
    title: "Resultado del Análisis",
    description: "Diagnóstico basado en inteligencia artificial",
    icon: Brain,
    color: "result",
  },
];
