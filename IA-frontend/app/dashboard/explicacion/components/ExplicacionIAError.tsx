import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Stethoscope } from "lucide-react";
import Link from "next/link";

type ExplicacionIAErrorProps = {
  error: string;
};

export const ExplicacionIAError = ({ error }: ExplicacionIAErrorProps) => (
  <Card className="text-center">
    <CardHeader>
      <div className="mx-auto bg-destructive/10 p-3 rounded-full w-fit">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>
      <CardTitle className="mt-4">Error al generar la explicación</CardTitle>
      <CardDescription>
        {error}. Puede que no tengas una evaluación guardada.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Link href="/dashboard/evaluacion">
        <Button>
          <Stethoscope className="mr-2 h-4 w-4" />
          Realizar una Evaluación
        </Button>
      </Link>
    </CardContent>
  </Card>
);
