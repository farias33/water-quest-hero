import { Trophy } from "lucide-react";

interface XPBarProps {
  currentXP: number;
  xpForNextLevel: number;
  level: number;
}

export const XPBar = ({ currentXP, xpForNextLevel, level }: XPBarProps) => {
  const percentage = (currentXP / xpForNextLevel) * 100;

  return (
    <div className="bg-card p-4 rounded-2xl shadow-card border border-border">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-secondary" />
          <span className="font-semibold text-foreground">Nível {level}</span>
        </div>
        <span className="text-sm text-muted-foreground">
          {currentXP} / {xpForNextLevel} XP
        </span>
      </div>
      <div className="relative h-3 bg-muted rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-success transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
