import React from "react";
import { Brain } from "lucide-react";

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary"></div>
        <Brain className="absolute inset-0 m-auto h-6 w-6 text-primary animate-pulse" />
      </div>
      <p className="mt-4 text-lg text-foreground font-medium">
        Analizando tus síntomas...
      </p>
      <p className="text-sm text-muted-foreground">
        Procesando con inteligencia artificial
      </p>
    </div>
  );
};

export default LoadingState;
