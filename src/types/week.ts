import { CalendarEvent } from "./calendar";

export interface WeekViewProps {
  date: Date;
  events: CalendarEvent[];
  showPastDates?: boolean;
  handleEventClick?: (e: React.MouseEvent, event: CalendarEvent) => void;
  handleDayClick?: (date: Date) => void;
  isLoading?: boolean;
}

export interface WeekHeaderProps {
  weekDays: Date[];
  currentDate: Date;
  isPastDate: (date: Date) => boolean;
  onDayClick?: (date: Date) => void;
}

export interface FullDayEventsWeekViewProps {
  events: CalendarEvent[];
  onEventClick?: (e: React.MouseEvent, event: CalendarEvent) => void;
}
