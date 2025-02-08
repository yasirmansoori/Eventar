import { isSameDay } from "date-fns";
import { memo } from "react";
import { getDateClassName } from "@/utils/date-utils";
import { YearViewDayCellProps } from "@/types/year";
import { EventsPopover } from "./events-popover";

export const DayCell = memo(function DayCell({
  date,
  events,
  showPastDates,
  handleEventClick,
}: YearViewDayCellProps) {
  const dateEvents = events.filter((event) =>
    isSameDay(new Date(event.start), date)
  );
  const hasEvents = dateEvents.length > 0;

  return (
    <div
      role="gridcell"
      aria-label={date.toLocaleDateString()}
      className={`text-center border p-1 rounded-sm transition-colors dark:hover:bg-zinc-800/50 ${
        hasEvents ? "text-white bg-zinc-900 dark:bg-zinc-50/20" : ""
      } ${getDateClassName(date, showPastDates, "year")} hover:border-blue-500`}
    >
      {hasEvents ? (
        <EventsPopover
          events={dateEvents}
          date={date}
          handleEventClick={handleEventClick}
        />
      ) : (
        date.getDate()
      )}
    </div>
  );
});
