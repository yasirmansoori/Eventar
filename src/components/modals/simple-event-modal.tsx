import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Check,
  Clock,
  Copy,
  LinkIcon,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CalendarEvent } from "@/types/calendar";

export default function SimpleEventModal({ event }: { event: CalendarEvent }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    if (event.meetingLink) {
      await navigator.clipboard.writeText(event.meetingLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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

  const DEFAULT_BACKGROUND_COLORS = {
    blue: { label: "Blue", bgClass: "bg-blue-500 dark:bg-blue-900" },
    green: { label: "Green", bgClass: "bg-green-500 dark:bg-green-900" },
    yellow: { label: "Yellow", bgClass: "bg-yellow-500 dark:bg-yellow-900" },
    purple: { label: "Purple", bgClass: "bg-purple-500 dark:bg-purple-900" },
    red: { label: "Red", bgClass: "bg-red-500 dark:bg-red-900" },
    orange: { label: "Orange", bgClass: "bg-orange-500 dark:bg-orange-900" },
  } as const;

  return (
    <AnimatePresence>
      <motion.div
        className="w-full max-w-2xl bg-white rounded-xl shadow-lg z-50 overflow-hidden dark:bg-zinc-950"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
      >
        {/* Header with color strip */}
        <div
          className={`h-2 w-full ${
            DEFAULT_BACKGROUND_COLORS[event.color ?? "blue"].bgClass
          }`}
        />

        {/* Main content */}
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h2 className="font-semibold text-lg">{event.title}</h2>
              <div className="flex items-center gap-2">
                {event.course && (
                  <Badge variant="secondary">{event.course}</Badge>
                )}
                {event.batch && (
                  <Badge variant="secondary">{event.batch}</Badge>
                )}
              </div>
            </div>
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
                      {format(new Date(event.start), "EEEE, MMMM d, yyyy")}
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
              <>
                <Button
                  variant="outline"
                  className="flex-1 rounded"
                  disabled={event.meetingLink.length === 0}
                  onClick={() => window.open(event.meetingLink, "_blank")}
                >
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Join Meeting
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCopyLink}
                  className="rounded"
                >
                  {copied ? (
                    <div className="flex items-center gap-1">
                      <span>Copied</span>
                      <Check className="h-4 w-4" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <span>Copy Link</span>
                      <Copy className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
