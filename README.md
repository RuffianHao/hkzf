# 知识点梳理

## 执行

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## Object.keys

```js
var Arr = [1, 2, 3]
Object.keys(Arr) // 输出索引0,1,2
var Arr = [('a': [{ label: '', value: '' }]), ('b': [{ label: '', value: '' }])]
Object.keys(Arr) // 输出属性a,b
```

## If...in

```js
// 判断arr中是否存在a
const a = 1
const arr = [1, 2, 3, 4, 5, 6]
if (a in arr) {
}
```

## CSS module的使用







##  百度地图API

### 获取本地位置

```jsx
1.// 引入地图api
public->index.html 引入api
<script type="text/javascript" src="http://api.map.baidu.com/api?你的key">
2.// 创建BMap实例 
const myCity = new BMap.LocalCity()
3.// 获取位置 
mycity.get(result=>{
    console.log(result)
    当前地理位置 = result.name
})
```









## react-virtualized

### 作用:列表布局

### 使用

```js
// 安装
npm install react-virtualized
// 引入样式
import 'react-virtualized / styles.css'
//导入所需组件
import {Column, Table,Grid,List,AutoSizer} from 'react-virtualized';

// 1.获取城市列表
getCityList = async(){
    const res = await request.get('/area/city')
    // cityLisy 为城市列表 cityIndex 为城市首字母列表
   	const {cityList,cityIndex} = res.data.body
    //修改state内容
    this.setState({
        cityList,
        cityIndex,
        activeIndex: 0 //高亮索引
    })
}
// 创建一个ref对象,为了获取滚动条进行操作
this.cityListComponent = React.createRef()
componentDidmount(){
	// 调用 measureAllRows，提前计算 List 中每一行的高度，实现 scrollToRow 的精确跳转 
 	this.cityListComponent.current.measureAllRows()
}
// 渲染行中内容
// key 行内唯一标识
// index 索引
// isScorlling 这行正在滚动.....
// isVisible 这行是否可见
// style 样式
rowRenderer({key,index,isScrolling,isVisible,style})=>{
    const {cityIndex,cityList} = this.state
    const letter = cityIndex[index]
    return (
    	<div key={key} style={style}>  // 添加唯一标识
        	<div className="title"> // title 首字符分类a,b,c
        		{letter}
			</div>
			{
                cityList[letter].map(item=>(
                	<div className="name" key={iten.value} onClick={()=>{this.changeCity(item)}}> // 每一组中的每一行 changeCity 为改变定位方法
                    {item.lable} // label 为城市名字 value 唯一比标识
                    </div>

                ))
            }
        </div>
    )
}

// 获取list组件中 渲染行的内容 滚动条滚动 顶部索引改变时执行
onRowsRendered = ({startIndex}) => {
    // startIndex ====> 顶部开始的行索引
    // activeIndex ====> 当前选中的右侧行索引
    if( this.state.activeIndex !== startIndex ) {
        this.setState=({
            activeIndex:startIndex // 获取当前开始的索引
        })
    }
}


// 渲染右侧索引列表
renderCityIndex(){
    const {cityIndex,activeIndex} = this.state
    return cityIndex.map((item.index)=>{
        <li :key={index} onClick={()=>{
            // scrollToRow(number) 行索引以确保可见（必要时通过强制滚动）
            // 点击时使滚动条发生改变
            this.cityListComponent.current.scrollToRow(index)
        }}>
            // 改变样式
            <span className={activeIndex === index ? 'index-active' :''}>		
        		{item}

			</span>
        </li>
    })
}



// 使用List列表布局
// AutoSizer 为自动调整大小
<AutoSizer>
    {({widt,height})=>{
        <List
		ref = {this.cityListComponent}
		width = {width}
		height = {height}
		rowCount = {this.state.cityIndex.length} //多少行 列表中的行数
		RowRender = {this.rowRenderer} // 行中内容 组件 需要渲染的 负责渲染行。
        onRowsRendered={this.onRowsRendered} // 渲染的行内消息的回调信息参数:{startIndex: number, stopIndex: number }// 开始索引,结束索引
        scrollToAlignment="start" //控制滚动到单元格的对齐方式。默认值（“ auto ”）滚动最少的量，以确保指定的单元格完全可见。使用“ start ”始终对准细胞顶端/左的Grid和“ end ”来调节它们底部/右。使用“ center ”在容器的中间对齐指定的单元格。
	/>
    }}
</AutoSizer>
<ul>{this.renderCityIndex()}</ul>

```
