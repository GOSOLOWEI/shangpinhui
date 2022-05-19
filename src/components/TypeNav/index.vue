<template>
	<div class="type-nav">
		<div class="container">
			<div class="nav-left" @mouseleave="handleMouseLeave">
				<h2 class="all" @mouseenter="isShowSort = true">全部商品分类</h2>
				<!-- 下拉区域 -->
				<transition
					enter-active-class="animate__fadeIn"
					leave-active-class="animate__fadeOut"
				>
					<div class="sort animate__animated" v-show="isShowSort">
					<div class="all-sort-list2" @click="toSearch">
						<!-- 每一个一级分类 -->
						<div class="item" v-for="c1 in categoryList" :key="c1.categoryId">
							<h3>
								<!-- 一级分类文字 -->
								<a data-level="1" :data-id="c1.categoryId">{{c1.categoryName}}</a>
							</h3>
							<div class="item-list clearfix">
								<!-- 每一个二级分类 -->
								<div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
									<dl class="fore">
										<dt>
											<!-- 二级分类文字 -->
											<a data-level="2" :data-id="c2.categoryId">{{c2.categoryName}}</a>
										</dt>
										<dd>
											<!-- 每一个三级分类 -->
											<em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
												<!-- 三级分类文字 -->
												<a data-level="3" :data-id="c3.categoryId">{{c3.categoryName}}</a>
											</em>
										</dd>
									</dl>
								</div>
							</div>
						</div>
					</div>
					</div>
				</transition>
			</div>
			<nav class="nav">
				<a href="###">服装城</a>
				<a href="###">美妆馆</a>
				<a href="###">尚品汇超市</a>
				<a href="###">全球购</a>
				<a href="###">闪购</a>
				<a href="###">团购</a>
				<a href="###">有趣</a>
				<a href="###">秒杀</a>
			</nav>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import 'animate.css'

	export default {
		name: 'TypeNav',
		data() {
			return {
				isShowSort:this.$route.path === '/home' ? true : false
			}
		},
		computed:{
			...mapState({
				categoryList: state => state.home.categoryList
			})
		},
		mounted(){
			//呼唤一个可以发送请求、得到三级分类数据的服务员。
			this.$store.dispatch('getCategoryList')
		},
		methods:{
			//点击分类跳转搜索
			toSearch(e){
				//第一步：获取到点击分类的：分类级别、分类编号、分类名称
				const {level,id} = e.target.dataset
				const {innerText} = e.target
				//判断点击的是否为分类
				if(level){
					//第二步：获取当前的关键词
					const {keyword} = this.$route.query
					//第三步：跳转search
					this.$router.push({
						path:'/search',
						query:{
							keyword,
							[`category${level}Id`]:id,
							categoryName:innerText
						}
					})
				}
			},
			//鼠标移出下拉区域的回调
			handleMouseLeave(){
				if(this.$route.path !== '/home'){
					this.isShowSort = false
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.type-nav {
		border-bottom: 2px solid #e1251b;

		.container {
			width: 1200px;
			margin: 0 auto;
			display: flex;
			position: relative;

			.all {
				width: 210px;
				height: 45px;
				background-color: #e1251b;
				line-height: 45px;
				text-align: center;
				color: #fff;
				font-size: 14px;
				font-weight: bold;
			}

			.nav {
				a {
					height: 45px;
					margin: 0 22px;
					line-height: 45px;
					font-size: 16px;
					color: #333;
				}
			}

			.sort {
				position: absolute;
				left: 0;
				top: 45px;
				width: 210px;
				height: 461px;
				position: absolute;
				background: #fafafa;
				z-index: 999;
				--animate-duration: 0.5s;

				.all-sort-list2 {
					.item {
						h3 {
							line-height: 30px;
							font-size: 14px;
							font-weight: 400;
							overflow: hidden;
							padding: 0 20px;
							margin: 0;
							a {
								color: #333;
							}
							&:hover{
								background-color: #e1251b;
								a{
									color: white;
								}
							}
						}

						.item-list {
							display: none;
							position: absolute;
							width: 734px;
							min-height: 460px;
							background: #f7f7f7;
							left: 210px;
							border: 1px solid #ddd;
							top: 0;
							z-index: 9999 !important;

							.subitem {
								float: left;
								width: 650px;
								padding: 0 4px 0 8px;

								dl {
									border-top: 1px solid #eee;
									padding: 6px 0;
									overflow: hidden;
									zoom: 1;

									&.fore {
										border-top: 0;
									}

									dt {
										float: left;
										width: 68px;
										line-height: 22px;
										text-align: right;
										padding: 3px 6px 0 0;
										font-weight: 700;
										a {
											&:hover{
												color: #e1251b;
											}
										}
									}

									dd {
										float: left;
										width: 490px;
										padding: 3px 0 0;
										overflow: hidden;

										em {
											float: left;
											height: 14px;
											line-height: 14px;
											padding: 0 8px;
											margin-top: 5px;
											border-left: 1px solid #ccc;
											a{
												&:hover{
													color: #e1251b;
												}
											}
										}
									}
								}
							}
						}

						&:hover {
							.item-list {
								display: block;
							}
						}
					}
				}
			}
		}
	}
</style>