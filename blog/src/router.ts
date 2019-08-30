import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import NProgress from 'nprogress';

Vue.use(Router);

const routerInstance = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: () => import('./views/Article.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('./views/About.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

routerInstance.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
routerInstance.afterEach(() => {
  NProgress.done();
});

export default routerInstance;
