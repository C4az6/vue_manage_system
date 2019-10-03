import axios from '@/utils/myaxios.js'

// 添加登录验证方法
export const userLoginApi = (data) => {
  // 返回promise以后在方法调用的时候进行then和catch
  return axios({
    url: 'login',
    method: 'post',
    data: data
  })
}

// 添加获取用户列表数据的方法
export const getUserListApi = (params) => {
  return axios({
    url: 'users',
    params: params
  })
}

// 新增用户方法
export const addUserApi = (data) => {
  return axios({
    url: 'users',
    method: 'post',
    data
  })
}

// 编辑用户方法
export const editUserApi = (data) => {
  return axios({
    url: `users/${data.id}`,
    method: 'put',
    data
  })
}

// 删除用户方法
export const deleteUserApi = (id) => {
  return axios({
    method: 'delete',
    url: `users/${id}`
  })
}

// 修改用户状态方法
export const changeUserStatusApi = (uid, type) => {
  return axios({
    method: 'put',
    url: `users/${uid}/state/${type}`
  })
}

// 分配角色方法
export const userRoleApi = (id, rid) => {
  return axios({
    method: 'put',
    url: `users/${id}/role`,
    data: { rid }
  })
}

// 获取左侧动态生成的菜单项
export const getLeftMenuApi = () => {
  return axios({
    url: `menus`
  })
}
