import {reqCategoryList,reqSlideList,reqFloorList} from '@/api'

//用于响应组件中的“动作”  —— 服务员
const actions = {
	//专门用于获取首页三级分类列表
	async getCategoryList({commit}){
		//发起请求，获取三级分类数据
		let result = await reqCategoryList()
		//根据服务器返回的state属性，判断是否获取成功
		if(result.code === 200){ //代码只要走到这一行，就证明响应一定是成功的！需要进一步判断，业务逻辑是否成功！
			// 若获取成功，联系mutation，将数据存入state
			commit('SAVE_CATEGORY_LIST',result.data.slice(0,15))
		}else{
			// 若获取失败，提示失败的原因
			alert(result.message)
		}
	},
	//专门用于获取轮播图数据
	async getSlideList({commit}){
		let result = await reqSlideList()
		// 判断是否获取成功
		if(result.code === 200){
			//若成功，联系对应的muatation去存储数据
			commit('SAVE_SLIDE_LIST',result.data)
		}else{
			// 若获取不成功，提示原因
			alert(result.message)
		}
	},
	//专门用于获取轮楼层数据
	async getFloorList({commit}){
		let result = await reqFloorList()
		if(result.code === 200){
			commit('SAVE_FLOOR_LIST',result.data)
		}else{
			alert(result.message)
		}
	}
}

//用于真正操作数据  —— 厨师
const mutations = {
	//存储分类数据，下面SAVE_CATEGORY_LIST收到的state，只是home的state，注意不是总的state
	SAVE_CATEGORY_LIST(state,value){
		state.categoryList = value
	},
	//存储轮播图数据
	SAVE_SLIDE_LIST(state,value){
		state.slideList = value
	},
	//存储楼层数据
	SAVE_FLOOR_LIST(state,value){
		state.floorList = value
	}
}

//初始化的数据 —— 原材料
const state = {
	categoryList:[], //三级分类数据
	slideList:[], //轮播图数据
	floorList:[]
}

//vuex层面的计算属性
const getters = {}

export default {
	actions,
	mutations,
	state,
	getters
}