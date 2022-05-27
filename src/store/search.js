import {reqSearchInfo} from '@/api'

const actions = {
	//专门用于搜索
	async getSearchInfo({commit},searchParams){
		let result = await reqSearchInfo(searchParams)
		if(result.code === 200){
			commit('SAVE_SEARCH_INFO',result.data)
		}else{
			alert(result.message)
		}
	}
}

const mutations = {
	SAVE_SEARCH_INFO(state,value){
		state.searchInfo = value
	}
}

const state = {
	searchInfo:{} //存储搜索结果
}

const getters = {}

export default {
	actions,
	mutations,
	state,
	getters
}