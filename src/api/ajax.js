/* 
	该文件是对axios的二次封装，先实现：
			1.请求进度条效果
			2.统一处理所有请求的错误
			3.返回真正的数据(data)
			4.配置超时时间
			备注：该文件的封装，专门用于请求真实服务器，体现在baseURL上
*/

import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import {getUserTempId,readToken} from '@/utils/auth'
import store from '@/store'
import {Message} from 'element-ui'

//创建axios实例
const ajax = axios.create({
	baseURL:'/api', //请求基本路径
	timeout:5000 //超时时间
})

//请求拦截器
ajax.interceptors.request.use((config)=>{
	nprogress.start() //进度条开始走
	// 尝试从localStorage中读取token
	const token = readToken()
	// 若有token，就证明用户成功登录过
	if(token){
		config.headers.token = token
	}
	// 携带临时标识
	config.headers.userTempId = getUserTempId()
	return config
})

// 响应拦截器
ajax.interceptors.response.use(
	(response)=>{ //响应成功的回调
		nprogress.done() //进度条停止
		if(response.data.code === 208){
			// 触发退出登录
			store.dispatch('logout')
			// 提示
			Message.warning('身份已过期，请重新登录！')
			return new Promise(()=>{})
		}else{
			return response.data //返回真正的数据
		}
	},
	//响应失败的回调（服务器宕机、服务器过于繁忙无法响应等等）
	(error)=>{
		nprogress.done() //进度条停止
		alert(error)
		return new Promise(()=>{}) //这么写会引起：中断Promise链，好处在于：程序员不用再写失败的回调了
	}
)

export default ajax