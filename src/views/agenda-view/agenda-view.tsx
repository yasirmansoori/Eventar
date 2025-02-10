import { format } from "date-fns";
import { motion } from "framer-motion";
import { getEventBackgroundColorClass } from "@/utils/color-utils";
import { CalendarEvent } from "@/types/calendar";

interface AgendaViewProps {
  events: CalendarEvent[];
  handleEventClick: (e: React.MouseEvent, event: CalendarEvent) => void;
}

export const AgendaView = ({ events, handleEventClick }: AgendaViewProps) => {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="mb-6 px-4">
        <h1 className="text-2xl font-bold text-gray-800">Agenda View</h1>
        <p className="text-gray-600 mt-1">
          View your upcoming events in chronological order
        </p>
      </div>
      <div className="space-y-2">
        {sortedEvents.length === 0 ? (
          <div className="text-center p-8 text-gray-500">
            <p>No events scheduled. Time to add some!</p>
          </div>
        ) : (
          sortedEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.2 }}
              onClick={(e) => handleEventClick(e, event)}
              className={`flex items-center p-3 rounded-lg shadow-sm cursor-pointer ${getEventBackgroundColorClass(
                event.color
              )} transition-all duration-200 hover:brightness-95 hover:shadow-md`}
            >
              <div className="flex-1">
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-600">
                  {format(new Date(event.start), "PPp")}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};
