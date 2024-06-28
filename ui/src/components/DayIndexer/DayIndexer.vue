<template>
  <ul>
    <li v-for="day in indexedDatesToDisplay" :key="day.index">
      <DayCard :current=day :last-done="indexedLastDone"></DayCard>
    </li>

  </ul>
</template>

<script lang="ts">
import {computed, ComputedRef} from 'vue'
import DayCard from './DayCard.vue'
import {
  formatIndexedDate,
  xWeekdaysFromToday,
  weekdaysBetween,
  indexDates,
  today,
  localDate, xWeekdaysFrom, minDate, maxDate
} from './DayIndexerFunctions'
import {IndexedDate} from './types'
import {da} from "@faker-js/faker";

export default {
  components: {DayCard},

  props: {
    startDate: {
      type: String,
      required: true
    },

    inProgressDay: {
      type: Number,
      required: true
    }
  },

  setup(props) {
    const day1 = computed(() => localDate(props.startDate))

    const inProgressDay = computed(() => xWeekdaysFrom(props.inProgressDay - 1, day1.value))
    const lastDone = computed(() => xWeekdaysFrom(-1, inProgressDay.value))

    const from = computed(() => minDate([today(), inProgressDay.value]))

    const to = computed(() => xWeekdaysFrom(1,
        maxDate([today(), lastDone.value])))

    const allDates = computed(() => weekdaysBetween(minDate([day1.value, lastDone.value]), to.value))
    const allIndexedDates = computed(() => indexDates(allDates.value))

    const indexedDatesToDisplay = computed(() => allIndexedDates.value
        .filter(indexedDate =>
            from.value <= indexedDate.date  && indexedDate.date <= to.value)
        )

    const maybeIndexedLastDone = computed(() => allIndexedDates.value
        .find(idxDate => idxDate.date.getTime() == lastDone.value.getTime()))
    if (!maybeIndexedLastDone.value)
      throw new Error("Last done date not found in indexed dates.")
    const indexedLastDone = maybeIndexedLastDone as ComputedRef<IndexedDate>

    return {indexedDatesToDisplay, indexedLastDone, DayCard}
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
}

li {
  list-style-type: none;
}
</style>
