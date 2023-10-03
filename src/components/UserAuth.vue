<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'

enum AuthMode {
  Login = 'login',
  Register = 'register'
}

const email = ref('')
const password = ref('')
const name = ref('')

const authMode = ref(AuthMode.Login)

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

const login = () => {
  authStore.logIn({ email: email.value, password: password.value })
}

const register = () => {
  authStore.register({ email: email.value, password: password.value, name: name.value })
}

const switchAuthMode = () => {
  if (authMode.value === AuthMode.Login) {
    authMode.value = AuthMode.Register
  } else {
    authMode.value = AuthMode.Login
  }
}

const authModeText = computed(() => {
  if (authMode.value === AuthMode.Login) {
    return 'Login'
  } else {
    return 'Register'
  }
})

const switchAuthModeCaption = computed(() => {
  if (authMode.value === AuthMode.Login) {
    return 'Dont have an account? Register here'
  } else {
    return 'Already have an account? Login here'
  }
})

const authenticate = () => {
  if (authMode.value === AuthMode.Login) {
    login()
  } else register()
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        {{ authModeText }} to our base
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="authenticate" class="space-y-6" method="POST">
        <div v-if="authMode === AuthMode.Register">
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div class="mt-2">
            <input
              id="name"
              name="name"
              type="name"
              v-model="name"
              autocomplete="name"
              required
              class="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              v-model="email"
              autocomplete="email"
              required
              class="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
          </div>
          <div class="mt-2">
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="text-sm mb-2">
            <a
              @click="switchAuthMode"
              class="font-semibold text-indigo-600 cursor-pointer hover:text-indigo-500"
              >{{ switchAuthModeCaption }}</a
            >
          </div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {{ authModeText }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
