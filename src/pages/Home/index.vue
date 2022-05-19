<template>
	<div>
		<!-- 导航区 -->
		<TypeNav/>
		<!-- 轮播图区域 -->
		<ListContainer/>
		<!-- 今日推荐 -->
		<Recommend/>
		<!-- 排行 -->
		<Rank/>
		<!-- 猜你喜欢 -->
		<Like/>
		<!-- 楼层 -->
		<Floor/>
		<Floor/>
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

	export default {
		name:'Home',
		components:{ListContainer,Recommend,Rank,Like,Floor,Brand}
	}
</script>
