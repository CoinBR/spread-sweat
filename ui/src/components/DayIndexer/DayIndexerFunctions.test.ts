import { expect, it, describe } from 'vitest'
import { faker } from '@faker-js/faker';


import * as f from './DayIndexerFunctions.js';

describe('indexDates()', () => {


  describe('with no firstDay arg', () => {

    it('return empty array if an empty date array is passed', () => {
      expect(f.indexDates([]))
        .toEqual([]);
    });

    it('correctly indexes 1 date', () => {
      const dates = Array.from({ length: 1 }, faker.date.anytime);
      const expected = [
        { date: dates[0], index: 1 },
      ];
      expect(f.indexDates(dates))
        .toEqual(expected);
    });

    it('correctly 2 dates', () => {
      const dates = Array.from({ length: 2 }, faker.date.anytime);
      const expected = [
        { date: dates[0], index: 1 },
        { date: dates[1], index: 2 }
      ];
      expect(f.indexDates(dates))
        .toEqual(expected);
    });

  })

  describe('with firstDay arg', () => {

    const firstIndex = faker.number.int()

    it('return empty array if an empty date array is passed', () => {
      expect(f.indexDates([], firstIndex))
        .toEqual([]);
    });

    it('correctly indexes 1 date', () => {
      const dates = Array.from({ length: 1 }, faker.date.anytime);
      const expected = [
        { date: dates[0], index: firstIndex },
      ];
      expect(f.indexDates(dates, firstIndex))
        .toEqual(expected);
    });

    it('correctly 2 dates', () => {
      const dates = Array.from({ length: 2 }, faker.date.anytime);
      const expected = [
        { date: dates[0], index: firstIndex + 0 },
        { date: dates[1], index: firstIndex + 1 }
      ];
      expect(f.indexDates(dates, firstIndex))
        .toEqual(expected);
    });
  })

});


describe('xDaysFrom()', () => {

  it.each([
    [-2, "1980-01-01", "1979-12-30"],
    [-2, "2023-02-28", "2023-02-26"],
    [-2, "2702-12-31", "2702-12-29"],

    [-1, "1980-01-01", "1979-12-31"],
    [-1, "2023-02-28", "2023-02-27"],
    [-1, "2702-12-31", "2702-12-30"],

    [0, "1980-01-01", "1980-01-01"],
    [0, "2023-02-28", "2023-02-28"],
    [0, "2702-12-31", "2702-12-31"],

    [1, "1980-01-01", "1980-01-02"],
    [1, "2023-02-28", "2023-03-01"],
    [1, "2702-12-31", "2703-01-01"],

    [2, "1980-01-01", "1980-01-03"],
    [2, "2023-02-28", "2023-03-02"],
    [2, "2702-12-31", "2703-01-02"],


  ])('when receiving %s returns the next day (%s)', (daysQty, timestamp, rawExpected) => {
    const date = f.localDate(timestamp)
    const expected = f.localDate(rawExpected)
    expect(f.xDaysFrom(daysQty, date))
      .toEqual(expected)
  })
})




describe('plusOneDay()', () => {

  it.each([
    ["1980-01-01", "1980-01-02"],
    ["2023-02-28", "2023-03-01"],
    ["2702-12-31", "2703-01-01"],
  ])('when receiving %s returns the next day (%s)', (rawArg, rawExpected) => {
    const arg = f.localDate(rawArg)
    const expected = f.localDate(rawExpected)
    expect(f.plusOneDay(arg))
      .toEqual(expected)
  })
})

describe('xWeekdaysFrom()', () => {

  it.each([
    [0, "2023-01-01", "2023-01-01"],
    [0, "2023-01-02", "2023-01-02"],
    [0, "2023-01-03", "2023-01-03"],
    [0, "2023-01-04", "2023-01-04"],
    [0, "2023-01-05", "2023-01-05"],
    [0, "2023-01-06", "2023-01-06"],
    [0, "2023-01-07", "2023-01-07"],
    // 
    [1, "2023-01-01", "2023-01-02"],
    [2, "2023-01-01", "2023-01-03"],
    [3, "2023-01-01", "2023-01-04"],
    [4, "2023-01-01", "2023-01-05"],
    [5, "2023-01-01", "2023-01-06"],

    [6, "2023-01-01", "2023-01-09"],
    [7, "2023-01-01", "2023-01-10"],
    [8, "2023-01-01", "2023-01-11"],
    [9, "2023-01-01", "2023-01-12"],
    [10, "2023-01-01", "2023-01-13"],

    [11, "2023-01-01", "2023-01-16"],
    [12, "2023-01-01", "2023-01-17"],
    [13, "2023-01-01", "2023-01-18"],
    [14, "2023-01-01", "2023-01-19"],
    [15, "2023-01-01", "2023-01-20"],
    //
    [1, "2034-01-01", "2034-01-02"],
    [2, "2034-01-01", "2034-01-03"],
    [3, "2034-01-01", "2034-01-04"],
    [4, "2034-01-01", "2034-01-05"],
    [5, "2034-01-01", "2034-01-06"],

    [6, "2034-01-01", "2034-01-09"],
    [7, "2034-01-01", "2034-01-10"],
    [8, "2034-01-01", "2034-01-11"],
    [9, "2034-01-01", "2034-01-12"],
    [10, "2034-01-01", "2034-01-13"],

    [11, "2034-01-01", "2034-01-16"],
    [12, "2034-01-01", "2034-01-17"],
    [13, "2034-01-01", "2034-01-18"],
    [14, "2034-01-01", "2034-01-19"],
    [15, "2034-01-01", "2034-01-20"],
  ])('when receiving asked for %i days from %s returns the %s', (days, rawFrom, rawExpected) => {

    // inform time to prevent unintuitive js timezone behavior 
    const from = f.localDate(rawFrom)
    const expected = f.localDate(rawExpected)
    expect(f.xWeekdaysFrom(days, from))
      .toEqual(expected)
  })
})




