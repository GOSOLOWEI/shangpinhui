import Vue from 'vue';
import VeeValidate,{ Validator } from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import {phoneReg,codeReg,pwdReg} from '@/utils/reg'

Vue.use(VeeValidate);
Validator.localize('zh_CN', zh_CN);

// 自定义一个校验手机的正则
Validator.extend('phone_rule', {
	//getMessage什么时候调用？ —— 当校验不通过的时候
  getMessage: field => {
		// console.log('看看field是谁？',field)
		return '手机号不合法'
	},
	//validate什么时候调用？—— 要校验的输入框，每次输入东西的时候
  validate: value => { //value是我们输入的值
		// console.log('你输入的value是',value)
		return phoneReg.test(value)
	}
});

//验证必要性的规则
Validator.extend('required', {
	//验证规则
	validate:(value)=>{ //value你输入的值
		return value
	},
	//验证失败的回调
  getMessage: (field) => { 
		return field + '必须输入！'
	}, 
});

//验证码的验证规则
Validator.extend('code_rule', {
	//验证规则
	validate: value => codeReg.test(value),
	//验证失败的回调
  getMessage: filed => '验证码必须为6位数字！', 
});

//密码的验证规则
Validator.extend('pwd_rule', {
	//验证规则
	validate: value => pwdReg.test(value),
	//验证失败的回调
  getMessage: filed => '密码为6到21位英文、数字、下划线', 
});

//重复密码的验证规则
Validator.extend('ispwd', {
	//验证规则
	validate: (value,args) => value === args[0],
	//验证失败的回调
  getMessage: filed => '重复密码必须和登录密码一致', 
});

//协议规则
Validator.extend('isagree', {
	//验证规则
	validate: value => value,
	//验证失败的回调
  getMessage: filed => '协议必须同意！', 
});