"use strict";(self["webpackChunksph_21_1227"]=self["webpackChunksph_21_1227"]||[]).push([[454],{9454:function(e,t,s){s.r(t),s.d(t,{default:function(){return d}});var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"login-container"},[s("div",{staticClass:"login-wrap"},[s("div",{staticClass:"login"},[s("div",{staticClass:"loginform"},[s("div",{staticClass:"content"},[s("form",[s("div",{staticClass:"input-text clearFix"},[s("span"),s("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"}],attrs:{type:"text",placeholder:"手机号"},domProps:{value:e.phone},on:{input:function(t){t.target.composing||(e.phone=t.target.value)}}})]),s("div",{staticClass:"input-text clearFix"},[s("span",{staticClass:"pwd"}),s("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{type:"text",placeholder:"请输入密码"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),s("button",{staticClass:"btn",on:{click:function(t){return t.preventDefault(),e.handleLogin.apply(null,arguments)}}},[e._v("登  录")])]),s("div",{staticClass:"call clearFix"},[s("router-link",{staticClass:"register",attrs:{to:"/register"}},[e._v("立即注册")])],1)])])])]),e._m(0)])},n=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"copyright"},[s("ul",[s("li",[e._v("关于我们")]),s("li",[e._v("联系我们")]),s("li",[e._v("联系客服")]),s("li",[e._v("商家入驻")]),s("li",[e._v("营销中心")]),s("li",[e._v("手机尚品汇")]),s("li",[e._v("销售联盟")]),s("li",[e._v("尚品汇社区")])]),s("div",{staticClass:"address"},[e._v("地址：北京市昌平区宏福科技园综合楼6层")]),s("div",{staticClass:"beian"},[e._v("京ICP备19006430号 ")])])}],r=s(6198),i=(s(8975),s(5892)),o=s(1753),l={name:"Login",data:function(){return{phone:"",password:""}},methods:{handleLogin:function(){var e=this;return(0,r.Z)(regeneratorRuntime.mark((function t(){var s,a,n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return s=e.phone,a=e.password,t.next=3,(0,i.yq)({phone:s,password:a});case 3:n=t.sent,200===n.code?((0,o.Fr)(n.data.token),e.$message.success("登录成功！"),r=e.$route.query.oldpath,r?e.$router.push(r):e.$router.push("/home")):e.$message.warning(n.message);case 5:case"end":return t.stop()}}),t)})))()}}},c=l,u=s(1001),p=(0,u.Z)(c,a,n,!1,null,"923edc92",null),d=p.exports}}]);
//# sourceMappingURL=454-legacy.f1609111.js.map