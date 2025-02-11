import { DayCell } from "@/views/month-view/day-cell";
import { WeekDaysHeader } from "@/views/month-view/week-days-header";
import { ErrorBoundary } from "@/components/error-boundary";
import { getEventsForDate } from "@/utils/calendar-utils";
import { getMonthDays } from "@/utils/date-utils";
import { MonthViewProps } from "@/types/month";

export function MonthView({
  date,
  year,
  month,
  events,
  showPastDates = true,
  handleEventClick,
  handleDayClick,
}: MonthViewProps) {
  const days = getMonthDays(year, month);

  return (
    <ErrorBoundary>
      <div className="flex flex-col" id="month-view">
        <div className="grid grid-cols-7 border border-zinc-200 rounded-lg bg-white dark:border-zinc-800 dark:bg-zinc-950">
          <WeekDaysHeader date={date} />
          {days.map((date, index) => (
            <DayCell
              key={date.toString()}
              date={date}
              index={index}
              events={getEventsForDate(date, events)}
              showPastDates={showPastDates}
              handleEventClick={handleEventClick}
              handleDayClick={handleDayClick}
            />
          ))}
        </div>
      </div>
    </ErrorBoundary>
  );
}
