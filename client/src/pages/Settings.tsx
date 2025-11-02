import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import SettingsPanel from "@/components/SettingsPanel";
import BottomNav from "@/components/BottomNav";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Settings as SettingsType } from "@shared/schema";

type NavPage = "home" | "history" | "settings";

export default function Settings() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: settings, isError } = useQuery<SettingsType>({
    queryKey: ["/api/settings"],
    queryFn: async () => {
      const response = await fetch("/api/settings");
      if (!response.ok) throw new Error("Failed to fetch settings");
      return response.json();
    },
  });

  const updateSettingsMutation = useMutation({
    mutationFn: async (data: { dailyGoal: number; presetVolumes: string }) => {
      const response = await apiRequest("PUT", "/api/settings", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/history"] });
      toast({
        title: "Настройки сохранены",
        description: "Ваши настройки успешно обновлены",
      });
    },
    onError: (error) => {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить настройки. Попробуйте еще раз.",
        variant: "destructive",
      });
      console.error("Error updating settings:", error);
    },
  });

  const handleSaveSettings = (goal: number, presets: number[]) => {
    updateSettingsMutation.mutate({
      dailyGoal: goal,
      presetVolumes: presets.join(","),
    });
  };

  const handleNavigate = (page: NavPage) => {
    if (page === "home") setLocation("/");
    if (page === "history") setLocation("/history");
  };

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-destructive">Произошла ошибка при загрузке настроек</p>
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

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        <header className="bg-primary text-primary-foreground py-6 px-4 text-center">
          <h1 className="text-2xl font-bold">Настройки</h1>
          <p className="text-sm opacity-90 mt-1">Настройте приложение</p>
        </header>

        <div className="py-4">
          <SettingsPanel 
            dailyGoal={dailyGoal}
            presetVolumes={presetVolumes}
            onSaveSettings={handleSaveSettings}
          />
        </div>

        <BottomNav currentPage="settings" onNavigate={handleNavigate} />
      </div>
    </div>
  );
}
