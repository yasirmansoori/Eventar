import FullDayEvents from "@/views/day-view/full-day-events";
import HourlyEvents from "@/views/day-view/hourly-events";
import { format } from "date-fns";
import { useState } from "react";
import { ErrorBoundary } from "@/components/error-boundary";
import { SpecialDayModal } from "@/components/modals/special-day-modal";
import { DayViewProps } from "@/types/day";

export function DayView({
  date,
  events,
  showPastDates = true,
  handleEventClick,
  handleDayClick,
  isSpecialDay,
  specialDayContent,
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSpecialDayClick = () => {
    if (isSpecialDay) {
      setIsModalOpen(true);
    }
  };

  return (
    <ErrorBoundary>
      <div className="flex flex-col space-y-4" id="day-view">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold">
            {format(date, "MMMM d, yyyy")}
          </h2>

          {/* if special day  */}
          {isSpecialDay && (
            <div
              className="relative px-2 before:absolute before:inset-0 before:pointer-events-none before:bg-[repeating-linear-gradient(135deg,transparent,transparent_8px,currentColor_8px,currentColor_9px)] before:opacity-[0.1] hover:before:opacity-[0.5]bg-gradient-to-br from-purple-400/20 to-pink-400/20 border-2 border-purple-500/50 shadow-lg cursor-pointer rounded"
              onClick={handleSpecialDayClick}
            >
              {specialDayContent?.title}
            </div>
          )}
        </div>

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

        {isSpecialDay && specialDayContent && (
          <SpecialDayModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            date={date}
            content={specialDayContent}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}
