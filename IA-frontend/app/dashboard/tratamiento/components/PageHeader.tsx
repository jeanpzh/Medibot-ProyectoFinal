import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { TreatmentPlan } from "../types";

interface PageHeaderProps {
  status: TreatmentPlan["status"];
}

export const PageHeader = ({ status }: PageHeaderProps) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      <Link href="/dashboard">
        <Button variant="outline" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al Dashboard
        </Button>
      </Link>
      <div>
        <h1 className="text-3xl font-bold">
          {status === "positive"
            ? "Plan de Tratamiento"
            : "Medidas Preventivas"}
        </h1>
        <p className="text-muted-foreground">
          Protocolo basado en guías CDC/OMS
        </p>
      </div>
    </div>
  </div>
);
