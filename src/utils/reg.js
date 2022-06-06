// 项目中用到的所有正则表达式，均在此配置、统一管理

export const goodNumReg = /^([1-9]|[1-9]\d|1\d{2}|200)$/
//手机号正则
export const phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
//验证码正则
export const codeReg = /^\d{6}$/
//密码正则
export const pwdReg = /^\w{6,21}$/