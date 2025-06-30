"use client";

import { useEffect, useState } from "react";
import { getLatestEvaluation } from "@/app/actions";
import {
  AdditionalInfo,
  BottomNavigation,
  DiagnosisResultCard,
  Disclaimer,
  ErrorState,
  LoadingState,
  NoDataState,
  PageHeader,
  TreatmentPlanDetails,
} from "./components";
import { POSITIVE_TREATMENT_PLAN, NEGATIVE_TREATMENT_PLAN } from "./constants";
import type { DiagnosisData, TreatmentPlan } from "./types";

const getTreatmentPlan = (covidStatus: 0 | 1): TreatmentPlan => {
  return covidStatus === 1 ? POSITIVE_TREATMENT_PLAN : NEGATIVE_TREATMENT_PLAN;
};

export default function TratamientoPage() {
  const [diagnosisData, setDiagnosisData] = useState<DiagnosisData | null>(
    null
  );
  const [treatmentPlan, setTreatmentPlan] = useState<TreatmentPlan | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDiagnosisData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getLatestEvaluation();

        if (
          result.success &&
          result.data?.risk_level &&
          result.data?.created_at
        ) {
          const evaluation = result.data;
          const predicted_covid = evaluation.risk_level === "COVID-19" ? 1 : 0;

          const diagnosis: DiagnosisData = {
            predicted_covid,
            risk_level: evaluation.risk_level,
            timestamp: evaluation.created_at,
          };

          setDiagnosisData(diagnosis);
          setTreatmentPlan(getTreatmentPlan(predicted_covid));
        } else {
          setError(
            result.error ||
              "No se encontró ninguna evaluación válida. Por favor, complete una primero."
          );
        }
      } catch (e: any) {
        setError("Ocurrió un error inesperado al cargar los datos.");
        console.error(e);
      }
      setIsLoading(false);
    };

    loadDiagnosisData();
  }, []);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!diagnosisData || !treatmentPlan) {
    return <NoDataState />;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <PageHeader status={treatmentPlan.status} />
      <DiagnosisResultCard
        diagnosisData={diagnosisData}
        status={treatmentPlan.status}
      />
      <TreatmentPlanDetails plan={treatmentPlan} />
      <AdditionalInfo plan={treatmentPlan} />
      <BottomNavigation />
      <Disclaimer />
    </div>
  );
}
