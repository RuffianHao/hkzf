import React from 'react'
import { Toast } from 'antd-mobile'
import {
  List,
  AutoSizer,
  WindowScroller,
  InfiniteLoader
} from 'react-virtualized'
import { withRouter } from 'react-router-dom'
import HouseItem from '../HouseItem'
import NoHouse from '../../components/NoHouse'

import Filter from './component/Filter'
// 导入样式
import styles from './index.module.css'

import { getHousesByFilters } from './api.js'
// 获取当前定位城市信息
import { getCity } from '../../utils/isCity'

const { value } = getCity()
class HouseList extends React.Component {
  state = {
    start: 1,
    end: 20,
    houseslist: [],
    count: 0,
    isLoadFinish: false
  }
  filters = {}
  // 根据filters条件发送请求
  loadHouses = async filters => {
    this.filters = filters
    const { start, end } = this.state
    // 开始动画加载中
    // Toast.loading('加载中', 0)
    const { data } = await getHousesByFilters(value, filters, start, end)
    // Toast.hide()
    const { body } = data
    this.setState(
      () => {
        return {
          houseslist: body.list,
          count: body.count,
          isLoadFinish: true
        }
      },
      () => {
        if (!this.state.count) {
          // Toast.info('暂无房源', 1)
        } else {
          // Toast.info(`共${this.state.count}条房源`, 2)
        }
      }
    )
  }

  componentDidMount () {
    // 获取数据
    this.loadHouses()
  }

  isRowLoaded = ({ index }) => {
    const { houseslist } = this.state

    return !!houseslist[index]
  }

  //加载更多行-> 划到底部
  loadMoreRows = ({ startIndex, stopIndex }) => {
    // console.log(startIndex, stopIndex)

    return new Promise(async resolve => {
      // 异步代码
      const { data } = await getHousesByFilters(
        value,
        this.filters,
        startIndex,
        stopIndex
      )
      // console.log(data)
      const { body } = data
      resolve()
      this.setState(
        state => {
          return {
            houseslist: [...state.houseslist, ...body.list]
          }
        },
        () => {
          // console.log(this.state.houseslist)
        }
      )
    })
  }

  componentWillUnmount () {
    // 1. 清除定时器
    // 2. 移除事件
    // 3. 清空state->在组件销毁前 -> 停止setState方法的执行->写法很多->下面是最简单的写法
    this.setState = () => {
      return
    }
  }

  rowRenderer = ({ key, index, style }) => {
    const { houseslist } = this.state
    const item = houseslist[index]
    // console.log(item)

    if (!item) {
      return (
        <div style={style} key={key}>
          <p className={styles.loading}></p>
        </div>
      )
    }
    return (
      <HouseItem
        key={key}
        {...item}
        style={style}
        onClick={() => {
          // console.log('click-----')
          // 编程式导航
          // '/detail/${houseCode}'
          // console.log(this.props)
          // 1. 在有的地方(父home 爷爷App)传值传过来
          // 2. react-router-dom提供的withRouter (hoc加工)

          this.props.history.push(`/detail/${item.houseCode}`)
        }}
      />
    )
  }

  // 渲染没房源
  renderNoHouse = () => {
    return <NoHouse>暂无房源</NoHouse>
  }
  // 渲染有房源的列表
  renderHouseList = () => {
    const { count } = this.state
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={count}
      >
        {({ onRowsRendered, registerChild }) => {
          return (
            <WindowScroller>
              {({ height, isScrolling, onChildScroll, scrollTop }) => {
                return (
                  <AutoSizer>
                    {({ width }) => {
                      return (
                        <List
                          // className={styles.list}
                          // autoHeight
                          height={height}
                          onRowsRendered={onRowsRendered}
                          ref={registerChild}
                          isScrolling={isScrolling}
                          onScroll={onChildScroll}
                          rowCount={count}
                          rowHeight={120}
                          rowRenderer={this.rowRenderer}
                          scrollTop={scrollTop}
                          width={width}
                        />
                      )
                    }}
                  </AutoSizer>
                )
              }}
            </WindowScroller>
          )
        }}
      </InfiniteLoader>
    )
  }

  render () {
    const { count, isLoadFinish } = this.state
    return (
      <div className={styles.root}>

        {/* 条件筛选栏 */}
        <Filter />
        {/* 列表
        0. List组件是最基础的列表组件
        1. 自动宽高->AutoSizer
        2. 跟随整页滚动->WindowScroller
        3. 加载更多->
        */}

        {count !== 0 && this.renderHouseList()}
        {/* 第一次执行 
        count默认0
        isLoadFinish:false
        请求完成后->判断count是否0->渲染Nohouse
        */}
        {count === 0 && isLoadFinish && this.renderNoHouse()}
      </div>
    )
  }
}

export default withRouter(HouseList)

// 找房 houselist
// 1. index.js
// 1.1 Filter/index.js
// 1.1.1 FilterTitle/index.js
// 1.1.2 FilterPicker/index.js
// 1.1.3 FilterMore/index.js
// 2. index.module.css

// vue的做法<style scoped></style>

// CSS in JS:让css像js一样有作用域
// 1. 样式文件  index.module.css
// 2. 使用样式文件时,需要接收者styles对象
// 3. className={styles.类名}

// React元素要求唯一根节点  : React提供的语法:   <></>作为容器

// /home/list?cityId=1&value=2
// fetch(url).then(res=>{})
// 1. fetch类似于ajax
// 2. fetch()返回Promise对象
// 3. fetch支持Promise语法
// 4. fetch是原生JS的API
// 5. return fetch().then()
// 6. return new Promise()

// 划到底部时,监测不到loadMoreRows方法的调用->
// 1. 高度
// 2. 请求
// 3. hoc配置
// -> autoHeight不设置!

// children->props深入
// 1. children
{
  /* <One>100</One> */
}

// props.children

// 为了提高用户体验
// 1. loading动画
// 请求之前
// img src="loading.gif"
// 请求之后
// img src=""
// 2. 骨架屏
// vue/react/小程序->骨架屏
// 配置代理
// vue

// 跨域现象
// 8种解决方案
// JSONP->服务端提供jsonp接口 + get
// CORS->服务端配置
// iframe src
// proxy代码
