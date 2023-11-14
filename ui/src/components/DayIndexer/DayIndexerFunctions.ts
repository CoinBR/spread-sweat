import { IndexedDate } from "./DayIndexer";

export function today() {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

export function indexDates(dates: Date[], firstIndex: number = 1): IndexedDate[] {
  return dates.map((date, i) => ({ date, index: i + firstIndex }))
}

export function plusOneDay(date: Date): Date {
  const tmp = new Date(date)
  tmp.setDate(date.getDate() + 1)
  return tmp
}

export function xWeekdaysFrom(days: number, from: Date): Date {
  if (isNaN(from.getTime()))
    throw "Invalid/NaN date passed"

  if (days <= 0)
    return from;

  const nextDay = plusOneDay(from);

  return isWeekday(nextDay)
    ? xWeekdaysFrom(days - 1, nextDay)
    : xWeekdaysFrom(days, nextDay);
}

export function xWeekdaysFromToday(days: number): Date {
  return xWeekdaysFrom(days, today())
}


export function weekdaysBetween(from: Date, to: Date): Date[] {
  return dateRange(from, to).filter(isWeekday)
}

export function dateRange(from: Date, to: Date): Date[] {

  function calc(acc: Date[], from: Date, to: Date) {
    if (from.getTime() >= to.getTime())
      return acc

    return calc(
      [...acc, from],
      plusOneDay(from),
      to)
  }

  return calc([], from, to)
}

export function isWeekday(date: Date): boolean {
  if (isNaN(date.getTime()))
    throw "Invalid/NaN date passed"

  return ![0, 6].includes(date.getDay())
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}
