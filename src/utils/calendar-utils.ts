import type { CalendarEvent } from "@/types/calendar";

export const getEventsForDate = (date: Date, events: CalendarEvent[]) => {
  return events.filter(
    (event) =>
      new Date(event.start).getDate() === date.getDate() &&
      new Date(event.start).getMonth() === date.getMonth() &&
      new Date(event.start).getFullYear() === date.getFullYear()
  );
};
