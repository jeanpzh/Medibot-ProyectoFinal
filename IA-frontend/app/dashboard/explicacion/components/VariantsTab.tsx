import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Microscope } from "lucide-react";
import { variants } from "../constants";

export const VariantsTab = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Microscope className="h-5 w-5 text-secondary" />
        Variantes de SARS-CoV-2
      </CardTitle>
      <CardDescription>
        Información sobre las principales variantes del virus que han surgido
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <Alert className="bg-secondary/5 border-secondary/20">
          <Microscope className="h-4 w-4 text-secondary" />
          <AlertDescription className="text-secondary-foreground/80">
            <strong>Nota:</strong> Los virus mutan naturalmente. La mayoría de
            las mutaciones no afectan significativamente las características del
            virus, pero algunas pueden cambiar su transmisibilidad o gravedad.
          </AlertDescription>
        </Alert>
        <div className="grid grid-cols-1 gap-4">
          {variants.map((variant, index) => (
            <Card key={index} className="border-l-4 border-l-secondary">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-lg">{variant.name}</h4>
                      <Badge
                        variant={
                          variant.status === "Variante dominante"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {variant.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <strong>Origen:</strong> {variant.origin}
                    </p>
                    <p className="text-sm">{variant.characteristics}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);
