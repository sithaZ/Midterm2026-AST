<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()

const title = ref('')
const content = ref('')
const errorMessage = ref('')

const createPost = async () => {
  const token = localStorage.getItem('token')

  try {
    await api.post(
      '/posts',
      {
        title: title.value,
        content: content.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    router.push('/posts')
  } catch (error) {
    errorMessage.value = 'Failed to create post'
  }
}
</script>

<template>
  <div class="container">
    <h1>Create Post</h1>

    <input
      v-model="title"
      type="text"
      placeholder="Post title"
    />

    <textarea
      v-model="content"
      placeholder="Post content"
    />

    <button @click="createPost">
      Create
    </button>

    <p v-if="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped>
.container {
  max-width: 700px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

input,
textarea,
button {
  padding: 12px;
}

textarea {
  min-height: 200px;
}
</style>