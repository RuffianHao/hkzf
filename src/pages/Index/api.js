import request from '../..//utils/axios'
export const getDatas = async path => {
    const res = await request.get(path)
    return res.data.body
}
// 返回当前城市的info-》城市名 + 城市id
export const getAreaInfo = (name = '%E5%8C%97%E4%BA%AC') => {
    return request.get(`/area/info?name=${name}`)
}