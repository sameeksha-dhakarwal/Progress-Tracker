import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getDailyCompletionData } from "../utils/chartData";

export default function DailyCompletionChart({ data }) {
  const chartData = getDailyCompletionData(data);

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
      <h3 className="font-semibold mb-3">Daily Completion Trend</h3>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="percent"
              stroke="#38bdf8"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
