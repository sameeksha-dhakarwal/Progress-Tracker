/* =========================
   STREAKS
========================= */
export function getStreaks(data) {
  if (!data || Object.keys(data).length === 0) {
    return { currentStreak: 0, bestStreak: 0 };
  }

  const dates = Object.keys(data)
    .filter(
      (d) =>
        data[d]?.activities &&
        Object.values(data[d].activities).some(Boolean)
    )
    .sort((a, b) => new Date(a) - new Date(b));

  let currentStreak = 0;
  let bestStreak = 0;
  let prevDate = null;

  for (const date of dates) {
    const d = new Date(date);

    if (prevDate) {
      const diff =
        (d - prevDate) / (1000 * 60 * 60 * 24);

      currentStreak = diff === 1 ? currentStreak + 1 : 1;
    } else {
      currentStreak = 1;
    }

    bestStreak = Math.max(bestStreak, currentStreak);
    prevDate = d;
  }

  // reset current streak if last activity was not yesterday or today
  if (prevDate) {
    const diffFromToday =
      (new Date() - prevDate) / (1000 * 60 * 60 * 24);

    if (diffFromToday > 1) currentStreak = 0;
  }

  return { currentStreak, bestStreak };
}

/* =========================
   HIGHLIGHTS
========================= */
export function getHighlights(data) {
  const dates = Object.keys(data || {});

  let bestDay = null;
  let worstDay = null;
  let missedDays = 0;

  dates.forEach((date) => {
    const activities = data[date]?.activities || {};
    const completed = Object.values(activities).filter(Boolean).length;

    if (completed === 0) {
      missedDays++;
      return;
    }

    if (!bestDay || completed > bestDay.count) {
      bestDay = { date, count: completed };
    }

    if (!worstDay || completed < worstDay.count) {
      worstDay = { date, count: completed };
    }
  });

  return {
    bestDay: bestDay?.date || null,
    worstDay: worstDay?.date || null,
    missedDays,
  };
}
