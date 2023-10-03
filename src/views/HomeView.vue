<script setup lang="ts">
import UserAuth from '@/components/UserAuth.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)
</script>

<template>
  <main>
    <UserAuth v-if="!isAuthenticated"></UserAuth>
  </main>
</template>
