import { CalendarEvent } from "./calendar";

export interface EventsPopoverProps {
  events: CalendarEvent[];
  date: Date;
  handleEventClick?: (e: React.MouseEvent, event: CalendarEvent) => void;
}

export interface EventCardProps {
  event: CalendarEvent;
  variant?: "compact" | "full";
}
