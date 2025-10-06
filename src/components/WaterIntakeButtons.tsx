import { Button } from "@/components/ui/button";
import { Droplets, Wine, Coffee, Milk } from "lucide-react";

interface WaterIntakeButtonsProps {
  onAddWater: (amount: number) => void;
}

export const WaterIntakeButtons = ({ onAddWater }: WaterIntakeButtonsProps) => {
  const containers = [
    { amount: 200, label: "Copo", icon: Wine },
    { amount: 350, label: "Caneca", icon: Coffee },
    { amount: 500, label: "Garrafa", icon: Droplets },
    { amount: 1000, label: "1 Litro", icon: Milk },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {containers.map(({ amount, label, icon: Icon }) => (
        <Button
          key={amount}
          onClick={() => onAddWater(amount)}
          variant="outline"
          className="h-24 flex flex-col gap-2 bg-gradient-water border-primary/20 hover:border-primary/40 hover:shadow-water transition-all"
        >
          <Icon className="w-6 h-6 text-primary" />
          <span className="font-semibold text-foreground">{label}</span>
          <span className="text-xs text-muted-foreground">{amount}ml</span>
        </Button>
      ))}
    </div>
  );
};
