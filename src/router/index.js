import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

// 第一步：将原始的push保存一份
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

// 第二步：将VueRouter.prototype.push做增强
VueRouter.prototype.push = function(location,okCallback,errCallback){
	//若使用push的人没有传递：成功的回调，失败的回调
	if(okCallback === undefined && errCallback === undefined){
		return originPush.call(this,location).catch(()=>{})
	}else{
		return originPush.call(this,location,okCallback,errCallback)
	}
}

// 第三步：将VueRouter.prototype.replace做增强
VueRouter.prototype.replace = function(location,okCallback,errCallback){
	//若使用push的人没有传递：成功的回调，失败的回调
	if(okCallback === undefined && errCallback === undefined){
		return originReplace.call(this,location).catch(()=>{})
	}else{
		return originReplace.call(this,location,okCallback,errCallback)
	}
}

//创建路由器
const router = new VueRouter({
	mode:'history',
	routes,
	//scrollBehavior函数会在:项目一加载执行、以后每次路由跳转时执行
	scrollBehavior (to, from, savedPosition) {
		// 严重注意：savedPosition当且仅当我们进行浏览器的前进、后退是才有值
		if(savedPosition) {
			//用户绝对是点击了：前进 或 后退按钮，一定是想刚才的东西
			return savedPosition
		} else {
			//正常跳转路由，直接进度条归为
			return { x: 0, y: 0 }
		}
  }
})

export default router