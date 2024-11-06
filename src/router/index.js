import Vue from 'vue';
import Router from 'vue-router';
import ProductMarket from '../views/ProductMarket.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'ProductMarket',
      component: ProductMarket,
    },
  ],
});
