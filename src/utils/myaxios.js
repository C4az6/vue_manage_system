import axios from 'axios'

var myaxios = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})

// 添加请求拦截器
myaxios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 获取可能有token的数据，进行请求头的设置，格式Authorization:token
  var token = localStorage.getItem('user_token')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 暴露成员
export default myaxios
