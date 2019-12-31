/*
 * @Description:
 * @Date: 2019-12-31 17:13:32
 * @LastEditTime : 2019-12-31 17:14:10
 */
// api.js->当前组件对应的网络请求的模块

import request from '../../utils/axios'

// filters还没有使用
export const getHousesByFilters = (
  cityId = 'AREA|88cff55c-aaa4-e2e0',
  filters,
  start = 1,
  end = 20
) => {
  return request.get(`/houses`, {
    params: {
      cityId,
      ...filters,
      start,
      end,
    },
  })
}
