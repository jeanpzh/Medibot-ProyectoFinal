import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface SubmitButtonProps {
  onSave: () => void;
  isSaving: boolean;
  disabled: boolean;
}

export function SubmitButton({
  onSave,
  isSaving,
  disabled,
}: SubmitButtonProps) {
  return (
    <Button
      onClick={onSave}
      className="w-full bg-blue-600 hover:bg-blue-700"
      disabled={isSaving || disabled}
    >
      {isSaving ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
          Guardando...
        </>
      ) : (
        <>
          <Save className="mr-2 h-4 w-4" />
          Guardar Registro del Día
        </>
      )}
    </Button>
  );
}
