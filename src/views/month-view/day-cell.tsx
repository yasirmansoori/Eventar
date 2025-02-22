import { format } from "date-fns";
import { motion } from "framer-motion";
import { getEventBackgroundColorClass } from "@/utils/color-utils";
import { getDateClassName } from "@/utils/date-utils";
import { DayCellProps } from "@/types/day";

export function DayCell({
  date,
  index,
  events,
  showPastDates,
  handleEventClick,
  handleDayClick,
}: DayCellProps) {
  const visibleEvents = events.slice(0, 2);
  const remainingEvents = events.length - visibleEvents.length;

  const isToday = new Date().toDateString() === date.toDateString();

  return (
    <motion.div
      className={`min-h-[180px] p-2 m-1 border border-zinc-200 rounded relative group dark:border-zinc-800 ${getDateClassName(date, showPastDates, "month")} hover:bg-zinc-50 dark:hover:bg-zinc-900/20 transition-colors`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.02 }}
    >
      <div
        className={`font-medium mb-2 ${
          isToday
            ? "border w-max px-2 rounded bg-black text-white dark:bg-white dark:text-black"
            : ""
        }`}
      >
        {date.getDate()}
      </div>
      <div className="space-y-1">
        {visibleEvents.map((event, i) => (
          <motion.div
            key={event.id}
            className={`rounded p-1 text-sm cursor-pointer hover:opacity-80 ${getEventBackgroundColorClass(
              event.color
            )}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={(e) => handleEventClick && handleEventClick(e, event)}
          >
            <div className="font-medium truncate">{event.title}</div>
            <div className="text-xs opacity-70">
              {event.isFullDay
                ? "All day"
                : `${format(event.start, "HH:mm")} - ${format(
                    event.end,
                    "HH:mm"
                  )}`}
            </div>
          </motion.div>
        ))}
        {remainingEvents > 0 && (
          <button
            onClick={() => handleDayClick && handleDayClick(date)}
            className="text-xs text-zinc-900 hover:text-zinc-900/80 transition-colors dark:text-zinc-50 dark:hover:text-zinc-50/80"
          >
            +{remainingEvents} more
          </button>
        )}
      </div>
    </motion.div>
  );
}
