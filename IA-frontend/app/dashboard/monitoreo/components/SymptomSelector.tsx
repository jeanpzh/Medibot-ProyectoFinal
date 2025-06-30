import { Label } from "@/components/ui/label";
import {
  Activity,
  Thermometer,
  Heart,
  Users,
  Plane,
  MapPin,
} from "lucide-react";
import type { MonitoringEntry } from "@/app/actions";

interface SymptomSelectorProps {
  entry: Partial<MonitoringEntry>;
  onChange: (entry: Partial<MonitoringEntry>) => void;
}

const symptoms = [
  {
    key: "breathing_problem",
    label: "Dificultad para respirar",
    icon: Activity,
    category: "Síntomas",
  },
  { key: "fever", label: "Fiebre", icon: Thermometer, category: "Síntomas" },
  { key: "dry_cough", label: "Tos seca", icon: Activity, category: "Síntomas" },
  {
    key: "sore_throat",
    label: "Dolor de garganta",
    icon: Activity,
    category: "Síntomas",
  },
  {
    key: "hyper_tension",
    label: "Hipertensión",
    icon: Heart,
    category: "Condiciones Médicas",
  },
  {
    key: "abroad_travel",
    label: "Viaje al extranjero reciente",
    icon: Plane,
    category: "Exposición",
  },
  {
    key: "contact_with_covid_patient",
    label: "Contacto con paciente COVID-19",
    icon: Users,
    category: "Exposición",
  },
  {
    key: "attended_large_gathering",
    label: "Asistencia a reuniones masivas",
    icon: Users,
    category: "Exposición",
  },
  {
    key: "visited_public_exposed_places",
    label: "Visitas a lugares públicos expuestos",
    icon: MapPin,
    category: "Exposición",
  },
  {
    key: "family_working_in_public_exposed_places",
    label: "Familiar trabaja en lugares públicos expuestos",
    icon: MapPin,
    category: "Exposición",
  },
];

export function SymptomSelector({ entry, onChange }: SymptomSelectorProps) {
  const handleToggle = (symptom: string) => {
    const currentSymptoms = entry.symptoms || [];
    const updatedSymptoms = currentSymptoms.includes(symptom)
      ? currentSymptoms.filter((s) => s !== symptom)
      : [...currentSymptoms, symptom];

    onChange({ ...entry, symptoms: updatedSymptoms });
  };

  return (
    <div className="space-y-3">
      <Label className="text-lg font-semibold">
        Variables de Evaluación COVID-19
      </Label>
      <div className="space-y-4">
        {["Síntomas", "Condiciones Médicas", "Exposición"].map((category) => (
          <div key={category} className="space-y-2">
            <h4 className="text-sm font-semibold text-muted-foreground">
              {category}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {symptoms
                .filter((s) => s.category === category)
                .map(({ key, label, icon: Icon }) => (
                  <div
                    key={key}
                    onClick={() => handleToggle(key)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      entry.symptoms?.includes(key)
                        ? "bg-blue-50 border-blue-300 text-blue-800 dark:bg-blue-950/30 dark:border-blue-700"
                        : "bg-white border-gray-200 hover:bg-gray-50 dark:bg-slate-800 dark:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        className={`h-4 w-4 ${
                          entry.symptoms?.includes(key)
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                      />
                      <span className="text-sm font-medium">{label}</span>
                      <div
                        className={`w-3 h-3 rounded-full ml-auto ${
                          entry.symptoms?.includes(key)
                            ? "bg-blue-600"
                            : "bg-gray-300"
                        }`}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Variables seleccionadas: {entry.symptoms?.length || 0}
      </p>
    </div>
  );
}
