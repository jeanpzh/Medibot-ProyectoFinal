import React from "react";
import { FormData, Phase } from "@/app/dashboard/evaluacion/types";
import { variables } from "@/app/dashboard/evaluacion/constants";
import { getPhaseColors } from "@/app/dashboard/evaluacion/utils";
import SymptomCheckbox from "./SymptomCheckbox";

interface PhaseContentProps {
  phase: Phase;
  formData: FormData | null;
  onCheckboxChange: (key: string, checked: boolean) => void;
}

const PhaseContent: React.FC<PhaseContentProps> = ({
  phase,
  formData,
  onCheckboxChange,
}) => {
  const phaseVariables = variables.filter((v) => v.phase === phase.id);
  const colors = getPhaseColors(phase.color);
  const selectedCount = phaseVariables.filter(
    (v) => formData && formData[v.key]
  ).length;

  return (
    <div className="space-y-6">
      {/* Phase Header */}
      <div className={`p-4 rounded-lg border ${colors.background}`}>
        <div className="flex items-center gap-3 mb-2">
          <phase.icon className={`h-6 w-6 ${colors.icon}`} />
          <h3 className="text-xl font-semibold">{phase.title}</h3>
        </div>
        <p className="text-sm opacity-90">{phase.description}</p>
      </div>

      {/* Variables Grid */}
      <div className="grid grid-cols-1 gap-4">
        {phaseVariables.map((variable) => (
          <SymptomCheckbox
            key={variable.key}
            variable={variable}
            isChecked={!!(formData && formData[variable.key])}
            phaseColor={phase.color}
            onCheckedChange={(checked) =>
              onCheckboxChange(variable.key, checked)
            }
          />
        ))}
      </div>

      {/* Selection Summary */}
      <div className="text-center text-sm text-muted-foreground">
        Seleccionados en esta fase: {selectedCount} de {phaseVariables.length}
      </div>
    </div>
  );
};

export default PhaseContent;