describe('isWeekday()', () => {

  it("fails when receiving a invalid/NaN Date object", () => {
    const invalidDate = new Date("invalid")
    expect(() => f.isWeekday(invalidDate))
      .toThrow()
  })

  it.each([
    ['2022-12-31', false, 'saturday'],
    ['2023-01-01', false, 'sunday'],
    ['2023-01-02', true, 'monday'],
    ['2023-01-03', true, 'tuesday'],
    ['2023-01-04', true, 'wednesday'],
    ['2023-01-05', true, 'thursday'],
    ['2023-01-06', true, 'friday'],
    ['2023-01-07', false, 'saturday'],
    ['2023-01-08', false, 'sunday'],

    ['2026-02-28', false, 'saturday'],
    ['2026-03-01', false, 'sunday'],
    ['2026-03-02', true, 'monday'],
    ['2026-03-03', true, 'tuesday'],
    ['2026-03-04', true, 'wednesday'],
    ['2026-03-05', true, 'thursday'],
    ['2026-03-06', true, 'friday'],
    ['2026-03-07', false, 'saturday'],
    ['2026-03-08', false, 'sunday'],

    ['2033-10-01', false, 'saturday'],
    ['2033-10-02', false, 'sunday'],
    ['2033-10-03', true, 'monday'],
    ['2033-10-04', true, 'tuesday'],
    ['2033-10-05', true, 'wednesday'],
    ['2033-10-06', true, 'thursday'],
    ['2033-10-07', true, 'friday'],
    ['2033-10-08', false, 'saturday'],
    ['2033-10-09', false, 'sunday'],
  ])('when receiving %s should be %s (%s)', (rawArg, expected, description) => {
    const arg = f.localDate(rawArg)
    expect(f.isWeekday(arg))
      .toBe(expected)
  })

})

describe("weekdaysBetween()", () => {

  it.each([
    ['2023-01-04', '2023-01-03', []],

    ['2022-12-31', '2022-12-31', []],
    ['2022-12-31', '2023-01-01', []],
    ['2022-12-31', '2023-01-02', ['2023-01-02']],
    ['2022-12-31', '2023-01-03', ['2023-01-02', '2023-01-03']],
    ['2022-12-31', '2023-01-04', ['2023-01-02', '2023-01-03', '2023-01-04']],
    ['2022-12-31', '2023-01-05', ['2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05',]],
    ['2022-12-31', '2023-01-06', ['2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06']],
    ['2022-12-31', '2023-01-07', ['2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06']],
    ['2022-12-31', '2023-01-08', ['2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06']],
    ['2022-12-31', '2023-01-09', ['2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06', '2023-01-09']],
  ])("given from %s to %s should return %s", (rawFrom, rawTo, rawExpected) => {
    const from = f.localDate(rawFrom)
    const to = f.localDate(rawTo)
    const expected = rawExpected.map(f.localDate)

    expect(f.weekdaysBetween(from, to))
      .toEqual(expected)
  })
})

describe("dateRange()", () => {

  it.each([
    ['2023-01-04', '2023-01-03', []],

    ['2022-12-31', '2022-12-31', ['2022-12-31']],
    ['2022-12-31', '2023-01-01', ['2022-12-31', '2023-01-01']],
    ['2022-12-31', '2023-01-02', ['2022-12-31', '2023-01-01', '2023-01-02']],
    ['2022-12-31', '2023-01-03', ['2022-12-31', '2023-01-01', '2023-01-02', '2023-01-03']],
    ['2022-12-31', '2023-01-04', ['2022-12-31', '2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04']],
    ['2022-12-31', '2023-01-05', ['2022-12-31', '2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05',]],
    ['2022-12-31', '2023-01-06', ['2022-12-31', '2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06']],
    ['2022-12-31', '2023-01-07', ['2022-12-31', '2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06', '2023-01-07']],
    ['2022-12-31', '2023-01-08', ['2022-12-31', '2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06', '2023-01-07', '2023-01-08']],
    ['2022-12-31', '2023-01-09', ['2022-12-31', '2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06', '2023-01-07', '2023-01-08', '2023-01-09']],
  ])("given from %s to %s should return %s", (rawFrom, rawTo, rawExpected) => {
    const from = f.localDate(rawFrom)
    const to = f.localDate(rawTo)
    const expected = rawExpected.map(f.localDate)

    expect(f.dateRange(from, to))
      .toEqual(expected)
  })

})
