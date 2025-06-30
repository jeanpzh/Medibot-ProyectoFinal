import {
  Stethoscope,
  Users,
  Activity,
  Heart,
  Shield,
  Bug,
  AlertTriangle,
  Info,
} from "lucide-react";
import { InfoCardVariant } from "@/components/InfoCard";

export const iconMap: { [key: string]: React.ElementType } = {
  Stethoscope,
  Users,
  Activity,
  Heart,
  Shield,
  Bug,
  AlertTriangle,
  Info,
};

export const mapColorToVariant = (color: string): InfoCardVariant => {
  switch (color) {
    case "red":
      return "destructive";
    case "blue":
      return "info";
    case "amber":
      return "warning";
    case "green":
      return "success";
    default:
      return "default";
  }
};
