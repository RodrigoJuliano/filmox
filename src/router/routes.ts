import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/DiscoverPage.vue'),
        props: (route) => ({ sort: route.query.sort }),
      },
    ],
  },
  {
    path: '/watchlist',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/WatchlistPage.vue') }],
  },
  {
    path: '/search',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/SearchResultsPage.vue'),
        props: (route) => ({ query: route.query.q }),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
