/* 
	该文件用于：管理整个项目的ajax请求，每一个后端接口，都在这文件中对应一个函数
	该文件中，所有的函数，命名规范都为：reqXxxxx
*/
import ajax from './ajax'
import mAjax from './mAjax'

//该函数专门用于：请求首页的三级分类信息
export const reqCategoryList = () => ajax.get('/product/getBaseCategoryList')

//该函数专门用于：请求轮播图数据（模拟数据）
export const reqSlideList = () => mAjax.get('/slide')

//该函数专门用于：请求楼层数据（模拟数据）
export const reqFloorList = () => mAjax.get('/floor')

//该函数专门用于：搜索，注意：此接口需要参数
export const reqSearchInfo = (params)=> ajax.post('/list',params)

//该函数专门用于：获取商品详情，注意：此接口需要参数
export const reqGoodDetailInfo = (id) => ajax.get('/item/'+id)

// 该函数专门用于：添加商品到购物车 也能修改购物车中商品数量（正数代表加，负数代表减）
export const reqAddGood2Cart = (goodId,goodNum) => ajax.post(`/cart/addToCart/${goodId}/${goodNum}`)

// 该函数专门用于：请求购物车数据
export const reqCartList = () => ajax.get('/cart/cartList')

// 该函数专门用于：切换购物车中商品的选中状态
export const reqCheckOneCart = (id,isChecked) => ajax.get(`/cart/checkCart/${id}/${isChecked}`)

// 该函数专门用于：全选购物车
export const reqCheckAllCart = (idList,isChecked) => ajax.post(`/cart/batchCheckCart/${isChecked}`,idList)

// 该函数专门用于：删除购物车中的某个商品
export const reqDeleteOneCart = (id) => ajax.delete(`/cart/deleteCart/${id}`)

// 该函数专门用于：批量删除购物车中的商品
export const reqBatchDeleteCart = (idList) => ajax.post('/cart/batchDeleteCart',idList)

// 该函数专门用于：获取验证码
export const reqSendCode = (phone) => ajax.get(`/user/passport/sendCode/${phone}`)

// 该函数专门用于：请求注册(参数为对象，包含：phone,code,password属性)
export const reqRegister = (paramsObj) => ajax.post(`/user/passport/register`,paramsObj)

// 该函数专门用于：请求登录(参数为对象，包含：phone，password属性)
export const reqLogin = (paramsObj) => ajax.post('/user/passport/login',paramsObj)

// 该函数专门用于：根据token获取用户信息
export const reqUserInfo = () => ajax.get('/user/passport/auth/getUserInfo')

// 该函数专门用于：退出登录
export const reqLogout = ()=> ajax.get('/user/passport/logout')

// 该函数专门用于：根据token请求收获地址
export const reqUserAddressList = ()=> ajax.get('/user/userAddress/auth/findUserAddressList')

// 该函数专门用于：根据token请求交易页面的信息
export const reqTradeInfo = ()=> ajax.get('/order/auth/trade')

// 该函数专门用于：提交订单
export const reqSubmitOrder = (tradeNo,params)=> ajax.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`,params)

// 该函数专门用于：获取支付信息
export const reqPayInfo = (orderId) => ajax.get(`/payment/weixin/createNative/${orderId}`)

// 该函数专门用于：订单支付状态
export const reqPayStatus = (orderId) => ajax.get(`/payment/weixin/queryPayStatus/${orderId}`)

// 该函数专门用于：获取所有订单
export const reqMyOrder = (page,limit) => ajax.get(`/order/auth/${page}/${limit}`)


