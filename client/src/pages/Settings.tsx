import { useState } from "react";
import SettingsPanel from "@/components/SettingsPanel";
import BottomNav from "@/components/BottomNav";

type NavPage = "home" | "history" | "settings";

export default function Settings() {
  const [currentPage, setCurrentPage] = useState<NavPage>("settings");
  const [dailyGoal, setDailyGoal] = useState(3000);
  const [presetVolumes, setPresetVolumes] = useState([150, 200, 450, 850, 1000]);

  const handleSaveSettings = (goal: number, presets: number[]) => {
    setDailyGoal(goal);
    setPresetVolumes(presets);
  };

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

        <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
      </div>
    </div>
  );
}
