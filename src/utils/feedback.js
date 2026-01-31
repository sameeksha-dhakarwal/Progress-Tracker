export function getDailyFeedback(activities = {}) {
  const values = Object.values(activities);
  if (!values.length) return "No activities tracked";

  const completed = values.filter(Boolean).length;
  const percent = (completed / values.length) * 100;

  if (percent === 100) return "Accurate work 💯";
  if (percent >= 60) return "Good work today 👏";
  return "Work harder tomorrow 💪";
}
