import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, CheckCircle } from "lucide-react";
import type { MonitoringEntry } from "@/app/actions";

interface FeelingSliderProps {
  entry: Partial<MonitoringEntry>;
  onChange: (entry: Partial<MonitoringEntry>) => void;
  covidStatus: 0 | 1 | null;
}

export function FeelingSlider({
  entry,
  onChange,
  covidStatus,
}: FeelingSliderProps) {
  const getFeelingColor = (feeling?: number) => {
    if (!feeling) return "text-muted-foreground";
    if (feeling >= 4) return "text-primary";
    if (feeling >= 3) return "text-yellow-500";
    return "text-destructive";
  };

  const getFeelingIcon = (feeling?: number) => {
    if (!feeling) return <Minus className="h-4 w-4" />;
    if (feeling >= 4) return <TrendingUp className="h-4 w-4" />;
    if (feeling >= 3) return <Minus className="h-4 w-4" />;
    return <TrendingDown className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Overall Feeling */}
      <div className="space-y-3">
        <Label className="text-lg font-semibold">Estado General (1-5)</Label>
        <div className="flex items-center gap-4">
          <Input
            type="range"
            min="1"
            max="5"
            value={entry.overall_feeling || 3}
            onChange={(e) =>
              onChange({ ...entry, overall_feeling: parseInt(e.target.value) })
            }
            className="flex-1"
          />
          <Badge
            className={`${getFeelingColor(
              entry.overall_feeling
            )} flex items-center gap-1`}
          >
            {getFeelingIcon(entry.overall_feeling)}
            Nivel {entry.overall_feeling || 3}
          </Badge>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>1 - Muy mal</span>
          <span>3 - Regular</span>
          <span>5 - Excelente</span>
        </div>
      </div>

      {/* Treatment Compliance (only for COVID positive) */}
      {covidStatus === 1 && (
        <div className="space-y-3">
          <Label className="text-lg font-semibold">
            Cumplimiento del Tratamiento (1-5)
          </Label>
          <div className="flex items-center gap-4">
            <Input
              type="range"
              min="1"
              max="5"
              value={entry.treatment_compliance || 5}
              onChange={(e) =>
                onChange({
                  ...entry,
                  treatment_compliance: parseInt(e.target.value),
                })
              }
              className="flex-1"
            />
            <Badge variant="outline" className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              {entry.treatment_compliance || 5}/5
            </Badge>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 - No cumplido</span>
            <span>3 - Parcial</span>
            <span>5 - Completo</span>
          </div>
        </div>
      )}
    </div>
  );
}
