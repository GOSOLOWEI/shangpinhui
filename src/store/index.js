import Vue from 'vue'
import vuex from 'vuex'
import home from './home'
import user from './user'
import search from './search'

//使用插件
Vue.use(vuex)

//用于响应组件中的“动作”  —— 服务员
const actions = {}

//用于真正操作数据  —— 厨师
const mutations = {}

//初始化的数据 —— 原材料
const state = {}

//vuex层面的计算属性
const getters = {}

//创建store
const store = new vuex.Store({
	actions,
	mutations,
	state,
	getters,
	modules:{
		home,
		user,
		search
	}
})

//暴露store
export default store