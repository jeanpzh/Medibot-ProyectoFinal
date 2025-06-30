"use client";

import { useEffect } from "react";
import { useEvaluationStore } from "@/lib/stores/useEvaluationStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import { ExplicacionIALoading } from "./ExplicacionIALoading";
import { ExplicacionIAError } from "./ExplicacionIAError";
import { ExplicacionIAResult } from "./ExplicacionIAResult";
import { variables } from "../constants";

export const ExplicacionIA = () => {
  const store = useEvaluationStore();

  useEffect(() => {
    store.generateExplanation(variables);
    return () => store.clearResults();
  }, [store.generateExplanation, store.clearResults]);

  if (!store.predictionResult && !store.isLoading && !store.error) {
    return <ExplicacionIALoading />;
  }

  if (store.error && !store.isLoading) {
    return <ExplicacionIAError error={store.error} />;
  }

  return (
    <Card className="border-secondary/50 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-secondary rounded-full">
            <Sparkles className="h-8 w-8 text-secondary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-secondary-foreground">
              Explicación de tu Resultado por IA
            </CardTitle>
            <CardDescription>
              Análisis detallado de los factores que influyeron en tu
              predicción.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 grid gap-6 w-full">
        {store.isLoading && (
          <div className="flex items-center justify-center p-6 bg-muted rounded-lg">
            <Loader2 className="mr-2 h-6 w-6 animate-spin text-secondary" />
            <span className="text-foreground">
              Analizando tus resultados... La IA está trabajando.
            </span>
          </div>
        )}


        {store.explanationResult && !store.isLoading && (
          <ExplicacionIAResult
            predictionResult={store.predictionResult}
            explanationResult={store.explanationResult}
          />
        )}
      </CardContent>
    </Card>
  );
};
