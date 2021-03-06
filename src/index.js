/*
 * @Description:
 * @Date: 2019-12-20 10:39:07
 * @LastEditTime : 2019-12-23 14:38:58
 */
import React from 'react'
import ReactDOM from 'react-dom'
import 'react-virtualized/styles.css'
import 'antd-mobile/dist/antd-mobile.css'
// 导入字体图标库的样式文件
import './assets/fonts/iconfont.css'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
