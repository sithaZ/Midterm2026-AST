import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import PostsPage from '../pages/PostsPage.vue'
import CreatePostPage from '../pages/CreatePostPage.vue'
import EditPostPage from '../pages/EditPostPage.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/register',
    component: RegisterPage,
  },
  {
    path: '/posts',
    component: PostsPage,
  },
  {
    path: '/create-post',
    component: CreatePostPage,
  },
  {
    path: '/edit-post/:id',
    component: EditPostPage,
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router