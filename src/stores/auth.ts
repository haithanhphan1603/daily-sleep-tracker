import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  id: number
  name: string
  token: string
}

interface AuthPayload {
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  const setUser = (newUser: User) => {
    user.value = newUser
  }

  const register = async (payload: AuthPayload) => {
    const response = await createUserWithEmailAndPassword(
      getAuth(),
      payload.email,
      payload.password
    )
    if (response) {
      setUser({id: response.user.uid, response.user.email})
    }
  }

  return { register, setUser }
})
