import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Variable } from "@/app/dashboard/evaluacion/types";
import { getPhaseColors, cn } from "@/app/dashboard/evaluacion/utils";

interface SymptomCheckboxProps {
  variable: Variable;
  isChecked: boolean;
  phaseColor: string;
  onCheckedChange: (checked: boolean) => void;
}

const SymptomCheckbox: React.FC<SymptomCheckboxProps> = ({
  variable,
  isChecked,
  phaseColor,
  onCheckedChange,
}) => {
  const { key, label, icon: Icon } = variable;
  const colors = getPhaseColors(phaseColor);

  const handleClick = () => {
    onCheckedChange(!isChecked);
  };

  return (
    <div
      className={cn(
        "flex items-center space-x-4 p-4 rounded-lg border transition-all duration-300 cursor-pointer",
        isChecked
          ? `${colors.background} border-2`
          : "bg-card hover:bg-accent border-border hover:border-accent"
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`${isChecked ? "Desmarcar" : "Marcar"} ${label}`}
    >
      <Checkbox
        id={key}
        checked={isChecked}
        onCheckedChange={onCheckedChange}
        onClick={(e) => e.stopPropagation()}
      />

      <Icon
        className={cn(
          "h-5 w-5 transition-colors duration-300",
          isChecked ? colors.icon : "text-muted-foreground"
        )}
      />

      <label
        htmlFor={key}
        className="text-sm font-medium cursor-pointer flex-1"
      >
        {label}
      </label>
    </div>
  );
};

export default SymptomCheckbox;
