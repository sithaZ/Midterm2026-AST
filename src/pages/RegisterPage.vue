<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const register = async () => {
  try {
    await api.post('/auth/register', {
      email: email.value,
      password: password.value,
    })

    successMessage.value = 'Register successful. Please login.'
    errorMessage.value = ''

    setTimeout(() => {
      router.push('/login')
    }, 1000)
  } catch (error) {
    errorMessage.value = 'Register failed. Email may already exist.'
    successMessage.value = ''
  }
}
</script>

<template>
  <div class="container">
    <h1>Register</h1>

    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />

    <button @click="register">Register</button>

    <p v-if="successMessage">{{ successMessage }}</p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.container {
  max-width: 400px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input,
button {
  padding: 12px;
}
</style>