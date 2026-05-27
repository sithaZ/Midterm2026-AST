<template>
  <div class="container">
    <h1>404</h1>

    <p>Page Not Found</p>

    <button @click="$router.push('/posts')">
      Go Back
    </button>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

button {
  padding: 12px 20px;
}
</style>