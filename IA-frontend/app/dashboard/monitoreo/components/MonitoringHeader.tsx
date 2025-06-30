import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";

interface MonitoringHeaderProps {
  covidStatus: 0 | 1 | null;
}

export function MonitoringHeader({ covidStatus }: MonitoringHeaderProps) {
  return (
    <Card className="bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-blue-600 rounded-full">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-400">
              Monitoreo COVID-19
            </h2>
            <p className="text-blue-700 dark:text-blue-300">
              {covidStatus === 1
                ? "Seguimiento diario para pacientes con COVID-19 positivo"
                : "Monitoreo preventivo de síntomas y factores de riesgo"}
            </p>
          </div>
        </div>
        {covidStatus !== null && (
          <div className="flex items-center gap-2 mb-4">
            <Badge
              className={
                covidStatus === 1
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }
            >
              Estado: COVID-19 {covidStatus === 1 ? "POSITIVO" : "NEGATIVO"}
            </Badge>
          </div>
        )}
        <p className="text-blue-800 dark:text-blue-200">
          El monitoreo regular te ayuda a seguir la evolución de síntomas,
          evaluar la efectividad del tratamiento y detectar tempranamente
          cualquier complicación.
        </p>
      </CardContent>
    </Card>
  );
}
