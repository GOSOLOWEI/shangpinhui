<template>
	<div class="app">
		<Header/>	
		<router-view/>
		<!-- 直接靠path去判断是否展示Footer -->
		<!-- <Footer v-show="$route.path !== '/login' &&  $route.path !== '/register'"/> -->
		
		<!-- 通过meta属性（路由元信息）去判断 -->
		<Footer v-show="!$route.meta.isHiddenFooter"/>
	</div>
</template>

<script>
	import Header from './components/Header'
	import Footer from './components/Footer'

	export default {
		name:'App',
		components:{Header,Footer},
	}
</script>

