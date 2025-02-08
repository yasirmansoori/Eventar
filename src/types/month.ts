import { CalendarEvent } from "./calendar";

export interface MonthViewProps {
  year: number;
  month: number;
  events: CalendarEvent[];
  showPastDates?: boolean;
  customEventViewer?: (event: CalendarEvent) => JSX.Element;
  handleEventClick?: (e: React.MouseEvent, event: CalendarEvent) => void;
  handleDayClick?: (date: Date) => void;
}

export interface MonthGridProps {
  month: string;
  monthIndex: number;
  year: number;
  events: CalendarEvent[];
  showPastDates: boolean;
  handleEventClick?: (e: React.MouseEvent, event: CalendarEvent) => void;
}
