import { useEffect } from "react";
import { ErrorBoundary } from "@/components/error-boundary";
import { FilterPopover } from "@/components/filter-popover";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { CalendarHeaderProps } from "@/types/calendar";
import { ViewOptions } from "./view-options";

export function CalendarHeader({
  view,
  setView,
  currentDate,
  setCurrentDate,
  selectedColors,
  onColorToggle,
  navigation,
  showViewOptions,
  yearRange,
  showPastDates,
  availableColors,
  showAgenda,
  agendaView,
  handleAgendaView,
}: CalendarHeaderProps) {
  if (!showViewOptions || showViewOptions.length === 0) {
    throw new Error("At least one view option must be provided");
  }

  useEffect(() => {
    if (!showViewOptions.includes(view)) {
      setView(showViewOptions[0]);
    }
  }, [view, showViewOptions, setView]);

  const availableYears = yearRange.map((year) => Number.parseInt(year));

  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  return (
    <ErrorBoundary>
      <header className="flex flex-col gap-4 p-4 border-b" id="calendar-header">
        <div className="flex flex-wrap items-center gap-2">
          {/* Navigation */}
          {navigation && (
            <Navigation
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              view={view}
              availableYears={availableYears}
              showPastDates={showPastDates}
            />
          )}

          {/* View Options */}
          <div className="flex items-center gap-2 ml-auto">
            <FilterPopover
              selectedColors={selectedColors}
              onColorToggle={onColorToggle}
              colors={availableColors}
            />

            <Button
              size="md"
              onClick={handleTodayClick}
              variant={
                currentDate.toDateString() === new Date().toDateString()
                  ? "default"
                  : "outline"
              }
            >
              Today
            </Button>

            {showAgenda && (
              <Button
                size="md"
                onClick={() => handleAgendaView?.(!showAgenda)}
                variant={agendaView ? "default" : "outline"}
              >
                Agenda
              </Button>
            )}

            <ViewOptions
              view={view}
              setView={setView}
              showViewOptions={showViewOptions}
            />
          </div>
        </div>
      </header>
    </ErrorBoundary>
  );
}
