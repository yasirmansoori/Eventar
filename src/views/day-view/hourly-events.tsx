import { format, isBefore, setHours } from "date-fns";
import { motion } from "framer-motion";
import { getEventBackgroundColorClass } from "@/utils/color-utils";
import { CalendarEvent } from "@/types/calendar";
import { HourlyEventsProps } from "@/types/day";

const HourlyEvents = ({
  hours,
  dayEvents,
  date,
  showPastDates,
  handleEventClick,
  handleDayClick,
}: HourlyEventsProps) => {
  const isPastHour = (hour: number) => {
    if (showPastDates) return false;
    const currentDate = new Date();
    const hourDate = setHours(date, hour);
    return isBefore(hourDate, currentDate);
  };

  const groupEventsByTime = (events: CalendarEvent[]) => {
    const groups: { [key: string]: CalendarEvent[] } = {};
    events.forEach((event) => {
      const key = `${event.start}-${event.end}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(event);
    });
    return groups;
  };

  return (
    <div className="flex-1 rounded-lg border">
      {hours.map((hour) => {
        const timeEvents = dayEvents.filter(
          (event) =>
            !event.isFullDay && new Date(event.start).getHours() === hour
        );

        return (
          <div key={hour} className="relative group min-h-[60px]">
            <div
              className={`sticky left-0 w-20 pr-4 text-sm text-right py-4 ${
                isPastHour(hour)
                  ? "text-zinc-400 dark:text-zinc-600"
                  : "text-zinc-500 dark:text-zinc-400"
              }`}
            >
              {hour.toString().padStart(2, "0")}:00
            </div>
            <div
              className={`absolute left-0 right-0 -top-px h-px ${
                isPastHour(hour)
                  ? "bg-zinc-100 dark:bg-zinc-800"
                  : "bg-zinc-200 group-hover:bg-zinc-100 dark:bg-zinc-800 dark:group-hover:bg-zinc-800"
              }`}
            />
            <div
              className={`absolute inset-0 ${
                isPastHour(hour) ? "bg-zinc-50/50 dark:bg-zinc-900/50" : ""
              }`}
            />
            {Object.entries(groupEventsByTime(timeEvents)).map(
              ([timeKey, events]) => {
                const firstEvent = events[0];
                const hasMultiple = events.length > 1;
                const eventStart = new Date(firstEvent.start);
                const eventEnd = new Date(firstEvent.end);
                const durationInHours =
                  (eventEnd.getTime() - eventStart.getTime()) /
                  (1000 * 60 * 60);

                return (
                  <motion.div
                    key={timeKey}
                    className={`absolute left-24 right-4 rounded cursor-pointer
                      ${
                        isPastHour(hour)
                          ? "grayscale brightness-95 opacity-50"
                          : ""
                      }`}
                    style={{
                      top: `${(eventStart.getMinutes() / 60) * 100}%`,
                      height: `${Math.max(durationInHours * 100, 8)}%`,
                      minHeight: "24px",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (hasMultiple && !isPastHour(hour)) {
                        handleDayClick?.(setHours(date, hour));
                      } else if (!isPastHour(hour)) {
                        handleEventClick?.(e, firstEvent);
                      } else {
                        return;
                      }
                    }}
                  >
                    {hasMultiple ? (
                      <div className="relative bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 p-2 rounded shadow-sm h-full">
                        <div className="absolute -right-1 -top-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          {events.length}
                        </div>
                        <h4 className="font-medium">Multiple Events</h4>
                        <p className="text-sm">
                          {format(new Date(firstEvent.start), "HH:mm")} -{" "}
                          {format(new Date(firstEvent.end), "HH:mm")}
                        </p>
                      </div>
                    ) : (
                      <div
                        className={`${getEventBackgroundColorClass(
                          firstEvent.color
                        )} p-2 rounded h-full`}
                      >
                        <h4 className="font-medium truncate">
                          {firstEvent.title}
                        </h4>
                        <p className="text-sm">
                          {format(eventStart, "HH:mm")} -{" "}
                          {format(eventEnd, "HH:mm")}
                        </p>
                      </div>
                    )}
                  </motion.div>
                );
              }
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HourlyEvents;
