import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FilterPopoverProps } from "@/types/calendar";

export function FilterPopover({
  selectedColors,
  onColorToggle,
  colors,
}: FilterPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="md" className="relative">
          Filter by Color
          {selectedColors.length > 0 && (
            <motion.div
              className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-zinc-900 dark:bg-zinc-50"
              layoutId="filterIndicator"
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2">
        <div className="space-y-2">
          {colors.map((color) => (
            <label
              key={color.value}
              className="flex items-center space-x-2 rounded-lg p-2 hover:bg-zinc-100 cursor-pointer dark:hover:bg-zinc-800"
            >
              <Checkbox
                checked={selectedColors.includes(color.value)}
                onCheckedChange={() => onColorToggle(color.value)}
              />
              <div className="flex items-center gap-2">
                <div
                  className={`h-4 w-4 rounded-full ${color.bgClass || ""}`}
                />
                <span>{color.label}</span>
              </div>
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
