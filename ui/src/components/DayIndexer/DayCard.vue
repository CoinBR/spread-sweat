<template>
  <div :class="['rectangle', cssClass]">
    {{ text }}
  </div>
</template>

<script lang="ts">
import { computed, } from 'vue'
import { formatIndexedDate as formattedIndexDate, xWeekdaysFromToday, weekdaysBetween, indexDates, today, localDate } from './DayIndexerFunctions.js'
import { IndexedDateProp, DayCardProps, DayCardCssClass, DayCardCssClassTestCase, IndexedDate } from './types.js';

export function cssClass(props: DayCardProps): DayCardCssClass {
  if (props.current.date.getTime() === today().getTime())
    return "today"

  const isPastDate = props.current.date.getTime() < today().getTime()

  if (isPastDate)
    return props.current.index <= props.lastDone.index
      ? "ok"
      : "late"


  return props.current.index <= props.lastDone.index
    ? "in-advance"
    : "ok"
}

export default {

  props: {
    current: IndexedDateProp(),
    lastDone: IndexedDateProp(),
  },


  setup(props) {
    return {
      text: computed(() => formattedIndexDate(props.current)),
      cssClass: computed(props => cssClass(props))
    }
  }

}
</script>

<style scoped>
.rectangle {
  border: 1px solid #000;
  padding: 10px;
  text-align: center;
  margin: 5px;
}

.ok {
  background-color: grey;
}

.today {
  background-color: yellow;
}

.in-advance {
  background-color: green;
}

.late {
  background-color: red;
}
</style>