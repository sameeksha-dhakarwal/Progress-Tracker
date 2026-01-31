import { useState } from "react";

export default function DailyActivities({ date, dayData = {}, setData }) {
  // ✅ normalize date key (VERY IMPORTANT)
  const dateKey =
    typeof date === "string"
      ? date
      : new Date(date).toISOString().slice(0, 10);

  const activities = dayData.activities || {};
  const [newActivity, setNewActivity] = useState("");

  /* ---------- TOGGLE ACTIVITY ---------- */
  const toggleActivity = (name) => {
    setData((prev) => ({
      ...prev,
      [dateKey]: {
        ...(prev[dateKey] || {}),
        activities: {
          ...(prev[dateKey]?.activities || {}),
          [name]: !prev[dateKey]?.activities?.[name],
        },
      },
    }));
  };

  /* ---------- ADD ACTIVITY ---------- */
  const addActivity = () => {
    const trimmed = newActivity.trim();
    if (!trimmed) return;

    // ❌ prevent duplicates
    if (activities[trimmed] !== undefined) {
      setNewActivity("");
      return;
    }

    setData((prev) => ({
      ...prev,
      [dateKey]: {
        ...(prev[dateKey] || {}),
        activities: {
          ...(prev[dateKey]?.activities || {}),
          [trimmed]: false,
        },
      },
    }));

    setNewActivity("");
  };

  /* ---------- DELETE ACTIVITY ---------- */
  const deleteActivity = (name) => {
    setData((prev) => {
      const updatedActivities = { ...(prev[dateKey]?.activities || {}) };
      delete updatedActivities[name];

      return {
        ...prev,
        [dateKey]: {
          ...(prev[dateKey] || {}),
          activities: updatedActivities,
        },
      };
    });
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
      <h3 className="font-semibold mb-4">
        Activities — {new Date(dateKey).toDateString()}
      </h3>

      {/* EXISTING ACTIVITIES */}
      <div className="space-y-2 mb-4">
        {Object.keys(activities).length === 0 && (
          <p className="text-slate-400 text-sm">No activities yet</p>
        )}

        {Object.entries(activities).map(([name, checked]) => (
          <div
            key={name}
            className="flex items-center justify-between"
          >
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleActivity(name)}
              />
              <span>{name}</span>
            </label>

            <button
              onClick={() => deleteActivity(name)}
              className="text-red-400 text-xs hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* ADD NEW ACTIVITY */}
      <div className="flex gap-2">
        <input
          value={newActivity}
          onChange={(e) => setNewActivity(e.target.value)}
          placeholder="New activity"
          className="flex-1 bg-slate-800 rounded px-2 py-1 text-sm"
        />

        <button
          onClick={addActivity}
          className="bg-blue-600 px-3 py-1 rounded text-sm"
        >
          Add
        </button>
      </div>
    </div>
  );
}
