import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, Heart, Shield, BookOpen } from "lucide-react";
import Link from "next/link";

export function NavigationCard() {
  return (
    <Card className="bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          Continúa Cuidando tu Salud
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href="/dashboard/evaluacion">
            <Button
              variant="outline"
              className="w-full h-auto p-4 flex flex-col items-center gap-2 bg-transparent"
            >
              <Stethoscope className="h-6 w-6 text-blue-600" />
              <span className="font-medium">Evaluación</span>
              <span className="text-xs text-muted-foreground">COVID-19</span>
            </Button>
          </Link>
          <Link href="/dashboard/tratamiento">
            <Button
              variant="outline"
              className="w-full h-auto p-4 flex flex-col items-center gap-2 bg-transparent"
            >
              <Heart className="h-6 w-6 text-red-600" />
              <span className="font-medium">Tratamiento</span>
              <span className="text-xs text-muted-foreground">Plan médico</span>
            </Button>
          </Link>
          <Link href="/dashboard/prevencion">
            <Button
              variant="outline"
              className="w-full h-auto p-4 flex flex-col items-center gap-2 bg-transparent"
            >
              <Shield className="h-6 w-6 text-green-600" />
              <span className="font-medium">Prevención</span>
              <span className="text-xs text-muted-foreground">Guías</span>
            </Button>
          </Link>
          <Link href="/dashboard/explicacion">
            <Button
              variant="outline"
              className="w-full h-auto p-4 flex flex-col items-center gap-2 bg-transparent"
            >
              <BookOpen className="h-6 w-6 text-purple-600" />
              <span className="font-medium">Información</span>
              <span className="text-xs text-muted-foreground">COVID-19</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
