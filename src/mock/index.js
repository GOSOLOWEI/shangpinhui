import Mock from 'mockjs'
import floor from './floor'
import slide from './slide'

//模拟获取轮播图数据的接口
Mock.mock('http://www.1227.com/slide','get',{code:200,message:'成功',data:slide,ok:true})

//模拟获取楼层数据的接口
Mock.mock('http://www.1227.com/floor','get',{code:200,message:'成功',data:floor,ok:true})
