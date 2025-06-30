import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";
import { HistoryItem } from "./HistoryItem";
import { deleteMonitoringEntry } from "@/app/actions";
import type { MonitoringEntry } from "@/app/actions";

interface MonitoringHistoryProps {
  entries: MonitoringEntry[];
  onEntriesChange: (entries: MonitoringEntry[]) => void;
  onMessage: (message: { text: string; type: "success" | "error" }) => void;
}

export function MonitoringHistory({
  entries,
  onEntriesChange,
  onMessage,
}: MonitoringHistoryProps) {
  const handleDeleteEntry = async (entryId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este registro?")) {
      return;
    }

    const result = await deleteMonitoringEntry(entryId);

    if (result.error) {
      onMessage({ text: `Error al eliminar: ${result.error}`, type: "error" });
    } else {
      const updatedEntries = entries.filter((entry) => entry.id !== entryId);
      onEntriesChange(updatedEntries);
      onMessage({ text: "Registro eliminado correctamente", type: "success" });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          Historial de Monitoreo ({entries.length})
        </CardTitle>
        <CardDescription>
          Revisa tus registros anteriores de síntomas y seguimiento
        </CardDescription>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">No hay registros aún</h3>
            <p className="text-muted-foreground mb-4">
              Comienza registrando tu monitoreo diario en la pestaña "Registro
              Hoy"
            </p>
            <Button
              variant="outline"
              onClick={() =>
                (
                  document.querySelector(
                    '[value="today"]'
                  ) as HTMLElement | null
                )?.click()
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Crear Primer Registro
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry, index) => {
              // Encontrar el registro más reciente basado en created_at
              const latestEntry = entries.reduce((latest, current) =>
                new Date(current.created_at) > new Date(latest.created_at)
                  ? current
                  : latest
              );
              const isLatest = entry.id === latestEntry.id;

              return (
                <HistoryItem
                  key={entry.id}
                  entry={entry}
                  index={index}
                  isLatest={isLatest}
                  onDelete={handleDeleteEntry}
                />
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
