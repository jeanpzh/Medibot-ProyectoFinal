import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Brain, Loader2 } from "lucide-react";

interface NavigationButtonsProps {
  currentPhase: number;
  isLoading: boolean;
  hasResult: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentPhase,
  isLoading,
  hasResult,
  onPrevious,
  onNext,
  onSubmit,
}) => {
  const isFirstPhase = currentPhase === 1;
  const isLastPhase = currentPhase === 4;
  const showSubmit = isLastPhase && !hasResult && !isLoading;

  return (
    <div className="flex justify-between border-t border-border p-4">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={isFirstPhase}
        className={isFirstPhase ? "invisible" : ""}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Anterior
      </Button>

      {!isLastPhase ? (
        <Button type="button" onClick={onNext}>
          Siguiente
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      ) : showSubmit ? (
        <Button
          type="button"
          onClick={onSubmit}
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analizando...
            </>
          ) : (
            <>
              <Brain className="mr-2 h-5 w-5" />
              Obtener Diagnóstico
            </>
          )}
        </Button>
      ) : null}
    </div>
  );
};

export default NavigationButtons;
