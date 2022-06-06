import {reqUserInfo,reqLogout} from '@/api'
import {deleteToken} from '@/utils/auth'
import {Message} from 'element-ui';
import router from '@/router'

//用于响应组件中的“动作”  —— 服务员
const actions = {
	// 根据token获取用户信息（token已经在请求头中携带了）
	async getUserInfo({commit}){
		// 发请求获取用户信息
		const result = await reqUserInfo()
		// 判断业务逻辑是否成功
		if(result.code === 200){
			commit('SAVE_USER_INFO',result.data)
			// return undefined 
		}else{
			Message.warning('请重新登录！')
			return Promise.reject()
		}
	},
	// 退出登录
	async logout({commit}){
		// 请求退出登录
		const result = await reqLogout()
		// 判断业务逻辑是否成功
		if(result.code === 200){
			// 联系mutations清空用户信息
			commit('CLEAR_USER_INFO')
			// 清空本地的token
			deleteToken()
			// 跳转到login
			router.push('/login')
		}else{
			// 就目前我们的尚品汇服务器来说，永远不会存在，退出登录失败。
			Message.warning(result.message)
		}
	}
}

//用于真正操作数据  —— 厨师
const mutations = {
	SAVE_USER_INFO(state,value){
		state.info = value
	},
	CLEAR_USER_INFO(state){
		state.info = {}
	}
}

//初始化的数据 —— 原材料
const state = {
	info:{}
}

//vuex层面的计算属性
const getters = {}

export default {
	actions,
	mutations,
	state,
	getters
}