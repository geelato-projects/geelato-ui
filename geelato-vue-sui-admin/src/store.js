import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const types = {
  ROUTE_VIEW_KEY: 'route_view_key',
  CHANGE_PROFILE: 'change_profile',
  LOGIN: 'login',
  LOGOUT: 'logout',
  CHANGE_MODULE: 'change_module',
  CHANGE_HEADER_TITLE: 'change_header_title',
  CHANGE_LAYOUT: 'change_layout'
}

export default new Vuex.Store({
  state: {
    // 平台的一些配置信息
    platform: {
      // 用于刷新路由
      routeViewKey: '1',
      currentModule: {},
      currentLayout: {content: {height: ''}},
      // 页面上方展示的信息，可为HTML格式
      headerTitle: ''
    },
    // 当前用户信息
    user: {},
    // 当前用户信息
    profile: {
      user: {},
      userConfig: {},
      modules: [],
      commonConfig: {}
    }
  },
  mutations: {
    [types.ROUTE_VIEW_KEY]: (state, data) => {
      state.platform.routeViewKey = data
    },
    [types.LOGIN]: (state, data) => {
      // localStorage.user = JSON.stringify(data.user)
      state.user = data.user
    },
    [types.LOGOUT]: (state) => {
      state.user = {}
    },
    [types.CHANGE_LAYOUT]: (state, data) => {
      state.platform.currentLayout = data
    },
    [types.CHANGE_PROFILE]: (state, data) => {
      state.profile = data
    },
    [types.CHANGE_MODULE]: (state, data) => {
      state.platform.currentModule = data
      console.log('state.platform.currentModule>', state.platform.currentModule)
    },
    [types.CHANGE_HEADER_TITLE]: (state, data) => {
      state.platform.headerTitle = data
    }
  }
})

