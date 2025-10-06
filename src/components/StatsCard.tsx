interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  subtitle?: string;
}

export const StatsCard = ({ title, value, icon, subtitle }: StatsCardProps) => {
  return (
    <div className="bg-card p-4 rounded-2xl shadow-card border border-border hover:shadow-water transition-shadow">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className="text-primary">{icon}</div>
      </div>
    </div>
  );
};
