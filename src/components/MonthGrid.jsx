import DayPixel from "./DayPixel";

export default function MonthGrid({ month, days, data, onDayClick }) {
  return (
    <div className="flex flex-col gap-2 min-w-fit">
      <div className="text-sm text-slate-400">{month}</div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <DayPixel
            key={day.date}
            date={day.date}                 // ✅ keep as string
            dayData={data[day.date]}        // ✅ correct lookup
            onClick={() => onDayClick(day.date)} // ✅ FIXED
          />
        ))}
      </div>
    </div>
  );
}
