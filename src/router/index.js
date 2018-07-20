import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';
import home from '@/components/home';
import login from '@/components/login';
import register from '@/components/register'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name:'home',
    component:home,
    meta: {
      requiresAuth:true
    }
  },{
    path: '/home',
    name: 'home',
    component: home,
  },
  {
  path: '/login',
    name: 'login',
    component: login,
},
{
  path: '/register',
    name: 'register',
  component: register,
}]
});

//注册全局钩子来拦截导航
router.beforeEach((to, from, next) => {
  //获取store里的token
  let token = store.state.token;
  //判断要去的路由有没有requiresAuth
  if (to.meta.requiresArg) {
    if (token) {
      next();
    } else {
      next({
        path:'/login',
        query: { redirect: to.fullPath }//将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
      })
    }
  } else {
    next();
  }
});
export default router;