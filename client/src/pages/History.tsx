import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import HistoryChart from "@/components/HistoryChart";
import BottomNav from "@/components/BottomNav";

type NavPage = "home" | "history" | "settings";

interface HistoryData {
  date: string;
  amount: number;
  goal: number;
}

export default function History() {
  const [, setLocation] = useLocation();

  const { data = [], isError } = useQuery<HistoryData[]>({
    queryKey: ["/api/history"],
    queryFn: async () => {
      const response = await fetch("/api/history?days=7");
      if (!response.ok) throw new Error("Failed to fetch history");
      return response.json();
    },
  });

  const handleNavigate = (page: NavPage) => {
    if (page === "home") setLocation("/");
    if (page === "settings") setLocation("/settings");
  };

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-destructive">Произошла ошибка при загрузке истории</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 text-primary underline"
          >
            Обновить страницу
          </button>
        </div>
      </div>
    );
  }

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

        <BottomNav currentPage="history" onNavigate={handleNavigate} />
      </div>
    </div>
  );
}
