export interface DiagnosisData {
  predicted_covid: 0 | 1;
  risk_level: string;
  symptoms?: string[];
  timestamp: string;
  confidence?: number;
}

export interface TreatmentPlan {
  title: string;
  description: string;
  status: "positive" | "negative";
  urgency_level: "low" | "medium" | "high";
  symptoms_analysis: string[];
  monitoring_analysis: string[];
  monitoring_recommendations: string[];
  prevention_measures: string[];
  medications: string[];
  homecare: string[];
  monitoring: string[];
  isolation: string[];
  prevention: string[];
  warning_signs: string[];
  when_to_seek_help: string;
  duration: string;
  follow_up: string[];
  emergency_contacts: string[];
}
