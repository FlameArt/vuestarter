import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
const routes = [

  {
    path: '/',
    name: 'Home',
    component: () => import('./pages/Home.vue'),

    children: [

      // админка
      {
        path: '/admin/',
        name: 'Admin',
        component: () => import('@/pages/admin/Admin.vue'),
        beforeEnter: (to: any, from: any, next: any) => {
          next();
        },
        children: [
          {
            path: '/admin/users',
            name: 'AdminUsers',
            component: () => import('@/pages/admin/AdminUsers.vue'),
          },
          {
            path: '/admin/subscriptions',
            name: 'AdminSubscriptions',
            component: () => import('@/pages/admin/AdminSubscriptions.vue'),
          },
          {
            path: '/admin/usersubscriptions',
            name: 'AdminUserSubscriptions',
            component: () => import('@/pages/admin/AdminUserSubscriptions.vue'),
          },
          {
            path: '/admin/usersorders',
            name: 'AdminUsersOrders',
            component: () => import('@/pages/admin/AdminUsersOrders.vue'),
          },
        ]
      },
    ]

  },

  /**
   * Настройки пользователя
   */
  {
    path: '/my',
    name: 'MySettings',
    component: () => import('./pages/user/UserSettings.vue'),
    children: [
      {
        path: '/mysettings/profile',
        name: 'Profile',
        component: () => import('@/components/Profile.vue'),
      },
    ]
  },


  // Логин
  {
    path: '/login',
    name: 'AuthCore',
    component: () => import('./pages/user/AuthCore.vue'),
    children: [
      {
        path: '/in',
        name: 'Auth',
        component: () => import('./pages/user/Auth.vue'),
      },
      {
        path: '/signup',
        name: 'Signup',
        component: () => import('@/pages/user/Signup.vue'),
      },
      {
        path: '/resetpasswordrequest',
        name: 'ResetPasswordRequest',
        component: () => import('./pages/user/ResetPasswordRequest.vue'),
      },
      {
        path: '/resetpassword',
        name: 'ResetPassword',
        component: () => import('./pages/user/ResetPassword.vue'),
      },
      {
        path: '/privacy',
        name: 'Privacy',
        component: () => import('./pages/static/legal/PrivacyMobileApp.vue'),
      },
      {
        path: '/privacy-web',
        name: 'PrivacyWeb',
        component: () => import('./pages/static/legal/PrivacyWebsite.vue'),
      },
      {
        path: '/terms',
        name: 'TermsOfUse',
        component: () => import('./pages/static/legal/TermsMobileApp.vue'),
      },
      {
        path: '/removeaccount',
        name: 'RemoveAccountPublic',
        component: () => import('./pages/static/legal/RemoveAccount.vue'),
      },
      {
        path: '/contacts',
        name: 'Contacts',
        component: () => import('./pages/static/Contacts.vue'),
      },
    ]
  },


]
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})
export default router
