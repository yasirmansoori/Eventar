import { format } from "date-fns";
import { motion } from "framer-motion";
import { Check, ChevronDown, Clock, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CalendarEvent } from "@/types/calendar";

export default function CompactEventModal({ event }: { event: CalendarEvent }) {
  const [copied, setCopied] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const handleCopyLink = async () => {
    if (event.meetingLink) {
      await navigator.clipboard.writeText(event.meetingLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getTimeFormatFromDuration = (duration: number) => {
    const hours = Math.floor(duration);
    const minutes = Math.round((duration - hours) * 60);
    return `${hours}h ${minutes}m`;
  };

  const colorVariants = {
    blue: "border-l-blue-500",
    green: "border-l-green-500",
    yellow: "border-l-yellow-500",
    purple: "border-l-purple-500",
    red: "border-l-red-500",
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className={`w-full bg-white dark:bg-zinc-900 rounded-lg shadow-xl border-l-4 ${
        colorVariants[event.color ?? "blue"]
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b dark:border-zinc-800">
        <div className="flex items-start justify-between mb-2">
          <h2 className="text-lg font-semibold">{event.title}</h2>
          {event.status && (
            <Badge
              variant={event.status === "confirmed" ? "default" : "secondary"}
            >
              {event.status}
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {event.course && <Badge variant="outline">{event.course}</Badge>}
          {event.batch && <Badge variant="outline">{event.batch}</Badge>}
        </div>
      </div>

      {/* Quick Info */}
      <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50">
        <div className="flex items-center gap-3 text-sm">
          <Clock className="h-4 w-4 text-zinc-500" />
          <span>
            {format(new Date(event.start), "EEE, MMM d")}
            {!event.isFullDay && (
              <>
                {" "}
                • {format(new Date(event.start), "HH:mm")}-
                {format(new Date(event.end), "HH:mm")}
              </>
            )}
          </span>
        </div>
      </div>

      {/* Collapsible Sections */}
      <div className="divide-y dark:divide-zinc-800">
        {/* Time Details */}
        <Collapsible
          open={openSection === "time"}
          onOpenChange={() =>
            setOpenSection(openSection === "time" ? null : "time")
          }
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
            <span className="font-medium">Time Details</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                openSection === "time" ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-0 text-sm space-y-2">
            <p>
              Duration:{" "}
              {event.duration
                ? getTimeFormatFromDuration(event.duration)
                : getTimeFormatFromDuration(
                    (new Date(event.end).getTime() -
                      new Date(event.start).getTime()) /
                      3600000
                  )}
            </p>
            {event.recurring && (
              <p className="text-zinc-500">Recurring event</p>
            )}
          </CollapsibleContent>
        </Collapsible>

        {/* Location */}
        {event.location && (
          <Collapsible
            open={openSection === "location"}
            onOpenChange={() =>
              setOpenSection(openSection === "location" ? null : "location")
            }
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
              <span className="font-medium">Location</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  openSection === "location" ? "rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-0 text-sm space-y-2">
              <p>{event.location}</p>
              {event.locationDetail && (
                <p className="text-zinc-500">{event.locationDetail}</p>
              )}
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Description */}
        {event.description && (
          <Collapsible
            open={openSection === "description"}
            onOpenChange={() =>
              setOpenSection(
                openSection === "description" ? null : "description"
              )
            }
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
              <span className="font-medium">Description</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  openSection === "description" ? "rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-0 text-sm">
              <p className="whitespace-pre-wrap text-zinc-600 dark:text-zinc-300">
                {event.description}
              </p>
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Additional Info */}
        {event.additionalInfo && (
          <Collapsible
            open={openSection === "info"}
            onOpenChange={() =>
              setOpenSection(openSection === "info" ? null : "info")
            }
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
              <span className="font-medium">Additional Info</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  openSection === "info" ? "rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-0 text-sm">
              <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded">
                <p className="text-zinc-600 dark:text-zinc-300">
                  {event.additionalInfo}
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>

      {/* Actions */}
      {event.meetingLink && (
        <div className="p-4 border-t dark:border-zinc-800">
          <div className="flex gap-2">
            <Button
              className="flex-1"
              onClick={() => window.open(event.meetingLink, "_blank")}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Join Meeting
            </Button>
            <Button variant="outline" onClick={handleCopyLink}>
              {copied ? (
                <div className="flex items-center gap-1">
                  <Check className="h-4 w-4" />
                  <span className="sr-only">Copied</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy link</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
