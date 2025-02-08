import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { formatTime } from "@/utils/date-utils";
import { EventCardProps } from "@/types/event";

export function EventCard({ event, variant = "full" }: EventCardProps) {
  const colorClasses = {
    blue: "bg-blue-100 dark:bg-blue-900",
    green: "bg-green-100 dark:bg-green-900",
    yellow: "bg-yellow-100 dark:bg-yellow-900",
    purple: "bg-purple-100 dark:bg-purple-900",
    red: "bg-red-100 dark:bg-red-900",
  };

  return (
    <motion.div
      className={`rounded-md p-2 ${
        event.color
          ? colorClasses[event.color]
          : "bg-zinc-900/10 dark:bg-zinc-50/10"
      }`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start gap-2">
        {!event.isFullDay && variant === "full" && (
          <Clock className="mt-0.5 h-4 w-4 shrink-0 opacity-50" />
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium">{event.title}</p>
          {!event.isFullDay && (
            <p className="text-sm opacity-70">
              {formatTime(event.start)} - {formatTime(event.end)}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
