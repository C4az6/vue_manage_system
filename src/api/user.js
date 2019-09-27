import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 获取可能有token的数据，进行请求头的设置，格式Authorization:token
  var token = localStorage.getItem('user_token')
  console.log('---拦截器---')
  config.headers['Authorization'] = token
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加登录验证方法
// 在vue中，暴露成员可以使用export
export const userLogin = (data) => {
  // 返回promise以后在方法调用的时候进行then和catch
  return axios({
    url: 'login',
    method: 'post',
    data: data
  })
}

// 添加获取用户列表数据的方法
export const getUserList = (params) => {
  return axios({
    url: 'users',
    params: params
  })
}
