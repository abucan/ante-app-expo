import dayjs from '@/utils/dayjs';

import { WEEK_DAYS } from '@/constants';

export type WeekIndex = number;

export function getStartOfWeekUTC(date: Date) {
  return dayjs.utc(date).startOf('isoWeek').toDate();
}

export function getStartOfWeekForIndex(baseStartOfWeek: Date, index: WeekIndex) {
  return dayjs.utc(baseStartOfWeek).add(index, 'week').toDate();
}

export function getWeekDays(startOfWeekDate: Date): Date[] {
  const base = dayjs(startOfWeekDate).utc();
  const days: Date[] = [];
  for (let i = 0; i < WEEK_DAYS; i++) {
    days.push(base.add(i, 'day').toDate());
  }
  return days;
}

export function toUTCMidnight(date: Date): Date {
  return dayjs(date).utc().startOf('day').toDate();
}
