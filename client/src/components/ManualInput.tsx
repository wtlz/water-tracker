import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface ManualInputProps {
  onAddWater: (amount: number) => void;
}

export default function ManualInput({ onAddWater }: ManualInputProps) {
  const [customAmount, setCustomAmount] = useState("");

  const handleAdd = () => {
    const amount = parseInt(customAmount);
    if (amount && amount > 0) {
      onAddWater(amount);
      setCustomAmount("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="px-4 mt-6" data-testid="manual-input">
      <div className="flex gap-2">
        <Input
          type="number"
          placeholder="Введите объем вручную (мл)"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 h-12 text-base"
          min="1"
          data-testid="input-custom-amount"
        />
        <Button
          size="lg"
          onClick={handleAdd}
          className="h-12 px-6"
          disabled={!customAmount || parseInt(customAmount) <= 0}
          data-testid="button-add-custom"
        >
          <Plus className="w-5 h-5 mr-2" />
          Добавить
        </Button>
      </div>
    </div>
  );
}
