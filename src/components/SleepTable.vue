<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full text-left text-sm font-light">
            <thead class="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" class="px-6 py-4">Date</th>
                <th scope="col" class="px-6 py-4">Time of sleep</th>
                <th scope="col" class="px-6 py-4">Wake up time</th>
                <th scope="col" class="px-6 py-4">Sleep duration</th>
              </tr>
            </thead>
            <tbody v-for="sleepData in sleepDatas" :key="sleepData.date">
              <tr
                class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
              >
                <td class="whitespace-nowrap px-6 py-4 font-medium">
                  {{ moment(sleepData.date).format('YYYY-MM-DD') }}
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                  {{ moment(sleepData.sleepTime).format('HH:mm') }}
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                  {{ moment(sleepData.wakeTime).format('HH:mm') }}
                </td>
                <td class="whitespace-nowrap px-6 py-4">{{ sleepData.sleepDuration }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment'
import { type SleepData } from 'src/stores/sleep'
interface Props {
  sleepDatas: SleepData[]
}

defineProps<Props>()
</script>

<style scoped></style>
