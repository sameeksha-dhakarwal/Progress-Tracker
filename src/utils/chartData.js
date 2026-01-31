export function getDailyProductivityData(data = {}) {
  return Object.entries(data)
    .map(([date, day]) => {
      const activities = day?.activities || {};
      const total = Object.keys(activities).length;
      const completed = Object.values(activities).filter(Boolean).length;

      const productivity =
        total === 0 ? 0 : Math.round((completed / total) * 100);

      return {
        date,
        productivity,
      };
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}
