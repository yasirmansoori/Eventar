import type { CalendarEvent, RenderViewProps } from "@/types/calendar";
import { AgendaView } from "../views/agenda-view/agenda-view";
import { DayView } from "../views/day-view/day-view";
import { MonthView } from "../views/month-view/month-view";
import { WeekView } from "../views/week-view/week-view";
import { YearView } from "../views/year-view/year-view";
import LoadingState from "./LoadingState";

export const renderView = ({
  view,
  currentDate,
  filteredEvents,
  showPastDates,
  customEventViewer,
  isLoading,
  error,
  spinnerComponent,
  setSelectedDate,
  setIsDayModalOpen,
  setSelectedEvent,
  setIsEventModalOpen,
  agendaView,
}: RenderViewProps) => {
  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-red-500 text-center">
          <h3 className="text-lg font-semibold mb-2">Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) return <LoadingState spinnerComponent={spinnerComponent} />;

  const handleEventClick = (e: React.MouseEvent, event: CalendarEvent) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsDayModalOpen(true);
  };

  switch (view) {
    case "year":
      return agendaView ? (
        <AgendaView
          events={filteredEvents}
          handleEventClick={handleEventClick}
        />
      ) : (
        <YearView
          year={currentDate.getFullYear()}
          events={filteredEvents}
          showPastDates={showPastDates}
          handleEventClick={handleEventClick}
        />
      );
    case "month":
      return agendaView ? (
        <AgendaView
          events={filteredEvents}
          handleEventClick={handleEventClick}
        />
      ) : (
        <MonthView
          year={currentDate.getFullYear()}
          month={currentDate.getMonth()}
          events={filteredEvents}
          showPastDates={showPastDates}
          customEventViewer={customEventViewer}
          handleEventClick={handleEventClick}
          handleDayClick={handleDayClick}
        />
      );
    case "week":
      return agendaView ? (
        <AgendaView
          events={filteredEvents}
          handleEventClick={handleEventClick}
        />
      ) : (
        <WeekView
          date={currentDate}
          events={filteredEvents}
          showPastDates={showPastDates}
          handleEventClick={handleEventClick}
          handleDayClick={handleDayClick}
        />
      );
    case "day":
      return agendaView ? (
        <AgendaView
          events={filteredEvents}
          handleEventClick={handleEventClick}
        />
      ) : (
        <DayView
          date={currentDate}
          events={filteredEvents}
          showPastDates={showPastDates}
          handleEventClick={handleEventClick}
          handleDayClick={handleDayClick}
        />
      );
    default:
      return null;
  }
};
