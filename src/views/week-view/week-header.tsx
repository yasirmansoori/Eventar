import { format } from "date-fns";
import { WeekHeaderProps } from "@/types/week";

export function WeekHeader({
  weekDays,
  currentDate,
  isPastDate,
  onDayClick,
}: WeekHeaderProps) {
  return (
    <div className="grid grid-cols-8 border-b">
      <div className="p-2 text-center text-sm font-medium" />
      {weekDays.map((day, index) => (
        <div
          key={index}
          className={`p-2 text-center text-sm cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
            isPastDate(day) ? "opacity-50 bg-zinc-100 dark:bg-zinc-800" : ""
          }`}
          onClick={() => onDayClick?.(day)}
        >
          <div className="font-medium">{format(day, "EEE")}</div>
          <div
            className={`text-muted-foreground ${
              day.getDate() === currentDate.getDate()
                ? "rounded-full bg-zinc-900 text-zinc-50 w-6 h-6 flex items-center justify-center mx-auto dark:bg-zinc-50 dark:text-zinc-900"
                : ""
            }`}
          >
            {day.getDate()}
          </div>
        </div>
      ))}
    </div>
  );
}
