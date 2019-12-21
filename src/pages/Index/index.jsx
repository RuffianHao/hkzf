import React from 'react'
// SearchBar, WhiteSpace,
import { Carousel, Flex } from 'antd-mobile'
import './index.css'
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'
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
export default class News extends React.Component {
  state = {
    swipers: [],
    isSwiperLoaded: true,
  }

  // render导航
  renderNav() {
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
  // 获取后台信息
  getDatas = async path => {
    const res = await this.get(path)
    return res.data.body
  }
  async componentDidMount() {
    const getSwipers = this.getDatas('/home/swiper')
    const getHouse = this.getDatas('/home/groups')
    // Promise.all()->
    //1. 统一/一次性处理多个Promise对象
    // 2. 用await修饰后, 返回的是多个Promise对象resolve的结果所在的数组
    const datas = await Promise.all([getSwipers, getHouse])
    this.setState({
      swipers: datas[0],
      groups: datas[1],
    })
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
          src={this.base + item.imgSrc}
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
  render() {
    return (
      <div className="Index">
        {/* 轮播图 */}
        <div className="swiper">
          {this.state.isSwiperLoaded ? (
            <Carousel autoplay infinite autoplayInterval={3000}>
              {this.renderSwipers()}
            </Carousel>
          ) : (
            ''
          )}
        </div>
        {/* Nav 导航 */}
        <Flex className="nav">{this.renderNav()}</Flex>
      </div>
    )
  }
}
