import React from 'react'

import { Flex } from 'antd-mobile'

import style from './index.module.css'

// 标题数据
const titleList = [
  { title: '区域', type: 'area' },
  { title: '方式', type: 'mode' },
  { title: '租金', type: 'price' },
  { title: '筛选', type: 'more' }
]

// 标题高亮状态
const titleSelectedStatus = {
  area: true,
  mode: true,
  price: false,
  more: false
}

// 头部标题Flex-Item
function renderTitleList () {
  return titleList.map((item) => (
    <Flex.Item key={item.type}>
      <span className={[style.dropdown, titleSelectedStatus[item.type] ? style.selected : ''].join(' ')}>
        <span>{item.title}</span>
        <i className="iconfont icon-arrow"></i>
      </span>
    </Flex.Item >
  ))
}


function FilterTitle () {
  return (
    <div className="filtertitle">
      <Flex align="center" className={style.root} >
        {renderTitleList()}
      </Flex>
    </div>
  )
}
export default FilterTitle