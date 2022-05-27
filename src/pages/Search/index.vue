<template>
	<div class="outer">
		<!-- 三级分类导航 -->
		<TypeNav />
		<div class="main">
			<div class="py-container">
				<!--面包屑导航-->
				<div class="bread">
					<ul class="fl sui-breadcrumb">
						<li>
							<span href="#">全部结果</span>
						</li>
					</ul>
					<ul class="fl sui-tag">
						<!-- 分类名的面包屑 -->
						<li class="with-x" v-show="searchParams.categoryName">
							{{searchParams.categoryName}}
							<i @click="removeCategoryName">×</i>
						</li>
						<!-- 关键词的面包屑 -->
						<li class="with-x" v-show="searchParams.keyword">
							{{searchParams.keyword}}
							<i @click="removeKeyword">×</i>
						</li>
						<!-- 品牌面包屑 -->
						<li class="with-x" v-show="searchParams.trademark">
							{{fmtTrademark}}
							<i @click="removeTrademark">×</i>
						</li>
						<!-- 属性面包屑 -->
						<li class="with-x" v-for="(p,index) in searchParams.props" :key="index">
							{{fmtProps(p)}}
							<i @click="removeProp(index)">×</i>
						</li>
					</ul>
				</div>

				<!-- 搜索器 -->
				<SearchSelector 
					@send-trademark="saveTrademark"
					@send-attr="saveAttr"
					v-show="total"
				/>

				<!--商品展示区-->
				<div class="details clearfix" v-show="total">
					<!-- 列表操作区 -->
					<div class="sui-navbar">
						<div class="navbar-inner filter">
							<ul class="sui-nav">

								<li :class="{active:!isPrice}" @click="changeOrder(1)">
									<a>
										综合 <span class="iconfont" :class="iconName" v-show="!isPrice"/>
									</a>
								</li>

								<li :class="{active:isPrice}" @click="changeOrder(2)">
									<a>
										价格 <span  class="iconfont" :class="iconName" v-show="isPrice"/>
									</a>
								</li>

							</ul>
						</div>
					</div>
					<!-- 商品列表 -->
					<div class="goods-list">
						<ul class="yui3-g">
							<li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
								<div class="list-wrap">
									<div class="p-img">
										<!-- 商品图片 -->
										<router-link :to="'/detail/'+good.id">
											<img :src="good.defaultImg" />
										</router-link>
									</div>
									<div class="price">
										<strong>
											<em>¥</em>
											<i>{{good.price}}</i>
										</strong>
									</div>
									<div class="attr">
										<!-- 商品名称 -->
										<router-link :to="'/detail/'+good.id" v-html="good.title"/>
									</div>
									<div class="operate">
										<a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
										<a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
									</div>
								</div>
							</li>
						</ul>
					</div>
					
					<!-- 分页器 -->
					<Pagination 
						:total="total" 
						:pageSize="searchParams.pageSize" 
						:pageNo="searchParams.pageNo" 
						:continues="5"
						:sendPageNo="changePageNo"
					/>

				</div>

				<!-- 数据为空的展示 -->
				<div v-show="!total" class="empty">
					<img src="https://static.360buyimg.com/devfe/error-new/1.0.0/css/i/error_06.png" alt="">
					<h1>抱歉，搜索结果为空！</h1>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import SearchSelector from './SearchSelector'

	export default {
		name: 'Search',
		components: {SearchSelector},
		data() {
			return {
				searchParams:{
					category1Id:'',   //一级分类ID
					category2Id:'',   //二级分类ID
					category3Id:'',   //三级分类ID
					categoryName:'',  //分类名称
					keyword:'',				//搜索关键字
					props:[], 				//商品属性的数组
					trademark:'',			//品牌
					order:'1:desc',		//排序方式 
					pageNo:1,					//页码
					pageSize:5			//每页数量
				}
			}
		},
		computed:{
			...mapState({
				goodsList: state => state.search.searchInfo.goodsList,
				total: state => state.search.searchInfo.total
			}),
			//通过计算属性，去格式化品牌
			fmtTrademark(){
				return '品牌：'+this.searchParams.trademark.split(':')[1]
			},
			//计算当前排序方式是否为价格
			isPrice(){
				return this.searchParams.order.split(':')[0] === '2'
			},
			// 计算图标名
			iconName(){
				return this.searchParams.order.split(':')[1] === 'asc' ? 'icon-up' : 'icon-down'
			}
		},
		watch:{
			$route:{
				immediate:true,
				handler(value){ //value是谁？ ——  我得看你监视的是谁，监视的是谁，就是谁的最新值
					//重置+合并路由参数到searchParams中
					Object.assign(this.searchParams,{
						category1Id:'',   //重置一级分类ID
						category2Id:'',   //重置二级分类ID
						category3Id:'',   //重置三级分类ID
						categoryName:'',  //重置分类名称
						keyword:'',				//重置搜索关键字
					},value.query)
					this.searchParams.pageNo = 1
					// 重置完了，收集完了，合并完了 处理好参数之后，带着参数发请求
					this.$store.dispatch('getSearchInfo',this.searchParams)
				}
			},
			//监视searchParams，只要searchParams发生了一丝丝的变化，重新请求数据
			searchParams:{
				deep:true,
				handler(){
					this.$store.dispatch('getSearchInfo',this.searchParams)
				}
			}
		},
		methods:{
			//移出分类名的回调
			removeCategoryName(){
				/* 
					分析：
						第一件事：路径得改，去掉分类名(categoryName)、分类编号(category?Id)。
						第二件事：将searchParams里的category?Id、categoryName置为空。
					  第三件事：去掉分类名、分类编号，重新搜索一下。
						备注：其他参数不要动，例如关键词，就不要动，只是去除：分类名、分类编号。
				*/
				//尝试获取关键词
				const {keyword} = this.$route.query
				//去掉：分类名、分类编号，重新跳路由（这一个动作，把上面的三件事都做了）
				this.$router.push({
					path:'/search',
					query:{keyword}
				})
				//页码置为1
				this.searchParams.pageNo = 1
			},
			//移出关键词的回调
			removeKeyword(){
				/* 
					分析：
						第一件事：路径得改，去掉：关键词(keyword)。
						第二件事：将searchParams里的关键词(keyword)置为空。
					  第三件事：去掉：关键词(keyword)，重新搜索一下。
						备注：其他参数不要动，例如：分类名、分类编号，去除的只是关键词。
				*/
				//获取之前除了关键词以外的参数
				const {query} = this.$route
				// delete query.keyword //这句话是不对的，不要随意修改$route身上的属性
				//重新跳转路由
				this.$router.push({
					path:'/search',
					query:{
						...query,
						keyword:undefined
					}
				})
				//通知Header清空关键词
				this.$bus.$emit('clear-keyword')
				//页码置为1
				this.searchParams.pageNo = 1
			},
			//用于接收子组件（SearchSelector）传递过来的品牌数据
			saveTrademark(trademark){
				console.log('我是Search组件',trademark)
				//将收到的品牌数据，存入searchParams.trademark中
				this.searchParams.trademark = trademark.tmId + ':' + trademark.tmName
				//页码置为1
				this.searchParams.pageNo = 1
			},
			//移出品牌的回调
			removeTrademark(){
				// 移除参数
				this.searchParams.trademark = ''
				//页码置为1
				this.searchParams.pageNo = 1
			},
			// 用于接收子组件（SearchSelector）传递过来的商品属性数据
			saveAttr(attrs,attrValue){
				// 将收到的属性信息，整理好
				const str = attrs.attrId + ':' + attrValue + ':' + attrs.attrName
				// 判断一下searchParams.props中是否已经有了该属性
				const result = this.searchParams.props.includes(str)
				if(!result){
					// 存入searchParams.props中
					this.searchParams.props.push(str)
					//页码置为1
					this.searchParams.pageNo = 1
				}
			},
			//专门用于格式化商品属性的方法
			fmtProps(p){
				const arr = p.split(':')
				return arr[2] + '：' + arr[1]
			},
			//移出属性的回调
			removeProp(index){
				// 移出了searchParams.props中的指定值
				this.searchParams.props.splice(index,1)
				//页码置为1
				this.searchParams.pageNo = 1
			},
			//用于修改页码的回调
			changePageNo(n){
				this.searchParams.pageNo = n
			},
			//修改排序方式按钮（综合、价格）的回调
			changeOrder(type){ //type用于标识，点击的排序类型（综合？价格？）
				// 获取目前的排序类型（综合？价格？）、排序标识（升序？降序？）
				const [currentType,currentFlag] = this.searchParams.order.split(':')
				//判断一下，用户所点击的排序类型，是新的，还是原来的。
				if(type === currentType*1){
					// 你点的排序类型（综合？价格？）和当前的，是一致的，切换箭头指向就行
					let newFlag = currentFlag === 'asc' ? 'desc' : 'asc'
					this.searchParams.order = currentType + ':' + newFlag
				}else{
					// 你点的排序类型（综合？价格？）和当前的，不一致，把order的第1位变为你点击的，第2位写死，就是desc
					this.searchParams.order = type + ':desc'
				}
				//页码归位
				this.searchParams.pageNo = 1
			}
		}
	}
