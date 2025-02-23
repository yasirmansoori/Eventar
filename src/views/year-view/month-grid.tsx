import { memo } from "react";
import { getMonthDays, isSpecialDay } from "@/utils/date-utils";
import { MonthGridProps } from "@/types/month";
import { WEEKDAYS } from "@/constants/calendar";
import { DayCell } from "./day-cell";

const getAlignedWeekdays = (year: number, monthIndex: number) => {
  const firstDay = new Date(year, monthIndex, 1).getDay();
  return [...WEEKDAYS.slice(firstDay), ...WEEKDAYS.slice(0, firstDay)];
};

export const MonthGrid = memo(function MonthGrid({
  month,
  monthIndex,
  year,
  events,
  showPastDates,
  handleEventClick,
  specialDays,
}: MonthGridProps) {
  const days = getMonthDays(year, monthIndex);
  const alignedWeekdays = getAlignedWeekdays(year, monthIndex);

  return (
    <div className="grid grid-cols-7 gap-1 text-sm">
      {alignedWeekdays.map((day) => (
        <div
          key={day}
          className="text-center text-zinc-500 dark:text-zinc-400"
          aria-label={day}
        >
          {day}
        </div>
      ))}
      {days.map((date, i) => (
        <DayCell
          key={`${month}-${i}`}
          date={date}
          events={events}
          showPastDates={showPastDates}
          handleEventClick={handleEventClick}
          isSpecialDay={isSpecialDay(date, specialDays ?? [])}
          specialDayContent={specialDays?.find(
            (day) => day.date === date.toLocaleDateString()
          )}
        />
      ))}
    </div>
  );
});
