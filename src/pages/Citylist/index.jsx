import React from 'react'
import request from '../../utils/axios'
import { getCurrCity } from '../../utils/getCity'
// 设计城市的格式
//已有数据:{label: "东莞", value: "AREA|df4995a8-a691-8898", pinyin: "dongguan", short: "dg"}
// 需要格式:a:[{label:....},{}]

function formatCityData (data) {
  let citylist = {}
  let cityIndex = []
  data.map(item => {
    // 获取简写中的首字母进行分类
    const first = item.short.substr(0, 1)// a,b,c...
    // 判断数组中是否存在属性
    if (first in citylist) {
      citylist[first].push(item)
    } else {
      citylist[first] = [item]
    }
    // 取出所有的key a,b,c 使用sort 进行排序
    cityIndex = Object.keys(citylist).sort()
  })
  return {
    citylist,
    cityIndex
  }
}

export default class News extends React.Component {
  state = {
    cities: []
  }
  // 获取城市列表信息
  getCities = async () => {
    const res = await request.get(`/area/city`, {
      params: {
        level: 1 // url参数 level为1->表示一级城市
      }
    })
    this.setState({
      cities: res.data.body
    })
    const { cityIndex, citylist } = formatCityData(res.data.body)
    // 热门城市
    const hotres = await request.get(`/area/hot`)
    // console.log(res2.data.body)
    cityIndex.unshift('hot')
    citylist['hot'] = hotres.data.body
    // 获取当前定位城市数据
    const currCity = await getCurrCity()
    cityIndex.unshift('#')
    citylist['#'] = [currCity]
    console.log(cityIndex)
  }
  componentDidMount () {
    this.getCities()

  }
  render () {
    return (
      <div style={{ backgroundColor: 'green' }}>
        这是 News组件 的内容，它是子路由的内容
      </div>
    )
  }
}