</script>

<style lang="less" scoped>
	.main {
		margin: 10px 0;

		.py-container {
			width: 1200px;
			margin: 0 auto;
			.empty{
				text-align: center;
				color: gray;
			}
			.bread {
				margin-bottom: 5px;
				overflow: hidden;

				.sui-breadcrumb {
					padding: 3px 15px;
					margin: 0;
					font-weight: 400;
					border-radius: 3px;
					float: left;

					li {
						display: inline-block;
						line-height: 18px;

						a {
							color: #666;
							text-decoration: none;

							&:hover {
								color: #4cb9fc;
							}
						}
					}
				}

				.sui-tag {
					margin-top: -5px;
					list-style: none;
					font-size: 0;
					line-height: 0;
					padding: 5px 0 0;
					margin-bottom: 18px;
					float: left;

					.with-x {
						font-size: 12px;
						margin: 0 5px 5px 0;
						display: inline-block;
						overflow: hidden;
						color: #000;
						background: #f7f7f7;
						padding: 0 7px;
						height: 20px;
						line-height: 20px;
						border: 1px solid #dedede;
						white-space: nowrap;
						transition: color 400ms;
						cursor: pointer;

						i {
							margin-left: 10px;
							cursor: pointer;
							font: 400 14px tahoma;
							display: inline-block;
							height: 100%;
							vertical-align: middle;
						}

						&:hover {
							color: #28a3ef;
						}
					}
				}
			}

			.details {
				margin-bottom: 5px;

				.sui-navbar {
					overflow: visible;
					margin-bottom: 0;

					.filter {
						min-height: 40px;
						padding-right: 20px;
						background: #fbfbfb;
						border: 1px solid #e2e2e2;
						padding-left: 0;
						border-radius: 0;
						box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

						.sui-nav {
							position: relative;
							left: 0;
							display: block;
							float: left;
							margin: 0 10px 0 0;

							li {
								float: left;
								line-height: 18px;

								a {
									display: block;
									cursor: pointer;
									padding: 11px 15px;
									color: #777;
									text-decoration: none;
								}

								&.active {
									a {
										background: #e1251b;
										color: #fff;
									}
								}
							}
						}
					}
				}

				.goods-list {
					margin: 20px 0;

					ul {
						display: flex;
						flex-wrap: wrap;

						li {
							height: 100%;
							width: 20%;
							margin-top: 10px;
							line-height: 28px;

							.list-wrap {
								.p-img {
									padding-left: 15px;
									width: 215px;
									height: 255px;

									a {
										color: #666;

										img {
											max-width: 100%;
											height: auto;
											vertical-align: middle;
										}
									}
								}

								.price {
									padding-left: 15px;
									font-size: 18px;
									color: #c81623;

									strong {
										font-weight: 700;
									}
								}

								.attr {
									padding-left: 15px;
									width: 85%;
									overflow: hidden;
									margin-bottom: 8px;
									min-height: 38px;
									cursor: pointer;
									line-height: 1.8;
									display: -webkit-box;
									-webkit-box-orient: vertical;
									-webkit-line-clamp: 2;

									a {
										color: #333;
										text-decoration: none;
									}
								}

								.commit {
									padding-left: 15px;
									height: 22px;
									font-size: 13px;
									color: #a7a7a7;

									span {
										font-weight: 700;
										color: #646fb0;
									}
								}

								.operate {
									padding: 12px 15px;

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
										border-radius: 0;
										background-color: transparent;
										margin-right: 15px;
									}

									.btn-bordered {
										min-width: 85px;
										background-color: transparent;
										border: 1px solid #8c8c8c;
										color: #8c8c8c;

										&:hover {
											border: 1px solid #666;
											color: #fff !important;
											background-color: #666;
											text-decoration: none;
										}
									}

									.btn-danger {
										border: 1px solid #e1251b;
										color: #e1251b;

										&:hover {
											border: 1px solid #e1251b;
											background-color: #e1251b;
											color: white !important;
											text-decoration: none;
										}
									}
								}
							}
						}
					}
				}

				.page {
					width: 733px;
					height: 66px;
					overflow: hidden;
					float: right;

					.sui-pagination {
						margin: 18px 0;

						ul {
							margin-left: 0;
							margin-bottom: 0;
							vertical-align: middle;
							width: 490px;
							float: left;

							li {
								line-height: 18px;
								display: inline-block;

								a {
									position: relative;
									float: left;
									line-height: 18px;
									text-decoration: none;
									background-color: #fff;
									border: 1px solid #e0e9ee;
									margin-left: -1px;
									font-size: 14px;
									padding: 9px 18px;
									color: #333;
								}

								&.active {
									a {
										background-color: #fff;
										color: #e1251b;
										border-color: #fff;
										cursor: default;
									}
								}

								&.prev {
									a {
										background-color: #fafafa;
									}
								}

								&.disabled {
									a {
										color: #999;
										cursor: default;
									}
								}

								&.dotted {
									span {
										margin-left: -1px;
										position: relative;
										float: left;
										line-height: 18px;
										text-decoration: none;
										background-color: #fff;
										font-size: 14px;
										border: 0;
										padding: 9px 18px;
										color: #333;
									}
								}

								&.next {
									a {
										background-color: #fafafa;
									}
								}
							}
						}

						div {
							color: #333;
							font-size: 14px;
							float: right;
							width: 241px;
						}
					}
				}
			}
		}
	}
</style>