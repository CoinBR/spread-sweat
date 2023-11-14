import { IndexedDate } from "./DayIndexer";

export function today() {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate()); // local tz
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
    if (from.getTime() > to.getTime())
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

export function localDate(yyyyMMdd: string) {
  // When the time zone offset is absent, date-only forms are interpreted as a UTC time and date-time forms are interpreted as local time. This is due to a historical spec error that was not consistent with ISO 8601 but could not be changed due to web compatibility.
  // The getDay() method of Date instances returns the day of the week for this date according to local time
  // inform time to prevent unintuitive js timezone behavior 
  return new Date(`${yyyyMMdd}T00:00:00`)
}

