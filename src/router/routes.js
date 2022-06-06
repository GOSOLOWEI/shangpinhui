//该文件专门用于管理整个项目的 路由规则
//引入路由组件
// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Search from '@/pages/Search'
// import Test from '@/pages/Test'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import Cart from '@/pages/Cart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'

//懒加载引入
const Home = ()=> import('@/pages/Home')
const Login = ()=> import('@/pages/Login')
const Register = ()=> import('@/pages/Register')
const Search = ()=> import('@/pages/Search')
const Detail = ()=> import('@/pages/Detail')
const AddCartSuccess = ()=> import('@/pages/AddCartSuccess')
const Cart = ()=> import('@/pages/Cart')
const Trade = ()=> import('@/pages/Trade')
const Pay = ()=> import('@/pages/Pay')
const PaySuccess = ()=> import('@/pages/PaySuccess')
const Center = ()=> import('@/pages/Center')
const Test = ()=> import('@/pages/Test')


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
		name:'addcart_success',
		path:'/addcart_success',
		component:AddCartSuccess,
		//只要命中该路由规则，beforeEnter就会执行
		//目标：只有从/detail  才能到 此处
		beforeEnter(to, from, next) {
			if(from.path.slice(0,7) === '/detail'){
				next()
			}else{
				next('/home')
			}
		},
	},
	{
		name:'cart',
		path:'/cart',
		component:Cart,
	},
	{
		name:'trade',
		path:'/trade',
		component:Trade,
	},
	{
		name:'pay',
		path:'/pay',
		component:Pay,
		beforeEnter(to, from, next) {
			if(from.path === '/trade'){
				next()
			}else{
				next('/home')
			}
		},
	},
	{
		name:'paysuccess',
		path:'/paysuccess',
		component:PaySuccess,
	},
	{
		name:'center',
		path:'/center',
		component:Center,
	},
	{
		path:'/',
		redirect:'/home'
	}
]