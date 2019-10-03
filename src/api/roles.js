import axios from '@/utils/myaxios.js'

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

// 编辑角色API
export const editRolesApi = (data) => {
  return axios({
    method: 'put',
    url: `roles/${data.id}`,
    data
  })
}

// 删除角色指定权限
export const deleteRolesRightsApi = (roleid, rightid) => {
  return axios({
    method: 'delete',
    url: `roles/${roleid}/rights/${rightid}`
  })
}

// 分配角色权限
export const grantRolesRightsApi = (roleid, rids) => {
  return axios({
    method: 'post',
    url: `roles/${roleid}/rights`,
    data: { rids }
  })
}
