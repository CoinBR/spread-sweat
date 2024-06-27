import { IndexedDate as indexedDate } from "./types";

export function today() {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate()); // local tz
}

export function isToday(date: Date): boolean{
  return today().getTime() === date.getTime()
}

export function isPast(date: Date): boolean{
  return date.getTime() < today().getTime()
}

export function isFuture(date: Date): boolean{
  return today().getTime() < date.getTime()
}


export function indexDates(dates: Date[], firstIndex: number = 1): indexedDate[] {
  return dates.map((date, i) => ({ date, index: i + firstIndex }))
}

export function xDaysFrom(numberOfDays: number, date: Date): Date {
  validateDate(date)

  const newDate = new Date(date)
  newDate.setDate(date.getDate() + numberOfDays)
  return newDate
}


export function plusOneDay(date: Date): Date {
  return xDaysFrom(1, date)
}

export function lessOneDay(date: Date): Date {
  return xDaysFrom(-1, date)
}

export function xWeekdaysFrom(days: number, from: Date): Date {
  validateDate(from)

  if (days === 0)
    return from;

  const nextDate = days < 0
    ? lessOneDay(from)
    : plusOneDay(from);

  const incrementForNextDay = days < 0
    ? 1
    : -1;

  return isWeekday(nextDate)
    ? xWeekdaysFrom(days + incrementForNextDay, nextDate)
    : xWeekdaysFrom(days, nextDate);
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
  validateDate(date)
  return ![0, 6].includes(date.getDay())
}

export function formatIndexedDate(IndexedDate: indexedDate): string {
  const date = IndexedDate.date

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // months are 0-indexed
  const day = date.getDate().toString().padStart(2, '0');

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weekday = weekdays[date.getDay()];

  return `${IndexedDate.index} - ${weekday} ${day}/${month}/${year}`;
}


export function maxDate(dates: Date[]): Date {
  if (dates.length === 0) {
    throw new Error("List of dates must not be empty");
  }

  dates.forEach(validateDate)

  return new Date(
      Math.max(...dates.map(date => date.getTime())));
}

export function minDate(dates: Date[]): Date {
  if (dates.length === 0) {
    throw new Error("List of dates must not be empty");
  }

  dates.forEach(validateDate)

  return new Date(
      Math.min(...dates.map(date => date.getTime())));
}



export function validateDate(date: Date) {
  if (!isValidDate(date))
    throw "Invalid/NaN date passed"
}

export function isValidDate(date: Date) {
  return !!date
    && date instanceof Date
    && !(isNaN(date.getTime()))
}

export function localDate(yyyyMMdd: string) {
  // When the time zone offset is absent, date-only forms are interpreted as a UTC time and date-time forms are interpreted as local time. This is due to a historical spec error that was not consistent with ISO 8601 but could not be changed due to web compatibility.
  // The getDay() method of Date instances returns the day of the week for this date according to local time
  // inform time to prevent unintuitive js timezone behavior 
  return new Date(`${yyyyMMdd}T00:00:00`)
}

