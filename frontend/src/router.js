/*
 * @File: 
 * @Author: 张宏亮 - zhl@xiaoniren.cn
 * @Date: 2019-07-27 18:33:13
 * @LastEditors: 张宏亮<zhl@xiaoniren.cn>
 * @LastEditTime: 2019-08-09 17:42:48
 * @Description: file content
 * @Versions: 1.0.0
 */
import Vue from 'vue'
import Router from 'vue-router'
import Login from "./views/Login.vue";
import Home from './views/Home.vue'
import WriteArticle from './views/WriteArticle.vue'
import ReadArticle from './views/ReadArticle.vue'
import Show from './views/home/Show.vue'
import Personal from './views/PersonalCenter'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/personal-center',
      name: 'personal-center',
      component: Personal
    },
    {
      path: '/article',
      name: 'article',
      component: WriteArticle
    },
    {
      path: '/article/details',
      name: 'read-article',
      component: ReadArticle
    },
    {
      path: '/show',
      name: 'show',
      component: Show
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Register.vue')
    }
  ]
})
