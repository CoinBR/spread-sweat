<template>
  <h1>teste</h1>
  <h1> props - {{ props }} -</h1>
  <h1> indexedDatesToDisplay - {{ indexedDatesToDisplay }} -</h1>
</template>

<script lang="ts">
import { computed, } from 'vue'
import * as f from './DayIndexerFunctions.js';

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
