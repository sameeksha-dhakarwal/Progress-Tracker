export default function DayPixel({ date, dayData, onClick }) {
  const activities = dayData?.activities ?? {};

  // count ONLY explicitly true values
  const completedCount = Object.values(activities).filter(
    (v) => v === true
  ).length;

  const getColor = () => {
    if (completedCount === 0) return "bg-slate-600";      // gray
    if (completedCount === 1) return "bg-red-500";        // red
    if (completedCount <= 3) return "bg-yellow-400";     // yellow
    return "bg-green-600";                                // dark green
  };

  return (
    <div
      onClick={onClick}
      title={`${date} • ${completedCount} activities`}
      className={`
        w-4 h-4 rounded cursor-pointer
        transition-all duration-150
        ${getColor()}
        hover:ring-2 hover:ring-white/40
      `}
    />
  );
}
