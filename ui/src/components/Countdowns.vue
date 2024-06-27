<script lang="ts">
import {ref, computed, watch, onMounted, Ref} from 'vue';


interface Exercise {
  initial: number;
  tag: string;
}

interface Countdown extends Exercise {
  value: number;
}


export default {

  props: {
    apiStateEndpoint: {
      type: String,
      required: true
    },
    onUpdateDay: {
      type: Function,
      required: true
    }
  },

  setup(props) {
    const day = ref<number>(1);

    const loading = ref<boolean>(true);

    function circularIndex(arrFun: () => Exercise[], indexFun: () => number): Exercise {
      const arr = arrFun();
      const index = indexFun();

      if (arr.length === 0)
        throw new Error("empty array");

      let circularIndex = (index - 1) % arr.length;

      if (circularIndex < 0)
        circularIndex += arr.length;

      return arr[circularIndex];
    }

    const extraExerciseForDay = circularIndex;

    const a = (): Exercise[] => [
      { initial: 10, tag: 'Supino Reto' },
      { initial: 20, tag: 'Supino Inclinado' },
      { initial: 10, tag: 'Crucifixo Inclinado' },

      { initial: 20, tag: 'Desenvolvimento' },
      { initial: 10, tag: 'Elevação Frontal' },
      { initial: 10, tag: 'Elevação Lateral' },

      { initial: 20, tag: 'Testa' },
      { initial: 20, tag: 'Paralelas' },
    ];

    const b = (): Exercise[] => [
      { initial: 10, tag: 'Levantamento Terra' },

      { initial: 10, tag: 'Remada Curvada Cima' },
      { initial: 10, tag: 'Remada Curvada Meio' },
      { initial: 10, tag: 'Remada Curvada Baixo' },

      { initial: 10, tag: 'Remada Alta' },
      { initial: 20, tag: 'Encolhimento Ombros' },

      { initial: 20, tag: 'Rosca Direta' },
      { initial: 20, tag: 'Rosca Martelo' },

      { initial: 10, tag: 'Manguito' },
    ];

    const leg = (): Exercise[] => [
      { initial: 15, tag: 'Sumô' },
      { initial: 15, tag: 'Afundo' },
      { initial: 15, tag: 'Elevacao Pelvica' },
      { initial: 15, tag: 'Agachamento' },
      { initial: 15, tag: 'Stiff' },
    ]

    const calf = (): Exercise[] => [
      { initial: 15, tag: 'Panturrilha Sentado' },
      { initial: 15, tag: 'Panturrilha em Pé' },
    ]

    // todo panturrilha

    const abs = (): Exercise[] => [
      { initial: 15, tag: 'Abs Obliquos' },
      { initial: 15, tag: 'Abs Supra' },
      { initial: 15, tag: 'Abs Infra' },
    ]

    const pulso = (): Exercise[] => [
      { initial: 10, tag: 'Pulso Cima' },
      { initial: 10, tag: 'Pulso Baixo' },
    ]


    const baseForDay = (): Exercise[] => day.value % 2 == 0 ? b() : a();

    const extraForDay = (): Exercise[] =>
      [leg, calf, abs, pulso]
        .map(group => extraExerciseForDay(group, () => day.value))
        .flat();

    const selected = (): Exercise[] => [
      ...baseForDay(),
      ...extraForDay()
    ];

    const countdowns = ref<Countdown[]>(
      selected().map(countdown => ({ ...countdown, value: countdown.initial }))
    );

    const subtract = (countdown: Countdown, amount: number): void => {
      countdown.value -= amount;
    };

    const add = (countdown: Countdown): void => {
      if (countdown.value < countdown.initial) {
        countdown.value++;
      }
    };

    const reset = (countdown: Countdown): void => {
      countdown.value = countdown.value === 0 ? countdown.initial : 0;
    };

    const totalValue = computed((): number => {
      return countdowns.value.reduce((sum, countdown) => sum + countdown.value, 0);
    });

    watch(day, async () => {
      if (day.value !== null)
        return

      day.value = 0
      changeDay(1) // setup the first state.json on the api
    });

    watch(countdowns, () => {
      if (!loading.value)
        saveState();
    }, { deep: true });

    const loadState = async (): Promise<void> => {
      const response = await fetch(props.apiStateEndpoint);
      const data = await response.json();

      countdowns.value = data.countdowns;
      day.value = data.day;

      props.onUpdateDay(day.value)
      loading.value = false;
    };

    const saveState = async (): Promise<void> => {
      if (day.value === null)
        return;

      await fetch(props.apiStateEndpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          day: day.value,
          countdowns: countdowns.value
        })
      });
    };

    const changeDay = async (delta: number): Promise<void> => {
      if (loading.value)
        return;

      loading.value = true;

      day.value += delta;
      reinitializeCountdowns();
      await saveState();
      props.onUpdateDay(day.value)

      loading.value = false;
    };

    const reinitializeCountdowns = (): void => {
      countdowns.value = selected().map(countdown => ({ ...countdown, value: countdown.initial }));
    };

    onMounted(loadState);

    return { day, countdowns, subtract, add, reset, totalValue, changeDay };
  },
};
</script>

<template>
  <!-- Day -->
  <div>
    <button @click="changeDay(-1)">-</button>
    <span>Day: {{ day }}</span>
    <button @click="changeDay(1)">+</button>
  </div>

  <!-- Countdown -->
  <div v-for="(countdown, index) in countdowns" :key="index" class="countdown-container">
    <template v-for="num in 10">
      <button @click="subtract(countdown, 11 - num)">{{ '-' + (11 - num) }}</button>
    </template>
    <input v-model.number="countdown.value" :class="{ 'faded-value': countdown.value <= 0 }">
    <button @click="add(countdown)">+1</button>
    <span class="countdown-tag" @click="reset(countdown)">{{ countdown.tag }}</span>
  </div>


  <!-- Countdown -->
  <div class="countdown-container total-row">
    <span class="countdown-value">{{ totalValue }}</span>
    <span class="countdown-tag">Total</span>
  </div>
</template>

<style>
.countdown-container {
  display: flex;
  align-items: center;
  border: 1px solid #555;
  padding: 10px;
  margin: 10px 0;
  background-color: #444;
  justify-content: flex-end;
}

.countdown-tag {
  cursor: pointer;
  margin-left: 10px;
  width: 20rem;
}

.countdown-value {
  margin: 0 20px;
  font-size: 1.5em;
}

.total-row {
  background-color: #666;
  font-weight: bold;
}

input {
  background-color: #555;
  color: #f5f5f5;
  border: none;
  font-size: 1.5em;
  text-align: center;
  width: 3em;
}

input:focus {
  outline: none;
}

button {
  margin: 3px;
  background-color: #555;
  color: #f5f5f5;
  border: 1px solid #666;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #666;
}

button:active {
  background-color: #777;
}

.faded-value {
  color: #666;
}

#app {
  max-width: 53rem;
}
</style>