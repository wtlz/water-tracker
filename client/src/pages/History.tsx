import { useState } from "react";
import HistoryChart from "@/components/HistoryChart";
import BottomNav from "@/components/BottomNav";

type NavPage = "home" | "history" | "settings";

export default function History() {
  const [currentPage, setCurrentPage] = useState<NavPage>("history");

  const data = [
    { date: '2025-10-27', amount: 2800, goal: 3000 },
    { date: '2025-10-28', amount: 3200, goal: 3000 },
    { date: '2025-10-29', amount: 2600, goal: 3000 },
    { date: '2025-10-30', amount: 3400, goal: 3000 },
    { date: '2025-10-31', amount: 2900, goal: 3000 },
    { date: '2025-11-01', amount: 3100, goal: 3000 },
    { date: '2025-11-02', amount: 1850, goal: 3000 },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        <header className="bg-primary text-primary-foreground py-6 px-4 text-center">
          <h1 className="text-2xl font-bold">История</h1>
          <p className="text-sm opacity-90 mt-1">Ваш прогресс за неделю</p>
        </header>

        <div className="py-4">
          <HistoryChart data={data} />
        </div>

        <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
      </div>
    </div>
  );
}
