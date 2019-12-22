// 获取当前city的信息的模块

import {
    setCity,
    getCity,
} from './isCity.js'
import {
    getAreaInfo
} from '../pages/Index/api.js'
const {
    BMap
} = window

export const getCurrCity = () => {
    // 如果本地有定位城市信息
    const currCity = getCity()

    if (!currCity) {
        return new Promise((resolve, reject) => {
            const myCity = new BMap.LocalCity()
            myCity.get(async result => {
                const cityName = result.name
                const {
                    data
                } = await getAreaInfo(cityName)
                const {
                    body: {
                        value,
                        label
                    },
                } = data
                setCity({
                    label,
                    value,
                })
                resolve({
                    label,
                    value,
                })
            })
        })
    } else {
        return Promise.resolve(currCity)
    }
}