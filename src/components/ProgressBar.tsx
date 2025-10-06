interface ProgressBarProps {
  current: number;
  target: number;
  label?: string;
}

export const ProgressBar = ({ current, target, label }: ProgressBarProps) => {
  const percentage = Math.min((current / target) * 100, 100);
  const isComplete = current >= target;

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium text-foreground">{label}</span>
          <span className="text-muted-foreground">
            {current}ml / {target}ml
          </span>
        </div>
      )}
      <div className="relative h-4 bg-muted rounded-full overflow-hidden shadow-inner">
        <div
          className={`absolute inset-y-0 left-0 transition-all duration-500 ease-out ${
            isComplete ? "bg-gradient-success" : "bg-gradient-primary"
          }`}
          style={{ width: `${percentage}%` }}
        >
          {isComplete && (
            <div className="absolute inset-0 bg-white/20 animate-glow" />
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <span className="text-2xl font-bold text-primary">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
};
