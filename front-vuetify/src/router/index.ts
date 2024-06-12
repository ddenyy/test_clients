/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import HelloWorld from '@/components/HelloWorld.vue'
import User from '@/components/User.vue'
import UserList from '@/components/UserList.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "/",
    name: "helloworld",
    component: HelloWorld
  },
  {
    path: "/userlist",
    name: "listusers",
    component: UserList
  },
  {
    path: "/user/:_id",
    name: "User",
    component: User,
    props: true
  }
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
