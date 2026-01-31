import { PRODUCTIVITY } from "./constants";

export function calculateStats(data) {
  const entries = Object.values(data);

  const trackedDays = entries.filter(
    d => d.level && d.level !== PRODUCTIVITY.NONE
  );

  const highDays = entries.filter(
    d => d.level === PRODUCTIVITY.HIGH
  );

  const productivityPercent = trackedDays.length
    ? Math.round((highDays.length / trackedDays.length) * 100)
    : 0;

  return {
    trackedDays: trackedDays.length,
    highDays: highDays.length,
    productivityPercent
  };
}
