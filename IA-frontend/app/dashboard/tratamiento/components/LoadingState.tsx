import { Card, CardContent } from "@/components/ui/card";

export const LoadingState = () => (
  <div className="container mx-auto p-6">
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="ml-3 text-muted-foreground">
            Cargando plan de tratamiento...
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
);
