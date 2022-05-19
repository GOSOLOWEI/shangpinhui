import Vue from 'vue'
import VueRouter from 'vue-router'
//引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Test from '@/pages/Test'

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
	routes:[
		{
			name:'home',
			path:'/home',
			component:Home,
		},
		{
			name:'login',
			path:'/login',
			component:Login,
			meta:{isHiddenFooter:true}
		},
		{
			name:'register',
			path:'/register',
			component:Register,
			meta:{isHiddenFooter:true}
		},
		{
			name:'search',
			path:'/search',
			component:Search,
		},
		{
			name:'test',
			path:'/test',
			component:Test,
		},
		{
			path:'/',
			redirect:'/home'
		}
	]
})

export default router