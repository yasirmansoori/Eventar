export function WeekDaysHeader() {
  const weekDays = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];

  return (
    <>
      {weekDays.map((day) => (
        <div key={day} className="p-4 text-center font-medium border-b">
          {day}
        </div>
      ))}
    </>
  );
}
