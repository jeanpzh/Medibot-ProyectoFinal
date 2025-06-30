import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, CheckCircle, Brain, Heart, Shield } from "lucide-react";
import { PredictionResult, FormData } from "@/app/dashboard/evaluacion/types";
import { variables } from "@/app/dashboard/evaluacion/constants";
import { getStatusColors } from "@/app/dashboard/evaluacion/utils";

interface ResultsDisplayProps {
  predictionResult: PredictionResult;
  formData: FormData | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  predictionResult,
  formData,
}) => {
  const isPositive = predictionResult.predicted_covid === 1;
  const statusColors = getStatusColors(isPositive);

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <Card
        className={`border-2 ${statusColors.border} ${statusColors.background}`}
      >
        <CardHeader>
          <div className="flex items-center gap-3">
            {isPositive ? (
              <AlertTriangle className={`h-8 w-8 ${statusColors.icon}`} />
            ) : (
              <Shield className={`h-8 w-8 ${statusColors.icon}`} />
            )}
            <div>
              <CardTitle className={statusColors.text}>
                Resultado del Análisis COVID-19
              </CardTitle>
              <CardDescription className={statusColors.text}>
                Diagnóstico basado en inteligencia artificial
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {/* Diagnosis and Risk Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Diagnóstico:</h4>
                <Badge
                  variant={isPositive ? "destructive" : "default"}
                  className="text-lg px-4 py-2"
                >
                  {isPositive ? "COVID-19 POSITIVO" : "COVID-19 NEGATIVO"}
                </Badge>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">
                  Nivel de Riesgo:
                </h4>
                <Badge variant="outline" className="text-lg px-4 py-2">
                  {isPositive ? "Alto" : "Bajo"}
                </Badge>
              </div>
            </div>

            {/* Confidence Level */}
            {predictionResult.confidence && (
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">
                  Confianza del Modelo:
                </h4>
                <div className="flex items-center gap-2">
                  <Progress
                    value={predictionResult.confidence * 100}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium text-foreground">
                    {(predictionResult.confidence * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            )}

            <Separator />

            {/* Reported Symptoms */}
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">
                Síntomas Reportados:
              </h4>
              <div className="flex flex-wrap gap-2">
                {formData &&
                  Object.entries(formData)
                    .filter(([_, value]) => value === 1)
                    .map(([key, _]) => {
                      const variable = variables.find((v) => v.key === key);
                      return (
                        <Badge key={key} variant="outline" className="text-xs">
                          {variable?.label}
                        </Badge>
                      );
                    })}
              </div>
            </div>

            {/* Recommendations */}
            {predictionResult.recommendations && (
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">
                  Recomendaciones Inmediatas:
                </h4>
                <ul className="space-y-1">
                  {predictionResult.recommendations.map(
                    (rec: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm text-foreground"
                      >
                        <CheckCircle className="h-4 w-4 text-primary" />
                        {rec}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center flex-wrap gap-4">
        <Link href="/dashboard/tratamiento">
          <Button
            size="lg"
            variant={isPositive ? "destructive" : "default"}
            className="text-primary-foreground"
          >
            <Heart className="mr-2 h-5 w-5" />
            {isPositive ? "Ver Plan de Tratamiento" : "Ver Medidas Preventivas"}
          </Button>
        </Link>

        <Link href="/dashboard/explicacion">
          <Button
            size="lg"
            variant="outline"
            className="text-secondary-foreground border-secondary hover:bg-secondary/10"
          >
            <Brain className="mr-2 h-5 w-5" />
            Ver Explicación con IA
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ResultsDisplay;
