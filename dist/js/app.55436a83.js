(function(){"use strict";var t={5892:function(t,e,a){a.d(e,{Az:function(){return y},yf:function(){return E},S3:function(){return b},ix:function(){return m},NC:function(){return k},CL:function(){return C},aE:function(){return S},_F:function(){return h},mj:function(){return w},yq:function(){return L},uf:function(){return $},Zk:function(){return F},pQ:function(){return T},OS:function(){return Z},Mv:function(){return I},w1:function(){return _},_o:function(){return x},a8:function(){return v},ET:function(){return A},y7:function(){return O},Co:function(){return P},dW:function(){return N}});var r=a(7349),n=a.n(r),o=a(6166),s=a.n(o),i=a(9879),c=a.n(i),u=a(1753),l=a(2755);const d=s().create({baseURL:"/api",timeout:5e3});d.interceptors.request.use((t=>{c().start();const e=(0,u.YG)();return e&&(t.headers.token=e),t.headers.userTempId=(0,u.tS)(),t})),d.interceptors.response.use((t=>(c().done(),208===t.data.code?(l.Z.dispatch("logout"),n().warning("身份已过期，请重新登录！"),new Promise((()=>{}))):t.data)),(t=>(c().done(),alert(t),new Promise((()=>{})))));var p=d;const f=s().create({baseURL:"http://www.1227.com",timeout:5e3});f.interceptors.request.use((t=>(c().start(),t))),f.interceptors.response.use((t=>(c().done(),t.data)),(t=>(c().done(),alert(t),new Promise((()=>{})))));var g=f;const m=()=>p.get("/product/getBaseCategoryList"),v=()=>g.get("/slide"),h=()=>g.get("/floor"),_=t=>p.post("/list",t),w=t=>p.get("/item/"+t),y=(t,e)=>p.post(`/cart/addToCart/${t}/${e}`),b=()=>p.get("/cart/cartList"),C=(t,e)=>p.get(`/cart/checkCart/${t}/${e}`),k=(t,e)=>p.post(`/cart/batchCheckCart/${e}`,t),S=t=>p["delete"](`/cart/deleteCart/${t}`),E=t=>p.post("/cart/batchDeleteCart",t),x=t=>p.get(`/user/passport/sendCode/${t}`),I=t=>p.post("/user/passport/register",t),L=t=>p.post("/user/passport/login",t),N=()=>p.get("/user/passport/auth/getUserInfo"),$=()=>p.get("/user/passport/logout"),P=()=>p.get("/user/userAddress/auth/findUserAddressList"),O=()=>p.get("/order/auth/trade"),A=(t,e)=>p.post(`/order/auth/submitOrder?tradeNo=${t}`,e),T=t=>p.get(`/payment/weixin/createNative/${t}`),Z=t=>p.get(`/payment/weixin/queryPayStatus/${t}`),F=(t,e)=>p.get(`/order/auth/${t}/${e}`)},7838:function(t,e,a){var r=a(7349),n=a.n(r),o=a(7622),s=a.n(o),i=a(2747),c=a.n(i),u=a(8307),l=a.n(u),d=a(8935),p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app"},[a("Header"),a("router-view"),a("Footer",{directives:[{name:"show",rawName:"v-show",value:!t.$route.meta.isHiddenFooter,expression:"!$route.meta.isHiddenFooter"}]})],1)},f=[],g=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("header",{staticClass:"header"},[r("div",{staticClass:"top"},[r("div",{staticClass:"container"},[r("div",{staticClass:"loginList"},[r("p",[t._v("尚品汇欢迎您！")]),r("p",{directives:[{name:"show",rawName:"v-show",value:t.info.id,expression:"info.id"}]},[r("span",[t._v(t._s(t.info.nickName))]),r("a",{staticClass:"register",on:{click:t.handleLogout}},[t._v("退出登录")]),r("router-link",{staticClass:"register",attrs:{to:"/test"}},[t._v("测试")])],1),r("p",{directives:[{name:"show",rawName:"v-show",value:!t.info.id,expression:"!info.id"}]},[r("span",[t._v("请")]),r("router-link",{attrs:{to:"/login"}},[t._v("登录")]),r("router-link",{staticClass:"register",attrs:{to:"/register"}},[t._v("免费注册")])],1)]),r("div",{staticClass:"typeList"},[r("router-link",{attrs:{to:"/center"}},[t._v("我的订单")]),r("router-link",{attrs:{to:"/cart"}},[t._v("我的购物车")]),r("a",{attrs:{href:"###"}},[t._v("我的尚品汇")]),r("a",{attrs:{href:"###"}},[t._v("尚品汇会员")]),r("a",{attrs:{href:"###"}},[t._v("企业采购")]),r("a",{attrs:{href:"###"}},[t._v("关注尚品汇")]),r("a",{attrs:{href:"###"}},[t._v("合作招商")]),r("a",{attrs:{href:"###"}},[t._v("商家后台")])],1)])]),r("div",{staticClass:"bottom"},[r("h1",{staticClass:"logoArea"},[r("router-link",{staticClass:"logo",attrs:{title:"尚品汇",to:"/home"}},[r("img",{attrs:{src:a(587),alt:""}})])],1),r("div",{staticClass:"searchArea"},[r("form",{staticClass:"searchForm"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.keyword,expression:"keyword"}],staticClass:"input-error input-xxlarge",attrs:{type:"text",id:"autocomplete"},domProps:{value:t.keyword},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:(e.preventDefault(),t.toSearch.apply(null,arguments))},input:function(e){e.target.composing||(t.keyword=e.target.value)}}}),r("button",{staticClass:"sui-btn btn-xlarge btn-danger",attrs:{type:"button"},on:{click:t.toSearch}},[t._v("搜索")])])])])])},m=[],v=a(4665),h={name:"Header",data(){return{keyword:void 0}},computed:{...(0,v.rn)({info:t=>t.user.info})},methods:{toSearch(){const{query:t}=this.$route;this.$router.push({path:"/search",query:{...t,keyword:this.keyword}})},handleLogout(){confirm("确定退出登录吗？")&&this.$store.dispatch("logout")}},mounted(){this.$bus.$on("clear-keyword",(()=>{this.keyword=void 0}))},beforeDestroy(){this.$bus.$off("clear-keyword")}},_=h,w=a(1001),y=(0,w.Z)(_,g,m,!1,null,"42b97cd8",null),b=y.exports,C=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},k=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"footer"},[r("div",{staticClass:"footer-container"},[r("div",{staticClass:"footerList"},[r("div",{staticClass:"footerItem"},[r("h4",[t._v("购物指南")]),r("ul",{staticClass:"footerItemCon"},[r("li",[t._v("购物流程")]),r("li",[t._v("会员介绍")]),r("li",[t._v("生活旅行/团购")]),r("li",[t._v("常见问题")]),r("li",[t._v("购物指南")])])]),r("div",{staticClass:"footerItem"},[r("h4",[t._v("配送方式")]),r("ul",{staticClass:"footerItemCon"},[r("li",[t._v("上门自提")]),r("li",[t._v("211限时达")]),r("li",[t._v("配送服务查询")]),r("li",[t._v("配送费收取标准")]),r("li",[t._v("海外配送")])])]),r("div",{staticClass:"footerItem"},[r("h4",[t._v("支付方式")]),r("ul",{staticClass:"footerItemCon"},[r("li",[t._v("货到付款")]),r("li",[t._v("在线支付")]),r("li",[t._v("分期付款")]),r("li",[t._v("邮局汇款")]),r("li",[t._v("公司转账")])])]),r("div",{staticClass:"footerItem"},[r("h4",[t._v("售后服务")]),r("ul",{staticClass:"footerItemCon"},[r("li",[t._v("售后政策")]),r("li",[t._v("价格保护")]),r("li",[t._v("退款说明")]),r("li",[t._v("返修/退换货")]),r("li",[t._v("取消订单")])])]),r("div",{staticClass:"footerItem"},[r("h4",[t._v("特色服务")]),r("ul",{staticClass:"footerItemCon"},[r("li",[t._v("夺宝岛")]),r("li",[t._v("DIY装机")]),r("li",[t._v("延保服务")]),r("li",[t._v("尚品汇E卡")]),r("li",[t._v("尚品汇通信")])])]),r("div",{staticClass:"footerItem"},[r("h4",[t._v("帮助中心")]),r("img",{attrs:{src:a(2552)}})])]),r("div",{staticClass:"copyright"},[r("ul",{staticClass:"helpLink"},[r("li",[t._v("关于我们 "),r("span",{staticClass:"space"})]),r("li",[t._v("联系我们 "),r("span",{staticClass:"space"})]),r("li",[t._v("关于我们 "),r("span",{staticClass:"space"})]),r("li",[t._v("商家入驻 "),r("span",{staticClass:"space"})]),r("li",[t._v("营销中心 "),r("span",{staticClass:"space"})]),r("li",[t._v("友情链接 "),r("span",{staticClass:"space"})]),r("li",[t._v("关于我们 "),r("span",{staticClass:"space"})]),r("li",[t._v("营销中心 "),r("span",{staticClass:"space"})]),r("li",[t._v("友情链接 "),r("span",{staticClass:"space"})]),r("li",[t._v("关于我们")])]),r("p",[t._v("地址：北京市昌平区宏福科技园综合楼6层")]),r("p",[t._v("京ICP备19006430号")])])])])}],S={name:"Footer"},E=S,x=(0,w.Z)(E,C,k,!1,null,"77bfaea2",null),I=x.exports,L={name:"App",components:{Header:b,Footer:I}},N=L,$=(0,w.Z)(N,p,f,!1,null,null,null),P=$.exports,O=a(7226),A=a(2755),T=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"type-nav"},[a("div",{staticClass:"container"},[a("div",{staticClass:"nav-left",on:{mouseleave:t.handleMouseLeave}},[a("h2",{staticClass:"all",on:{mouseenter:function(e){t.isShowSort=!0}}},[t._v("全部商品分类")]),a("transition",{attrs:{"enter-active-class":"animate__fadeIn","leave-active-class":"animate__fadeOut"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowSort,expression:"isShowSort"}],staticClass:"sort animate__animated"},[a("div",{staticClass:"all-sort-list2",on:{click:t.toSearch}},t._l(t.categoryList,(function(e){return a("div",{key:e.categoryId,staticClass:"item"},[a("h3",[a("a",{attrs:{"data-level":"1","data-id":e.categoryId}},[t._v(t._s(e.categoryName))])]),a("div",{staticClass:"item-list clearfix"},t._l(e.categoryChild,(function(e){return a("div",{key:e.categoryId,staticClass:"subitem"},[a("dl",{staticClass:"fore"},[a("dt",[a("a",{attrs:{"data-level":"2","data-id":e.categoryId}},[t._v(t._s(e.categoryName))])]),a("dd",t._l(e.categoryChild,(function(e){return a("em",{key:e.categoryId},[a("a",{attrs:{"data-level":"3","data-id":e.categoryId}},[t._v(t._s(e.categoryName))])])})),0)])])})),0)])})),0)])])],1),t._m(0)])])},Z=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",{staticClass:"nav"},[a("a",{attrs:{href:"###"}},[t._v("服装城")]),a("a",{attrs:{href:"###"}},[t._v("美妆馆")]),a("a",{attrs:{href:"###"}},[t._v("尚品汇超市")]),a("a",{attrs:{href:"###"}},[t._v("全球购")]),a("a",{attrs:{href:"###"}},[t._v("闪购")]),a("a",{attrs:{href:"###"}},[t._v("团购")]),a("a",{attrs:{href:"###"}},[t._v("有趣")]),a("a",{attrs:{href:"###"}},[t._v("秒杀")])])}],F={name:"TypeNav",data(){return{isShowSort:"/home"===this.$route.path}},computed:{...(0,v.rn)({categoryList:t=>t.home.categoryList})},mounted(){this.$store.dispatch("getCategoryList")},methods:{toSearch(t){const{level:e,id:a}=t.target.dataset,{innerText:r}=t.target;if(e){const{keyword:t}=this.$route.query;this.$router.push({path:"/search",query:{keyword:t,[`category${e}Id`]:a,categoryName:r}})}},handleMouseLeave(){"/home"!==this.$route.path&&(this.isShowSort=!1)}}},U=F,j=(0,w.Z)(U,T,Z,!1,null,"c6b2e484",null),R=j.exports,M=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"show",rawName:"v-show",value:t.total,expression:"total"}],staticClass:"pagination"},[a("button",{attrs:{disabled:1===t.pageNo},on:{click:function(e){return t.sendPageNo(t.pageNo-1)}}},[t._v("上一页")]),a("button",{directives:[{name:"show",rawName:"v-show",value:1!==t.startEnd.start,expression:"startEnd.start !== 1"}],on:{click:function(e){return t.sendPageNo(1)}}},[t._v("1")]),a("span",{directives:[{name:"show",rawName:"v-show",value:t.startEnd.start>2,expression:"startEnd.start > 2"}]},[t._v("···")]),t._l(t.startEnd.end-t.startEnd.start+1,(function(e,r){return a("button",{key:r,class:{active:r+t.startEnd.start===t.pageNo},on:{click:function(e){return t.sendPageNo(r+t.startEnd.start)}}},[t._v(" "+t._s(r+t.startEnd.start)+" ")])})),a("span",{directives:[{name:"show",rawName:"v-show",value:t.startEnd.end<t.totalPage-1,expression:"startEnd.end < totalPage - 1"}]},[t._v("···")]),a("button",{directives:[{name:"show",rawName:"v-show",value:t.startEnd.end!==t.totalPage,expression:"startEnd.end !== totalPage"}],on:{click:function(e){return t.sendPageNo(t.totalPage)}}},[t._v(t._s(t.totalPage))]),a("button",{attrs:{disabled:t.pageNo===t.totalPage},on:{click:function(e){return t.sendPageNo(t.pageNo+1)}}},[t._v("下一页")]),a("span",[t._v("共 "+t._s(t.total)+" 条")])],2)},V=[],q={name:"Pagination",props:["total","pageSize","pageNo","continues","sendPageNo"],computed:{totalPage(){return Math.ceil(this.total/this.pageSize)},startEnd(){let t=0,e=0;const{pageNo:a,continues:r,totalPage:n}=this;return r>n?(t=1,e=n):(t=a-(r-1)/2,e=a+(r-1)/2,t<1&&(t=1,e=r),e>n&&(t=n-r+1,e=n)),{start:t,end:e}}}},H=q,D=(0,w.Z)(H,M,V,!1,null,"10e62266",null),G=D.exports,X=a(3025),z=a.n(X),Y=JSON.parse('[{"id":"001","name":"家用电器","keywords":["节能补贴","4K电视","空气净化器","IH电饭煲","滚筒洗衣机","电热水器"],"imgUrl":"/images/floor-1-1.png","navList":[{"url":"http://www.atguigu.com","text":"热门"},{"url":"http://www.atguigu.com","text":"大家电"},{"url":"http://www.atguigu.com","text":"生活电器"},{"url":"http://www.atguigu.com","text":"厨房电器"},{"url":"http://www.atguigu.com","text":"应季电器"},{"url":"http://www.atguigu.com","text":"空气/净水"},{"url":"http://www.atguigu.com","text":"高端电器"}],"carouselList":[{"id":"0011","imgUrl":"/images/floor-1-b01.png"},{"id":"0012","imgUrl":"/images/floor-1-b02.png"},{"id":"0013","imgUrl":"/images/floor-1-b03.png"}],"recommendList":["/images/floor-1-2.png","/images/floor-1-3.png","/images/floor-1-5.png","/images/floor-1-6.png"],"bigImg":"/images/floor-1-4.png"},{"id":"002","name":"手机通讯","keywords":["高通骁龙","16核处理器","超高性价比","鸿蒙系统","以旧换新","免费升级"],"imgUrl":"/images/1_floor-1-1.png","navList":[{"url":"http://www.atguigu.com","text":"安卓机皇"},{"url":"http://www.atguigu.com","text":"热销爆品"},{"url":"http://www.atguigu.com","text":"性价比之王"},{"url":"http://www.atguigu.com","text":"华为钜惠"},{"url":"http://www.atguigu.com","text":"小米黑科技"},{"url":"http://www.atguigu.com","text":"老人机"},{"url":"http://www.atguigu.com","text":"极致奢华"}],"carouselList":[{"id":"0011","imgUrl":"/images/1_floor-1-b01.png"},{"id":"0012","imgUrl":"/images/1_floor-1-b02.png"},{"id":"0013","imgUrl":"/images/1_floor-1-b03.png"}],"recommendList":["/images/1_floor-1-2.png","/images/1_floor-1-3.png","/images/1_floor-1-5.png","/images/1_floor-1-6.png"],"bigImg":"/images/1_floor-1-4.png"}]'),B=JSON.parse('[{"id":"1","imgUrl":"/images/banner1.jpg"},{"id":"2","imgUrl":"/images/banner2.jpg"},{"id":"3","imgUrl":"/images/banner3.jpg"},{"id":"4","imgUrl":"/images/banner4.jpg"}]');z().mock("http://www.1227.com/slide","get",{code:200,message:"成功",data:B,ok:!0}),z().mock("http://www.1227.com/floor","get",{code:200,message:"成功",data:Y,ok:!0});var Q=a(1386),J=a(9941),K=a.n(J),W=a(7899);d["default"].use(Q.ZP),Q.cX.localize("zh_CN",K()),Q.cX.extend("phone_rule",{getMessage:t=>"手机号不合法",validate:t=>W.$v.test(t)}),Q.cX.extend("required",{validate:t=>t,getMessage:t=>t+"必须输入！"}),Q.cX.extend("code_rule",{validate:t=>W.VG.test(t),getMessage:t=>"验证码必须为6位数字！"}),Q.cX.extend("pwd_rule",{validate:t=>W.sf.test(t),getMessage:t=>"密码为6到21位英文、数字、下划线"}),Q.cX.extend("ispwd",{validate:(t,e)=>t===e[0],getMessage:t=>"重复密码必须和登录密码一致"}),Q.cX.extend("isagree",{validate:t=>t,getMessage:t=>"协议必须同意！"});var tt=a(2228),et=a.p+"img/loading.0c5aeae4.gif";d["default"].config.productionTip=!1,d["default"].use(tt.ZP,{loading:et}),d["default"].component("TypeNav",R),d["default"].component("Pagination",G),d["default"].prototype.$loading=l().service,d["default"].prototype.$msgbox=c(),d["default"].prototype.$alert=c().alert,d["default"].prototype.$confirm=c().confirm,d["default"].prototype.$prompt=c().prompt,d["default"].prototype.$notify=s(),d["default"].prototype.$message=n(),new d["default"]({el:"#app",render:t=>t(P),beforeCreate(){d["default"].prototype.$bus=this},router:O.Z,store:A.Z})},7226:function(t,e,a){a.d(e,{Z:function(){return x}});var r=a(7349),n=a.n(r),o=(a(6699),a(8935)),s=a(2809);const i=()=>Promise.all([a.e(794),a.e(813)]).then(a.bind(a,6813)),c=()=>a.e(454).then(a.bind(a,9454)),u=()=>a.e(103).then(a.bind(a,103)),l=()=>a.e(686).then(a.bind(a,6686)),d=()=>Promise.all([a.e(794),a.e(745)]).then(a.bind(a,2998)),p=()=>a.e(742).then(a.bind(a,1742)),f=()=>a.e(53).then(a.bind(a,4053)),g=()=>a.e(964).then(a.bind(a,4964)),m=()=>a.e(968).then(a.bind(a,8968)),v=()=>a.e(301).then(a.bind(a,1301)),h=()=>a.e(310).then(a.bind(a,4310)),_=()=>a.e(827).then(a.bind(a,827));var w=[{name:"home",path:"/home",component:i},{name:"login",path:"/login",component:c,meta:{isHiddenFooter:!0}},{name:"register",path:"/register",component:u,meta:{isHiddenFooter:!0}},{name:"search",path:"/search",component:l},{name:"test",path:"/test",component:_},{name:"detail",path:"/detail/:id",component:d},{name:"addcart_success",path:"/addcart_success",component:p,beforeEnter(t,e,a){"/detail"===e.path.slice(0,7)?a():a("/home")}},{name:"cart",path:"/cart",component:f},{name:"trade",path:"/trade",component:g},{name:"pay",path:"/pay",component:m,beforeEnter(t,e,a){"/trade"===e.path?a():a("/home")}},{name:"paysuccess",path:"/paysuccess",component:v},{name:"center",path:"/center",component:h},{path:"/",redirect:"/home"}],y=a(1753),b=a(2755);o["default"].use(s.Z);const C=s.Z.prototype.push,k=s.Z.prototype.replace;s.Z.prototype.push=function(t,e,a){return void 0===e&&void 0===a?C.call(this,t).catch((()=>{})):C.call(this,t,e,a)},s.Z.prototype.replace=function(t,e,a){return void 0===e&&void 0===a?k.call(this,t).catch((()=>{})):k.call(this,t,e,a)};const S=new s.Z({mode:"history",routes:w,scrollBehavior(t,e,a){return a||{x:0,y:0}}}),E=["/trade","/pay","/paysuccess","/center"];S.beforeEach((async(t,e,a)=>{const r=(0,y.YG)(),{info:o}=b.Z.state.user;if(r)if(o.id)a();else try{await b.Z.dispatch("getUserInfo"),a()}catch(s){(0,y.pQ)(),a("/login")}else E.includes(t.path)?(n().warning("请您先登录！"),a("/login?oldpath="+t.path)):a()}));var x=S},2755:function(t,e,a){a.d(e,{Z:function(){return $}});var r=a(8935),n=a(4665),o=a(5892);const s={async getCategoryList({commit:t}){let e=await(0,o.ix)();200===e.code?t("SAVE_CATEGORY_LIST",e.data.slice(0,15)):alert(e.message)},async getSlideList({commit:t}){let e=await(0,o.a8)();200===e.code?t("SAVE_SLIDE_LIST",e.data):alert(e.message)},async getFloorList({commit:t}){let e=await(0,o._F)();200===e.code?t("SAVE_FLOOR_LIST",e.data):alert(e.message)}},i={SAVE_CATEGORY_LIST(t,e){t.categoryList=e},SAVE_SLIDE_LIST(t,e){t.slideList=e},SAVE_FLOOR_LIST(t,e){t.floorList=e}},c={categoryList:[],slideList:[],floorList:[]},u={};var l={actions:s,mutations:i,state:c,getters:u},d=a(7349),p=a.n(d),f=a(1753),g=a(7226);const m={async getUserInfo({commit:t}){const e=await(0,o.dW)();if(200!==e.code)return p().warning("请重新登录！"),Promise.reject();t("SAVE_USER_INFO",e.data)},async logout({commit:t}){const e=await(0,o.uf)();200===e.code?(t("CLEAR_USER_INFO"),(0,f.pQ)(),g.Z.push("/login")):p().warning(e.message)}},v={SAVE_USER_INFO(t,e){t.info=e},CLEAR_USER_INFO(t){t.info={}}},h={info:{}},_={};var w={actions:m,mutations:v,state:h,getters:_};const y={async getSearchInfo({commit:t},e){let a=await(0,o.w1)(e);200===a.code?t("SAVE_SEARCH_INFO",a.data):alert(a.message)}},b={SAVE_SEARCH_INFO(t,e){t.searchInfo=e}},C={searchInfo:{}},k={};var S={actions:y,mutations:b,state:C,getters:k};r["default"].use(n.ZP);const E={},x={},I={},L={},N=new n.ZP.Store({actions:E,mutations:x,state:I,getters:L,modules:{home:l,user:w,search:S}});var $=N},1753:function(t,e,a){a.d(e,{Fr:function(){return o},YG:function(){return s},pQ:function(){return i},tS:function(){return n}});var r=a(905);function n(){const t=localStorage.getItem("userTempId");if(t)return t;{const t=(0,r.Z)();return localStorage.setItem("userTempId",t),t}}function o(t){localStorage.setItem("token",t)}function s(){return localStorage.getItem("token")}function i(){localStorage.removeItem("token")}},7899:function(t,e,a){a.d(e,{$v:function(){return n},VG:function(){return o},er:function(){return r},sf:function(){return s}});const r=/^([1-9]|[1-9]\d|1\d{2}|200)$/,n=/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,o=/^\d{6}$/,s=/^\w{6,21}$/},2552:function(t,e,a){t.exports=a.p+"img/wx_cz.20ce7ab5.jpg"},587:function(t,e,a){t.exports=a.p+"img/logo.d600ca2b.png"}},e={};function a(r){var n=e[r];if(void 0!==n)return n.exports;var o=e[r]={id:r,loaded:!1,exports:{}};return t[r].call(o.exports,o,o.exports,a),o.loaded=!0,o.exports}a.m=t,function(){var t=[];a.O=function(e,r,n,o){if(!r){var s=1/0;for(l=0;l<t.length;l++){r=t[l][0],n=t[l][1],o=t[l][2];for(var i=!0,c=0;c<r.length;c++)(!1&o||s>=o)&&Object.keys(a.O).every((function(t){return a.O[t](r[c])}))?r.splice(c--,1):(i=!1,o<s&&(s=o));if(i){t.splice(l--,1);var u=n();void 0!==u&&(e=u)}}return e}o=o||0;for(var l=t.length;l>0&&t[l-1][2]>o;l--)t[l]=t[l-1];t[l]=[r,n,o]}}(),function(){a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,{a:e}),e}}(),function(){a.d=function(t,e){for(var r in e)a.o(e,r)&&!a.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})}}(),function(){a.f={},a.e=function(t){return Promise.all(Object.keys(a.f).reduce((function(e,r){return a.f[r](t,e),e}),[]))}}(),function(){a.u=function(t){return"js/"+t+"."+{53:"a44213ab",103:"f3770501",301:"41dc89fd",310:"8dfea2c3",454:"7f84ee58",686:"2b53c6bb",742:"58b1a3a4",745:"c0ea0040",794:"847d32af",813:"c508dd00",827:"047e9765",964:"7fb8a8eb",968:"1cd92115"}[t]+".js"}}(),function(){a.miniCssF=function(t){return"css/"+t+"."+{53:"d602391e",103:"e85ae999",301:"ff0f0200",310:"f9d556b3",454:"9fd3e29f",686:"9ba66089",742:"aa829527",745:"97e50dba",813:"84ef75ca",827:"c27fc325",964:"cc9907db",968:"22430bbc"}[t]+".css"}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={},e="sph_21_1227:";a.l=function(r,n,o,s){if(t[r])t[r].push(n);else{var i,c;if(void 0!==o)for(var u=document.getElementsByTagName("script"),l=0;l<u.length;l++){var d=u[l];if(d.getAttribute("src")==r||d.getAttribute("data-webpack")==e+o){i=d;break}}i||(c=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,a.nc&&i.setAttribute("nonce",a.nc),i.setAttribute("data-webpack",e+o),i.src=r),t[r]=[n];var p=function(e,a){i.onerror=i.onload=null,clearTimeout(f);var n=t[r];if(delete t[r],i.parentNode&&i.parentNode.removeChild(i),n&&n.forEach((function(t){return t(a)})),e)return e(a)},f=setTimeout(p.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=p.bind(null,i.onerror),i.onload=p.bind(null,i.onload),c&&document.head.appendChild(i)}}}(),function(){a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){a.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t}}(),function(){a.p="/"}(),function(){var t=function(t,e,a,r){var n=document.createElement("link");n.rel="stylesheet",n.type="text/css";var o=function(o){if(n.onerror=n.onload=null,"load"===o.type)a();else{var s=o&&("load"===o.type?"missing":o.type),i=o&&o.target&&o.target.href||e,c=new Error("Loading CSS chunk "+t+" failed.\n("+i+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=s,c.request=i,n.parentNode.removeChild(n),r(c)}};return n.onerror=n.onload=o,n.href=e,document.head.appendChild(n),n},e=function(t,e){for(var a=document.getElementsByTagName("link"),r=0;r<a.length;r++){var n=a[r],o=n.getAttribute("data-href")||n.getAttribute("href");if("stylesheet"===n.rel&&(o===t||o===e))return n}var s=document.getElementsByTagName("style");for(r=0;r<s.length;r++){n=s[r],o=n.getAttribute("data-href");if(o===t||o===e)return n}},r=function(r){return new Promise((function(n,o){var s=a.miniCssF(r),i=a.p+s;if(e(s,i))return n();t(r,i,n,o)}))},n={143:0};a.f.miniCss=function(t,e){var a={53:1,103:1,301:1,310:1,454:1,686:1,742:1,745:1,813:1,827:1,964:1,968:1};n[t]?e.push(n[t]):0!==n[t]&&a[t]&&e.push(n[t]=r(t).then((function(){n[t]=0}),(function(e){throw delete n[t],e})))}}(),function(){var t={143:0};a.f.j=function(e,r){var n=a.o(t,e)?t[e]:void 0;if(0!==n)if(n)r.push(n[2]);else{var o=new Promise((function(a,r){n=t[e]=[a,r]}));r.push(n[2]=o);var s=a.p+a.u(e),i=new Error,c=function(r){if(a.o(t,e)&&(n=t[e],0!==n&&(t[e]=void 0),n)){var o=r&&("load"===r.type?"missing":r.type),s=r&&r.target&&r.target.src;i.message="Loading chunk "+e+" failed.\n("+o+": "+s+")",i.name="ChunkLoadError",i.type=o,i.request=s,n[1](i)}};a.l(s,c,"chunk-"+e,e)}},a.O.j=function(e){return 0===t[e]};var e=function(e,r){var n,o,s=r[0],i=r[1],c=r[2],u=0;if(s.some((function(e){return 0!==t[e]}))){for(n in i)a.o(i,n)&&(a.m[n]=i[n]);if(c)var l=c(a)}for(e&&e(r);u<s.length;u++)o=s[u],a.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return a.O(l)},r=self["webpackChunksph_21_1227"]=self["webpackChunksph_21_1227"]||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))}();var r=a.O(void 0,[998],(function(){return a(7838)}));r=a.O(r)})();
//# sourceMappingURL=app.55436a83.js.map