import { getHighlights } from "../utils/streaks";

export default function Highlights({ data }) {
  const highlights = getHighlights(data || {});

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
      <h3 className="font-semibold mb-2">Highlights</h3>

      <div className="text-sm space-y-1">
        <div className="text-green-400">
          Best Day: {highlights.bestDay || "—"}
        </div>

        <div className="text-red-400">
          Worst Day: {highlights.worstDay || "—"}
        </div>

        <div className="text-slate-400">
          Missed Days: {highlights.missedDays ?? 0}
        </div>
      </div>
    </div>
  );
}
