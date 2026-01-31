export default function Filters({
  filters,
  setFilters,
  months,
  activities,
  onExportCSV,
  onShowProgress,
}) {
  const baseClass = `
    h-10
    bg-white/5 backdrop-blur-md
    border border-white/10
    rounded-lg px-4
    text-sm text-white
    hover:bg-white/10
    transition
    focus:outline-none focus:ring-2 focus:ring-blue-500/40
  `;

  const optionClass = "bg-slate-900 text-white";

  return (
    <div className="flex flex-wrap items-center gap-3">

      {/* Month */}
      <select
        value={filters.month}
        onChange={(e) =>
          setFilters({ ...filters, month: e.target.value })
        }
        className={baseClass}
      >
        <option value="all" className={optionClass}>All Months</option>
        {months.map((m) => (
          <option key={m} value={m} className={optionClass}>{m}</option>
        ))}
      </select>

      {/* Level */}
      <select
        value={filters.level}
        onChange={(e) =>
          setFilters({ ...filters, level: e.target.value })
        }
        className={baseClass}
      >
        <option value="all" className={optionClass}>All Levels</option>
        <option value="high" className={optionClass}>High</option>
        <option value="medium" className={optionClass}>Medium</option>
        <option value="low" className={optionClass}>Low</option>
      </select>

      {/* Activity */}
      <select
        value={filters.activity}
        onChange={(e) =>
          setFilters({ ...filters, activity: e.target.value })
        }
        className={baseClass}
      >
        <option value="all" className={optionClass}>All Activities</option>
        {activities.map((a) => (
          <option key={a} value={a} className={optionClass}>{a}</option>
        ))}
      </select>

      {/* Download CSV */}
      <button
        onClick={onExportCSV}
        className="h-10 px-4 rounded-lg bg-slate-600 hover:bg-slate-500 text-sm text-white"
      >
        Download CSV
      </button>

      {/* Progress */}
      <button
        onClick={onShowProgress}
        className="h-10 px-4 rounded-lg bg-slate-600 hover:bg-slate-500 text-sm text-white"
      >
        Progress
      </button>
    </div>
  );
}
