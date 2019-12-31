import React from 'react'

import PropTypes from 'prop-types'
// 1. react基础讲过
// 2. props属性类型检查
// 3. 提供使用者该给组件传递什么类型的属性
// 4. react的propTypes在vue中有没有?->有 props的值是对象
// props:{
//   list:{
//       type: Object,
//       required: true,
//       default:()=>{}
//   }
// }
//

import styles from './index.module.css'

const BaseURL = `http://localhost:8080`
function HouseItem({ houseImg, title, desc, tags, price, onClick, style }) {
  return (
    <div
      className={styles.house}
      onClick={() => {
        onClick()
      }}
      style={style}
    >
      <div className={styles.imgWrap}>
        <img className={styles.img} src={BaseURL + houseImg} alt="" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.desc}>{desc}</div>
        <div>
          {/* ['近地铁', '随时看房'] */}
          {tags &&
            tags.map((tag, index) => {
              const tagClass = 'tag' + (index + 1)
              return (
                <span
                  className={[styles.tag, styles[tagClass]].join(' ')}
                  key={tag}
                >
                  {tag}
                </span>
              )
            })}
        </div>
        <div className={styles.price}>
          <span className={styles.priceNum}>{price}</span> 元/月
        </div>
      </div>
    </div>
  )
}

// js->做不到这一点
// 1. 静态类型检查 ->react中使用的propTypes
// 2. typescript(js的高级版本)
// 3. flow.js框架

HouseItem.propTypes = {
  houseImg: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
  // tags: PropTypes.array.isRequired,
  price: PropTypes.number,
  onClick: PropTypes.func
}

export default HouseItem
