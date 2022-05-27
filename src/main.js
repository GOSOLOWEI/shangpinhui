import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import TypeNav from './components/TypeNav'
import Pagination from './components/Pagination'
import './mock'

Vue.config.productionTip = false
//全局注册TypeNav组件
Vue.component('TypeNav',TypeNav)
Vue.component('Pagination',Pagination)

new Vue({
	el: '#app',
	render: h => h(App),
	beforeCreate(){
		Vue.prototype.$bus = this
	},
	router,
	store
})