import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const defaultPage = () => import('../components/layout/default.vue')
const Index = () => import('../components/page/index.vue')
const changeCity = () => import('../components/changeCity/changeCity.vue')
const goodsList = () => import('../components/page/goodsList.vue')
const blank = () => import('../components/layout/blank.vue')
const login = () => import('../components/page/login.vue')
const register = () => import('../components/page/register.vue')
const errorPage = () => import('../components/404.vue')
// Vue.directive('click-document', {
//    inserted:(e1)=>{
//      console.log(el)
//    }
// })
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'defaultPage',
      component: defaultPage,
      redirect: '/index',
      children: [{
        path: 'index',
        name: 'index',
        component: Index
      },
      {
        path: '/s/:place',
        name: 'goods',
        component: goodsList
      },
      {
        path: '/location',
        name: 'location',
        component: changeCity
      }]
    },
    {
      path: '/blank',
      name: 'blank',
      component: blank,
      children: [{
        path: 'login',
        name: 'login',
        component: login
      }, {
        path: 'register',
        name: 'register',
        component: register
      }]
    },
    {path: '*',  component: errorPage}
  ]
})
