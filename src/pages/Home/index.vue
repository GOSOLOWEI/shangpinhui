<template>
	<div>
		<!-- 导航区 -->
		<TypeNav/>
		<!-- 轮播图区域 -->
		<ListContainer/>
		<!-- 今日推荐 -->
		<!-- <Recommend/> -->
		<!-- 排行 -->
		<!-- <Rank/> -->
		<!-- 猜你喜欢 -->
		<!-- <Like/> -->
		<!-- 楼层 -->
		<Floor v-for="floor in floorList" :key="floor.id" :floor="floor" />
		<!-- 商标 -->
		<Brand/>
	</div>
</template>

<script>
	import ListContainer from './ListContainer'
	import Recommend from './Recommend'
	import Like from './Like'
	import Rank from './Rank'
	import Floor from './Floor'
	import Brand from './Brand'
	import { mapState } from 'vuex'

	export default {
		name:'Home',
		components:{ListContainer,Recommend,Rank,Like,Floor,Brand},
		computed:{
			...mapState({
				floorList : state => state.home.floorList
			})
		},
		mounted(){
			// Home组件一挂载就找服务员要：楼层数据
			this.$store.dispatch('getFloorList')
		}
	}
</script>
