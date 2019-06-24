import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index-page',
      component: require('@/views/index').default,
    },
    {
      path: '/landing-page',
      name: 'landing-page',
      component: require('@/components/LandingPage'),
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
