import { getStreaks } from "../utils/streaks";

export default function StreaksCards({ data }) {
  const { currentStreak, bestStreak } = getStreaks(data || {});

  return (
    <div className="flex gap-3">
      {/* 🔥 STREAK */}
      <div className="
        bg-orange-400/15
        border border-orange-400/30
        backdrop-blur-md
        rounded-lg
        px-4 py-3
        text-orange-200
        min-w-[100px]
      ">
        <div className="text-xs uppercase tracking-wide opacity-80">
          Streak
        </div>
        <div className="text-xl font-semibold flex items-center gap-1">
          🔥 {currentStreak}
        </div>
      </div>

      {/* 🏆 BEST */}
      <div className="
        bg-sky-400/15
        border border-sky-400/30
        backdrop-blur-md
        rounded-lg
        px-4 py-3
        text-sky-200
        min-w-[100px]
      ">
        <div className="text-xs uppercase tracking-wide opacity-80">
          Best
        </div>
        <div className="text-xl font-semibold flex items-center gap-1">
          🏆 {bestStreak}
        </div>
      </div>
    </div>
  );
}
