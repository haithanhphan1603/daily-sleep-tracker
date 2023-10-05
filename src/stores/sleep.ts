import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export interface SleepData {
  date: string
  sleepTime: string
  wakeTime: string
  sleepDuration: number
}

export const useSleepStore = defineStore('sleep', () => {
  const sleepData = ref<SleepData[]>()
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')
  const databaseURL = `https://daily-sleep-tracker-f2100-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}/sleepData.json?auth=${token}`

  const fetchSleepData = async () => {
    const response = await axios.get(databaseURL)

    if (response.status !== 200) {
      console.error('Failed to fetch existing data:', response.data)
      return
    }
    sleepData.value = response.data
  }

  const addSleepData = async (payload: SleepData) => {
    try {
      // Fetch existing data (if any)
      await fetchSleepData()

      if (sleepData.value) sleepData.value.push(payload)

      // Push new data to the array

      // Update the array back to the database
      const updateResponse = await axios.put(databaseURL, sleepData.value)

      if (updateResponse.status !== 200) {
        console.error('Failed to update data:', updateResponse.data)
      } else {
        console.log('Data updated successfully.')
      }
    } catch (error) {
      console.error('An error occurred:', error.message)
    }
  }
  return {
    sleepData,
    fetchSleepData,
    addSleepData
  }
})
