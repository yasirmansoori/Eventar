import { useEffect, useState } from "react";
import { ErrorBoundary } from "@/components/error-boundary";
import { FilterPopover } from "@/components/filter-popover";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { CalendarHeaderProps } from "@/types/calendar";
import { ResourceSelector } from "./resource-selector";
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
  availableColors,
  showAgenda,
  agendaView,
  handleAgendaView,
  showClock,
  resources,
  selectedResource,
  onResourceChange,
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

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeEmoji = (hours: number) => {
    if (hours >= 5 && hours < 12) return "🌅";
    if (hours >= 12 && hours < 17) return "☀️";
    if (hours >= 17 && hours < 20) return "🌇";
    return "🌙";
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
            />
          )}

          {/* Clock */}
          {showClock && (
            <div className="flex items-center gap-2 text-lg font-semibold border border-zinc-200 rounded-md p-1 px-2">
              <span>{getTimeEmoji(time.getHours())}</span>
              <span>
                {time.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </span>
            </div>
          )}

          {/* View Options */}
          <div className="flex items-center gap-2 ml-auto">
            <ResourceSelector
              resources={resources}
              selectedResource={selectedResource}
              onResourceChange={onResourceChange}
            />

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
