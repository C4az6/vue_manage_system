import axios from '@/utils/myaxios.js'

// 获取所有商品列表数据
export const getAllGoodsListApi = (obj) => {
  return axios({
    method: 'get',
    url: 'goods',
    params: obj
  })
}
