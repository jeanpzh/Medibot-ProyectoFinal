import { AlertTriangle, Shield } from "lucide-react";

type TreatmentStatus = "positive" | "negative";

export const getStatusColor = (status: TreatmentStatus) => {
  return status === "positive"
    ? "bg-destructive/10 border-destructive/20 text-destructive"
    : "bg-success-bg border-success/20 text-success";
};

export const getStatusIcon = (status: TreatmentStatus) => {
  return status === "positive" ? (
    <AlertTriangle className="h-6 w-6 text-destructive" />
  ) : (
    <Shield className="h-6 w-6 text-success" />
  );
};
