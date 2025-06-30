import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info as InfoIcon,
} from "lucide-react";

export type InfoCardVariant =
  | "primary"
  | "destructive"
  | "warning"
  | "info"
  | "success"
  | "default";

export type InfoCardProps = {
  title: string;
  description: string;
  icon: React.ElementType;
  content: string[];
  variant?: InfoCardVariant;
  listItemVariant?: InfoCardVariant;
};

const cardVariantClasses: Record<InfoCardVariant, string> = {
  primary: "bg-primary/5 dark:bg-primary/10 border-primary/20",
  destructive: "bg-destructive/5 dark:bg-destructive/10 border-destructive/20",
  warning: "bg-red-500/10 dark:bg-red-500/10 border-red-500/20",
  info: "bg-blue-500/10 dark:bg-blue-500/10 border-blue-500/20 ",
  success: "bg-green-500/10 dark:bg-green-500/10 border-green-500/20",
  default: "bg-primary/10 border-primary/20 text-primary dark:text-primary",
};

const iconContainerVariantClasses: Record<InfoCardVariant, string> = {
  primary: "bg-primary/10 text-primary",
  destructive: "bg-destructive/10 text-destructive",
  warning: "bg-red-500/10 text-red-500",
  info: "bg-blue-500/10 text-blue-500",
  success: "bg-green-500/10 text-green-500",
  default: "bg-secondary text-secondary-foreground",
};

const listItemVariantConfig: Record<
  InfoCardVariant,
  { icon: React.ElementType; className: string }
> = {
  primary: { icon: CheckCircle, className: "text-primary" },
  destructive: { icon: XCircle, className: "text-destructive" },
  warning: { icon: AlertTriangle, className: "text-red-500" },
  info: { icon: InfoIcon, className: "text-blue-500" },
  success: { icon: CheckCircle, className: "text-green-500" },
  default: { icon: CheckCircle, className: "text-primary" },
};

export const InfoCard = ({
  title,
  description,
  icon: Icon,
  content,
  variant = "default",
  listItemVariant,
}: InfoCardProps) => {
  const finalListItemVariant = listItemVariant || variant;
  const { icon: ListItemIcon, className: listItemIconClassName } =
    listItemVariantConfig[finalListItemVariant];

  return (
    <Card
      className={cn(
        "hover:shadow-lg transition-shadow duration-300 h-full ",
        cardVariantClasses[variant],
        "dark:prose-invert prose prose-xl prose-p:text-primary prose-p:font-normal prose-p:text-lg prose-p:leading-relaxed prose-p:tracking-wide"
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "p-2 rounded-lg",
              iconContainerVariantClasses[variant]
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {content.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <ListItemIcon
                className={cn("h-4 w-4 mt-0.5 shrink-0", listItemIconClassName)}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
