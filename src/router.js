import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Categories from './views/Categories.vue'
import Customers from './views/Customers.vue'
import Employees from './views/Employees.vue'
import Products from './views/Products.vue'
import EditProduct from './views/EditProduct.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Home
    },
    {
      path: '/categories',
      name: 'Categories',
      component: Categories,
      meta: { requiresAuth: true }
    },
    {
      path: '/customers',
      name: 'Customers',
      component: Customers,
      meta: { requiresAuth: true }
    },
    {
      path: '/employees',
      name: 'employees',
      component: Employees,
      meta: { requiresAuth: true }
    },
    {
      path: '/products',
      name: 'products',
      component: Products,
      meta: { requiresAuth: true }
    },
    {
      path: '/editproduct/:id',
      name: 'editproduct',
      component: EditProduct,
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
