import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, Activity, Heart, Users } from "lucide-react";
import type { MonitoringEntry } from "@/app/actions";

interface TrendsSummaryProps {
  entries: MonitoringEntry[];
}

export function TrendsSummary({ entries }: TrendsSummaryProps) {
  const latestEntry = entries[0];

  const getFeelingColor = (feeling?: number) => {
    if (!feeling) return "text-muted-foreground";
    if (feeling >= 4) return "text-primary";
    if (feeling >= 3) return "text-yellow-500";
    return "text-destructive";
  };

  const calculateAverage = (field: keyof MonitoringEntry, days = 7) => {
    const relevantEntries = entries
      .slice(0, days)
      .filter((e) => e[field] != null);
    if (relevantEntries.length === 0) return "N/A";

    const sum = relevantEntries.reduce(
      (acc, entry) => acc + (entry[field] as number),
      0
    );
    return (sum / relevantEntries.length).toFixed(1);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-red-600" />
            Temperatura
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold">
              {latestEntry?.temperature || "N/A"}°C
            </div>
            <p className="text-sm text-muted-foreground">Último registro</p>
            <div className="text-xs">
              Promedio 7 días: {calculateAverage("temperature")}°C
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Síntomas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold">
              {latestEntry?.symptoms?.length || 0}
            </div>
            <p className="text-sm text-muted-foreground">Síntomas activos</p>
            <div className="text-xs">
              Promedio 7 días:{" "}
              {entries.length > 0
                ? (
                    entries
                      .slice(0, 7)
                      .reduce(
                        (sum, entry) => sum + (entry.symptoms?.length || 0),
                        0
                      ) / Math.min(entries.length, 7)
                  ).toFixed(1)
                : "N/A"}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Heart className="h-5 w-5 text-green-600" />
            Estado General
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div
              className={`text-2xl font-bold ${getFeelingColor(
                latestEntry?.overall_feeling
              )}`}
            >
              {latestEntry?.overall_feeling || "N/A"}/5
            </div>
            <p className="text-sm text-muted-foreground">Último registro</p>
            <div className="text-xs">
              Promedio 7 días: {calculateAverage("overall_feeling")}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-orange-600" />
            Oxígeno
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold">
              {latestEntry?.oxygen_level || "N/A"}%
            </div>
            <p className="text-sm text-muted-foreground">Último registro</p>
            <div className="text-xs">
              Promedio 7 días: {calculateAverage("oxygen_level")}%
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
