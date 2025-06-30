import type { LucideIcon } from "lucide-react";

export interface PreventionItem {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  items: string[];
}
