import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=> import('./pages/Home.vue'),
  },
  {
    path: '/in',
    name: 'Auth',
    component: ()=> import('./pages/user/Auth.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: ()=> import('./pages/user/Signup.vue'),
  },
  {
    path: '/resetpasswordrequest',
    name: 'ResetPasswordRequest',
    component: ()=> import('./pages/user/ResetPasswordRequest.vue'),
  },
  {
    path: '/resetpassword',
    name: 'ResetPassword',
    component: ()=> import('./pages/user/ResetPassword.vue'),
  },
  {
    path: '/mysettings',
    name: 'MySettings',
    component: ()=> import('./pages/user/UserSettings.vue'),
  },


]
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})
export default router
