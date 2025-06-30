import {
  Activity,
  Thermometer,
  Heart,
  Plane,
  Users,
  MapPin,
  Bug,
  Stethoscope,
  AlertTriangle,
  Shield,
  Microscope,
  Calendar,
  Globe,
  BookOpen,
} from "lucide-react";

export const variables = [
  {
    key: "breathing_problem",
    label: "Dificultad para respirar",
    icon: Activity,
  },
  { key: "fever", label: "Fiebre", icon: Thermometer },
  { key: "dry_cough", label: "Tos seca", icon: Activity },
  { key: "sore_throat", label: "Dolor de garganta", icon: Activity },
  { key: "hyper_tension", label: "Hipertensión", icon: Heart },
  { key: "abroad_travel", label: "Viaje al extranjero reciente", icon: Plane },
  {
    key: "contact_with_covid_patient",
    label: "Contacto con paciente COVID-19",
    icon: Users,
  },
  {
    key: "attended_large_gathering",
    label: "Asistencia a reuniones masivas",
    icon: Users,
  },
  {
    key: "visited_public_exposed_places",
    label: "Visitas a lugares públicos expuestos",
    icon: MapPin,
  },
  {
    key: "family_working_in_public_exposed_places",
    label: "Familiar trabaja en lugares públicos expuestos",
    icon: MapPin,
  },
];

export const basicInfo = [
  {
    title: "¿Qué es COVID-19?",
    description: "Información básica sobre el virus SARS-CoV-2",
    icon: Bug,
    variant: "destructive",
    content: [
      "COVID-19 es una enfermedad infecciosa causada por el virus SARS-CoV-2",
      "Se identificó por primera vez en Wuhan, China, en diciembre de 2019",
      "Es un coronavirus que afecta principalmente el sistema respiratorio",
      "Puede causar síntomas que van desde leves hasta graves",
      "Se transmite principalmente a través de gotículas respiratorias",
    ],
  },
  {
    title: "Síntomas Comunes",
    description: "Signos y síntomas más frecuentes de COVID-19",
    icon: Stethoscope,
    variant: "info",
    content: [
      "Fiebre o escalofríos (síntoma más común)",
      "Tos seca persistente",
      "Fatiga y cansancio extremo",
      "Dolor de cabeza intenso",
      "Dolor de garganta",
      "Pérdida del olfato o gusto",
      "Dificultad para respirar (síntoma grave)",
      "Dolor muscular y corporal",
    ],
  },
  {
    title: "Transmisión",
    description: "Cómo se propaga el virus entre personas",
    icon: Users,
    variant: "warning",
    content: [
      "Gotículas respiratorias al hablar, toser o estornudar",
      "Contacto cercano con personas infectadas (menos de 2 metros)",
      "Superficies contaminadas (menos común)",
      "Aerosoles en espacios cerrados mal ventilados",
      "Período de incubación: 2-14 días después de la exposición",
      "Las personas pueden ser contagiosas antes de mostrar síntomas",
    ],
  },
  {
    title: "Factores de Riesgo",
    description: "Quiénes tienen mayor riesgo de enfermedad grave",
    icon: AlertTriangle,
    variant: "warning",
    content: [
      "Adultos mayores de 65 años",
      "Personas con enfermedades cardíacas",
      "Diabetes mellitus",
      "Enfermedades pulmonares crónicas",
      "Sistema inmunológico debilitado",
      "Obesidad severa",
      "Enfermedad renal o hepática crónica",
      "Embarazo",
    ],
  },
];

export const variants = [
  {
    name: "Alpha (B.1.1.7)",
    origin: "Reino Unido",
    characteristics: "Mayor transmisibilidad, posible mayor gravedad",
    status: "Circulación reducida",
  },
  {
    name: "Beta (B.1.351)",
    origin: "Sudáfrica",
    characteristics: "Resistencia parcial a algunas vacunas",
    status: "Circulación reducida",
  },
  {
    name: "Gamma (P.1)",
    origin: "Brasil",
    characteristics: "Mayor transmisibilidad, posible reinfección",
    status: "Circulación reducida",
  },
  {
    name: "Delta (B.1.617.2)",
    origin: "India",
    characteristics: "Muy alta transmisibilidad, síntomas más severos",
    status: "Circulación reducida",
  },
  {
    name: "Omicron (B.1.1.529)",
    origin: "Sudáfrica",
    characteristics:
      "Extremadamente transmisible, síntomas generalmente más leves",
    status: "Variante dominante",
  },
];

export const timeline = [
  {
    date: "Diciembre 2019",
    event: "Primeros casos reportados en Wuhan, China",
  },
  { date: "Enero 2020", event: "OMS declara emergencia de salud pública" },
  { date: "Marzo 2020", event: "OMS declara pandemia global" },
  { date: "Diciembre 2020", event: "Primeras vacunas aprobadas" },
  { date: "2021", event: "Aparición de variantes de preocupación" },
  { date: "2022", event: "Transición a fase endémica en muchos países" },
  { date: "2023-2024", event: "Vigilancia continua y vacunas actualizadas" },
];

export const vaccines = [
  {
    name: "Pfizer-BioNTech",
    type: "ARN mensajero (ARNm)",
    efficacy: "95% contra enfermedad sintomática",
    doses: "2 dosis + refuerzos",
  },
  {
    name: "Moderna",
    type: "ARN mensajero (ARNm)",
    efficacy: "94% contra enfermedad sintomática",
    doses: "2 dosis + refuerzos",
  },
  {
    name: "Johnson & Johnson",
    type: "Vector viral",
    efficacy: "66% contra enfermedad sintomática",
    doses: "1 dosis + refuerzos",
  },
  {
    name: "AstraZeneca",
    type: "Vector viral",
    efficacy: "70% contra enfermedad sintomática",
    doses: "2 dosis + refuerzos",
  },
];

export const resources = [
  {
    title: "Organización Mundial de la Salud",
    description: "Información oficial y actualizada sobre COVID-19",
    icon: Globe,
    href: "https://www.who.int/es/emergencies/diseases/novel-coronavirus-2019",
  },
  {
    title: "CDC - Centro para el Control de Enfermedades",
    description: "Guías y recomendaciones basadas en evidencia",
    icon: Shield,
    href: "https://www.cdc.gov/covid/about/index.html",
  },
  {
    title: "Ministerio de Salud",
    description: "Información local y recursos específicos del país",
    icon: BookOpen,
    href: "https://www.gob.pe/minsa/",
  },
];

export const TABS_DATA = [
  {
    value: "basics",
    label: "Básico",
    icon: Bug,
  },
  {
    value: "variants",
    label: "Variantes",
    icon: Microscope,
  },
  {
    value: "vaccines",
    label: "Vacunas",
    icon: Shield,
  },
  {
    value: "timeline",
    label: "Cronología",
    icon: Calendar,
  },
  {
    value: "global",
    label: "Global",
    icon: Globe,
  },
];
