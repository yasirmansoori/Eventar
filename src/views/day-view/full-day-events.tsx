import { motion } from "framer-motion";
import { getEventBackgroundColorClass } from "@/utils/color-utils";
import { isPastDate } from "@/utils/date-utils";
import { FullDayEventsDayViewProps } from "@/types/day";

const FullDayEvents = ({
  fullDayEvents,
  visibleFullDayEvents,
  handleEventClick,
  showAllFullDayEvents,
  setShowAllFullDayEvents,
}: FullDayEventsDayViewProps) => (
  <div className="rounded-lg border">
    <div className="border-b px-4 py-2">
      <h3 className="font-medium">Full-Day Events ({fullDayEvents.length})</h3>
    </div>
    <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-600 scrollbar-track-transparent">
      {visibleFullDayEvents.map((event, index) => {
        const eventStartDate = new Date(event.start);
        const pastDate = isPastDate(eventStartDate);
        return (
          <motion.div
            key={event.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 cursor-pointer hover:opacity-80 ${getEventBackgroundColorClass(
              event.color
            )}  ${
              pastDate
                ? "opacity-50 cursor-not-allowed line-through grayscale"
                : "cursor-pointer"
            }`}
            onClick={(e) => {
              if (!pastDate) {
                handleEventClick?.(e, event);
              }
            }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{event.title}</h4>
                <p className="text-sm">{event.description}</p>
              </div>
              <span className="text-sm">All Day</span>
            </div>
            {pastDate && (
              <p className="text-xs text-red-500">This event has passed</p>
            )}
          </motion.div>
        );
      })}
      {fullDayEvents.length > 3 && (
        <div className="p-4 border-t sticky bottom-0 bg-white dark:bg-zinc-900">
          <button
            onClick={() => setShowAllFullDayEvents(!showAllFullDayEvents)}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {showAllFullDayEvents
              ? "Show Less"
              : `Show ${fullDayEvents.length - 3} More`}
          </button>
        </div>
      )}
    </div>
  </div>
);

export default FullDayEvents;
