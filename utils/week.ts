import { addDays, addWeeks, startOfWeek } from 'date-fns';

export type WeekIndex = number;

export const WEEK_DAYS = 7;

export function getStartOfWeekUTC(date: Date) {
  return startOfWeek(date, { weekStartsOn: 1 });
}

export function getStartOfWeekForIndex(baseStartOfWeek: Date, index: WeekIndex) {
  return addWeeks(baseStartOfWeek, index);
}

export function getWeekDays(startOfWeekDate: Date): Date[] {
  const days: Date[] = [];
  for (let i = 0; i < WEEK_DAYS; i++) {
    days.push(addDays(startOfWeekDate, i));
  }
  return days;
}

export function toUTCMidnight(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}
