<template>
  <div :class="['rectangle', cssClass]">
    {{ text }}
  </div>
</template>

<script lang="ts">
import {computed,} from 'vue'
import {
  formatIndexedDate as formattedIndexDate,
  xWeekdaysFromToday,
  weekdaysBetween,
  indexDates,
  today,
  localDate,
  isFuture, isPast, isToday
} from './DayIndexerFunctions.js'
import {IndexedDateProp, DayCardProps, DayCardCssClass, DayCardCssClassTestCase, IndexedDate} from './types.js';

export function cssClass(props: DayCardProps): DayCardCssClass {
  const cardDate = props.current.date
  const lastDone = props.lastDone.date

  let statusCss;
  if (isPast(cardDate))
    statusCss = cardDate < lastDone
        ? "ok"
        : "late"
  else
    statusCss = cardDate <= lastDone
        ? "in-advance"
        : "ok"

  const todayCss = isToday(cardDate) ? " today" : ""
  return (statusCss + todayCss) as DayCardCssClass;
}


export default {

  props: {
    current: IndexedDateProp(),
    lastDone: IndexedDateProp(),
  },


  setup(props) {
    return {
      text: computed(() => formattedIndexDate(props.current)),
      cssClass: computed(() => cssClass(props))
    }
  }

}
</script>

<style scoped>
.rectangle {
  border-radius: 0.3rem;
  padding: 0.625rem;
  margin: 0.51rem;
  text-align: center;
}

.ok {
  background-color: grey;
}

.today {
  border: 0.1rem solid yellow;

}

.in-advance {
  background-color: green;
}

.late {
  background-color: red;
}
</style>