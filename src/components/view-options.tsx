import { Grid, LayoutGrid, List, Table2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CalendarView, ViewOptionsProps } from "@/types/calendar";

export function ViewOptions({
  view,
  setView,
  showViewOptions,
}: ViewOptionsProps) {
  const allViewOptions = [
    { value: "month", label: "Month", icon: LayoutGrid },
    { value: "week", label: "Week", icon: Grid },
    { value: "day", label: "Day", icon: List },
    { value: "year", label: "Year", icon: Table2 },
  ];

  const viewOptions = allViewOptions.filter((option) =>
    showViewOptions.includes(option.value as CalendarView)
  );

  return (
    <div className="flex items-center rounded-lg border border-zinc-200 p-1 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      {viewOptions
        .sort(
          (a, b) =>
            showViewOptions.indexOf(a.value as CalendarView) -
            showViewOptions.indexOf(b.value as CalendarView)
        )
        .map((option) => {
          const Icon = option.icon;
          return (
            <Button
              key={option.value}
              variant={view === option.value ? "default" : "ghost"}
              size="sm"
              onClick={() => setView(option.value as CalendarView)}
              className="px-2 mx-0.5 transition-colors duration-200"
            >
              <Icon className="h-4 w-4" />
              <span className="ml-2 hidden md:inline">{option.label}</span>
            </Button>
          );
        })}
    </div>
  );
}
