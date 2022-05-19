<template>
	<div class="login">
		<h1>Login</h1>
	</div>
</template>

<script>
	export default {
		name:'Login',
		mounted(){
			console.log(this.$route)
		}
	}
</script>

<style lang="less" scoped>
	.login{
		background-color: skyblue;
		padding: 20px;
	}
</style>