import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import affiliates from './router/affiliates';
const routes = [

  {
    path: '/',
    name: 'Home',
    component: () => import('./pages/Home.vue'),

    children: [

      {
        path: '',
        alias: ['/catalog', '/home', '/home/catalog/buy'],
        name: 'HomePage',
        component: () => import('@/app/HomePage.vue'),
      },

      /**
       * Настройки пользователя
       */
      {
        path: '/my',
        name: 'MySettings',
        component: () => import('@/components/UserSettings.vue'),
        children: [

          // Мои настройки
          {
            path: '/mysettings/profile',
            name: 'Profile',
            component: () => import('@/components/Profile.vue'),
          },

          // Сообщить об ошибке
          {
            path: '/report',
            name: 'UserReport',
            component: () => import('@/components/UserReport.vue'),
          },
        ]
      },

      // Платежи
      {
        path: '/billing',
        name: 'BillingCore',
        component: () => import('@/pages/pays/BillingCore.vue'),
        children: [

          // Dashboard + место для покупки
          {
            path: '',
            name: 'Billing',
            component: () => import('@/pages/pays/Dashboard.vue'),
          },

          // История платежей
          {
            path: '/billing/history',
            name: 'BillingHistory',
            component: () => import('@/pages/pays/History.vue'),
          },

          // Инвойсы
          // Успешная оплата, ошибка оплаты
          {
            path: '/billing/invoice',
            alias: ['/billing/invoice/', '/payment/success', '/payment/fail',],
            name: 'BillingPaymentInvoiceNoID',
            component: () => import('@/pages/pays/Invoice.vue'),
          },
          {
            path: '/billing/invoice/:invoiceid',
            name: 'BillingPaymentInvoice',
            component: () => import('@/pages/pays/Invoice.vue'),
          },

        ]
      },

      affiliates,

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
        component: () => import('./pages/static/legal/privacy/Privacy.vue'),
      },
      {
        path: '/cookies-policy',
        name: 'CookiesPrivacy',
        component: () => import('./pages/static/legal/cookies/Cookies.vue'),
      },
      {
        path: '/privacy-web',
        name: 'PrivacyWeb',
        component: () => import('./pages/static/legal/privacy/PrivacyWebsite.vue'),
      },
      {
        path: '/terms',
        name: 'TermsOfUse',
        component: () => import('./pages/static/legal/terms/Terms.vue'),
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
