import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

axios.interceptors.request.use(function (config) {
  var token = localStorage.getItem('user_token')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 查询角色列表
export const getRolesListApi = () => {
  return axios({
    url: 'roles'
  })
}

// 添加角色API
export const addRolesApi = (data) => {
  return axios({
    method: 'post',
    url: '/roles',
    data
  })
}

// 删除角色API
export const deleteRolesApi = (id) => {
  return axios({
    method: 'delete',
    url: `roles/${id}`
  })
}
