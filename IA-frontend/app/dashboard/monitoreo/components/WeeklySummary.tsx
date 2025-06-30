import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  CheckCircle,
  Clock,
  AlertTriangle,
  Minus,
} from "lucide-react";
import { format, subDays, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import type { MonitoringEntry } from "@/app/actions";

interface WeeklySummaryProps {
  entries: MonitoringEntry[];
}

interface DailyStats {
  date: string;
  avgTemperature: number;
  symptomCount: number;
  feelingLevel: number;
  hasData: boolean;
}

export function WeeklySummary({ entries }: WeeklySummaryProps) {
  const generateWeeklyStats = (): DailyStats[] => {
    const stats: DailyStats[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = format(subDays(new Date(), i), "yyyy-MM-dd");
      const dayEntry = entries.find((entry) => entry.entry_date === date);

      if (dayEntry) {
        stats.push({
          date,
          avgTemperature: Math.round((dayEntry.temperature || 0) * 10) / 10,
          symptomCount: dayEntry.symptoms?.length || 0,
          feelingLevel: Math.round(dayEntry.overall_feeling || 0),
          hasData: true,
        });
      } else {
        stats.push({
          date,
          avgTemperature: 36.5,
          symptomCount: 0,
          feelingLevel: 3,
          hasData: false,
        });
      }
    }

    return stats;
  };

  const weeklyStats = generateWeeklyStats();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-600" />
          Resumen de los Últimos 7 Días
        </CardTitle>
        <CardDescription>Análisis de tu evolución y monitoreo</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {weeklyStats.map((stat, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg ${
                stat.hasData
                  ? "bg-blue-50 dark:bg-blue-950/20 border border-blue-200"
                  : "bg-gray-50 dark:bg-slate-800"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-sm font-medium">
                  {format(parseISO(stat.date), "EEE dd/MM", { locale: es })}
                </div>
                {stat.hasData ? (
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      {stat.avgTemperature}°C
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {stat.symptomCount} síntomas
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Estado {stat.feelingLevel}/5
                    </Badge>
                  </div>
                ) : (
                  <Badge variant="outline" className="text-xs text-gray-500">
                    Sin registro
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                {stat.hasData ? (
                  stat.feelingLevel >= 4 ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : stat.feelingLevel >= 3 ? (
                    <Clock className="h-4 w-4 text-yellow-500" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  )
                ) : (
                  <Minus className="h-4 w-4 text-gray-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
