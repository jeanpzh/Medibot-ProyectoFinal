import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Stethoscope } from "lucide-react";

export const NoDataState = () => (
  <div className="container mx-auto p-6">
    <Card>
      <CardContent className="p-6">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-warning mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            No se encontraron datos de diagnóstico
          </h3>
          <p className="text-muted-foreground mb-4">
            Para ver tu plan de tratamiento, primero debes completar la
            evaluación de síntomas.
          </p>
          <Link href="/dashboard/evaluacion">
            <Button>
              <Stethoscope className="mr-2 h-4 w-4" />
              Realizar Evaluación
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  </div>
);
