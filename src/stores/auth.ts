import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  updateProfile
} from 'firebase/auth'

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface AuthPayload {
  email: string
  password: string
  name?: string
}

export const useAuthStore = defineStore('auth', () => {
  const userId = ref<string>('')
  const token = ref<string>(localStorage.getItem('token') || '')
  const isAuthenticated = computed(() => !!token.value)

  const setUser = (id: string) => {
    userId.value = id
  }

  const setToken = (tokenString: string) => {
    token.value = tokenString
  }

  const register = async (payload: AuthPayload) => {
    const response = await createUserWithEmailAndPassword(
      getAuth(),
      payload.email,
      payload.password
    )

    await updateProfile(getAuth().currentUser, { displayName: payload.name })

    if (response) {
      const uid = await response.user.uid
      const tokenString = await response.user.getIdToken()
      setUser(uid)
      setToken(tokenString)
      localStorage.setItem('token', tokenString)
      localStorage.setItem('userId', uid)
    }
  }
  const logIn = async (payload: AuthPayload) => {
    const response = await signInWithEmailAndPassword(getAuth(), payload.email, payload.password)
    if (response) {
      const tokenString = await response.user.getIdToken()
      const uid = await response.user.uid
      setUser(tokenString)
      setToken(uid)
      localStorage.setItem('token', tokenString)
      localStorage.setItem('userId', uid)
    }
  }

  const tryLogIn = () => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    if (token && userId) {
      setToken(token)
      setUser(userId)
    }
  }

  const logOut = () => {
    token.value = ''
    userId.value = ''
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
  }

  return { register, userId, logIn, isAuthenticated, logOut, tryLogIn }
})
