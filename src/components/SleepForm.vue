<template>
  <form class="w-1/3 mx-auto pt-24">
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
  </form>
</template>

<script lang="ts" setup>
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment'
import { ref, computed } from 'vue'

const date = ref('')
const sleepHour = ref('')
const wakeHour = ref('')

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
</script>

<style lang="scss" scoped></style>
