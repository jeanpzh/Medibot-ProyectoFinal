import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, AlertTriangle } from "lucide-react";
import { InfoCard } from "@/components/InfoCard";
import { iconMap, mapColorToVariant } from "../utils";
import { ExplanationCard } from "../types";
import { PredictionResult } from "../../evaluacion/types";

type ExplicacionIAResultProps = {
  predictionResult: PredictionResult | null;
  explanationResult: ExplanationCard[];
};

export const ExplicacionIAResult = ({
  predictionResult,
  explanationResult,
}: ExplicacionIAResultProps) => (
  <div className="space-y-4">
    <Alert className="bg-primary/10 border-primary/20 text-primary">
      <Info className="h-4 w-4" />
      <AlertDescription>
        <strong>Análisis Completado:</strong> La IA ha generado las siguientes
        tarjetas informativas basadas en tu evaluación. El resultado fue{" "}
        <strong>
          {predictionResult?.predicted_covid ? "Positivo" : "Negativo"}
        </strong>
        .
      </AlertDescription>
    </Alert>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
      {explanationResult.map((card, index) => {
        const IconComponent = iconMap[card.icon] || AlertTriangle;
        const listItemVariant = mapColorToVariant(card.color) || "default";
        const cardVariant = index === 0 ? "primary" : "default";

        return (
          <InfoCard
            key={index}
            title={card.title}
            description={card.description}
            icon={IconComponent}
            content={card.content}
            variant={cardVariant}
            listItemVariant={listItemVariant}
          />
        );
      })}
    </div>
  </div>
);
