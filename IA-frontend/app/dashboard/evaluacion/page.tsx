"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Stethoscope } from "lucide-react";
import { useEvaluationStore } from "@/lib/stores/useEvaluationStore";
import EvaluationHeader from "@/components/EvaluationHeader";
import {
  PhaseIndicator,
  PhaseContent,
  ResultsDisplay,
  NavigationButtons,
  LoadingState,
  ErrorDisplay,
} from "./components";
import { phases } from "./constants";
import { variables } from "./constants";
import { FormData } from "./types";

const EvaluacionContent = () => {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [progress, setProgress] = useState(25);

  const {
    formData,
    setFormData,
    runEvaluation,
    predictionResult,
    isLoading,
    error,
    clearResults,
  } = useEvaluationStore();

  useEffect(() => {
    const initializeFormData = () => {
      const initialFormData: FormData = Object.fromEntries(
        variables.map(({ key }) => [key, 0])
      );
      setFormData(initialFormData);
      clearResults();
    };

    initializeFormData();
  }, [setFormData, clearResults]);

  const handleNextPhase = () => {
    if (currentPhase < 4) {
      const newPhase = currentPhase + 1;
      setCurrentPhase(newPhase);
      setProgress(newPhase * 25);
    }
  };

  const handlePrevPhase = () => {
    if (currentPhase > 1) {
      const newPhase = currentPhase - 1;
      setCurrentPhase(newPhase);
      setProgress(newPhase * 25);
    }
  };

  const handleCheckboxChange = (key: string, checked: boolean) => {
    const currentData = formData || {};
    setFormData({ ...currentData, [key]: checked ? 1 : 0 });
  };

  const handleSubmitEvaluation = async () => {
    await runEvaluation();
  };

  const renderMainContent = () => {
    if (currentPhase === 4) {
      if (predictionResult && !error) {
        return (
          <ResultsDisplay
            predictionResult={predictionResult}
            formData={formData}
          />
        );
      }

      if (isLoading) {
        return <LoadingState />;
      }

      if (error) {
        return <ErrorDisplay error={error} />;
      }

      return null;
    }

    const currentPhaseData = phases.find((p) => p.id === currentPhase);
    if (!currentPhaseData) return null;

    return (
      <PhaseContent
        phase={currentPhaseData}
        formData={formData}
        onCheckboxChange={handleCheckboxChange}
      />
    );
  };

  return (
    <div className="space-y-8">
      <EvaluationHeader title="Evaluación COVID-19" />

      <PhaseIndicator currentPhase={currentPhase} progress={progress} />

      <Card className="border-primary/20 dark:border-primary/30">
        <CardHeader className="bg-primary/5 border-b border-primary/20 dark:border-primary/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-full">
              <Stethoscope className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-foreground">
                Fase {currentPhase}:{" "}
                {phases.find((p) => p.id === currentPhase)?.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {phases.find((p) => p.id === currentPhase)?.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">{renderMainContent()}</CardContent>

        <CardFooter className="p-0">
          <NavigationButtons
            currentPhase={currentPhase}
            isLoading={isLoading}
            hasResult={!!predictionResult}
            onPrevious={handlePrevPhase}
            onNext={handleNextPhase}
            onSubmit={handleSubmitEvaluation}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default EvaluacionContent;
