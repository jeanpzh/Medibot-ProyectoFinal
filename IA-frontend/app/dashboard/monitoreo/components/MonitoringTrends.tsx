import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Plus, Thermometer, Activity, Heart } from "lucide-react";
import { TrendsSummary } from "./TrendsSummary";
import { WeeklySummary } from "./WeeklySummary";
import type { MonitoringEntry } from "@/app/actions";

interface MonitoringTrendsProps {
  entries: MonitoringEntry[];
  isLoading: boolean;
}

export function MonitoringTrends({
  entries,
  isLoading,
}: MonitoringTrendsProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
          <p className="text-muted-foreground">
            Cargando análisis de tendencias...
          </p>
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">
            No hay datos para mostrar tendencias
          </h3>
          <p className="text-muted-foreground mb-4">
            Necesitas al menos 2 registros para ver las tendencias de tu salud
          </p>
          <Button
            variant="outline"
            onClick={() =>
              (
                document.querySelector('[value="today"]') as HTMLElement | null
              )?.click()
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            Agregar Registro
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <TrendsSummary entries={entries} />
      <WeeklySummary entries={entries} />
    </div>
  );
}
