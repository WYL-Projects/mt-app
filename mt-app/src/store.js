import Vue from 'vue'
import Vuex from 'vuex'
import api from './api/api.js'
Vue.use(Vuex)
// 主页模块
const index = {
  namespaced: true,
  state: {
    // 地理位置
    position: '北京',
    searchWord: '',
    // 有格调的数据，全部这标签的数据
    hasStyleList: null,
    allList: [],
    userName: ''
  },
  mutations: {
    setSearchWord (state, data) {
    // console.log(state)
      state.searchWord = data
    },
    setPosition (state, data) {
      // console.log(state)
      state.position = data
    },
    setHasStyleList (state, data) {
      state.hasStyleList = data
    },
    setAllList (state, data) {
      state.allList = data
    },
    setUserName (state, data) {
      state.userName = data
    }
  },
  actions: {
    setHasStyleList (context) {
      console.log(context)
      api.getHasStyleList().then(res => {
        if (res.data.status == 'fail') {
          alert(res.data.msg)
          return
        }
        console.log(res.data.data)
        context.commit('setHasStyleList', res.data.data)
        context.commit('setAllList', res.data.data.all)
      }, rej => {
        console.log(rej)
      })
    }
  }
}
const store = new Vuex.Store({
  modules: {
    index
  }
})
export default store
