<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../services/api'

const route = useRoute()
const router = useRouter()

const title = ref('')
const content = ref('')
const errorMessage = ref('')

const postId = route.params.id

const fetchPost = async () => {
  try {
    const response = await api.get(`/posts/${postId}`)

    title.value = response.data.title
    content.value = response.data.content
  } catch (error) {
    errorMessage.value = 'Post not found'
  }
}

const updatePost = async () => {
  const token = localStorage.getItem('token')

  try {
    await api.patch(
      `/posts/${postId}`,
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
    errorMessage.value = 'Failed to update post'
  }
}

const goBack = () => {
  router.push('/posts')
}

onMounted(fetchPost)
</script>

<template>
  <div class="container">
    <h1>Edit Post</h1>

    <p v-if="errorMessage" class="error">
      {{ errorMessage }}
    </p>

    <input
      v-model="title"
      type="text"
      placeholder="Post title"
    />

    <textarea
      v-model="content"
      placeholder="Post content"
    />

    <div class="actions">
      <button type="button" @click="updatePost">
        Update
      </button>

      <button type="button" @click="goBack">
        Back
      </button>
    </div>
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

.actions {
  display: flex;
  gap: 10px;
}

.error {
  color: red;
}
</style>