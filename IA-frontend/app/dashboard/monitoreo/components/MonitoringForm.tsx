import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { VitalSigns } from "./VitalSigns";
import { SymptomSelector } from "./SymptomSelector";
import { FeelingSlider } from "./FeelingSlider";
import { NotesSection } from "./NotesSection";
import { SubmitButton } from "./SubmitButton";
import { addOrUpdateMonitoringEntry } from "@/app/actions";
import type { MonitoringEntry } from "@/app/actions";

interface MonitoringFormProps {
  covidStatus: 0 | 1 | null;
  entries: MonitoringEntry[];
  onEntriesChange: (entries: MonitoringEntry[]) => void;
  onMessage: (message: { text: string; type: "success" | "error" }) => void;
}

export function MonitoringForm({
  covidStatus,
  entries,
  onEntriesChange,
  onMessage,
}: MonitoringFormProps) {
  const [currentEntry, setCurrentEntry] = useState<Partial<MonitoringEntry>>({
    entry_date: new Date().toISOString().split("T")[0],
    temperature: 36.5,
    oxygen_level: 98,
    symptoms: [],
    overall_feeling: 3,
    notes: "",
    treatment_compliance: 5,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!currentEntry.entry_date || !currentEntry.temperature) {
      onMessage({
        text: "Por favor completa la fecha y temperatura",
        type: "error",
      });
      return;
    }

    setIsSaving(true);
    const result = await addOrUpdateMonitoringEntry(
      currentEntry as MonitoringEntry
    );

    if (result.error) {
      onMessage({ text: result.error, type: "error" });
    } else if (result.data) {
      const updatedEntries = entries.some((e) => e.id === result.data.id)
        ? entries.map((e) => (e.id === result.data.id ? result.data : e))
        : [...entries, result.data];

      onEntriesChange(
        updatedEntries.sort(
          (a, b) =>
            new Date(b.entry_date).getTime() - new Date(a.entry_date).getTime()
        )
      );
      onMessage({ text: "Registro guardado correctamente", type: "success" });
    }
    setIsSaving(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          Registro del Día:{" "}
          {format(
            new Date(currentEntry.entry_date || ""),
            "EEEE, d 'de' MMMM 'de' yyyy",
            { locale: es }
          )}
        </CardTitle>
        <CardDescription>
          {covidStatus === 1
            ? "Monitoreo diario para seguimiento de COVID-19"
            : "Registro preventivo de síntomas y factores de riesgo"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <VitalSigns entry={currentEntry} onChange={setCurrentEntry} />
        <SymptomSelector entry={currentEntry} onChange={setCurrentEntry} />
        <FeelingSlider
          entry={currentEntry}
          onChange={setCurrentEntry}
          covidStatus={covidStatus}
        />
        <NotesSection entry={currentEntry} onChange={setCurrentEntry} />
        <SubmitButton
          onSave={handleSave}
          isSaving={isSaving}
          disabled={!currentEntry.temperature}
        />
      </CardContent>
    </Card>
  );
}
