import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Droplets } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface WaterEntry {
  id: string;
  amount: number;
  timestamp: Date;
}

interface TodaysLogProps {
  entries: WaterEntry[];
  onDeleteEntry: (id: string) => void;
}

export default function TodaysLog({ entries, onDeleteEntry }: TodaysLogProps) {
  const total = entries.reduce((sum, entry) => sum + entry.amount, 0);

  if (entries.length === 0) {
    return (
      <div className="px-4 py-8 text-center" data-testid="todays-log-empty">
        <Droplets className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">
          Вы еще не добавили записи сегодня
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-4" data-testid="todays-log">
      <h3 className="text-lg font-semibold mb-3">Сегодня выпито</h3>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {entries.map((entry) => (
          <Card key={entry.id} className="p-3 flex items-center justify-between" data-testid={`log-entry-${entry.id}`}>
            <div className="flex items-center gap-3">
              <Droplets className="w-5 h-5 text-primary" />
              <div>
                <div className="font-semibold" data-testid={`text-amount-${entry.id}`}>
                  {entry.amount} мл
                </div>
                <div className="text-xs text-muted-foreground" data-testid={`text-time-${entry.id}`}>
                  {format(entry.timestamp, "HH:mm", { locale: ru })}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDeleteEntry(entry.id)}
              data-testid={`button-delete-${entry.id}`}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </Card>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t flex justify-between items-center">
        <span className="text-sm font-medium">Всего:</span>
        <span className="text-2xl font-bold text-primary" data-testid="text-total">
          {total.toLocaleString('ru-RU')} мл
        </span>
      </div>
    </div>
  );
}
