import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import TypeNav from './components/TypeNav'
import Pagination from './components/Pagination'
import './mock'
import {Loading,MessageBox,Notification,Message} from 'element-ui';
import './utils/validate'
import VueLazyload from 'vue-lazyload'
import picture from '@/assets/images/loading.gif'

Vue.config.productionTip = false
Vue.use(VueLazyload,{
	loading:picture
})
//全局注册TypeNav组件
Vue.component('TypeNav',TypeNav)
Vue.component('Pagination',Pagination)
// elementui提示类组件，放在原型上
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;


new Vue({
	el: '#app',
	render: h => h(App),
	beforeCreate(){
		Vue.prototype.$bus = this
	},
	router,
	store
})