import axios from 'axios'
import {URLs} from '../URLs.js'
const request = {
  getSearchList (params) {
    return axios.get(URLs.searchList, params)
  },
  getHotCities (params) {
    return axios.get(URLs.hotList, params)
  },
  getMenuList (params) {
    return axios.get(URLs.menuList, params)
  },
  getHasStyleList (params) {
    return axios.get(URLs.hasStyleList, params)
  },
  getProvinceList (params) {
    return axios.get(URLs.provinceList, params)
  },
  getRecentsCityList (params) {
    return axios.get(URLs.recentSearchCityList, params)
  },
  getGoodsList (params) {
    return axios.get(URLs.goodsList, params)
  },
  getClassifyList (params) {
    return axios.get(URLs.classifyList, params)
  },
  getAreaList (params) {
    return axios.get(URLs.areaList, params)
  },
  register (params) {
    return axios.get(URLs.register, {params})
  },
  login (params) {
    return axios.get(URLs.login, {params})
  }
}
export default request
