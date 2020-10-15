import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
// 请求拦截器
request.interceptors.request.use(function (config) {
  // 在请求发送之前做些什么
  const { user } = store.state
  if (user && user.data.token) {
    config.headers.Authorization = `Bearer ${user.data.token}`
  }
  return config
}, function (error) {
  // 请求错误怎么办
  return Promise.reject(error)
})
// 响应拦截器
export default request
