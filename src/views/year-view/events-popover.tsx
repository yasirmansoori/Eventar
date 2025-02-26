import * as Popover from "@radix-ui/react-popover";
import { getEventBorderColorClass } from "@/utils/color-utils";
import { EventsPopoverProps } from "@/types/event";

export function EventsPopover({
  events,
  date,
  handleEventClick,
  specialDayContent,
}: EventsPopoverProps) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="w-full h-full cursor-pointer relative"
          aria-label={`${events.length} events on ${date.toLocaleDateString()}`}
        >
          {date.getDate()}
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {events.length}
          </span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="rounded-lg bg-white dark:bg-zinc-800 p-3 shadow-lg border dark:border-zinc-700 max-w-[300px] z-10"
          sideOffset={5}
        >
          <div className="space-y-2">
            <div className="font-semibold">
              {date.toLocaleDateString(undefined, { dateStyle: "long" })}
            </div>
            {specialDayContent && (
              <div className="relative flex flex-col p-2 from-purple-400/20 to-pink-400/20 border-2 border-purple-500/50 shadow-lg rounded">
                <div className="flex justify-between">
                  <div className="font-medium">{specialDayContent.title}</div>
                  <div className="text-xs border w-max h-max px-1 rounded bg-purple-500 text-white dark:bg-pink-500 dark:text-white">
                    {specialDayContent.type}
                  </div>
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 border w-max px-1 rounded mt-1">
                  {specialDayContent.description}
                </div>
              </div>
            )}
            {events.map((event, index) => (
              <button
                key={event.id || index}
                onClick={(e) => handleEventClick?.(e, event)}
                className={`w-full text-left text-sm border-l-2 pl-2 py-1 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors rounded ${getEventBorderColorClass(
                  event.color
                )}`}
              >
                <div className="font-medium">{event.title}</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  {new Date(event.start).toLocaleTimeString(undefined, {
                    timeStyle: "short",
                  })}
                  {event.end &&
                    ` - ${new Date(event.end).toLocaleTimeString(undefined, {
                      timeStyle: "short",
                    })}`}
                </div>
              </button>
            ))}
          </div>
          <Popover.Arrow className="fill-white dark:fill-zinc-800" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
