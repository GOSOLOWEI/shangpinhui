<template>
	<div>
		<TypeNav/>
		<div class="search">
			<h1>Search</h1>
			<h1>我收到的路由参数：{{$route.query}}</h1>
		</div>
	</div>
</template>

<script>
	export default {
		name:'Search',
	}
</script>

<style lang="less" scoped>
	.search{
		background-color: yellowgreen;
		padding: 20px;
	}
</style>