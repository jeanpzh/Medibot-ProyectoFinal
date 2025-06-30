import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getStatusColor, getStatusIcon } from "../utils";
import type { DiagnosisData, TreatmentPlan } from "../types";

interface DiagnosisResultCardProps {
  diagnosisData: DiagnosisData;
  status: TreatmentPlan["status"];
}

export const DiagnosisResultCard = ({
  diagnosisData,
  status,
}: DiagnosisResultCardProps) => (
  <Card className={getStatusColor(status)}>
    <CardContent className="p-6">
      <div className="flex items-center gap-4">
        {getStatusIcon(status)}
        <div className="flex-1">
          <h2 className="text-xl font-bold">
            Resultado: COVID-19{" "}
            {diagnosisData.predicted_covid === 1 ? "POSITIVO" : "NEGATIVO"}
          </h2>
          <p className="text-sm opacity-90">
            Evaluación realizada el{" "}
            {new Date(diagnosisData.timestamp).toLocaleDateString("es-ES")}
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            {diagnosisData.symptoms?.map((symptom, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {symptom}
              </Badge>
            ))}
          </div>
        </div>
        {diagnosisData.confidence && (
          <div className="text-right">
            <p className="text-sm font-medium">Confianza</p>
            <p className="text-2xl font-bold">
              {(diagnosisData.confidence * 100).toFixed(0)}%
            </p>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);
