import { format } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NavigationProps } from "@/types/calendar";

export function Navigation({
  currentDate,
  setCurrentDate,
  view,
  availableYears,
}: NavigationProps) {
  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    const increment = direction === "next" ? 1 : -1;

    switch (view) {
      case "year":
        newDate.setFullYear(currentDate.getFullYear() + increment);
        break;
      case "month":
        newDate.setDate(1);
        newDate.setMonth(currentDate.getMonth() + increment);
        break;
      case "week":
        newDate.setDate(currentDate.getDate() + 7 * increment);
        break;
      case "day":
        newDate.setDate(currentDate.getDate() + increment);
        break;
    }
    setCurrentDate(newDate);
  };

  const isNavigationDisabled = (direction: "prev" | "next") => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    const minYear = Math.min(...availableYears);
    const maxYear = Math.max(...availableYears);

    if (direction === "prev") {
      switch (view) {
        case "year":
          return currentYear <= minYear;
        case "month":
          return currentYear === minYear && currentMonth === 0;
        case "week":
        case "day":
          return (
            currentYear === minYear && currentMonth === 0 && currentDay === 1
          );
        default:
          return false;
      }
    } else {
      switch (view) {
        case "year":
          return currentYear >= maxYear;
        case "month":
          return currentYear === maxYear && currentMonth === 11;
        case "week":
          return (
            currentYear === maxYear && currentMonth === 11 && currentDay > 24
          );
        case "day":
          return (
            currentYear === maxYear && currentMonth === 11 && currentDay === 31
          );
        default:
          return false;
      }
    }
  };

  return (
    <div className="flex items-center gap-2" id="navigation">
      <Button
        variant="outline"
        size="icon"
        onClick={() => navigateDate("prev")}
        disabled={isNavigationDisabled("prev")}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex gap-2">
        <Button variant="outline" className="min-w-[120px] cursor-auto">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {format(currentDate, "MMMM")}
        </Button>
        <Select
          value={currentDate.getFullYear().toString()}
          onValueChange={(year) => {
            const newDate = new Date(currentDate);
            newDate.setFullYear(Number.parseInt(year));
            setCurrentDate(newDate);
          }}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {availableYears.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => navigateDate("next")}
        disabled={isNavigationDisabled("next")}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
