import { CalendarEvent, SpecialDay } from "./calendar";

export interface DayViewProps {
  date: Date;
  events: CalendarEvent[];
  showPastDates?: boolean;
  handleEventClick?: (e: React.MouseEvent, event: CalendarEvent) => void;
  handleDayClick?: (date: Date) => void;
  isSpecialDay: boolean;
  specialDayContent?: SpecialDay;
}

export interface DayCellProps {
  date: Date;
  index: number;
  events: CalendarEvent[];
  showPastDates: boolean;
  handleEventClick?: (e: React.MouseEvent, event: CalendarEvent) => void;
  handleDayClick?: (date: Date) => void;
  isSpecialDay: boolean;
  specialDayContent?: SpecialDay;
}

export interface FullDayEventsDayViewProps {
  fullDayEvents: CalendarEvent[];
  visibleFullDayEvents: CalendarEvent[];
  handleEventClick?: (e: React.MouseEvent, event: CalendarEvent) => void;
  showAllFullDayEvents: boolean;
  setShowAllFullDayEvents: (show: boolean) => void;
}

export interface HourlyEventsProps {
  hours: number[];
  dayEvents: CalendarEvent[];
  date: Date;
  showPastDates: boolean;
  handleEventClick?: (e: React.MouseEvent, event: CalendarEvent) => void;
  handleDayClick?: (date: Date) => void;
}
