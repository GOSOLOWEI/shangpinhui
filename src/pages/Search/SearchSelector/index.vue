<template>
	<!--搜索选择器-->
	<div class="clearfix selt">
		<div class="type-wrap logo">
			<div class="fl key brand">品牌</div>
			<div class="value logos">
				<!-- 品牌列表区 -->
				<ul class="logo-list">
					<!-- 遍历生成品牌列表 -->
					<li 
						v-for="trademark in trademarkList" 
						:key="trademark.tmId"
						@click="handleClickTrademark(trademark)"
					>
						{{trademark.tmName}}
					</li>
				</ul>
			</div>
		</div>
		<!-- 商品属性区 -->
		<!-- 遍历生成每个属性对应的div -->
		<div class="type-wrap" v-for="attrs in attrsList" :key="attrs.attrId">
			<!-- 属性名（颜色、重量、屏幕尺寸....） -->
			<div class="fl key">{{attrs.attrName}}</div>
			<div class="fl value">
				<ul class="type-list">
					<!-- 遍历属性值（黄色、绿色、橙色、200g、215g、6.5寸、7.0寸） -->
					<li v-for="(attrValue,index) in attrs.attrValueList" :key="index">
						<a @click="handleClickAttrValue(attrs,attrValue)">{{attrValue}}</a>
					</li>
				</ul>
			</div>
			<div class="fl ext"></div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
	export default {
		name: 'SearchSelector',
		computed:{
			...mapState({
				attrsList:state=> state.search.searchInfo.attrsList, //读取商品属性列表
				trademarkList:state=> state.search.searchInfo.trademarkList, //读取品牌列表
			})
			
		},
		methods:{
			//点击品牌的回调
			handleClickTrademark(trademark){
				this.$emit('send-trademark',trademark)
			},
			//点击商品属性的回调
			handleClickAttrValue(attrs,attrValue){
				//想办法把attrs,attrValue传给Search组件，随后Search组件放入data中的searchParams里
				// console.log('你点击的属性是：',attrs,attrValue)
				this.$emit('send-attr',attrs,attrValue)
			}
		}
	}
</script>

<style lang="less" scoped>
	.selt {
		border: 1px solid #ddd;
		margin-bottom: 5px;
		overflow: hidden;

		.logo {
			border-top: 0;
			margin: 0;
			position: relative;
			overflow: hidden;

			.key {
				padding-bottom: 87px !important;
			}
		}

		.type-wrap {
			margin: 0;
			position: relative;
			border-top: 1px solid #ddd;
			overflow: hidden;

			.key {
				width: 100px;
				background: #f1f1f1;
				line-height: 26px;
				text-align: right;
				padding: 10px 10px 0 15px;
				float: left;
			}

			.value {
				overflow: hidden;
				padding: 10px 0 0 15px;
				color: #333;
				margin-left: 120px;
				padding-right: 90px;

				.logo-list {
					li {
						float: left;
						border: 1px solid #e4e4e4;
						margin: -1px -1px 0 0;
						width: 105px;
						height: 52px;
						text-align: center;
						line-height: 52px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-weight: 700;
						color: white;
						background-color: #e1251b;
						font-size: 14px;
						cursor: pointer;

						img {
							max-width: 100%;
							vertical-align: middle;
						}
					}
				}

				.type-list {
					li {
						float: left;
						display: block;
						margin-right: 30px;
						line-height: 26px;

						a {
							text-decoration: none;
							color: #666;
							cursor: pointer;
							&:hover{
								color: #e1251b;
							}
						}
					}
				}
			}

			.ext {
				position: absolute;
				top: 10px;
				right: 10px;

				.sui-btn {
					display: inline-block;
					padding: 2px 14px;
					box-sizing: border-box;
					margin-bottom: 0;
					font-size: 12px;
					line-height: 18px;
					text-align: center;
					vertical-align: middle;
					cursor: pointer;
					padding: 0 10px;
					background: #fff;
					border: 1px solid #d5d5d5;
				}

				a {
					color: #666;
				}
			}
		}
	}
</style>