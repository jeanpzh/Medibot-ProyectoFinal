import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  addEvaluation,
  getLatestEvaluationResult,
  generateExplanationWithMonitoring,
  getDiagnosis,
} from "@/app/actions";

// --- ESTRUCTURA DE DATOS ---

// Datos del formulario que envía el usuario
type FormData = Record<string, 0 | 1>;

// Resultado de la predicción del endpoint /predict
interface PredictionResult {
  predicted_covid: 0 | 1;
  label: "COVID-19" | "NO COVID-19";
  confidence: number;
  risk_level?: string;
  recommendations?: string[];
}

// Estructura de una tarjeta de explicación generada por IA
interface ExplanationCard {
  icon: string;
  color: string;
  title: string;
  description: string;
  content: string[];
}

// --- ESTADO DEL STORE ---

interface EvaluationState {
  formData: FormData | null;
  predictionResult: PredictionResult | null;
  explanationResult: ExplanationCard[] | null;
  isLoading: boolean;
  error: string | null;
}

// --- ACCIONES DEL STORE ---

interface EvaluationActions {
  setFormData: (data: FormData) => void;
  runEvaluation: () => Promise<void>;
  generateExplanation: (allVariables: { key: string }[]) => Promise<void>;
  clearResults: () => void;
}

// --- ESTADO INICIAL ---

const initialState: EvaluationState = {
  formData: null,
  predictionResult: null,
  explanationResult: null,
  isLoading: false,
  error: null,
};

// --- CREACIÓN DEL STORE ---

export const useEvaluationStore = create<EvaluationState & EvaluationActions>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // --- ACCIONES SINCRÓNICAS ---

      setFormData: (data) => set({ formData: data }),

      clearResults: () =>
        set({ predictionResult: null, explanationResult: null, error: null }),

      // --- ACCIONES ASÍNCRONAS ---

      runEvaluation: async () => {
        const formData = get().formData;
        if (!formData) {
          set({ error: "No se han proporcionado datos para la evaluación." });
          return;
        }

        set({
          isLoading: true,
          error: null,
          predictionResult: null,
          explanationResult: null,
        });

        try {
          // 1. Obtener la predicción usando Server Action
          const diagnosisResult = await getDiagnosis(formData);

          if (diagnosisResult.error) {
            throw new Error(diagnosisResult.error);
          }

          const predictionData: PredictionResult = diagnosisResult.data;
          set({ predictionResult: predictionData, isLoading: false });

          // 2. Guardar el resultado en Supabase
          const symptoms = Object.keys(formData).filter(
            (key) => formData[key] === 1
          );

          await addEvaluation({
            symptoms,
            riskLevel: predictionData.label,
            predictedCovid: predictionData.predicted_covid,
            confidence: predictionData.confidence,
          });
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
        }
      },

      generateExplanation: async (allVariables: { key: string }[]) => {
        set({ isLoading: true, error: null, explanationResult: null });

        try {
          // 1. Obtener la última evaluación de Supabase
          const result = await getLatestEvaluationResult();
          if (result.error || !result.data) {
            throw new Error(
              result.error || "No se encontró una evaluación previa."
            );
          }
          const latestEvaluation = result.data;

          // Reconstruir el objeto `features` con todas las claves.
          // Las que están en `sintomas` se marcan como 1, el resto como 0.
          const features = allVariables.reduce(
            (acc: Record<string, 0 | 1>, variable) => {
              acc[variable.key] = latestEvaluation.sintomas.includes(
                variable.key
              )
                ? 1
                : 0;
              return acc;
            },
            {}
          );

          const predictionData: PredictionResult = {
            predicted_covid: latestEvaluation.covid_prediction,
            label: latestEvaluation.risk_level,
            confidence: latestEvaluation.confidence,
          };

          set({ formData: features, predictionResult: predictionData });

          // 2. Obtener la explicación estructurada con historial de monitoreo
          const explanationResult = await generateExplanationWithMonitoring(
            features,
            latestEvaluation.risk_level
          );

          if (explanationResult.error) {
            throw new Error(explanationResult.error);
          }

          set({ explanationResult: explanationResult.data, isLoading: false });
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
        }
      },
    }),
    { name: "EvaluationStore" }
  )
);
