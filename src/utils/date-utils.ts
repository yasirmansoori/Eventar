import { CalendarView } from "@/types/calendar";

export function isPastDate(date: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date < today;
}

export function getDateClassName(
  date: Date,
  showPastDates: boolean,
  view: CalendarView
) {
  if (!showPastDates && isPastDate(date)) {
    switch (view) {
      case "day":
        return "opacity-50 pointer-events-none text-gray-400";
      case "week":
        return "opacity-50 pointer-events-none text-gray-400";
      case "month":
        return "opacity-50 pointer-events-none text-gray-400";
      case "year":
        return "opacity-40 pointer-events-none text-gray-400";
    }
  }
  return "";
}

export function getMonthDays(year: number, month: number): Date[] {
  const days: Date[] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }

  return days;
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
