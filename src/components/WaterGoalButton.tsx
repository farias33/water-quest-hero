import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Droplet } from "lucide-react";

interface WaterGoalButtonProps {
  dailyGoal: number;
  onDailyGoalChange: (goal: number) => void;
}

export const WaterGoalButton = ({
  dailyGoal,
  onDailyGoalChange,
}: WaterGoalButtonProps) => {
  const [open, setOpen] = useState(false);
  const [tempGoal, setTempGoal] = useState(dailyGoal);

  const handleSave = () => {
    onDailyGoalChange(tempGoal);
    setOpen(false);
  };

  // Calculate fill percentage (2000ml = 0%, 5000ml = 100%)
  const fillPercentage = ((dailyGoal - 2000) / (5000 - 2000)) * 100;

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setOpen(true)}
        className="relative"
      >
        <div className="relative w-5 h-5">
          <Droplet className="w-5 h-5 absolute inset-0" />
          <div
            className="absolute bottom-0 left-0 right-0 bg-primary transition-all duration-300"
            style={{
              height: `${fillPercentage}%`,
              clipPath: "path('M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z')",
            }}
          >
            <Droplet
              className="w-5 h-5"
              fill="currentColor"
              strokeWidth={0}
            />
          </div>
        </div>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Meta Diária de Água</DialogTitle>
            <DialogDescription>
              Ajuste sua meta de hidratação diária
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
              onClick={() => setOpen(false)}
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
    </>
  );
};
