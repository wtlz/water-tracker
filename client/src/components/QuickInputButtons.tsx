import { Button } from "@/components/ui/button";
import { GlassWater } from "lucide-react";

interface QuickInputButtonsProps {
  presetVolumes: number[];
  onAddWater: (amount: number) => void;
}

export default function QuickInputButtons({ presetVolumes, onAddWater }: QuickInputButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 px-4" data-testid="quick-input-buttons">
      {presetVolumes.map((volume) => (
        <Button
          key={volume}
          size="lg"
          variant="outline"
          className="h-16 flex flex-col gap-1 hover-elevate active-elevate-2"
          onClick={() => onAddWater(volume)}
          data-testid={`button-add-${volume}`}
        >
          <GlassWater className="w-5 h-5" />
          <span className="text-lg font-semibold">{volume} мл</span>
        </Button>
      ))}
    </div>
  );
}
