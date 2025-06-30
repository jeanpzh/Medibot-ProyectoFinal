"use client";

import { useState, useEffect } from "react";
import { MonitoringHeader } from "./components/MonitoringHeader";
import { MonitoringTabs } from "./components/MonitoringTabs";
import { StatusMessage } from "./components/StatusMessage";
import { NavigationCard } from "./components/NavigationCard";
import { getMonitoringEntries } from "@/app/actions";
import type { MonitoringEntry } from "@/app/actions";

export default function MonitoreoPage() {
  const [entries, setEntries] = useState<MonitoringEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [covidStatus, setCovidStatus] = useState<0 | 1 | null>(null);

  useEffect(() => {
    const loadCovidStatus = () => {
      try {
        const storedDiagnosis = localStorage.getItem("covid_diagnosis_result");
        if (storedDiagnosis) {
          const data = JSON.parse(storedDiagnosis);
          setCovidStatus(data.predicted_covid);
        }
      } catch (error) {
        console.error("Error loading COVID status:", error);
      }
    };
    loadCovidStatus();
  }, []);

  useEffect(() => {
    const loadEntries = async () => {
      setIsLoading(true);
      const result = await getMonitoringEntries();

      if (result.error) {
        setMessage({ text: `Error al cargar: ${result.error}`, type: "error" });
      } else if (result.data) {
        setEntries(result.data);
      }
      setIsLoading(false);
    };
    loadEntries();
  }, []);

  return (
    <div className="space-y-8">
      <MonitoringHeader covidStatus={covidStatus} />
      <StatusMessage message={message} onClose={() => setMessage(null)} />
      <MonitoringTabs
        entries={entries}
        covidStatus={covidStatus}
        isLoading={isLoading}
        onEntriesChange={setEntries}
        onMessage={setMessage}
      />
      <NavigationCard />
    </div>
  );
}
