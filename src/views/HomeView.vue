<script setup lang="ts">
import UserAuth from '@/components/UserAuth.vue'
import SleepForm from '@/components/SleepForm.vue'
import SleepTable from '@/components/SleepTable.vue'

import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { useSleepStore } from '@/stores/sleep'

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

const sleepStore = useSleepStore()
const { sleepData } = storeToRefs(sleepStore)
onMounted(() => {
  sleepStore.fetchSleepData()
})
</script>

<template>
  <main>
    <UserAuth v-if="!isAuthenticated"></UserAuth>
    <div v-else>
      <button
        type="button"
        class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      >
        Add Sleep Data Entries
      </button>
      <SleepForm></SleepForm>
      <div class="flex items-center justify-center">
        <SleepTable class="w-1/2" :sleep-datas="sleepData"></SleepTable>
      </div>
    </div>
  </main>
</template>
