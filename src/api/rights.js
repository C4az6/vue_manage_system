import axios from '@/utils/myaxios.js'

// 获取所有权限列表方法
export const getAllRightsApi = (type) => {
  return axios({
    url: `rights/${type}`
  })
}
