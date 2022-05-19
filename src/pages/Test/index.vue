<template>
	<div class="test">
		<h1>{{name}}</h1>
		<h2>我是Test路由组件，用于编写一些测试代码，后期项目上线，一定会删掉的</h2>
		<button @click="handleClick">点我获取三级分类信息</button>
	</div>
</template>

<script>
	import {reqCategory} from '@/api'
	import {mapState} from 'vuex'

	export default {
		name:'Test',
		computed:{
			...mapState({
				name: state => state.user.name
			})
		},
		methods:{
			async handleClick(){
				let result = await reqCategory()
				console.log(result)
			}
		}
	}
</script>

<style lang="less" scoped>
	.test{
		background-color: rgb(12, 171, 186);
		padding: 20px;
		h2{
			font-size: 20px;
		}
		button{
			font-size: 20px;
		}
	}
</style>