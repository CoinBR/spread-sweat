<template>
                                  <ul>
                                    <li v-for="day in indexedDatesToDisplay" :key="day.index">
                                      <DayCard :current=day, :last-done=""  > </DayCard>
                                    </li>

                                  </ul>
</template>

<script lang="ts">
import { computed, } from 'vue'
import { formatIndexedDate, xWeekdaysFromToday, weekdaysBetween, indexDates, today, localDate } from './DayIndexerFunctions'

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
    lastDoneDate: {
      type: String,
      required: true
    }
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


    return { indexedDatesToDisplay, formatIndexedDate }
  }
}
</script>

<style scoped></style>
