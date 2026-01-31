import {
  startOfYear,
  endOfYear,
  eachDayOfInterval,
  format
} from "date-fns";

export function getYearDays(year = new Date().getFullYear()) {
  const start = startOfYear(new Date(year, 0, 1));
  const end = endOfYear(start);

  return eachDayOfInterval({ start, end }).map(date => ({
    date,
    day: format(date, "d"),
    month: format(date, "MMM"),
    fullDate: format(date, "yyyy-MM-dd")
  }));
}
