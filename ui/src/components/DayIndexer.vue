<template>
  <h1>teste</h1>
  <h1> props - {{ props }} -</h1>
  <h1> indexedDatesToDisplay - {{ indexedDatesToDisplay }} -</h1>
</template>

<script lang="ts">
import { callWithAsyncErrorHandling, computed, defineProps, withDefaults } from 'vue'

type IndexedDate = { date: Date, index: number }

const today = () => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

function indexDates(dates: Date[], firstIndex: number = 1): IndexedDate[] {
  return dates.map((date, i) => ({ date, index: i + firstIndex }))
}

function plusOneDay(date: Date): Date {
  const tmp = new Date()
  date.setDate(date.getDate() + 1)
  return tmp
}

function xWeekdaysFrom(days: number, from: Date): Date {
  if (days === 0)
    return from


  return isWeekday(from)
    ? xWeekdaysFrom(days - 1, plusOneDay(from))
    : xWeekdaysFrom(days, plusOneDay(from))
}

function xWeekdaysFromToday(days: number): Date {
  return xWeekdaysFrom(days, today())
}


function weekdaysBetween(from: Date, to: Date): Date[] {
  return dateRange(from, to).filter(isWeekday)
}

function dateRange(from: Date, to: Date): Date[] {

  function calc(acc: Date[], from: Date, to: Date) {
    if (from > to)
      return acc

    return calc(
      [...acc, from],
      plusOneDay(from),
      to)
  }

  return calc([], from, to)
}

function isWeekday(date: Date): boolean {
  return date.getDay() !== 0 && date.getDay() !== 6
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

export default {

  props: {
    startDate: {
      type: String,
      required: true
    },
    pastDaysToDisplay: {
      type: Number,
      required: true
    },
    futureDaysToDisplay: {
      type: Number,
      required: true
    },

  },

  setup(props) {
    const day1 = computed(() => new Date(props.startDate))
    const lastDay = computed(() => xWeekdaysFromToday(props.futureDaysToDisplay))

    const allDates = computed(() => weekdaysBetween(day1.value, lastDay.value))
    console.log({ allDates: allDates.value })
    const allIndexedDates = computed(() => indexDates(allDates.value))

    const todayIndex = allIndexedDates.value
      .find(indexedDate => indexedDate.date === today())!
      .index

    const indexedDatesToDisplay = computed(() => allIndexedDates.value
      .filter(indexedDate =>
        todayIndex - props.pastDaysToDisplay <= indexedDate.index
        && indexedDate.index <= todayIndex + props.futureDaysToDisplay
      )
    )


    return { indexedDatesToDisplay, formatDate, props }
  }
}
</script>

<style scoped></style>
