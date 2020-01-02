import React, { Component } from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends Component {
  // 渲染标签
  renderFilters(data) {
    // 高亮类名： styles.tagActive
    return data.map(item => (
      <span
        key={item.value}
        className={[styles.tag, styles.tagActive].join(' ')}
      >
        {item.label}
      </span>
    ))
  }

  render() {
    const { onCancel, type, data } = this.props
    const { roomType, oriented, floor, characteristic } = data
    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div
          className={styles.mask}
          onClick={() => {
            onCancel(type)
          }}
        />

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters(characteristic)}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter onCancel={onCancel} className={styles.footer} />
      </div>
    )
  }
}
