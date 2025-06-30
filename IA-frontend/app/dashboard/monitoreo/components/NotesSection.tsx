import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { MonitoringEntry } from "@/app/actions";

interface NotesSectionProps {
  entry: Partial<MonitoringEntry>;
  onChange: (entry: Partial<MonitoringEntry>) => void;
}

export function NotesSection({ entry, onChange }: NotesSectionProps) {
  return (
    <div className="space-y-3">
      <Label htmlFor="notes" className="text-lg font-semibold">
        Notas Adicionales
      </Label>
      <Textarea
        id="notes"
        placeholder="Describe cómo te sientes, medicamentos tomados, actividades realizadas, cambios notados, etc."
        value={entry.notes || ""}
        onChange={(e) => onChange({ ...entry, notes: e.target.value })}
        rows={3}
      />
    </div>
  );
}
