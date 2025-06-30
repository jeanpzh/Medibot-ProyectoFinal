import { LucideIcon } from "lucide-react";

export interface Variable {
  key: string;
  label: string;
  icon: LucideIcon;
  phase: number;
  category: string;
}

export interface Phase {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: "respiratory" | "medical" | "exposure" | "result";
}

export interface PredictionResult {
  predicted_covid: 0 | 1;
  confidence?: number;
  recommendations?: string[];
}

export interface FormData {
  [key: string]: 0 | 1;
}

export interface PhaseColors {
  background: string;
  border: string;
  text: string;
  icon: string;
}
