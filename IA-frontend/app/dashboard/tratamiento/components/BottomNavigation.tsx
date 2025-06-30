import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Info, Shield, Stethoscope } from "lucide-react";

export const BottomNavigation = () => (
  <Card className="bg-muted/50">
    <CardContent className="p-6">
      <h3 className="text-lg font-semibold mb-4">
        Continúa tu cuidado integral
      </h3>
      <div className="flex flex-wrap gap-4">
        <Link href="/dashboard/monitoreo">
          <Button variant="outline">
            <Activity className="mr-2 h-4 w-4" />
            Monitoreo de Síntomas
          </Button>
        </Link>
        <Link href="/dashboard/prevencion">
          <Button variant="outline">
            <Shield className="mr-2 h-4 w-4" />
            Guías de Prevención
          </Button>
        </Link>
        <Link href="/dashboard/explicacion">
          <Button variant="outline">
            <Info className="mr-2 h-4 w-4" />
            Información COVID-19
          </Button>
        </Link>
        <Link href="/dashboard/evaluacion">
          <Button variant="outline">
            <Stethoscope className="mr-2 h-4 w-4" />
            Nueva Evaluación
          </Button>
        </Link>
      </div>
    </CardContent>
  </Card>
);
