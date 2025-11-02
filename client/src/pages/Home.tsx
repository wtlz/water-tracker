import { useQuery, useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import DailyProgress from "@/components/DailyProgress";
import QuickInputButtons from "@/components/QuickInputButtons";
import ManualInput from "@/components/ManualInput";
import TodaysLog from "@/components/TodaysLog";
import BottomNav from "@/components/BottomNav";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { WaterEntry, Settings } from "@shared/schema";
import { useLocation } from "wouter";

type NavPage = "home" | "history" | "settings";

export default function Home() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const today = format(new Date(), "yyyy-MM-dd");

  const { data: settings, isError: settingsError } = useQuery<Settings>({
    queryKey: ["/api/settings"],
    queryFn: async () => {
      const response = await fetch("/api/settings");
      if (!response.ok) throw new Error("Failed to fetch settings");
      return response.json();
    },
  });

  const { data: entries = [], isError: entriesError } = useQuery<WaterEntry[]>({
    queryKey: ["/api/water-entries", today],
    queryFn: async () => {
      const response = await fetch(`/api/water-entries?date=${today}`);
      if (!response.ok) throw new Error("Failed to fetch entries");
      return response.json();
    },
  });

  const addWaterMutation = useMutation({
    mutationFn: async (amount: number) => {
      const response = await apiRequest("POST", "/api/water-entries", { amount, date: today });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/water-entries", today] });
      queryClient.invalidateQueries({ queryKey: ["/api/history"] });
    },
    onError: (error) => {
      toast({
        title: "Ошибка",
        description: "Не удалось добавить запись. Попробуйте еще раз.",
        variant: "destructive",
      });
      console.error("Error adding water:", error);
    },
  });

  const deleteEntryMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/water-entries/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/water-entries", today] });
      queryClient.invalidateQueries({ queryKey: ["/api/history"] });
    },
    onError: (error) => {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить запись. Попробуйте еще раз.",
        variant: "destructive",
      });
      console.error("Error deleting entry:", error);
    },
  });

  if (settingsError || entriesError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-destructive">Произошла ошибка при загрузке данных</p>
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

  const dailyGoal = settings?.dailyGoal || 3000;
  const presetVolumes = settings?.presetVolumes.split(",").map(Number) || [150, 200, 450, 850, 1000];
  const currentTotal = entries.reduce((sum, entry) => sum + entry.amount, 0);

  const handleAddWater = (amount: number) => {
    addWaterMutation.mutate(amount, {
      onSuccess: () => {
        toast({
          title: "Вода добавлена!",
          description: `Вы добавили ${amount} мл воды`,
        });
      },
    });
  };

  const handleDeleteEntry = (id: string) => {
    deleteEntryMutation.mutate(id, {
      onSuccess: () => {
        toast({
          title: "Запись удалена",
          description: "Запись успешно удалена",
          variant: "destructive",
        });
      },
    });
  };

  const handleNavigate = (page: NavPage) => {
    if (page === "history") setLocation("/history");
    if (page === "settings") setLocation("/settings");
  };

  const waterEntriesWithDate = entries.map(entry => ({
    ...entry,
    timestamp: new Date(entry.timestamp),
  }));

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        <header className="bg-primary text-primary-foreground py-6 px-4 text-center">
          <h1 className="text-2xl font-bold">Вода Трекер</h1>
          <p className="text-sm opacity-90 mt-1">Следите за потреблением воды</p>
        </header>

        <div className="space-y-6 py-4">
          <DailyProgress current={currentTotal} goal={dailyGoal} />
          
          <div>
            <h2 className="text-lg font-semibold px-4 mb-3">Быстрый ввод</h2>
            <QuickInputButtons 
              presetVolumes={presetVolumes}
              onAddWater={handleAddWater}
            />
          </div>

          <ManualInput onAddWater={handleAddWater} />

          <div className="border-t pt-4">
            <TodaysLog 
              entries={waterEntriesWithDate}
              onDeleteEntry={handleDeleteEntry}
            />
          </div>
        </div>

        <BottomNav currentPage="home" onNavigate={handleNavigate} />
      </div>
    </div>
  );
}
