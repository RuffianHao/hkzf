import React from 'react'

import request from '../../utils/axios'

import { getCurrCity } from '../../utils/getCity'

// 导入 List 组件
import { List, AutoSizer } from 'react-virtualized'

import { Toast } from 'antd-mobile'

import NavHeader from '../../components/NavHeader'

import { setCity } from '../../utils/isCity'

import './index.css'
// 设计城市的格式
//已有数据:{label: "东莞", value: "AREA|df4995a8-a691-8898", pinyin: "dongguan", short: "dg"}
// 需要格式:a:[{label:....},{}]
function formatCityData (data) {
  let cityList = {}
  let cityIndex = []
  data.map(item => {
    // 获取简写中的首字母进行分类
    const first = item.short.substr(0, 1)// a,b,c...
    // 判断数组中是否存在属性
    if (first in cityList) {
      cityList[first].push(item)
    } else {
      cityList[first] = [item]
    }
    // 取出所有的key a,b,c 使用sort 进行排序
    cityIndex = Object.keys(cityList).sort()
  })
  return {
    cityList,
    cityIndex
  }
}



// 索引（A、B等）的高度
const TITLE_HEIGHT = 36
// 每个城市名称的高度
const NAME_HEIGHT = 50

// 封装处理字母索引的方法
const formatCityIndex = letter => {
  switch (letter) {
    case '#':
      return '当前位置'
    case 'hot':
      return '热门位置'
    default:
      return letter.toUpperCase()
  }

}

// 有房源的城市
const HOUSE_CITY = ['北京', '上海', '广州', '深圳']


export default class News extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      cityList: {},
      cityIndex: [],
      // 指定右侧字母索引列表高亮的索引号
      activeIndex: 0
    }
    // 创建ref对象
    this.cityListComponent = React.createRef()
    console.log(this.cityListComponent)
  }

  async componentDidMount () {
    await this.getCities()
    // 调用 measureAllRows，提前计算 List 中每一行的高度，实现 scrollToRow 的精确跳转
    this.cityListComponent.current.measureAllRows()
    console.log(this.cityListComponent)
  }



  // 获取城市列表信息
  getCities = async () => {
    const res = await request.get('/area/city', {
      params: {
        level: 1 // url参数 level为1->表示一级城市
      }
    })

    const { cityIndex, cityList } = formatCityData(res.data.body)
    // 获取热门城市数据
    const hotRes = await request.get('/area/hot')
    cityList['hot'] = hotRes.data.body
    cityIndex.unshift('hot')

    // 获取当前定位城市
    const curCity = await getCurrCity()
    cityList['#'] = [curCity]
    cityIndex.unshift('#')
    this.setState({
      cityList,
      cityIndex
    })
  }

  changeCity ({ label, value }) {
    if (HOUSE_CITY.indexOf(label) > -1) {
      // 有
      setCity({ label, value })
      this.props.history.go(-1)
    } else {
      Toast.info('该城市暂无房源数据', 1, null, false)
    }
  }


  rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
    const { cityIndex, cityList } = this.state
    const letter = cityIndex[index]
    return (
      <div key={key} style={style} className="city">
        <div className="title">{formatCityIndex(letter)}</div>
        {cityList[letter].map(item => (
          <div
            className="name"
            key={item.value}
            onClick={() => this.changeCity(item)}
          >
            {item.label}
          </div>
        ))}
      </div>
    )
  }

  // 创建动态计算每一行高度的方法
  getRowHeight = ({ index }) => {
    const { cityList, cityIndex } = this.state
    // 索引标题高度 + 城市数量 * 城市名称的高度
    return TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
  }

  // 封装渲染右侧索引列表的方法
  renderCityIndex () {
    // 获取到 cityIndex，并遍历其，实现渲染
    const { cityIndex, activeIndex } = this.state
    return cityIndex.map((item, index) => (
      <li
        className="city-index-item"
        key={item}
        onClick={() => {
          this.cityListComponent.current.scrollToRow(index)
          console.log('当前索引号：', index)
        }}
      >
        <span className={activeIndex === index ? 'index-active' : ''}>
          {item === 'hot' ? '热' : item.toUpperCase()}
        </span>
      </li>
    ))
  }

  // 用于获取List组件中渲染行的信息
  onRowsRendered = ({ startIndex }) => {
    console.log('startIndex：', startIndex)
    if (this.state.activeIndex !== startIndex) {
      this.setState({
        activeIndex: startIndex
      })
    }
  }


  render () {
    const { state } = this
    return (
      <div className="citylist">
        {/* 顶部导航栏 */}
        <NavHeader>城市选择</NavHeader>

        {/* 城市列表 */}
        <AutoSizer>
          {({ width, height }) => (
            <List
              ref={this.cityListComponent}
              width={width}
              height={height}
              rowCount={state.cityIndex.length}
              rowHeight={this.getRowHeight}
              rowRenderer={this.rowRenderer}
              onRowsRendered={this.onRowsRendered}
              scrollToAlignment="start"
            />
          )}
        </AutoSizer>
        {/* 右侧索引列表 */}
        <ul className="city-index">{this.renderCityIndex()}</ul>
      </div>
    )
  }
}
