import { PRODUCTIVITY } from "./constants";

export function getLevelFromActivities(activities = {}) {
  const values = Object.values(activities);
  if (!values.length) return PRODUCTIVITY.NONE;

  const completed = values.filter(Boolean).length;
  const percent = (completed / values.length) * 100;

  if (percent >= 75) return PRODUCTIVITY.HIGH;
  if (percent >= 40) return PRODUCTIVITY.MEDIUM;
  if (percent > 0) return PRODUCTIVITY.LOW;

  return PRODUCTIVITY.NONE;
}
