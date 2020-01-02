import React, { Component } from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends Component {
  state = {
    selectedValues: [],
  }
  //标签点击事件
  onTagClick = value => {
    const newSelectedValues = [...this.state.selectedValues]
    if (newSelectedValues.indexOf(value) <= -1) {
      console.log(newSelectedValues.indexOf(value))
      newSelectedValues.push(value)
    } else {
      // 有 返回当前索引 删除
      const index = newSelectedValues.findIndex(item => item === value)
      newSelectedValues.splice(index, 1)
    }
    this.setState({
      selectedValues: newSelectedValues,
    })
  }

  // 渲染标签
  renderFilters(data) {
    const { selectedValues } = this.state
    // 高亮类名： styles.tagActive
    return data.map(item => {
      const isSelected = selectedValues.indexOf(item.value) > -1
      console.log(isSelected)
      // 是否选择 是高亮 否 取消
      return (
        <span
          key={item.value}
          className={[styles.tag, isSelected ? styles.tagActive : ''].join(' ')}
          onClick={() => this.onTagClick(item.value)}
        >
          {item.label}
        </span>
      )
    })
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
