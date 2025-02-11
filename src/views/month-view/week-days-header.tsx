export function WeekDaysHeader({ date }: { date: Date }) {
  const getWeekDays = () => {
    // Get first day of the month
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const weekDays = Array.from({ length: 7 }).map((_, i) => {
      const day = new Date(firstDayOfMonth);
      day.setDate(1 + i);
      return day.toLocaleDateString("en-US", { weekday: "short" });
    });
    return weekDays;
  };

  return (
    <>
      {getWeekDays().map((day) => (
        <div key={day} className="p-4 text-center font-medium border-b">
          {day}
        </div>
      ))}
    </>
  );
}
