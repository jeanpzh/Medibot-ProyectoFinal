import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle, Phone } from "lucide-react";
import type { TreatmentPlan } from "../types";

interface AdditionalInfoProps {
  plan: TreatmentPlan;
}

export const AdditionalInfo = ({ plan }: AdditionalInfoProps) => (
  <div className="grid md:grid-cols-2 gap-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-primary" />
          Cuándo Buscar Ayuda
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{plan.when_to_seek_help}</p>
        <div className="space-y-2">
          <h5 className="font-semibold">Contactos de Emergencia:</h5>
          {plan.emergency_contacts.map((contact, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <Phone className="h-3 w-3 text-primary" />
              {contact}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-success" />
          Duración y Seguimiento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h5 className="font-semibold mb-2">Duración:</h5>
            <p className="text-sm text-muted-foreground">{plan.duration}</p>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Plan de Seguimiento:</h5>
            <ul className="space-y-1">
              {plan.follow_up.map((item, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);
