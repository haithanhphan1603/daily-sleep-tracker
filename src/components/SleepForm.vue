<template>
  <form @submit.prevent="submitForm" class="w-1/3 mx-auto mt-24 px-6 py-10 rounded bg-slate-100">
    <div class="text-center text-xl">Sleep tracker form</div>
    <div class="py-4">
      <label class="block text-sm font-medium leading-6 text-gray-900" for="date">Date</label>
      <Datepicker id="date" v-model="date" :enable-time-picker="false"></Datepicker>
    </div>
    <div class="py-4">
      <label class="block text-sm font-medium leading-6 text-gray-900" for="sleepHour"
        >Sleep at</label
      >
      <VueDatePicker id="sleepHour" v-model="sleepHour" time-picker></VueDatePicker>
    </div>
    <div class="py-4">
      <label class="block text-sm font-medium leading-6 text-gray-900" for="wakeHour"
        >Wake up at</label
      >
      <VueDatePicker id="wakeHour" v-model="wakeHour" time-picker></VueDatePicker>
    </div>
    <p class="font-semibold text-indigo-600 hover:text-indigo-500">
      {{ sleepText }}
    </p>
    <button
      type="submit"
      class="flex w-full mt-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Submit
    </button>
  </form>
</template>

<script lang="ts" setup>
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment'
import { ref, computed } from 'vue'
import { useSleepStore } from '../stores/sleep'

const date = ref('')
const sleepHour = ref('')
const wakeHour = ref('')

const sleepStore = useSleepStore()

const totalSleepHours = computed(() => {
  const sleepMoment = moment(sleepHour.value)
  const wakeMoment = moment(wakeHour.value)
  const duration = moment.duration(wakeMoment.diff(sleepMoment))
  return duration.hours()
})

const sleepText = computed(() => {
  const dateOfMonth = moment(date.value).format('MMMM Do YYYY')
  if (!isNaN(totalSleepHours.value)) {
    return `On ${dateOfMonth}, you have slept for ${totalSleepHours.value} hours`
  }
  return ''
})

const submitForm = () => {
  sleepStore.addSleepData({
    date: date.value,
    sleepTime: sleepHour.value,
    wakeTime: wakeHour.value,
    sleepDuration: totalSleepHours.value
  })
}
</script>

<style lang="scss" scoped></style>
