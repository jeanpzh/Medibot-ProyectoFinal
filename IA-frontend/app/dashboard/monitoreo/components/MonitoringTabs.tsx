import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Calendar, TrendingUp } from "lucide-react";
import { MonitoringForm } from "./MonitoringForm";
import { MonitoringTrends } from "./MonitoringTrends";
import type { MonitoringEntry } from "@/app/actions";
import { MonitoringHistory } from "./MonitoringHistory";

interface MonitoringTabsProps {
  entries: MonitoringEntry[];
  covidStatus: 0 | 1 | null;
  isLoading: boolean;
  onEntriesChange: (entries: MonitoringEntry[]) => void;
  onMessage: (message: { text: string; type: "success" | "error" }) => void;
}

export function MonitoringTabs({
  entries,
  covidStatus,
  isLoading,
  onEntriesChange,
  onMessage,
}: MonitoringTabsProps) {
  return (
    <Tabs defaultValue="today" className="w-full">
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="today" className="gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Registro Hoy</span>
        </TabsTrigger>
        <TabsTrigger value="history" className="gap-2">
          <Calendar className="h-4 w-4" />
          <span className="hidden sm:inline">Historial ({entries.length})</span>
        </TabsTrigger>
        <TabsTrigger value="trends" className="gap-2">
          <TrendingUp className="h-4 w-4" />
          <span className="hidden sm:inline">Tendencias</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="today">
        <MonitoringForm
          covidStatus={covidStatus}
          entries={entries}
          onEntriesChange={onEntriesChange}
          onMessage={onMessage}
        />
      </TabsContent>

      <TabsContent value="history">
        <MonitoringHistory
          entries={entries}
          onEntriesChange={onEntriesChange}
          onMessage={onMessage}
        />
      </TabsContent>

      <TabsContent value="trends">
        <MonitoringTrends entries={entries} isLoading={isLoading} />
      </TabsContent>
    </Tabs>
  );
}
