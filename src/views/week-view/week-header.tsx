import { format } from "date-fns";
import { useState } from "react";
import { SpecialDayModal } from "@/components/modals/special-day-modal";
import { WeekHeaderProps } from "@/types/week";

export function WeekHeader({
  weekDays,
  currentDate,
  isPastDate,
  isSpecialDay,
  specialDayContent,
}: WeekHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSpecialDayClick = () => {
    if (isSpecialDay) {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="grid grid-cols-8 border-b">
      <div className="p-2 text-center text-sm font-medium" />
      {weekDays.map((day, index) => (
        <div
          key={index}
          className={`flex w-full items-center justify-center gap-2 p-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
            isPastDate(day) ? "opacity-50 bg-zinc-100 dark:bg-zinc-800" : ""
          }`}
        >
          <div className="flex flex-col w-full items-center justify-center">
            <div className="font-medium">{format(day, "EEE")}</div>
            <div
              className={`text-muted-foreground ${
                day.getDate() === currentDate.getDate()
                  ? "rounded-full bg-zinc-900 text-zinc-50 w-6 h-6 flex items-center justify-center mx-auto dark:bg-zinc-50 dark:text-zinc-900"
                  : ""
              }`}
            >
              {day.getDate()}
            </div>
          </div>

          {/* if special day  */}
          {isSpecialDay &&
            day.getDate() === currentDate.getDate() &&
            specialDayContent && (
              <div
                className="relative w-full h-full flex justify-center items-center before:absolute before:inset-0 before:pointer-events-none before:bg-[repeating-linear-gradient(135deg,transparent,transparent_8px,currentColor_8px,currentColor_9px)] before:opacity-[0.1] hover:before:opacity-[0.5]bg-gradient-to-br from-purple-400/20 to-pink-400/20 border-2 border-purple-500/50 shadow-lg cursor-pointer rounded"
                onClick={handleSpecialDayClick}
              >
                {specialDayContent?.title}
              </div>
            )}
        </div>
      ))}

      {isSpecialDay && specialDayContent && (
        <SpecialDayModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          date={currentDate}
          content={specialDayContent}
        />
      )}
    </div>
  );
}
