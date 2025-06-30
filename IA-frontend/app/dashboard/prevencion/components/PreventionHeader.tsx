import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";

export const PreventionHeader = () => (
  <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800/50">
    <CardContent className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-green-600 rounded-full">
          <Shield className="h-8 w-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-300">
            Protégete y Protege a Otros
          </h2>
          <p className="text-green-700 dark:text-green-200">
            La prevención es la mejor defensa contra COVID-19
          </p>
        </div>
      </div>
      <p className="text-green-800/90 dark:text-green-200/90">
        Seguir las medidas preventivas adecuadas puede reducir
        significativamente su riesgo de contraer y transmitir COVID-19. Estas
        recomendaciones están basadas en las últimas directrices de salud
        pública.
      </p>
    </CardContent>
  </Card>
);
