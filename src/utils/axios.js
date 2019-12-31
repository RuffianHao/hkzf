/*
 * @Description:
 * @Date: 2019-12-23 10:24:45
 * @LastEditTime : 2019-12-31 16:44:51
 */
import axios from 'axios'
import { Toast } from 'antd-mobile'
const request = axios.create({
  baseURL: `http://localhost:8080`,
})
// 请求前拦截
request.interceptors.request.use(
  config => {
    // 开始动画
    Toast.loading('加载中', 0, null, null)
    return config
  },
  err => {
    console.log('请求超时')
    return Promise.reject(err)
  }
)

// 返回后拦截
request.interceptors.response.use(
  data => {
    Toast.hide()
    return data
  },
  err => {
    if (err.response.status === 504 || err.response.status === 404) {
      console.log('服务器被吃了⊙﹏⊙∥')
    } else if (err.response.status === 401) {
      console.log('登录信息失效⊙﹏⊙∥')
    } else if (err.response.status === 500) {
      console.log('服务器开小差了⊙﹏⊙∥')
    }
    return Promise.reject(err)
  }
)

export default request
