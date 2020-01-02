/*
 * @Description:
 * @Date: 2019-12-31 11:54:01
 * @LastEditTime : 2020-01-02 16:46:04
 */
import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'

export default class FilterPicker extends Component {
  // apicker -> price -》 state1->price1的值【1000】
  //  bpicker-》mode-》state2-》mode的值【true】

  // state变化时，会执行-》手动设置value的值-》把value的默认值再重新执行一遍-》可以解决》constructor只走一次代码不会第二次执行的问题
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.value === prevState.value) {
  //     this.setState(() => {
  //       return { value: this.props.defaultValue }
  //     })
  //   }
  // }

  state = {
    value: this.props.defaultValue,
  }

  handleValue = value => {
    this.setState(() => {
      return { value }
    })
  }

  componentDidMount() {
    // console.log(this.props)
  }

  render() {
    const { data, onCancel, onSave, cols, type } = this.props
    const { value } = this.state
    return (
      <>
        {/* 选择器组件： */}
        <PickerView
          data={data}
          value={value}
          cols={cols}
          onChange={this.handleValue}
        />

        {/* 底部按钮 */}
        <FilterFooter
          onCancel={() => {
            onCancel(type)
          }}
          onSave={() => {
            onSave(value, type)
          }}
        />
      </>
    )
  }
}

// Picker默认值问题
// 打开-》关闭（销毁组件）-》切换-》好使
// 打开-》不关闭（不销毁组件）-》直接切换-》不好使-》constructor第一个执行并且只执行一次
// 解决方案

// 1. componentDidUpdate
// 2.
