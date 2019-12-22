// 设置城市
const CURR_CITY = 'curr_city'

export const setCity = currCity =>
    window.localStorage.setItem(CURR_CITY, JSON.stringify(currCity))

// 获取城市

export const getCity = () => JSON.parse(window.localStorage.getItem(CURR_CITY))

// 移除城市
export const removeCity = () => window.localStorage.removeItem(CURR_CITY)