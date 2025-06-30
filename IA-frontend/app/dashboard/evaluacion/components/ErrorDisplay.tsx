import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface ErrorDisplayProps {
  error: string;
  title?: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  title = "Error al obtener diagnóstico",
}) => {
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        <div className="font-semibold">{title}:</div>
        <div className="mt-2 text-sm">{error}</div>
      </AlertDescription>
    </Alert>
  );
};

export default ErrorDisplay;
