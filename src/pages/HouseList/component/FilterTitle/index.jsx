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



function FilterTitle ({ titleSelectedStatus, onTitleClick }) {
  return (
    <div className={style.filtertitle}>
      <Flex align="center" className={style.root} >
        {
          titleList.map((item) => {
            return (
              <Flex.Item key={item.type} onClick={() => onTitleClick(item.type)}>
                <span className={[style.dropdown, titleSelectedStatus[item.type] ? style.selected : ''].join(' ')}>
                  <span>{item.title}</span>
                  <i className="iconfont icon-arrow"></i>
                </span>
              </Flex.Item>
            )
          })
        }
      </Flex>
    </div>
  )
}
export default FilterTitle