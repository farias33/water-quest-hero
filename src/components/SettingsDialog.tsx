import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dailyGoal: number;
  onDailyGoalChange: (goal: number) => void;
}

export const SettingsDialog = ({
  open,
  onOpenChange,
  dailyGoal,
  onDailyGoalChange,
}: SettingsDialogProps) => {
  const [tempGoal, setTempGoal] = useState(dailyGoal);

  const handleSave = () => {
    onDailyGoalChange(tempGoal);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Configurações</DialogTitle>
          <DialogDescription>
            Ajuste sua meta diária de hidratação
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label htmlFor="goal-slider">
              Meta Diária: {tempGoal}ml
            </Label>
            <Slider
              id="goal-slider"
              min={2000}
              max={5000}
              step={100}
              value={[tempGoal]}
              onValueChange={(value) => setTempGoal(value[0])}
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              Escolha entre 2000ml e 5000ml
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button onClick={handleSave} className="flex-1">
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
