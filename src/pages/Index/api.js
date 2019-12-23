/*
 * @Description:
 * @Date: 2019-12-23 10:24:45
 * @LastEditTime: 2019-12-23 10:47:53
 */
import request from '../..//utils/axios'
export const getDatas = async path => {
  const res = await request.get(`${path}?area=AREA%7C88cff55c-aaa4-e2e0`)
  return res.data.body
}
// 返回当前城市的info-》城市名 + 城市id
export const getAreaInfo = (name = '%E5%8C%97%E4%BA%AC') => {
  return request.get(`/area/info?name=${name}`)
}
