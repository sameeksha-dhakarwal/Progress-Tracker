import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getDailyProductivityData } from "../utils/chartData";

export default function WeeklyProgressChart({ data }) {
  const chartData = getDailyProductivityData(data);

  if (chartData.length === 0) {
    return (
      <p className="text-slate-400 text-sm">
        No data to display yet
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={chartData}>
        <XAxis
          dataKey="date"
          tick={{ fill: "#94a3b8", fontSize: 12 }}
          tickFormatter={(d) =>
            new Date(d).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          }
        />

        <YAxis
          domain={[0, 100]}
          tick={{ fill: "#94a3b8", fontSize: 12 }}
          tickFormatter={(v) => `${v}%`}
        />

        <Tooltip
          formatter={(v) => [`${v}%`, "Productivity"]}
          labelFormatter={(l) =>
            new Date(l).toDateString()
          }
        />

        <Line
          type="monotone"          // ✅ makes it wavy
          dataKey="productivity"
          stroke="#38bdf8"
          strokeWidth={3}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
