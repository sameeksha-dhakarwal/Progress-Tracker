import { getYearDays } from "../utils/dates";
import MonthGrid from "./MonthGrid";

export default function YearGrid({ data, filters, setSelectedDate }) {
  const days = getYearDays();

  // ✅ SAFE FILTERING
  const filteredDays = days.filter((day) => {
    const dayData = data[day.date];

    // month filter
    if (filters?.month !== "all" && day.month !== filters.month) {
      return false;
    }

    // level filter
    if (
      filters?.level !== "all" &&
      dayData?.level !== filters.level
    ) {
      return false;
    }

    // activity filter
    if (
      filters?.activity !== "all" &&
      !dayData?.activities?.[filters.activity]
    ) {
      return false;
    }

    return true;
  });

  // group by month
  const months = filteredDays.reduce((acc, day) => {
    if (!acc[day.month]) acc[day.month] = [];
    acc[day.month].push(day);
    return acc;
  }, {});

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex gap-6 min-w-max">
        {Object.entries(months).map(([month, monthDays]) => (
          <MonthGrid
            key={month}
            month={month}
            days={monthDays}
            data={data}
            onDayClick={(date) => setSelectedDate(String(date))}

          />
        ))}
      </div>
    </div>
  );
}
