import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

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
