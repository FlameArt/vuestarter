// Аффилейты

export default
   {
      path: '/affiliate',
      name: 'AffiliateCore',
      component: () => import('@/pages/affiliates/AffiliateCore.vue'),
      children: [

         // Dashboard + место для покупки
         {
            path: '',
            name: 'AffiliateDashboard',
            component: () => import('@/pages/affiliates/Dashboard.vue'),
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
   }