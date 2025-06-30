import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Heart } from "lucide-react";
import type { MonitoringEntry } from "@/app/actions";

interface VitalSignsProps {
  entry: Partial<MonitoringEntry>;
  onChange: (entry: Partial<MonitoringEntry>) => void;
}

export function VitalSigns({ entry, onChange }: VitalSignsProps) {
  const getTemperatureStatus = (temp?: number) => {
    if (!temp)
      return {
        status: "Normal",
        color: "text-green-600",
        bg: "bg-green-50 border-green-200",
      };
    if (temp >= 38)
      return {
        status: "Fiebre",
        color: "text-red-600",
        bg: "bg-red-50 border-red-200",
      };
    if (temp >= 37.5)
      return {
        status: "Febrícula",
        color: "text-yellow-600",
        bg: "bg-yellow-50 border-yellow-200",
      };
    return {
      status: "Normal",
      color: "text-green-600",
      bg: "bg-green-50 border-green-200",
    };
  };

  const getOxygenStatus = (level?: number) => {
    if (!level) return { status: "No registrado", color: "text-gray-600" };
    if (level < 95) return { status: "Bajo", color: "text-red-600" };
    if (level < 98) return { status: "Límite", color: "text-yellow-600" };
    return { status: "Normal", color: "text-green-600" };
  };

  const tempStatus = getTemperatureStatus(entry.temperature);
  const oxygenStatus = getOxygenStatus(entry.oxygen_level);

  return (
    <div className="space-y-3">
      <Label className="text-lg font-semibold">Fecha del Registro</Label>
      <Input
        type="date"
        value={entry.entry_date}
        onChange={(e) => onChange({ ...entry, entry_date: e.target.value })}
        className="max-w-48"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label className="text-lg font-semibold">
            Temperatura Corporal (°C) *
          </Label>
          <div className="flex items-center gap-4">
            <Input
              type="number"
              step="0.1"
              min="35"
              max="42"
              value={entry.temperature || ""}
              onChange={(e) =>
                onChange({
                  ...entry,
                  temperature: parseFloat(e.target.value) || undefined,
                })
              }
              className="max-w-32"
              required
            />
            <Badge className={`${tempStatus.bg} ${tempStatus.color} border`}>
              <Thermometer className="h-3 w-3 mr-1" />
              {tempStatus.status}
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-lg font-semibold">
            Nivel de Oxígeno (%) - Opcional
          </Label>
          <div className="flex items-center gap-4">
            <Input
              type="number"
              min="80"
              max="100"
              value={entry.oxygen_level || ""}
              onChange={(e) =>
                onChange({
                  ...entry,
                  oxygen_level: e.target.value
                    ? parseInt(e.target.value)
                    : undefined,
                })
              }
              className="max-w-32"
              placeholder="98"
            />
            <Badge className={`${oxygenStatus.color}`}>
              <Heart className="h-3 w-3 mr-1" />
              {oxygenStatus.status}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Use un oxímetro de pulso si está disponible
          </p>
        </div>
      </div>
    </div>
  );
}
