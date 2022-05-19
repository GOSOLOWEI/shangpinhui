/* 
	该文件用于：管理整个项目的ajax请求，每一个后端接口，都在这文件中对应一个函数
	该文件中，所有的函数，命名规范都为：reqXxxxx
*/
import ajax from './ajax'

//该函数专门用于：请求首页的三级分类信息
export const reqCategory = () => ajax.get('/product/getBaseCategoryList')
