import { PropType } from 'vue';
import { isValidDate } from "./DayIndexerFunctions"


export type IndexedDate = {
  date: Date,
  index: number
}

export function IndexedDateProp(): {type: PropType<IndexedDate>, required: true, validator: (obj: IndexedDate) => boolean} {
  const validator = (obj: IndexedDate): boolean => {
    return obj !== null && obj !== undefined && typeof obj === 'object'
        && typeof obj.index === 'number' && !isNaN(obj.index)
        && isValidDate(obj.date);
  }

  return {
    type: Object as PropType<IndexedDate>,
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