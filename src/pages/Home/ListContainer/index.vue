<template>
	<div class="list-container">
		<div class="sortList clearfix">
			<div class="center">
				<!--轮播图容器-->
				<div class="swiper-container" ref="list_swiper">
					<!-- 承装每一屏 -->
					<div class="swiper-wrapper">
						<!-- v-for生成每一屏 -->
						<div class="swiper-slide" v-for="slide in slideList" :key="slide.id">
							<img :src="slide.imgUrl">
						</div>
					</div>
					<!-- 小圆点 -->
					<div class="swiper-pagination"></div>
					<!-- 上一张、下一张按钮 -->
					<div class="swiper-button-prev"></div>
					<div class="swiper-button-next"></div>
				</div>
			</div>
			<div class="right">
				<div class="news">
					<h4>
						<em class="fl">尚品汇快报</em>
						<span class="fr tip">更多 ></span>
					</h4>
					<div class="clearix"></div>
					<ul class="news-list unstyled">
						<li>
							<span class="bold">[特惠]</span>备战开学季 全民半价购数码
						</li>
						<li>
							<span class="bold">[公告]</span>备战开学季 全民半价购数码
						</li>
						<li>
							<span class="bold">[特惠]</span>备战开学季 全民半价购数码
						</li>
						<li>
							<span class="bold">[公告]</span>备战开学季 全民半价购数码
						</li>
						<li>
							<span class="bold">[特惠]</span>备战开学季 全民半价购数码
						</li>
					</ul>
				</div>
				<ul class="lifeservices">
					<li class=" life-item ">
						<i class="list-item"></i>
						<span class="service-intro">话费</span>
					</li>
					<li class=" life-item ">
						<i class="list-item"></i>
						<span class="service-intro">机票</span>
					</li>
					<li class=" life-item ">
						<i class="list-item"></i>
						<span class="service-intro">电影票</span>
					</li>
					<li class=" life-item ">
						<i class="list-item"></i>
						<span class="service-intro">游戏</span>
					</li>
					<li class=" life-item">
						<i class="list-item"></i>
						<span class="service-intro">彩票</span>
					</li>
					<li class=" life-item">
						<i class="list-item"></i>
						<span class="service-intro">加油站</span>
					</li>
					<li class=" life-item">
						<i class="list-item"></i>
						<span class="service-intro">酒店</span>
					</li>
					<li class=" life-item">
						<i class="list-item"></i>
						<span class="service-intro">火车票</span>
					</li>
					<li class=" life-item ">
						<i class="list-item"></i>
						<span class="service-intro">众筹</span>
					</li>
					<li class=" life-item">
						<i class="list-item"></i>
						<span class="service-intro">理财</span>
					</li>
					<li class=" life-item">
						<i class="list-item"></i>
						<span class="service-intro">礼品卡</span>
					</li>
					<li class=" life-item">
						<i class="list-item"></i>
						<span class="service-intro">白条</span>
					</li>
				</ul>
				<div class="ads">
					<img src="./images/ad1.png" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	// 引入Swiper
	import Swiper from 'swiper'
	// 引入Swiper样式
	import 'swiper/css/swiper.min.css'

	export default {
		name: 'ListContainer',
		data() {
			return {
				sum:0
			}
		},
		computed:{
			...mapState({
				slideList: state => state.home.slideList
			})
		},
		async mounted(){
			// console.log('ListContainer组件挂载了')
			//组件挂载完毕，就去联系对应的action，去获取轮播图数据，随后存入vuex
			this.$store.dispatch('getSlideList')
		},
		watch:{
			slideList(){
				this.$nextTick(()=>{
					new Swiper(this.$refs.list_swiper, {
						spaceBetween: 30, //每一屏之间的距离
						speed:1500, //屏的切换速度
						loop:true, //循环轮播
						autoplay: { //自动轮播配置
							delay: 2000, //轮播间隔
							disableOnInteraction: false, //鼠标操作后，是否禁用自动轮播
						},
						pagination: {
							el: '.swiper-pagination', //小圆点容器
							clickable: true, //小圆点是否可以点击
						},
						navigation: {
							nextEl: '.swiper-button-next', //下一张按钮的选择器
							prevEl: '.swiper-button-prev', //上一张按钮的选择器
						},
					});
				})
			}
		},
		updated(){
			// console.log('ListContainer组件中有数据变化了，它更新了')
		},
	}
</script>

<style lang="less" scoped>
	.list-container {
		width: 1200px;
		margin: 0 auto;

		.sortList {
			height: 464px;
			padding-left: 210px;

			.center {
				box-sizing: border-box;
				width: 740px;
				height: 100%;
				padding: 5px;
				float: left;
			}

			.right {
				float: left;
				width: 250px;

				.news {
					border: 1px solid #e4e4e4;
					margin-top: 5px;

					h4 {
						border-bottom: 1px solid #e4e4e4;
						padding: 5px 10px;
						margin: 5px 5px 0;
						line-height: 22px;
						overflow: hidden;
						font-size: 14px;

						.fl {
							float: left;
						}

						.fr {
							float: right;
							font-size: 12px;
							font-weight: 400;
						}
					}

					.news-list {
						padding: 5px 15px;
						line-height: 26px;

						.bold {
							font-weight: 700;
						}
					}
				}

				.lifeservices {
					border-right: 1px solid #e4e4e4;
					overflow: hidden;
					display: flex;
					flex-wrap: wrap;

					.life-item {
						border-left: 1px solid #e4e4e4;
						border-bottom: 1px solid #e4e4e4;
						margin-right: -1px;
						height: 64px;
						text-align: center;
						position: relative;
						cursor: pointer;
						width: 25%;

						.list-item {
							background-image: url(./images/icons.png);
							width: 61px;
							height: 40px;
							display: block;
						}

						.service-intro {
							line-height: 22px;
							width: 60px;
							display: block;
						}

						&:nth-child(1) {
							.list-item {
								background-position: 0px -5px;
							}
						}

						&:nth-child(2) {
							.list-item {
								background-position: -62px -5px;
							}
						}

						&:nth-child(3) {
							.list-item {
								background-position: -126px -5px;
							}
						}

						&:nth-child(4) {
							.list-item {
								background-position: -190px -5px;
							}
						}

						&:nth-child(5) {
							.list-item {
								background-position: 0px -76px;
							}
						}

						&:nth-child(6) {
							.list-item {
								background-position: -62px -76px;
							}
						}

						&:nth-child(7) {
							.list-item {
								background-position: -126px -76px;
							}
						}

						&:nth-child(8) {
							.list-item {
								background-position: -190px -76px;
							}
						}

						&:nth-child(9) {
							.list-item {
								background-position: 0px -146px;
							}
						}

						&:nth-child(10) {
							.list-item {
								background-position: -62px -146px;
							}
						}

						&:nth-child(11) {
							.list-item {
								background-position: -126px -146px;
							}
						}

						&:nth-child(12) {
							.list-item {
								background-position: -190px -146px;
							}
						}
					}
				}

				.ads {
					margin-top: 5px;

					img {
						opacity: 0.8;
						transition: all 400ms;

						&:hover {
							opacity: 1;
						}
					}
				}
			}
		}
	}
</style>