import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield } from "lucide-react";
import { vaccines } from "../constants";

export const VaccinesTab = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-primary" />
        Vacunas COVID-19
      </CardTitle>
      <CardDescription>
        Información sobre las principales vacunas disponibles y su efectividad
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <Alert className="bg-primary/5 border-primary/20">
          <Shield className="h-4 w-4 text-primary" />
          <AlertDescription className="text-primary/80">
            <strong>Importante:</strong> Las vacunas COVID-19 han demostrado ser
            seguras y efectivas para prevenir enfermedad grave, hospitalización
            y muerte. Se recomienda mantenerse al día con todas las dosis
            recomendadas.
          </AlertDescription>
        </Alert>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vaccines.map((vaccine, index) => (
            <Card key={index} className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold text-lg">{vaccine.name}</h4>
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="font-medium">Tipo:</span>
                      <span>{vaccine.type}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium">Eficacia:</span>
                      <span>{vaccine.efficacy}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium">Dosis:</span>
                      <span>{vaccine.doses}</span>
                    </div>
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
