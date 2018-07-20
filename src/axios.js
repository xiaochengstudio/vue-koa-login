import axios from 'axios'
import store from './store'
import router from './router'

//创建axios实例
var instance = axios.create({
  timeout: 10000,
  header: { 'Content-Type': 'application/json;chartset=utf-8' },
});

//request拦截器
instance.interceptors.request.use(
  config => {
    //判断是否存在token，如果存在，则每个http header都加上token
    if(store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`;
    }
    return config;
  }
);

//respone拦截器
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    switch (error.response.status) {
      case 401:
        store.dispatch('UserLogout');//可能token过期，清除
        router.replace({ //跳转到登录页
          path: 'login',
          query: { redirect: router.currentRoute.fullPath}//// 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
    }
    return Promise.reject(error.response);
  }
);

export default {
  //用户注册
  userRegister(data) {
    return instance.post('/api/register', data);
  },
  //用户登录
  userLoing(data) {
    return axios.post('/api/login', data);
  },
  //获取用户
  getUser() {
    return instance.get('/api/user');
  },
  //删除用户
  delUser(data) {
    return instance.post('/api/delUser', data);
  }
}