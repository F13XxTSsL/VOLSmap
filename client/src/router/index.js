import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/partners',
    name: 'partners',
    component: () => import(/* webpackChunkName: "about" */ '../views/Partners.vue')
  },
  {
    path: '/contracts',
    name: 'contracts',
    component: () => import(/* webpackChunkName: "about" */ '../views/Contracts.vue')
  },
  {
    path: '/objects',
    name: 'objects',
    component: () => import(/* webpackChunkName: "about" */ '../views/Objects.vue')
  },
  {
    path: '/line_objects',
    name: 'line_objects',
    component: () => import(/* webpackChunkName: "about" */ '../views/LineObjects.vue')
  },
  {
    path: '/profiles',
    name: 'profiles',
    component: () => import(/* webpackChunkName: "about" */ '../views/Profiles.vue')
  },
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '*',
    name: 'NotFoundComponent',
    component: () => import(/* webpackChunkName: "about" */ '../views/NotFoundComponent.vue')
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
