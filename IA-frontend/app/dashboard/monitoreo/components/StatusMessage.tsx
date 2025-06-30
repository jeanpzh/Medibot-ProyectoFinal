import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface StatusMessageProps {
  message: { text: string; type: "success" | "error" } | null;
  onClose: () => void;
}

export function StatusMessage({ message, onClose }: StatusMessageProps) {
  if (!message) return null;

  return (
    <Alert
      className={
        message.type === "error"
          ? "border-red-200 bg-red-50"
          : "border-green-200 bg-green-50"
      }
    >
      <Info className="h-4 w-4" />
      <AlertDescription
        className={message.type === "error" ? "text-red-800" : "text-green-800"}
      >
        {message.text}
      </AlertDescription>
    </Alert>
  );
}
