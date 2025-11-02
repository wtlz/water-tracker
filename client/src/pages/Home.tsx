import { useState } from "react";
import DailyProgress from "@/components/DailyProgress";
import QuickInputButtons from "@/components/QuickInputButtons";
import ManualInput from "@/components/ManualInput";
import TodaysLog from "@/components/TodaysLog";
import BottomNav from "@/components/BottomNav";
import { useToast } from "@/hooks/use-toast";

type NavPage = "home" | "history" | "settings";

interface WaterEntry {
  id: string;
  amount: number;
  timestamp: Date;
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState<NavPage>("home");
  const { toast } = useToast();
  
  const [dailyGoal] = useState(3000);
  const [presetVolumes] = useState([150, 200, 450, 850, 1000]);
  const [entries, setEntries] = useState<WaterEntry[]>([
    { id: '1', amount: 200, timestamp: new Date('2025-11-02T08:30:00') },
    { id: '2', amount: 450, timestamp: new Date('2025-11-02T11:15:00') },
    { id: '3', amount: 850, timestamp: new Date('2025-11-02T14:00:00') },
    { id: '4', amount: 350, timestamp: new Date('2025-11-02T16:45:00') },
  ]);

  const currentTotal = entries.reduce((sum, entry) => sum + entry.amount, 0);

  const handleAddWater = (amount: number) => {
    const newEntry: WaterEntry = {
      id: Date.now().toString(),
      amount,
      timestamp: new Date(),
    };
    setEntries([...entries, newEntry]);
    
    toast({
      title: "Вода добавлена!",
      description: `Вы добавили ${amount} мл воды`,
    });
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
    
    toast({
      title: "Запись удалена",
      description: "Запись успешно удалена",
      variant: "destructive",
    });
  };

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
              entries={entries}
              onDeleteEntry={handleDeleteEntry}
            />
          </div>
        </div>

        <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
      </div>
    </div>
  );
}
