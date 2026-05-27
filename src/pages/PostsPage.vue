<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()

type Post = {
  id: number
  title: string
  content: string
}

const posts = ref<Post[]>([])
const errorMessage = ref('')

const fetchPosts = async () => {
  errorMessage.value = ''
  try {
    const response = await api.get('/posts')
    posts.value = response.data
  } catch (error) {
    errorMessage.value = 'Failed to load posts'
  }
}

const handleEdit = (id: number) => {
  router.push(`/edit-post/${id}`)
}

const deletePost = async (id: number) => {
  errorMessage.value = ''
  const token = localStorage.getItem('token')

  try {
    await api.delete(`/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    posts.value = posts.value.filter((post) => post.id !== id)
  } catch (error) {
    errorMessage.value = 'Failed to delete post'
  }
}

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

onMounted(fetchPosts)
</script>

<template>
  <div class="page-shell">
    <section class="container">
      <div class="hero">
        <div class="hero-copy">
          <p class="eyebrow"></p>
          <h1>Blog Posts</h1>
          <p class="hero-text">
   
          </p>
        </div>

        <div class="hero-actions">
          <button class="button button-primary" @click="router.push('/create-post')">
            Create Post
          </button>
          <button class="button button-secondary" @click="logout">
            Logout
          </button>
        </div>
      </div>

      <p v-if="errorMessage" class="error-msg">
        {{ errorMessage }}
      </p>

      <div v-if="posts.length" class="posts-grid">
        <article
          v-for="post in posts"
          :key="post.id"
          class="card"
        >
          <div class="card-content">
            <h2>{{ post.title }}</h2>
            <p>{{ post.content }}</p>
          </div>

          <div class="card-actions">
            <button class="button button-secondary" @click="handleEdit(post.id)">
              Edit
            </button>
            <button class="button button-danger" @click="deletePost(post.id)">
              Delete
            </button>
          </div>
        </article>
      </div>

      <div v-else class="empty-state">
        <h2>No posts yet</h2>
        <p>Create your first post to start building your blog.</p>
        <button class="button button-primary" @click="router.push('/create-post')">
          Write Your First Post
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
:global(body) {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: #f5f5f5;
}

.page-shell {
  min-height: 100vh;
  padding: 40px 20px;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.hero-copy h1 {
  margin: 0;
  font-size: 42px;
}

.hero-text {
  margin-top: 10px;
  color: #666;
}

.hero-actions {
  display: flex;
  gap: 10px;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #ddd;
}

.card-content h2 {
  margin-top: 0;
}

.card-content p {
  color: #555;
  line-height: 1.6;
}

.card-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.button {
  padding: 10px 16px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
  border-radius: 6px;
}

.button:hover {
  opacity: 0.9;
}

.error-msg {
  margin-bottom: 20px;
  color: red;
}

.empty-state {
  text-align: center;
  margin-top: 60px;
}

@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .hero-actions {
    width: 100%;
  }

  .button {
    width: 100%;
  }
}
</style>
