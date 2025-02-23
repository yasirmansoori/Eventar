import { isSameDay } from "date-fns";
import { memo, useState } from "react";
import { SpecialDayModal } from "@/components/modals/special-day-modal";
import { getDateClassName } from "@/utils/date-utils";
import { YearViewDayCellProps } from "@/types/year";
import { EventsPopover } from "./events-popover";

export const DayCell = memo(function DayCell({
  date,
  events,
  showPastDates,
  handleEventClick,
  isSpecialDay,
  specialDayContent,
}: YearViewDayCellProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dateEvents = events.filter((event) =>
    isSameDay(new Date(event.start), date)
  );
  const hasEvents = dateEvents.length > 0;

  const handleSpecialDayClick = () => {
    if (isSpecialDay) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div
        role="gridcell"
        aria-label={date.toLocaleDateString()}
        onClick={handleSpecialDayClick}
        className={`
      relative text-center p-1 rounded-sm transition-all duration-200 dark:hover:bg-zinc-800/50 
      ${hasEvents ? "text-white bg-zinc-900 dark:bg-zinc-50/20" : "border border-dashed"} 
      ${getDateClassName(date, showPastDates, "year")} 
      ${isSpecialDay ? "before:absolute before:inset-0 before:pointer-events-none before:bg-[repeating-linear-gradient(135deg,transparent,transparent_8px,currentColor_8px,currentColor_9px)] before:opacity-[0.1] hover:before:opacity-[0.5]bg-gradient-to-br from-purple-400/20 to-pink-400/20 border-2 border-purple-500/50 shadow-lg cursor-pointer" : ""}
      hover:border-blue-500`}
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

      {isSpecialDay && specialDayContent && (
        <SpecialDayModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          date={date}
          content={specialDayContent}
        />
      )}
    </>
  );
});
