import { PropOptions } from 'vue';
import { isValidDate } from "./DayIndexerFunctions"


export type IndexedDate = {
  date: Date,
  index: number
}

export function IndexedDateProp(): PropOptions {
  const validator = (obj: IndexedDate) => {
    return {
      obj: obj !== null && obj !== undefined && typeof obj === 'object'
        && typeof obj.index === 'number' && !isNaN(obj.index)
        && isValidDate(obj.date)
    }
  }

  return {
    type: Object,
    required: true,
    validator
  }
}

export type DayCardProps = {
  lastDone: IndexedDate,
  current: IndexedDate
}

export type DayCardCssClass = "late" | "in-advance" | "ok" | "late today" | "in-advance today" | "ok today"


export type DayCardCssClassTestCase = {
  arg: DayCardProps,
  expected: DayCardCssClass
}