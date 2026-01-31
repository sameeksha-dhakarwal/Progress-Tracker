export default function StreakMini({ label, value, emoji, gradient }) {
  return (
    <div
      className={`
        px-4 py-3 rounded-lg text-white
        bg-gradient-to-br ${gradient}
        shadow-md min-w-[120px]
      `}
    >
      <div className="text-xs opacity-80">{label}</div>
      <div className="text-lg font-bold">
        {emoji} {value}
      </div>
    </div>
  );
}
