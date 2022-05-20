/* 
	该文件是对axios的二次封装，先实现：
			1.请求进度条效果
			2.统一处理所有请求的错误
			3.返回真正的数据(data)
			4.配置超时时间
			备注：该文件的封装，专门用于请求模拟数据，体现在baseURL上
*/

import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

//创建axios实例
const ajax = axios.create({
	baseURL:'http://www.1227.com', //请求基本路径
	timeout:5000 //超时时间
})

//请求拦截器
ajax.interceptors.request.use((config)=>{
	nprogress.start() //进度条开始走
	return config
})

// 响应拦截器
ajax.interceptors.response.use(
	(response)=>{ //响应成功的回调
		nprogress.done() //进度条停止
		return response.data //返回真正的数据
	},
	//响应失败的回调（服务器宕机、服务器过于繁忙无法响应等等）
	(error)=>{
		nprogress.done() //进度条停止
		//第一种写法
		// return Promise.reject(error)  //这么写会引起：程序员指定的失败回调执行

		//第二种写法
		// throw error //这么写会引起：程序员指定的失败回调执行

		//第三种写法
		alert(error)
		return new Promise(()=>{}) //这么写会引起：中断Promise链，好处在于：程序员不用再写失败的回调了
	}
)

export default ajax