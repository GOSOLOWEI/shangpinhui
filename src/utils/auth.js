// 跟用户身份相关的代码，都写在这里
import {v4} from 'uuid'

//getUserTempId函数，专门用于生成一个用户临时标识
export function getUserTempId(){
	//尝试从localStorage中读取临时标识
	const userTempId = localStorage.getItem('userTempId')
	if(userTempId){
		// 读取出来了之前存进去的userTempId，返回直接给拦截器用
		return userTempId
	}else{
		// 没有读取出来了之前存进去的userTempId，生成一个
		// 何时会来到这里呢？可能：用户第一次用网站，或用户清空了浏览器缓存
		// 生成一个
		const newId = v4()
		// 将生成存入localStorage中 —— 为啥要写这一步？为了以后继续用。
		localStorage.setItem('userTempId',newId)
		// 将生成的返回出去 —— 为啥要写这一步？为了这次能用。
		return newId
	}
}

// 保存用户token到localStorage中
export function saveToken(token){
	localStorage.setItem('token',token)
}

// 从localStorage中读取用户token
export function readToken(){
	return localStorage.getItem('token')
}

// 从localStorage中删除用户token
export function deleteToken(){
	localStorage.removeItem('token')
}