export default function StatCard({ label, value }) {
  return (
    <div className="
      bg-slate-800 rounded-lg p-4
      flex flex-col gap-1
      min-w-[160px]
    ">
      <span className="text-sm text-slate-400">
        {label}
      </span>
      <span className="text-2xl font-bold">
        {value}
      </span>
    </div>
  );
}
