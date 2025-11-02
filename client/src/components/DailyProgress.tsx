import { Droplets } from "lucide-react";

interface DailyProgressProps {
  current: number;
  goal: number;
}

export default function DailyProgress({ current, goal }: DailyProgressProps) {
  const percentage = Math.min((current / goal) * 100, 100);
  const circumference = 2 * Math.PI * 85;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center py-8" data-testid="daily-progress">
      <div className="relative w-56 h-56">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="112"
            cy="112"
            r="85"
            stroke="hsl(var(--muted))"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="112"
            cy="112"
            r="85"
            stroke="hsl(var(--primary))"
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Droplets className="w-12 h-12 text-primary mb-2" />
          <div className="text-4xl font-bold text-foreground" data-testid="text-current-amount">
            {current.toLocaleString('ru-RU')}
          </div>
          <div className="text-sm text-muted-foreground">из {goal.toLocaleString('ru-RU')} мл</div>
          <div className="text-2xl font-semibold text-primary mt-1" data-testid="text-percentage">
            {Math.round(percentage)}%
          </div>
        </div>
      </div>
    </div>
  );
}
