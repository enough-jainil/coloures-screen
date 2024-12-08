import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColorResponse } from "@/lib/types";

interface ColorHistoryDrawerProps {
  colorHistory: ColorResponse[];
  onColorSelect: (color: ColorResponse) => void;
  buttonColorClass: string; // Add this prop
}

export function ColorHistoryDrawer({
  colorHistory,
  onColorSelect,
  buttonColorClass, // Add this prop
}: ColorHistoryDrawerProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className={`${buttonColorClass} text-xs sm:text-sm`}
          size="sm"
          aria-label="View color history"
        >
          <History className="h-3 w-3 sm:h-4 sm:w-4" />
          History
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <div className="grid gap-4">
          <h2 className="text-lg font-semibold">Color History</h2>
          <div className="grid gap-2">
            {colorHistory.map((color, index) => (
              <div
                key={`${color.hex.clean}-${index}`}
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                onClick={() => onColorSelect(color)}
              >
                <div
                  className="w-12 h-12 rounded-md"
                  style={{ backgroundColor: color.hex.value }}
                />
                <div className="flex flex-col">
                  <span className="font-medium">{color.name.value}</span>
                  <span className="text-sm text-muted-foreground">
                    {color.hex.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
