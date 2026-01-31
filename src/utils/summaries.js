// Group days by month (YYYY-MM)
export function getMonthlySummary(data) {
  const monthly = {};

  Object.entries(data || {}).forEach(([date, dayData]) => {
    if (!dayData?.activities) return;

    const monthKey = date.slice(0, 7); // YYYY-MM

    if (!monthly[monthKey]) {
      monthly[monthKey] = {
        totalDays: 0,
        activeDays: 0,
      };
    }

    monthly[monthKey].totalDays += 1;

    const completedCount = Object.values(dayData.activities || {}).filter(
      Boolean
    ).length;

    if (completedCount > 0) {
      monthly[monthKey].activeDays += 1;
    }
  });

  return monthly;
}

export function getYearlySummary(monthly) {
  const months = Object.entries(monthly || {});
  if (months.length === 0) {
    return {
      totalDays: 0,
      productivityPercent: 0,
      bestMonth: null,
      worstMonth: null,
    };
  }

  let totalDays = 0;
  let totalActiveDays = 0;

  let bestMonth = null;
  let worstMonth = null;
  let bestRatio = -1;
  let worstRatio = Infinity;

  months.forEach(([month, stats]) => {
    totalDays += stats.totalDays;
    totalActiveDays += stats.activeDays;

    const ratio =
      stats.totalDays === 0 ? 0 : stats.activeDays / stats.totalDays;

    if (ratio > bestRatio) {
      bestRatio = ratio;
      bestMonth = month;
    }

    if (ratio < worstRatio) {
      worstRatio = ratio;
      worstMonth = month;
    }
  });

  return {
    totalDays,
    productivityPercent:
      totalDays === 0
        ? 0
        : Math.round((totalActiveDays / totalDays) * 100),
    bestMonth,
    worstMonth,
  };
}
