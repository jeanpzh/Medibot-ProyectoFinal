import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { resources } from "../constants";

const ResourceCard = ({
  title,
  description,
  icon: Icon,
  href,
}: (typeof resources)[0]) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardContent className="p-4 flex flex-col items-center text-center">
      <div className="p-3 bg-primary/10 rounded-full mb-3">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-xs text-muted-foreground mb-3">{description}</p>
      <Button variant="outline" size="sm" className="w-full" asChild>
        <a href={href} target="_blank" rel="noopener noreferrer">
          Visitar Sitio
        </a>
      </Button>
    </CardContent>
  </Card>
);

export const Resources = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-primary" />
        Recursos Adicionales
      </CardTitle>
      <CardDescription>
        Enlaces a fuentes oficiales para obtener más información
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <ResourceCard key={resource.title} {...resource} />
        ))}
      </div>
    </CardContent>
  </Card>
);
