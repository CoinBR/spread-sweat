import { expect, it, describe, vi } from 'vitest'
import { faker } from '@faker-js/faker';
import { DayCardProps, DayCardCssClass, DayCardCssClassTestCase, IndexedDate } from './types';


import * as f from './DayCard.vue';
import * as DayIndexedFunctions from './DayIndexerFunctions';


vi.mock('./DayIndexedFunctions', () => ({
  ...DayIndexedFunctions,
  today: vi.fn(() => DayIndexedFunctions.localDate('2000-01-15')),
}))


const today = DayIndexedFunctions.today()

const twoDaysAgo = daysFromNow(-2)
const yesterday = daysFromNow(-1)

const tomorrow = daysFromNow(1)
const inTwoDays = daysFromNow(2)


describe('cssClass()', () => {


  const tstCases: DayCardCssClassTestCase[] = [

      // to fix
    // { expected: 'ok', arg: arg(1, twoDaysAgo, 1, twoDaysAgo) },
    // { expected: 'ok', arg: arg(1, yesterday, 1, yesterday) },
    { expected: 'ok', arg: arg(1, twoDaysAgo, 2, yesterday) },
    { expected: 'ok', arg: arg(1, yesterday, 2, today) },

    { expected: 'late', arg: arg(3, yesterday, 1, daysFromNow(-3)) },
    { expected: 'late', arg: arg(2, yesterday, 1, twoDaysAgo) },

    { expected: 'in-advance today', arg: arg(1, today, 2, tomorrow) },
    { expected: 'ok today', arg: arg(2, today, 1, yesterday) },

    { expected: 'in-advance', arg: arg(2, tomorrow, 3, inTwoDays) },
    { expected: 'in-advance', arg: arg(2, tomorrow, 2, tomorrow) },

    { expected: 'ok', arg: arg(2, tomorrow, 1, today) },
    { expected: 'ok', arg: arg(3, inTwoDays, 1, today) },
    { expected: 'ok', arg: arg(3, inTwoDays, 1, tomorrow) },
  ]

  it.each(tstCases)("%s", (tstCase) => {
    expect(f.cssClass(tstCase.arg))
      .toEqual(tstCase.expected)
  })
})


function daysFromNow(n: number): Date {
  return DayIndexedFunctions.xDaysFrom(n, today)
}

function arg(
  currentIndex: number, currentDate: Date,
  lastDoneIndex: number, lastDoneDate: Date): DayCardProps {
  return {
    current: {
      index: currentIndex,
      date: currentDate
    },
    lastDone: {
      index: lastDoneIndex,
      date: lastDoneDate
    },
  }
}