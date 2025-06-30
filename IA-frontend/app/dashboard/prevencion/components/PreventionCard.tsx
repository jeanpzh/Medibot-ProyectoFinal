import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import type { PreventionItem } from "../types";
import { cn } from "@/lib/utils";

const colorClasses = {
  blue: {
    bg: "bg-primary/10",
    text: "text-primary",
  },
  green: {
    bg: "bg-green-500/10", // Placeholder
    text: "text-green-500", // Placeholder
  },
  purple: {
    bg: "bg-secondary/10",
    text: "text-secondary",
  },
  orange: {
    bg: "bg-yellow-500/10", // Placeholder
    text: "text-yellow-500", // Placeholder
  },
  red: {
    bg: "bg-destructive/10",
    text: "text-destructive",
  },
};

type Color = keyof typeof colorClasses;

export const PreventionCard = ({
  title,
  description,
  icon: Icon,
  items,
  color = "blue",
}: PreventionItem) => {
  const selectedColor = colorClasses[color as Color] || colorClasses.blue;

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-lg", selectedColor.bg)}>
            <Icon className={cn("h-5 w-5", selectedColor.text)} />
          </div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
