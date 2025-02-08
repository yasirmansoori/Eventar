import { isBefore, startOfDay } from "date-fns";
import { useCallback, useMemo } from "react";
import type { CalendarEvent } from "@/types/calendar";

export function useWeekViewCalculations(
  date: Date,
  events: CalendarEvent[],
  showPastDates: boolean
) {
  const weekDays = useMemo(() => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());

    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return day;
    });
  }, [date]);

  const hours = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);

  const fullDayEvents = useMemo(
    () => events.filter((event) => event.isFullDay),
    [events]
  );

  const isPastDate = useCallback(
    (day: Date) => {
      return (
        !showPastDates && isBefore(startOfDay(day), startOfDay(new Date()))
      );
    },
    [showPastDates]
  );

  const getEventsForHourAndDay = useCallback(
    (hour: number, day: Date) =>
      events.filter(
        (event) =>
          !event.isFullDay &&
          new Date(event.start).getHours() === hour &&
          new Date(event.start).getDate() === day.getDate()
      ),
    [events]
  );

  return {
    weekDays,
    hours,
    fullDayEvents,
    isPastDate,
    getEventsForHourAndDay,
  };
}
