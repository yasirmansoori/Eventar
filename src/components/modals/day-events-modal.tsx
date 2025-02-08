import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import { getEventBackgroundColorClass } from "@/utils/color-utils";
import type { CalendarEvent } from "@/types/calendar";
import { EventViewModal } from "./event-view-modal";

interface DayEventsModalProps {
  date: Date;
  events: CalendarEvent[];
  isOpen: boolean;
  onClose: () => void;
}

export function DayEventsModal({
  date,
  events,
  isOpen,
  onClose,
}: DayEventsModalProps) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const sortedEvents = [...events].sort((a, b) => {
    if (a.isFullDay && !b.isFullDay) return -1;
    if (!a.isFullDay && b.isFullDay) return 1;
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });

  const handleEventClick = (e: React.MouseEvent, event: CalendarEvent) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  if (!isOpen) return null;

  return (
    <Fragment>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="day-events-modal"
            className="z-50 grid place-items-center fixed inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="fixed inset-0 bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.div
              className="w-full max-w-md bg-white rounded-lg shadow-lg z-50 dark:bg-zinc-950"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold">
                  {format(date, "MMMM d, yyyy")}
                </h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4 max-h-[60vh] overflow-y-auto space-y-2">
                {sortedEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    className={`rounded-lg p-3 ${getEventBackgroundColorClass(event.color)}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={(e) => handleEventClick(e, event)}
                  >
                    <h3 className="font-medium">{event.title}</h3>
                    {event.isFullDay ? (
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        All day
                      </p>
                    ) : (
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {format(new Date(event.start), "HH:mm")} -{" "}
                        {format(new Date(event.end), "HH:mm")}
                      </p>
                    )}
                    {event.description && (
                      <p className="text-sm mt-1">{event.description}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedEvent && (
        <EventViewModal
          event={selectedEvent}
          isOpen={isEventModalOpen}
          onClose={() => {
            setIsEventModalOpen(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </Fragment>
  );
}
