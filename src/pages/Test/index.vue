<template>
	<div class="test">
		<button @click="test">测试获取：楼层、轮播图数据</button>
	</div>
</template>

<script>
	import {reqSlideList,reqFloorList} from '@/api'

	export default {
		name:'Test',
		methods:{
			async test(){
				const r1 = await reqSlideList()
				const r2 = await reqFloorList()
				console.log(r1)
				console.log(r2)
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