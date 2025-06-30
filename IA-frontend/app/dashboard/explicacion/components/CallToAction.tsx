import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Stethoscope } from "lucide-react";
import Link from "next/link";

export const CallToAction = () => (
  <Card className="bg-gradient-to-r from-primary/5 via-background to-accent/5">
    <CardContent className="p-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold mb-2">
            ¿Tienes síntomas o preocupaciones?
          </h3>
          <p className="text-muted-foreground">
            Realiza una evaluación de síntomas o explora nuestras guías de
            prevención
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/dashboard/evaluacion">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Stethoscope className="mr-2 h-4 w-4" />
              Evaluación de Síntomas
            </Button>
          </Link>
          <Link href="/dashboard/prevencion">
            <Button variant="outline">
              <Shield className="mr-2 h-4 w-4" />
              Guía de Prevención
            </Button>
          </Link>
        </div>
      </div>
    </CardContent>
  </Card>
);
