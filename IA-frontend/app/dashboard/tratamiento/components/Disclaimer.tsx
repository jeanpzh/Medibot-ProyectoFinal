import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export const Disclaimer = () => (
  <Card className="border-yellow-500/20 bg-yellow-500/10">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-yellow-500">
        <Info className="h-5 w-5" />
        Información Médica Importante
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-yellow-500/90">
        <strong>Descargo de responsabilidad:</strong> Este protocolo está basado
        en las guías oficiales del CDC y OMS. Es únicamente para fines
        educativos e informativos. NO reemplaza el juicio clínico profesional ni
        la consulta médica directa. Siempre consulte con un profesional de la
        salud para obtener diagnóstico y tratamiento apropiados.
      </p>
      <div className="mt-3 text-xs text-yellow-500/80">
        <p>
          <strong>Fuentes:</strong> CDC COVID-19 Treatment Guidelines, WHO
          Clinical Management Guidelines
        </p>
      </div>
    </CardContent>
  </Card>
);
