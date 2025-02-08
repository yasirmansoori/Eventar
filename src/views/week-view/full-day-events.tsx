import { motion } from "framer-motion";
import { getEventBackgroundColorClass } from "@/utils/color-utils";
import { isPastDate } from "@/utils/date-utils";
import { FullDayEventsWeekViewProps } from "@/types/week";

export function FullDayEvents({
  events,
  onEventClick,
}: FullDayEventsWeekViewProps) {
  if (events.length === 0) return null;

  return (
    <div className="rounded-lg border">
      <div className="px-4 py-2">
        <h3 className="text-sm">Full-Day Events ({events.length})</h3>
      </div>
      <div className="flex gap-1 overflow-x-auto pb-2">
        {events.map((event, index) => {
          const eventStartDate = new Date(event.start);
          const pastDate = isPastDate(eventStartDate);
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`flex-1 min-w-[200px] p-2 rounded hover:opacity-80 ${getEventBackgroundColorClass(
                event.color
              )} ${
                pastDate
                  ? "opacity-50 cursor-not-allowed line-through grayscale"
                  : "cursor-pointer"
              }`}
              onClick={(e) => {
                if (!pastDate) {
                  onEventClick?.(e, event);
                }
              }}
            >
              <h4 className="font-medium text-sm">{event.title}</h4>
              <p className="text-xs">{event.description}</p>
              {pastDate && (
                <p className="text-xs text-red-500">This event has passed</p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
