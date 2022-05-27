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