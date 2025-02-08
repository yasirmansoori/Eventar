import { CalendarEvent } from "./calendar";

export interface YearViewProps {
  year: number;
  events: CalendarEvent[];
  showPastDates?: boolean;
  handleEventClick?: (e: React.MouseEvent, event: CalendarEvent) => void;
  isLoading?: boolean;
}

export interface YearViewDayCellProps {
  date: Date;
  events: CalendarEvent[];
  showPastDates: boolean;
  handleEventClick?: (e: React.MouseEvent, event: CalendarEvent) => void;
}
