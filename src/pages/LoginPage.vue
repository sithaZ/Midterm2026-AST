<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const login = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = 'All fields are required'
    return
  }

  try {
    const response = await api.post('/auth/login', {
      email: email.value,
      password: password.value,
    })

    localStorage.setItem(
      'token',
      response.data.access_token,
    )

    router.push('/posts')
  } catch (error) {
    errorMessage.value = 'Invalid email or password'
  }
}
</script>

<template>
  <div class="container">
    <h1>Login</h1>

    <input
      v-model="email"
      type="email"
      placeholder="Email"
    />

    <input
      v-model="password"
      type="password"
      placeholder="Password"
    />

    <button @click="login">
      Login
    </button>

    <p v-if="errorMessage" class="error">
      {{ errorMessage }}
    </p>
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

.error {
  color: red;
}
</style>