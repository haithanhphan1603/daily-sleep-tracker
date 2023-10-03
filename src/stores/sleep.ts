import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'
import axios from 'axios'

interface SleepData {
  date: string
  sleepTime: string
  wakeTime: string
  sleepDuration: number
}

export const useSleepStore = defineStore('sleep', () => {
  const sleepData = ref<SleepData>()
  const authStore = useAuthStore()

  const fetchSleepData = async () => {
    const response = await fetch(
      `https://daily-sleep-tracker-f2100-default-rtdb.asia-southeast1.firebasedatabase.app/sleepData/${userId.value}.json`
    )
    const data = await response.json()
    sleepData.value = data
  }

  const addSleepData = async (payload: SleepData) => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const databaseURL = `https://daily-sleep-tracker-f2100-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}/sleepData.json?auth=${token}`
    try {
      // Fetch existing data (if any)
      const response = await axios.get(databaseURL)

      if (response.status !== 200) {
        console.error('Failed to fetch existing data:', response.data)
        return
      }

      const existingData = response.data || [] // Initialize as an empty array if no data exists

      // Push new data to the array
      existingData.push(payload)

      // Update the array back to the database
      const updateResponse = await axios.put(databaseURL, existingData)

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
