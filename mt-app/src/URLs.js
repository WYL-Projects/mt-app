import axios from 'axios'
const URLs = {
  // 主页搜索框
  searchList: '/api/meituan/header/search.json',
  hotList: '/api/meituan/header/searchHotWords.json',
  menuList: '/api/meituan/index/nav.json', // 主页-中间左边的菜单栏
  hasStyleList: '/api/meituan/index/resultsByKeywords.json', // 主页-有格调区域
  provinceList: '/api/meituan/city/province.json', // 切换城市页-获取省份列表
  recentSearchCityList: '/api/meituan/city/recents.json', // 切换城市页-获取最近搜索城市的列表
  goodsList: 'api/meituan/list/goodsList.json', // 详情页-产品展示列表数据获取
  classifyList: '/api/meituan/list/classify.json', // 详情-页获取分类列表
  areaList: '/api/meituan/list/areaList.json', // 详情页-获取区域列
  register: '/api/meituan/register', // 注册
  login: '/api/meituan/login'// 登录
}
// eslint-disable-next-line one-var
const appkey = '_411771204WYL_1555650312097',
  baseURL = 'http://api.duyiedu.com'
// 拦截器，当请求未成功之前，对请求接口地址添加appkey
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // console.log(config.params)
  config.baseURL = baseURL
  config.params = {
    ...config.params,
    appkey
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export {URLs}
