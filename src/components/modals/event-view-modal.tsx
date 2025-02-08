import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Clock, LinkIcon, MapPin, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getEventColorClass } from "@/utils/color-utils";
import type { CalendarEvent, DefaultModalConfig } from "@/types/calendar";

interface EventViewModalProps {
  event: CalendarEvent;
  isOpen: boolean;
  onClose: () => void;
  customComponent?: (event: CalendarEvent) => React.ReactNode;
  defaultModalConfig?: DefaultModalConfig;
}

export function EventViewModal({
  event,
  isOpen,
  onClose,
  customComponent,
  defaultModalConfig,
}: EventViewModalProps) {
  if (!isOpen) return null;

  const modalConfig = {
    showModalHeaderStrip: true,
    disableActionButton: false,
    actionButtonName: "Join Meeting",
    titleStyles: "text-xl font-bold",
    ...defaultModalConfig,
  };

  const getEventStatusColor = (status?: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "tentative":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
    }
  };

  const calculateDuration = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const duration = Math.abs(endDate.getTime() - startDate.getTime());
    const hours = Math.floor(duration / 36e5);
    const minutes = Math.floor((duration % 36e5) / 6e4);
    return `${hours}h ${minutes}m`;
  };

  const getTimeFormatFromDuration = (duration: number) => {
    const hours = Math.floor(duration);
    const minutes = Math.round((duration - hours) * 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="event-view-modal"
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

          {!customComponent && (
            <motion.div
              className="w-full max-w-2xl bg-white rounded-xl shadow-lg z-50 overflow-hidden dark:bg-zinc-950"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              {/* Header with color strip */}
              {modalConfig.showModalHeaderStrip && (
                <div
                  className={`h-2 w-full ${getEventColorClass(event.color)}`}
                />
              )}

              {/* Main content */}
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h2 className={modalConfig.titleStyles}>{event.title}</h2>
                    <div className="flex items-center gap-2">
                      {event.status && (
                        <Badge
                          variant="outline"
                          className={getEventStatusColor(event.status)}
                        >
                          {event?.status}
                        </Badge>
                      )}
                      {event.isFullDay && (
                        <Badge variant="outline">All Day</Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <Separator className="my-4" />

                <div className="grid gap-4">
                  {/* Time and Date */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-900/10 flex items-center justify-center dark:bg-zinc-50/10">
                      <Clock className="h-5 w-5 text-zinc-900 dark:text-zinc-50" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {event.isFullDay ? (
                          format(new Date(event.start), "EEEE, MMMM d, yyyy")
                        ) : (
                          <>
                            {format(
                              new Date(event.start),
                              "EEEE, MMMM d, yyyy"
                            )}
                            <br />
                            {format(new Date(event.start), "HH:mm")} -{" "}
                            {format(new Date(event.end), "HH:mm")}{" "}
                            {event.duration ? (
                              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                ({getTimeFormatFromDuration(event.duration)})
                              </span>
                            ) : (
                              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                (
                                {calculateDuration(
                                  event.start.toString(),
                                  event.end.toString()
                                )}
                                )
                              </span>
                            )}
                          </>
                        )}
                      </p>
                      {event.recurring && (
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          Recurring event
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Location if available */}
                  {event.location && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-900/10 flex items-center justify-center dark:bg-zinc-50/10">
                        <MapPin className="h-5 w-5 text-zinc-900 dark:text-zinc-50" />
                      </div>
                      <div>
                        <p className="font-medium">{event.location}</p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          {event.locationDetail}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  {event.description && (
                    <div className="mt-4 space-y-2">
                      <h3 className="font-medium">Description</h3>
                      <p className="text-sm text-zinc-500 whitespace-pre-wrap dark:text-zinc-400">
                        {event.description}
                      </p>
                    </div>
                  )}

                  {/* Additional Info */}
                  {event.additionalInfo && (
                    <div className="mt-4 p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                      <div className="flex items-center gap-2 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <p>{event.additionalInfo}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex items-center gap-2">
                  {event.meetingLink && (
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => window.open(event.meetingLink, "_blank")}
                      disabled={modalConfig.disableActionButton}
                    >
                      <LinkIcon className="mr-2 h-4 w-4" />
                      {modalConfig.actionButtonName}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {customComponent && (
            <motion.div
              className="w-full max-w-2xl bg-white rounded-xl shadow-lg z-50 overflow-hidden dark:bg-zinc-950"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              {customComponent(event)}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
