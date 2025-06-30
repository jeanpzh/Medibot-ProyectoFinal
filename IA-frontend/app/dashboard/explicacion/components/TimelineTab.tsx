import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { timeline } from "../constants";

export const TimelineTab = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-primary" />
        Cronología de la Pandemia
      </CardTitle>
      <CardDescription>
        Eventos clave en el desarrollo de la pandemia COVID-19
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="relative border-l-2 border-primary/20 ml-4 pl-8 py-4 space-y-8">
        {timeline.map((item, index) => (
          <div key={index} className="relative">
            <div className="absolute -left-[41px] bg-primary rounded-full w-6 h-6 flex items-center justify-center">
              <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
            </div>
            <div className="mb-1 text-lg font-semibold text-primary">
              {item.date}
            </div>
            <p className="text-muted-foreground">{item.event}</p>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
