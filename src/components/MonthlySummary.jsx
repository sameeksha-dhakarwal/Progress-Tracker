export default function MonthlySummary({ month, stats }) {
  return (
    <div className="bg-slate-800 rounded p-4">
      <h3 className="font-semibold mb-2">{month}</h3>

      <div className="text-sm space-y-1">
        <div>Tracked Days: {stats.total}</div>
        <div className="text-green-400">
          High: {stats.high}
        </div>
        <div className="text-yellow-400">
          Medium: {stats.medium}
        </div>
        <div className="text-red-400">
          Low: {stats.low}
        </div>
      </div>
    </div>
  );
}
