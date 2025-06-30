import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export const Introduction = () => (
  <Card className="bg-gradient-to-r from-primary/5 via-background to-accent/5 border-primary/20">
    <CardContent className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-primary rounded-full">
          <BookOpen className="h-8 w-8 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-primary">
            Comprende COVID-19
          </h2>
          <p className="text-muted-foreground">
            Información científica actualizada y confiable
          </p>
        </div>
      </div>
      <p className="text-foreground/80">
        Mantente informado con datos científicos actualizados sobre COVID-19.
        Esta información está basada en evidencia médica y recomendaciones de
        organizaciones de salud reconocidas mundialmente.
      </p>
    </CardContent>
  </Card>
);
