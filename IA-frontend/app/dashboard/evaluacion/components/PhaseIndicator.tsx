import React from "react";
import { Progress } from "@/components/ui/progress";
import { phases } from "../constants";
import { getPhaseColors, cn } from "../utils";

interface PhaseIndicatorProps {
  currentPhase: number;
  progress: number;
}

const PhaseIndicator: React.FC<PhaseIndicatorProps> = ({
  currentPhase,
  progress,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <span className="text-foreground">Progreso de Evaluación</span>
        <span className="text-muted-foreground">{progress}%</span>
      </div>

      <Progress value={progress} className="h-3" />

      {/* Phase indicators */}
      <div className="flex justify-between">
        {phases.map((phase) => {
          const colors = getPhaseColors(phase.color);
          const isActive = currentPhase >= phase.id;
          const isCurrent = currentPhase === phase.id;

          return (
            <div key={phase.id} className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  isActive
                    ? `${colors.background} ${colors.border}`
                    : "bg-muted border-border",
                  isCurrent && "ring-2 ring-ring ring-offset-2"
                )}
              >
                <phase.icon
                  className={cn(
                    "h-4 w-4 transition-colors duration-300",
                    isActive ? colors.icon : "text-muted-foreground"
                  )}
                />
              </div>
              <span
                className={cn(
                  "text-xs mt-1 text-center max-w-16 leading-tight transition-colors duration-300",
                  isActive
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {phase.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PhaseIndicator;
