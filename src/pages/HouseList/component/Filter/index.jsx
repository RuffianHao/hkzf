import React from 'react'

import FilterTitle from '../FilterTitle'

import styles from './index.module.css'

import FilterPicker from '../FilterPicker'

import { getCurrCity } from '../../../../utils/getCity'

import request from '../../../../utils/axios'

import { Flex } from 'antd-mobile'

import SearchHeader from '../../../../components/SearchHeader'
import { getCity } from '../../../../utils/isCity'
import { withRouter } from 'react-router-dom'

// 标题高亮状态
const titleSelectedStatus = {
  area: true,
  mode: false,
  price: false,
  more: false
}

//选中的值
const selectedValues = {
  area: ['area', 'null'],
  mode: ['null'],
  price: ['null'],
  more: []
}

class Filter extends React.Component {

  // 数据
  state = {
    titleSelectedStatus: titleSelectedStatus,// 标题的状态
    openType: '',// 打开的标题
    filterData: [],// 条件数据
    label: getCity().label, // 当前城市
    selectedValues: selectedValues // 选中条件的默认值
  }


  // 条件区域列表
  getFilterData = async () => {
    const { value } = await getCurrCity()
    const { data } = await request.get('/houses/condition', {
      params: {
        id: value
      }
    })
    this.setState({
      filterData: data.body
    })
  }

  componentDidMount () {
    // 获取到body
    this.htmlBody = document.body
    // 获取filter数据列表
    this.getFilterData()
  }

  // 点击菜单实现高亮
  onTitleClick = type => {
    // 给 body 添加样式 需要首先获取到body
    this.htmlBody.className = 'body-fixed'

    const { titleSelectedStatus, selectedValues } = this.state
    const newTitleSelectedStatus = { ...titleSelectedStatus }

    Object.keys(titleSelectedStatus).forEach(key => {
      const selectedVal = selectedValues[key]

      if (type === key) {
        newTitleSelectedStatus[type] = true
      } else if (
        key === 'area' &&
        (selectedVal.length === 3 || selectedVal[0] !== 'area')
      ) {
        newTitleSelectedStatus[key] = true
      } else if (key === 'mode' && selectedVal[0] !== 'null') {
        newTitleSelectedStatus[key] = true
      } else if (key === 'price' && selectedVal[0] !== 'null') {
        newTitleSelectedStatus[key] = true
      } else if (key === 'more') {
        // 后面实现FilterMore后 再补充
        // newTitleSelectedStatus[key] = false
      } else {
        newTitleSelectedStatus[key] = false
      }
    })
    console.log(newTitleSelectedStatus)
    this.setState({
      openType: type,
      titleSelectedStatus: newTitleSelectedStatus
    })
  }



  // 取消按钮
  onCancel = (type) => {
    const { titleSelectedStatus, selectedValues } = this.state
    const newTitleSelectedStatus = { ...titleSelectedStatus }
    const selectedVal = selectedValues[type]

    if (
      type === 'area' &&
      (selectedVal.length === 3 || selectedVal[0] !== 'area')
    ) {
      newTitleSelectedStatus[type] = true
    } else if (type === 'mode' && selectedVal[0] !== 'null') {
      newTitleSelectedStatus[type] = true
    } else if (type === 'price' && selectedVal[0] !== 'null') {
      newTitleSelectedStatus[type] = true
    } else if (type === 'more') {
      // 后面实现FilterMore后 再补充
      // newTitleSelectedStatus[type] = false
    } else {
      newTitleSelectedStatus[type] = false
    }
    this.setState({
      openType: '',
      titleSelectedStatus: newTitleSelectedStatus
    })
  }
  //保存按钮
  onSave = (value, type) => {

    const { titleSelectedStatus } = this.state
    const newTitleSelectedStatus = { ...titleSelectedStatus }
    // 这里需要注意-> 其实形参value就是选中的Picker里面的数据 ["值"]
    const selectedVal = value

    if (
      type === 'area' &&
      (selectedVal.length === 3 || selectedVal[0] !== 'area')
    ) {
      newTitleSelectedStatus[type] = true
    } else if (type === 'mode' && selectedVal[0] !== 'null') {
      newTitleSelectedStatus[type] = true
    } else if (type === 'price' && selectedVal[0] !== 'null') {
      newTitleSelectedStatus[type] = true
    } else if (type === 'more') {
      // 后面实现FilterMore后 再补充
      // newTitleSelectedStatus[type] = false
    } else {
      newTitleSelectedStatus[type] = false
    }
    this.setState({
      openType: '',
      titleSelectedStatus: newTitleSelectedStatus,
      selectedValues: { ...this.state.selectedValues, [type]: value }
    })
  }

  // 渲染下拉列表
  renderFilterPicker = () => {
    const { openType, selectedValues, filterData: { area, rentType, price, subway } } = this.state
    // onType 为前三个 展示筛选的条件
    if (openType === 'area' || openType === 'mode' || openType === 'price') {
      let data
      let cols = 1
      let defaultValue = selectedValues[openType]
      switch (openType) {
        case 'area':
          data = [area, subway]
          cols = 3
          break
        case 'mode':
          data = rentType
          break
        case 'price':
          data = price
          break
        default:
          break
      }
      return (
        <FilterPicker
          key={openType}
          type={openType}
          data={data}
          cols={cols}
          onCancel={this.onCancel}
          onSave={this.onSave}
          defaultValue={defaultValue} />
      )
    }
    else { return null }
  }

  render () {
    const { openType, titleSelectedStatus } = this.state
    return (

      <div className="filter">
        <div className={styles.content}>
          {/* 顶部搜索导航 */}
          <Flex className={styles.header}>
            <i
              className="iconfont icon-back"
              onClick={() => this.props.history.go(-1)}
            />
            <SearchHeader cityName={this.state.label} className={styles.searchHeader} />
          </Flex>
          {/* 标题 */}
          <FilterTitle titleSelectedStatus={titleSelectedStatus} onTitleClick={this.onTitleClick} />
          {/* 下拉条件列表 */}
          {this.renderFilterPicker()}
        </div>

        {/* 点击前三个展示模态层 */}
        {(openType === 'area' || openType === 'mode' || openType === 'price') && (
          <div
            className={styles.mask}
            onClick={() => {
              this.onCancel()
            }}>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Filter) 