import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Plus, X } from "lucide-react";

interface SettingsPanelProps {
  dailyGoal: number;
  presetVolumes: number[];
  onSaveSettings: (goal: number, presets: number[]) => void;
}

export default function SettingsPanel({ dailyGoal, presetVolumes, onSaveSettings }: SettingsPanelProps) {
  const [goal, setGoal] = useState(dailyGoal.toString());
  const [presets, setPresets] = useState<number[]>(presetVolumes);
  const [newPreset, setNewPreset] = useState("");

  const handleAddPreset = () => {
    const value = parseInt(newPreset);
    if (value && value > 0 && !presets.includes(value)) {
      setPresets([...presets, value].sort((a, b) => a - b));
      setNewPreset("");
    }
  };

  const handleRemovePreset = (value: number) => {
    setPresets(presets.filter((v) => v !== value));
  };

  const handleSave = () => {
    const goalValue = parseInt(goal);
    if (goalValue && goalValue > 0 && presets.length > 0) {
      onSaveSettings(goalValue, presets);
    }
  };

  return (
    <div className="px-4 py-4 space-y-6" data-testid="settings-panel">
      <div>
        <h3 className="text-lg font-semibold mb-4">Настройки</h3>
        
        <Card className="p-4 space-y-4">
          <div>
            <Label htmlFor="daily-goal">Дневная цель (мл)</Label>
            <Input
              id="daily-goal"
              type="number"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="mt-2"
              min="1"
              data-testid="input-daily-goal"
            />
          </div>

          <div>
            <Label>Быстрый ввод объемов</Label>
            <div className="mt-2 space-y-2">
              {presets.map((preset) => (
                <div key={preset} className="flex items-center gap-2" data-testid={`preset-${preset}`}>
                  <Input value={`${preset} мл`} readOnly className="flex-1" />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemovePreset(preset)}
                    data-testid={`button-remove-preset-${preset}`}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Новый объем"
                  value={newPreset}
                  onChange={(e) => setNewPreset(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddPreset()}
                  min="1"
                  data-testid="input-new-preset"
                />
                <Button
                  variant="outline"
                  onClick={handleAddPreset}
                  data-testid="button-add-preset"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <Button onClick={handleSave} className="w-full" data-testid="button-save-settings">
            <Save className="w-4 h-4 mr-2" />
            Сохранить настройки
          </Button>
        </Card>
      </div>
    </div>
  );
}
