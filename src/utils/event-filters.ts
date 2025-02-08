import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  isWithinInterval,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import type { CalendarEvent, CalendarView } from "@/types/calendar";

interface FilterOptions {
  view: CalendarView;
  currentDate: Date;
  selectedColors: string[];
  // selectedResource: string | null;
}

export function filterEvents(events: CalendarEvent[], options: FilterOptions) {
  const { view, currentDate, selectedColors } = options;

  return events.filter((event) => {
    // Color and resource filtering
    const matchesColor =
      selectedColors.length === 0 ||
      (event.color && selectedColors.includes(event.color));
    // const matchesResource =
    //   !selectedResource || event.resourceId === selectedResource;

    // Date range filtering
    let start, end;
    switch (view) {
      case "year":
        start = startOfYear(currentDate);
        end = endOfYear(currentDate);
        break;
      case "month":
        start = startOfMonth(currentDate);
        end = endOfMonth(currentDate);
        break;
      case "week":
        start = startOfWeek(currentDate, { weekStartsOn: 1 });
        end = endOfWeek(currentDate, { weekStartsOn: 1 });
        break;
      case "day":
        start = startOfDay(currentDate);
        end = endOfDay(currentDate);
        break;
      default:
        start = new Date(0);
        end = new Date(9999, 11, 31);
    }

    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);
    const isInRange =
      isWithinInterval(eventStart, { start, end }) ||
      isWithinInterval(eventEnd, { start, end }) ||
      (eventStart <= start && eventEnd >= end);

    // return matchesColor && matchesResource && isInRange;
    return matchesColor && isInRange;
  });
}
