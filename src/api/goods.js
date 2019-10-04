import axios from '@/utils/myaxios.js'

// 获取所有商品列表数据
export const getAllGoodsListApi = (obj) => {
  return axios({
    method: 'get',
    url: 'goods',
    params: obj
  })
}

// 添加商品
export const addGoodsApi = (data) => {
  return axios({
    url: 'goods',
    method: 'post',
    data
  })
}

// 删除商品
export const removeGoodsApi = (id) => {
  return axios({
    method: 'delete',
    url: `goods/${id}`
  })
}

// 编辑商品
export const editGoodsApi = (data) => {
  return axios({
    method: 'put',
    url: `goods/${data.id}`,
    data
  })
}
