import { CalendarEvent, SpecialDay } from "./calendar";

export interface EventsPopoverProps {
  events: CalendarEvent[];
  date: Date;
  handleEventClick?: (e: React.MouseEvent, event: CalendarEvent) => void;
  specialDayContent?: SpecialDay;
}

export interface EventCardProps {
  event: CalendarEvent;
  variant?: "compact" | "full";
}
