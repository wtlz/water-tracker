import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface DayData {
  date: string;
  amount: number;
  goal: number;
}

interface HistoryChartProps {
  data: DayData[];
}

export default function HistoryChart({ data }: HistoryChartProps) {
  return (
    <div className="px-4 py-4" data-testid="history-chart">
      <h3 className="text-lg font-semibold mb-4">История за неделю</h3>
      <Card className="p-4">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => format(new Date(value), "EEE", { locale: ru })}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `${value / 1000}L`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--popover-border))",
                borderRadius: "6px",
              }}
              labelFormatter={(value) => format(new Date(value), "d MMMM", { locale: ru })}
              formatter={(value: number) => [`${value} мл`, "Выпито"]}
            />
            <ReferenceLine 
              y={data[0]?.goal || 3000} 
              stroke="hsl(var(--primary))" 
              strokeDasharray="3 3"
              label={{ value: 'Цель', position: 'right', fill: 'hsl(var(--primary))' }}
            />
            <Bar 
              dataKey="amount" 
              fill="hsl(var(--chart-1))" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
