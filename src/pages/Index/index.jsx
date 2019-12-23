import React from 'react'
import { Carousel, Flex, Grid, WingBlank } from 'antd-mobile'
import './index.css'
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'
import SearchHeader from '../../components/SearchHeader'
import request from '../../utils/axios.js'
import { getDatas } from './api.js'
import { getCurrCity } from '../../utils/getCity.js'
// 导航菜单数据
const navs = [
  {
    id: 1,
    img: Nav1,
    title: '整租',
    path: '/home/list',
  },
  {
    id: 2,
    img: Nav2,
    title: '合租',
    path: '/home/list',
  },
  {
    id: 3,
    img: Nav3,
    title: '地图找房',
    path: '/map',
  },
  {
    id: 4,
    img: Nav4,
    title: '去出租',
    path: '/rent/add',
  },
]
const baseURL = 'http://localhost:8080'
export default class News extends React.Component {
  state = {
    swipers: [], // 轮播图
    isSwiperLoaded: false,
    groups: [], // 租房小组
    news: [], // 最新资讯
    cityInfo: {
      label: '上海',
      value: '%E5%8C%97%E4%BA%AC',
    },
  }

  async componentDidMount () {
    this.loadCurrCity()
    const getSwipers = getDatas('/home/swiper')
    const getHouse = getDatas('/home/groups')
    const getNews = getDatas('/home/news')
    // Promise.all()->
    //1. 统一/一次性处理多个Promise对象
    // 2. 用await修饰后, 返回的是多个Promise对象resolve的结果所在的数组
    const data = await Promise.all([getSwipers, getHouse, getNews])
    this.setState({
      swipers: data[0],
      groups: data[1],
      news: data[2],
      isSwiperLoaded: true,
    })
    console.log(this.state.news)
  }
  //  render轮播图
  renderSwipers = () => {
    return this.state.swipers.map(item => (
      <a
        key={item}
        href="http://www.baidu.com"
        style={{
          display: 'inline-block',
          width: '100%',
          height: 212,
        }}
      >
        <img
          src={baseURL + item.imgSrc}
          alt=""
          style={{ width: '100%', verticalAlign: 'top' }}
          onLoad={() => {
            // fire window resize event to change height
            window.dispatchEvent(new Event('resize'))
            this.setState({ imgHeight: 'auto' })
          }}
        />
      </a>
    ))
  }
  // Groups 组
  renderGroups (item) {
    return (
      <Flex className="grid-item" justify="between">
        <div className="desc">
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </div>
        <img src={baseURL + item.imgSrc} alt={item.desc} />
      </Flex>
    )
  }
  //   最新资讯
  renderNews () {
    return this.state.news.map(item => (
      <div className="news-item" key={item.id}>
        <div className="imgWrap">
          <img className="img" src={baseURL + item.imgSrc} alt=""></img>
        </div>
        <Flex className="content" justify="between" direction="column">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ))
  }
  // render导航
  renderNav () {
    return navs.map(item => (
      <Flex.Item
        key={item.id}
        onClick={() => this.props.history.push(item.path)}
      >
        <img src={item.img} alt="" />
        <p>{item.title}</p>
      </Flex.Item>
    ))
  }
  // 城市信息
  loadCurrCity = () => {
    getCurrCity().then(({ label, value }) => {
      this.setState(() => {
        return {
          cityInfo: { ...this.state.cityInfo, label, value },
        }
      })
    })
  }
  render () {
    const { state } = this

    return (
      <div className="Index">


        {/* 轮播图 */}
        <div className="swiper">
          {state.isSwiperLoaded ? (
            <Carousel autoplay infinite autoplayInterval={3000}>
              {this.renderSwipers()}
            </Carousel>
          ) : (
              ''
            )}
          {/* 搜索框 */}
          <SearchHeader cityName={this.state.cityInfo.label} />
        </div>
        {/* 轮播图 */}

        {/* Nav 导航 */}
        <Flex className="nav">{this.renderNav()}</Flex>
        {/* NAV 导航!!! */}

        {/* 租房小组!!! */}
        <div className="group">
          {/* 标题 */}
          <Flex className="group-title" justify="between">
            <h3>租房小组</h3>
            <span>更多</span>
          </Flex>
          {/* Grid布局 */}
          <Grid
            data={state.groups}
            activeStyle
            columnNum={2}
            square={false}
            hasLine={false}
            renderItem={item => this.renderGroups(item)}
          />
        </div>
        {/* 租房小组!!! */}

        {/* 最新资讯!!! */}
        <div className="news">
          <h3 className="news-title">最新资讯</h3>
          <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>
        {/* 最新资讯!!! */}
      </div>
    )
  }
}
