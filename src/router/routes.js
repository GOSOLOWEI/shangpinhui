//该文件专门用于管理整个项目的 路由规则
//引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Test from '@/pages/Test'
import Detail from '@/pages/Detail'

export default [
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
		name:'detail',
		path:'/detail/:id',
		component:Detail,
	},
	{
		path:'/',
		redirect:'/home'
	}
]