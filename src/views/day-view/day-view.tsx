import FullDayEvents from "@/views/day-view/full-day-events";
import HourlyEvents from "@/views/day-view/hourly-events";
import { format } from "date-fns";
import { useState } from "react";
import { ErrorBoundary } from "@/components/error-boundary";
import { DayViewProps } from "@/types/day";

export function DayView({
  date,
  events,
  showPastDates = true,
  handleEventClick,
  handleDayClick,
}: DayViewProps) {
  const [showAllFullDayEvents, setShowAllFullDayEvents] = useState(false);

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const dayEvents = events.filter(
    (event) =>
      new Date(event.start).getDate() === date.getDate() &&
      new Date(event.start).getMonth() === date.getMonth() &&
      new Date(event.start).getFullYear() === date.getFullYear()
  );

  const fullDayEvents = dayEvents.filter((event) => event.isFullDay);

  const visibleFullDayEvents = showAllFullDayEvents
    ? fullDayEvents
    : fullDayEvents.slice(0, 3);

  return (
    <ErrorBoundary>
      <div className="flex flex-col space-y-4" id="day-view">
        <h2 className="text-2xl font-semibold">
          {format(date, "MMMM d, yyyy")}
        </h2>

        {fullDayEvents.length > 0 && (
          <FullDayEvents
            fullDayEvents={fullDayEvents}
            visibleFullDayEvents={visibleFullDayEvents}
            handleEventClick={handleEventClick}
            showAllFullDayEvents={showAllFullDayEvents}
            setShowAllFullDayEvents={setShowAllFullDayEvents}
          />
        )}

        <HourlyEvents
          hours={hours}
          dayEvents={dayEvents}
          date={date}
          showPastDates={showPastDates}
          handleEventClick={handleEventClick}
          handleDayClick={handleDayClick}
        />
      </div>
    </ErrorBoundary>
  );
}
