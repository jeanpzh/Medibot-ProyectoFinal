import {
  Droplets,
  Home,
  Plane,
  Thermometer,
  Users,
  Utensils,
  VenetianMaskIcon as Mask,
  Wind,
} from "lucide-react";
import type { PreventionItem } from "./types";

export const basicPrevention: PreventionItem[] = [
  {
    title: "Higiene de Manos",
    description: "La medida más efectiva para prevenir el contagio",
    icon: Droplets,
    color: "blue",
    items: [
      "Lávese las manos frecuentemente con agua y jabón por al menos 20 segundos",
      "Use desinfectante de manos con al menos 60% de alcohol cuando no tenga agua y jabón",
      "Evite tocarse los ojos, nariz y boca con las manos sin lavar",
      "Lávese las manos especialmente después de estar en lugares públicos",
    ],
  },
  {
    title: "Uso de Mascarillas",
    description: "Protección respiratoria para usted y otros",
    icon: Mask,
    color: "green",
    items: [
      "Use mascarilla en espacios públicos cerrados y cuando no pueda mantener distancia",
      "Asegúrese de que la mascarilla cubra completamente nariz y boca",
      "Use mascarillas N95 o KN95 para mayor protección en áreas de alto riesgo",
      "Cambie la mascarilla si se humedece o ensucia",
    ],
  },
  {
    title: "Distanciamiento Social",
    description: "Mantenga distancia segura de otras personas",
    icon: Users,
    color: "purple",
    items: [
      "Mantenga al menos 2 metros de distancia de personas que no viven en su hogar",
      "Evite multitudes y espacios mal ventilados",
      "Prefiera actividades al aire libre cuando sea posible",
      "Limite las reuniones sociales, especialmente en espacios cerrados",
    ],
  },
  {
    title: "Ventilación",
    description: "Mejore la calidad del aire en espacios cerrados",
    icon: Wind,
    color: "orange",
    items: [
      "Abra ventanas y puertas para mejorar la circulación del aire",
      "Use purificadores de aire con filtros HEPA cuando sea posible",
      "Evite espacios cerrados con poca ventilación",
      "En el trabajo, asegúrese de que los sistemas de ventilación funcionen correctamente",
    ],
  },
];

export const advancedPrevention: PreventionItem[] = [
  {
    title: "En el Hogar",
    description: "Proteja a su familia en casa",
    icon: Home,
    color: "blue",
    items: [
      "Desinfecte superficies frecuentemente tocadas diariamente",
      "Mantenga a los miembros enfermos aislados en una habitación separada",
      "Use utensilios y platos separados para personas enfermas",
      "Lave la ropa de personas enfermas por separado con agua caliente",
    ],
  },
  {
    title: "Al Viajar",
    description: "Precauciones durante viajes y transporte",
    icon: Plane,
    color: "green",
    items: [
      "Use mascarilla durante todo el viaje en transporte público",
      "Lleve desinfectante de manos y úselo frecuentemente",
      "Evite tocar superficies innecesariamente",
      "Mantenga distancia de otros pasajeros cuando sea posible",
    ],
  },
  {
    title: "Al Comer Fuera",
    description: "Seguridad en restaurantes y lugares de comida",
    icon: Utensils,
    color: "purple",
    items: [
      "Prefiera comer al aire libre o pedir comida para llevar",
      "Elija restaurantes con buena ventilación y medidas de seguridad",
      "Use desinfectante de manos antes y después de comer",
      "Evite buffets y servicios de autoservicio",
    ],
  },
  {
    title: "Monitoreo de Salud",
    description: "Vigile su estado de salud regularmente",
    icon: Thermometer,
    color: "red",
    items: [
      "Tome su temperatura diariamente si ha estado expuesto",
      "Esté atento a síntomas como fiebre, tos, dificultad para respirar",
      "Aíslese inmediatamente si desarrolla síntomas",
      "Busque atención médica si los síntomas empeoran",
    ],
  },
];

export const vaccinationInfo: string[] = [
  "Las vacunas COVID-19 son seguras y efectivas para prevenir enfermedad grave",
  "Manténgase al día con todas las dosis recomendadas, incluyendo refuerzos",
  "Las vacunas reducen significativamente el riesgo de hospitalización y muerte",
  "Consulte con su médico sobre qué vacunas son apropiadas para usted",
  "Incluso vacunado, continúe siguiendo las medidas preventivas básicas",
];

export const highRiskFactors: string[] = [
  "Edad de 65 años o más",
  "Enfermedades cardíacas o pulmonares crónicas",
  "Diabetes",
  "Sistema inmunológico debilitado",
  "Obesidad",
  "Embarazo",
  "Enfermedad renal o hepática crónica",
];
