import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  error: string;
}

export const ErrorState = ({ error }: ErrorStateProps) => (
  <div className="container mx-auto p-6">
    <Card>
      <CardContent className="p-6 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
        <h2 className="mt-4 text-lg font-semibold">Ocurrió un error</h2>
        <p className="mt-2 text-muted-foreground">{error}</p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/evaluacion">Ir a la página de evaluación</Link>
        </Button>
      </CardContent>
    </Card>
  </div>
);
