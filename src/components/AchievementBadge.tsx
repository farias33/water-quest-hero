import { Award, Lock } from "lucide-react";

interface AchievementBadgeProps {
  title: string;
  description: string;
  unlocked: boolean;
  icon?: string;
}

export const AchievementBadge = ({
  title,
  description,
  unlocked,
  icon = "🏆",
}: AchievementBadgeProps) => {
  return (
    <div
      className={`relative p-4 rounded-xl border transition-all ${
        unlocked
          ? "bg-gradient-success border-success/30 shadow-water"
          : "bg-muted border-border opacity-60"
      }`}
    >
      {!unlocked && (
        <div className="absolute top-2 right-2">
          <Lock className="w-4 h-4 text-muted-foreground" />
        </div>
      )}
      <div className="flex items-start gap-3">
        <div className="text-3xl">{unlocked ? icon : "🔒"}</div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm text-foreground">{title}</h4>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};
