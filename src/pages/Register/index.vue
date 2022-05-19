<template>
	<div class="register">
		<h1>Register</h1>
	</div>
</template>

<script>
	export default {
		name:'Register',
		mounted(){
			console.log(this.$route)
		}
	}
</script>

<style lang="less" scoped>
	.register{
		background-color: pink;
		padding: 20px;
	}
</style>