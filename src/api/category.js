import axios from '@/utils/myaxios.js'
export const getCategoriesListApi = (level) => {
  return axios({
    url: 'categories',
    level
  })
}
