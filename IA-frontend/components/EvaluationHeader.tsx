import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Brain } from "lucide-react";

interface EvaluationHeaderProps {
  title: string;
  backHref?: string;
  showAIBadge?: boolean;
}

const EvaluationHeader: React.FC<EvaluationHeaderProps> = ({
  title,
  backHref = "/dashboard",
  showAIBadge = true,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-2">
        <Link href={backHref}>
          <Button variant="outline" size="sm" className="gap-1 bg-transparent">
            <ChevronLeft className="h-4 w-4" />
            Volver
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      </div>

      {showAIBadge && (
        <Badge
          variant="outline"
          className="gap-1 px-3 py-1 text-medical-primary border-medical-primary/30 bg-medical-primary/5"
        >
          <Brain className="h-4 w-4" />
          Diagnóstico con IA
        </Badge>
      )}
    </div>
  );
};

export default EvaluationHeader;
