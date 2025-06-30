import { PhaseColors } from "./types";

export const getPhaseColors = (phaseColor: string): PhaseColors => {
  switch (phaseColor) {
    case "respiratory":
      return {
        background: "bg-primary/10",
        border: "border-primary/20",
        text: "text-primary",
        icon: "text-primary",
      };
    case "medical":
      return {
        background: "bg-destructive/10",
        border: "border-destructive/20",
        text: "text-destructive",
        icon: "text-destructive",
      };
    case "exposure":
      return {
        background: "bg-secondary",
        border: "border-secondary",
        text: "text-secondary-foreground",
        icon: "text-secondary-foreground",
      };
    case "result":
      return {
        background: "bg-primary/10",
        border: "border-primary/20",
        text: "text-primary",
        icon: "text-primary",
      };
    default:
      return {
        background: "bg-muted",
        border: "border",
        text: "text-muted-foreground",
        icon: "text-muted-foreground",
      };
  }
};

export const getStatusColors = (isPositive: boolean) => {
  return isPositive
    ? {
        border: "border-destructive/20",
        background: "bg-destructive/10",
        text: "text-destructive",
        icon: "text-destructive",
      }
    : {
        border: "border-primary/20",
        background: "bg-primary/10",
        text: "text-primary",
        icon: "text-primary",
      };
};

export const cn = (...classes: (string | undefined | false)[]) => {
  return classes.filter(Boolean).join(" ");
};
