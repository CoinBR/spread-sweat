<template>
  <h1>teste</h1>
  <h1> props - {{ props }} -</h1>
  <h1> indexedDatesToDisplay - {{ indexedDatesToDisplay }} -</h1>
</template>

<script lang="ts">
import { computed, } from 'vue'
import { xWeekdaysFromToday, weekdaysBetween, indexDates, today, localDate } from './DayIndexerFunctions'

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
    const day1 = computed(() => localDate(props.startDate))
    const lastDay = computed(() => xWeekdaysFromToday(props.futureDaysToDisplay))

    const allDates = computed(() => weekdaysBetween(day1.value, lastDay.value))
    const allIndexedDates = computed(() => indexDates(allDates.value))

    const todayIndex = computed(() => allIndexedDates.value
      .find(indexedDate => indexedDate.date.getTime() === today().getTime())!
      .index
    )

    const indexedDatesToDisplay = computed(() => allIndexedDates.value
      .filter(indexedDate =>
        todayIndex.value - props.pastDaysToDisplay <= indexedDate.index
        && indexedDate.index <= todayIndex.value + props.futureDaysToDisplay
      )
    )


    return { indexedDatesToDisplay, props }
  }
}
</script>

<style scoped></style>
