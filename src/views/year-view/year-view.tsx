import { MonthGrid } from "@/views/year-view/month-grid";
import { motion } from "framer-motion";
import { memo, Suspense } from "react";
import { ErrorBoundary } from "@/components/error-boundary";
import { YearViewProps } from "@/types/year";
import { MONTHS } from "@/constants/calendar";

export const YearView = memo(function YearView({
  year,
  events,
  showPastDates = true,
  handleEventClick,
  isLoading,
  specialDays,
}: YearViewProps) {
  if (isLoading) {
    return <div className="animate-pulse">Loading calendar...</div>;
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      id="year-view"
    >
      {MONTHS.map((month, index) => (
        <ErrorBoundary key={month} fallback={<div>Error loading month</div>}>
          <Suspense fallback={<div>Loading month...</div>}>
            <motion.div
              className="border rounded-lg p-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="font-semibold mb-2">{month}</h3>
              <MonthGrid
                month={month}
                monthIndex={index}
                year={year}
                events={events}
                showPastDates={showPastDates}
                handleEventClick={handleEventClick}
                specialDays={specialDays}
              />
            </motion.div>
          </Suspense>
        </ErrorBoundary>
      ))}
    </div>
  );
});
