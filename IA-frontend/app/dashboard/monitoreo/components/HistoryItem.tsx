import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Thermometer,
  Heart,
  Trash2,
  CheckCircle,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import type { MonitoringEntry } from "@/app/actions";

interface HistoryItemProps {
  entry: MonitoringEntry;
  index: number;
  isLatest: boolean;
  onDelete: (entryId: string) => void;
}

export function HistoryItem({
  entry,
  index,
  isLatest,
  onDelete,
}: HistoryItemProps) {
  const getTemperatureStatus = (temp?: number) => {
    if (!temp)
      return {
        status: "Normal",
        color: "text-primary",
        bg: "bg-primary/10 border-primary/20",
      };
    if (temp >= 38)
      return {
        status: "Fiebre",
        color: "text-destructive",
        bg: "bg-destructive/10 border-destructive/20",
      };
    if (temp >= 37.5)
      return {
        status: "Febrícula",
        color: "text-yellow-500",
        bg: "bg-yellow-500/10 border-yellow-500/20",
      };
    return {
      status: "Normal",
      color: "text-primary",
      bg: "bg-primary/10 border-primary/20",
    };
  };

  const getOxygenStatus = (level?: number) => {
    if (!level)
      return { status: "No registrado", color: "text-muted-foreground" };
    if (level < 95) return { status: "Bajo", color: "text-destructive" };
    if (level < 98) return { status: "Límite", color: "text-yellow-500" };
    return { status: "Normal", color: "text-primary" };
  };

  const getFeelingColor = (feeling?: number) => {
    if (!feeling) return "text-muted-foreground";
    if (feeling >= 4) return "text-primary";
    if (feeling >= 3) return "text-yellow-500";
    return "text-destructive";
  };

  const tempStatus = getTemperatureStatus(entry.temperature);
  const oxygenStatus = getOxygenStatus(entry.oxygen_level);

  return (
    <Card className="border-l-4 border-l-primary">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="font-semibold">
                {format(
                  parseISO(entry.entry_date),
                  "EEEE, d 'de' MMMM 'de' yyyy",
                  { locale: es }
                )}
              </span>
              {isLatest && (
                <Badge variant="secondary" className="text-xs">
                  Más reciente
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className={`${tempStatus.bg} ${tempStatus.color} border`}>
                <Thermometer className="h-3 w-3 mr-1" />
                {entry.temperature}°C
              </Badge>
              {entry.oxygen_level && (
                <Badge className={oxygenStatus.color}>
                  <Heart className="h-3 w-3 mr-1" />
                  {entry.oxygen_level}%
                </Badge>
              )}
              <Badge
                className={`${getFeelingColor(
                  entry.overall_feeling
                )} flex items-center gap-1`}
              >
                Estado: {entry.overall_feeling}/5
              </Badge>
              {entry.treatment_compliance && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Tratamiento: {entry.treatment_compliance}/5
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium">
                {entry.symptoms?.length || 0} síntoma
                {(entry.symptoms?.length || 0) !== 1 ? "s" : ""}
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(entry.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {entry.symptoms && entry.symptoms.length > 0 && (
          <div className="mt-3">
            <h5 className="text-sm font-medium mb-2">Síntomas Reportados:</h5>
            <div className="flex flex-wrap gap-1">
              {entry.symptoms.map((symptom) => (
                <Badge key={symptom} variant="destructive" className="text-xs">
                  {symptom}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {entry.notes && (
          <div className="mt-3 p-3 bg-muted rounded-lg">
            <p className="text-sm">{entry.notes}</p>
          </div>
        )}
        <div className="mt-2 text-xs text-muted-foreground">
          Registrado:{" "}
          {format(parseISO(entry.created_at), "PPp", { locale: es })}
        </div>
      </CardContent>
    </Card>
  );
}
