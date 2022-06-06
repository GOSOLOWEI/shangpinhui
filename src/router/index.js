import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import {readToken,deleteToken} from '@/utils/auth'
import store from '@/store'
import {Message} from 'element-ui'

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

// 路由鉴权列表
const authPath = ['/trade','/pay','/paysuccess','/center']

//指定全局导航守卫
router.beforeEach(async(to,from,next)=>{
	//尝试读取本地token
	const token = readToken()
	//尝试读取vuex中的用户信息
	const {info} = store.state.user
	//根据token判断用户是否登录过
	if(token){
		//登录过，判断vuex中是否有用户信息
		if(info.id){
			//有用户信息，放行
			next()
		}else{
			//无用户信息
			try {
				//联系服务员，去获取用户信息
				await store.dispatch('getUserInfo')
				//放行
				next()
			} catch (error) {
				//删除本地token
				deleteToken()
				//放行到登录
				next('/login')
			}
		}
	}else{
		//没登录,不能访问敏感路由
		if(authPath.includes(to.path)){
			Message.warning('请您先登录！')
			next('/login?oldpath='+to.path)
		}else{
			next()
		}
	}
})

export default router