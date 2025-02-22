import { motion } from "framer-motion";
import { Filter } from "lucide-react";
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
        <Button
          variant="outline"
          size="md"
          className="relative"
          disabled={colors.length === 0}
        >
          <Filter className="h-5 w-5" />
          Filter
          {selectedColors.length > 0 && (
            <motion.div
              className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-zinc-900 dark:bg-zinc-50"
              layoutId="filterIndicator"
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0">
        <span className="flex flex-1 items-center justify-center text-sm font-semibold border-b border-zinc-200 dark:border-zinc-800 p-2">
          Filter by color
        </span>
        <div className="space-y-2 p-1">
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
