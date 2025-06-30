import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export const ExplicacionIALoading = () => (
  <Card className="text-center">
    <CardHeader>
      <div className="mx-auto bg-muted p-3 rounded-full w-fit">
        <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
      </div>
      <CardTitle className="mt-4">Cargando tu explicación...</CardTitle>
      <CardDescription>
        Recuperando tu última evaluación de la base de datos.
      </CardDescription>
    </CardHeader>
  </Card>
);
