import { getMonthlySummary, getYearlySummary } from "../utils/summaries";

function formatMonth(value) {
  if (!value) return "—";

  // already a string like "2026-01" or "Jan"
  if (typeof value === "string") return value;

  // Date object fallback
  if (value instanceof Date) {
    return value.toISOString().slice(0, 7); // YYYY-MM
  }

  return "—";
}

export default function YearlySummary({ data }) {
  const safeData = data || {};

  const monthlySummary = getMonthlySummary(safeData);
  const yearly = getYearlySummary(monthlySummary);

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
      <h3 className="font-semibold mb-2">Yearly Summary</h3>

      <div className="text-sm space-y-1">
        <div>Total Days: {yearly?.totalDays ?? 0}</div>

        <div>
          Productivity: {yearly?.productivityPercent ?? 0}%
        </div>

        <div className="text-green-400">
          Best Month: {formatMonth(yearly?.bestMonth)}
        </div>

        <div className="text-red-400">
          Worst Month: {formatMonth(yearly?.worstMonth)}
        </div>
      </div>
    </div>
  );
}
