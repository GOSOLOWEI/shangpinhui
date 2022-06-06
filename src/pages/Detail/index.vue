<template>
  <div class="detail">
    <!-- 商品分类导航 -->
    <TypeNav />

    <!-- 主要内容区域 -->
    <section class="con">
      <!-- 导航路径区域 -->
      <div class="conPoin">
        <span v-for="n in 3" :key="n">
					{{info.categoryView['category' + n + 'Name']}}
				</span>
      </div>
      <!-- 主要内容区域 -->
      <div class="mainCon">
        <!-- 左侧放大镜区域 -->
        <div class="previewWrap">
          <!--放大镜效果-->
          <Zoom :imgurl="info.skuInfo.skuDefaultImg"/>
          <!-- 小图列表 -->
          <ImageList :imgList="info.skuInfo.skuImageList"/>
        </div>
        <!-- 右侧选择区域布局 -->
        <div class="InfoWrap">
          <div class="goodsDetail">
            <h3 class="InfoName">{{info.skuInfo.skuName}}</h3>
            <p class="news">{{info.skuInfo.skuDesc}}</p>
            <div class="priceArea">
              <div class="priceArea1">
                <div class="title">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</div>
                <div class="price">
                  <i>¥</i>
                  <em>{{info.price}}</em>
                </div>
              </div>
            </div>
          </div>

          <div class="choose">
            <div class="chooseArea">
              <div class="choosed"></div>
              <dl v-for="s1 in info.spuSaleAttrList" :key="s1.id">
                <dt class="title">选择{{s1.saleAttrName}}</dt>
                <dd 
									changepirce="0" 
									:class="{active:s2.isChecked === '1' }" 
									v-for="s2 in  s1.spuSaleAttrValueList"
									:key="s2.id"
									@click="changeSpuSaleAttrValue(s1.spuSaleAttrValueList,s2.id)"
								>
								{{s2.saleAttrValueName}}</dd>
              </dl>
            </div>
            <div class="cartWrap">
              <div class="controls">
                <input autocomplete="off" class="itxt" :value="goodNum" @change="changeGoodNum('input',$event)">
                <a href="javascript:" class="plus" @click="changeGoodNum('increment')">+</a>
                <a href="javascript:" class="mins" @click="changeGoodNum('decrement')">-</a>
              </div>
              <div class="add">
                <a @click="handleAddCart">加入购物车</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</div>
</template>

<script>
  import ImageList from './ImageList/ImageList'
  import Zoom from './Zoom/Zoom'
	import {reqGoodDetailInfo,reqAddGood2Cart} from '@/api'
	import {goodNumReg} from '@/utils/reg'

  export default {
    name: 'Detail',
    components: {ImageList,Zoom},
		data() {
			return {
				goodNum:1,
				info:{
					categoryView:{}, //大图上方的分类路径
					price:0, //价格
					skuInfo:{}, //商品详细信息
					spuSaleAttrList:[] //商品属性列表（颜色、尺寸、重量等等）
				}
			}
		},
		methods:{
			// 获取商品详情
			async getGoodDetailInfo(){
				// 获取商品的id
				const {id} = this.$route.params
				// 发请求获取详情
				let result = await reqGoodDetailInfo(id)
				// 根据code判断数据是否获取成功
				if(result.code === 200){
					// 去除掉不需要的数据
					delete result.data.valuesSkuJson
					//存储参数
					Object.assign(this.info,result.data)
				}else{
					alert(result.message)
				}
			},
			// 点击商品属性的回调
			changeSpuSaleAttrValue(list,id){
				// 1.拿内存容量举例子，那么就是：取消所有内存选项的高亮，让当前的高亮（排他）
				list.forEach(item => {
					if(item.id === id) item.isChecked = '1'
					else item.isChecked = '0'
				});
				// 3.发请求，重新获取最新的详情数据（无法实现，因服务器缺少接口）
			},
			//修改商品购买数量的回调
			changeGoodNum(type,e){
				// 若是输入的数量
				if(type === 'input'){
					// 获取用户的输入
					const {value} = e.target
					// 进行正则校验
					const result = goodNumReg.test(value)
					//若输入合法，直接将输入存储到goodNum里
					if(result) this.goodNum = value*1
					//若输入的值，大于200，则将goodNum的值变为最大的200
					else if(value > 200) this.goodNum = e.target.value = 200
					//若输入的是其他值，置为1
					else this.goodNum = e.target.value = 1
				}
				// 若是点击了+
				else if(type === 'increment'){
					if(this.goodNum === 200) alert('购买数量不能超过200！')
					else this.goodNum++
				}
				// 若是点击了-
				else if(type === 'decrement'){
					if(this.goodNum === 1) alert('购买数量不能小于1！')
					else this.goodNum--
				}
			},
			// 添加购物车按钮的回调
			async handleAddCart(){
				// 获取路由传递过来的商品id
				const {id} = this.$route.params
				// 获取组件“辛辛苦苦”维护出来的商品数量
				const {goodNum} = this
				// 请求添加购物车
				const result = await reqAddGood2Cart(id,goodNum)
				// 判断业务逻辑是否成功
				if(result.code === 200){
					//#region 第一步：收集数据
					//获取商品：名称、默认图片
					const {skuName,skuDefaultImg} = this.info.skuInfo
					//获取商品：单价
					const {price} = this.info
					//获取商品：数量
					const {goodNum} = this
					//获取用户所选择的所有属性（形成一个数组）
					const arr = []
					//遍历所有的可选属性，找到用户所选择的，收集到数组中
					this.info.spuSaleAttrList.forEach((s1)=>{
						const result = s1.spuSaleAttrValueList.find( s2 => s2.isChecked === '1' )
						arr.push(result.saleAttrName + '：' +result.saleAttrValueName)
					})
					// 准备一个对象，收集到所有接下来要呈现的数据，一会想办法传给addcart_success
					const selectedGoodInfo = {
						name:skuName,
						url:skuDefaultImg,
						price,
						goodNum,
						arr
					}
					//#endregion

					//第二步：将selectedGoodInfo存入sessionStorage
					sessionStorage.setItem('selectedGoodInfo',JSON.stringify(selectedGoodInfo))

					//第三步：跳转到/addcart_success，同时携带要呈现的信息（selectedGoodInfo对象）
					this.$router.push('/addcart_success')
				}else{
					alert(result.message)
				}
			}
		},
		mounted(){
			// 调用可以获取商品详情的方法
			this.getGoodDetailInfo()
		}
  }
</script>

<style lang="less" scoped>
  .detail {
    .con {
      width: 1200px;
      margin: 15px auto 0;

      .conPoin {
        padding: 9px 15px 9px 0;

        &>span+span:before {
          content: "/\00a0";
          padding: 0 5px;
          color: #ccc;
        }
      }

      .mainCon {
        overflow: hidden;
        margin: 5px 0 15px;

        .previewWrap {
          float: left;
          width: 400px;
          position: relative;
        }

        .InfoWrap {
          width: 700px;
          float: right;

          .InfoName {
            font-size: 14px;
            line-height: 21px;
            margin-top: 15px;
          }

          .news {
            color: #e12228;
            margin-top: 15px;
          }

          .priceArea {
            background: #fee9eb;
            padding: 7px;
            margin: 13px 0;

            .priceArea1 {
              overflow: hidden;
              line-height: 28px;
              margin-top: 10px;

              .title {
                float: left;
                margin-right: 15px;
              }

              .price {
                float: left;
                color: #c81623;

                i {
                  font-size: 16px;
                }

                em {
                  font-size: 24px;
                  font-weight: 700;
                }

                span {
                  font-size: 12px;
                }
              }

              .remark {
                float: right;
              }
            }

            .priceArea2 {
              overflow: hidden;
              line-height: 28px;
              margin-top: 10px;

              .title {
                margin-right: 15px;
                float: left;
              }

              .fixWidth {
                width: 520px;
                float: left;

                .red-bg {
                  background: #c81623;
                  color: #fff;
                  padding: 3px;
                }

                .t-gray {
                  color: #999;
                }
              }
            }


          }

          .support {
            border-bottom: 1px solid #ededed;
            padding-bottom: 5px;

            .supportArea {
              overflow: hidden;
              line-height: 28px;
              margin-top: 10px;

              .title {
                margin-right: 15px;
                float: left;
              }

              .fixWidth {
                width: 520px;
                float: left;
                color: #999;
              }
            }
          }

          .choose {
            .chooseArea {
              overflow: hidden;
              line-height: 28px;
              margin-top: 10px;

              dl {
                overflow: hidden;
                margin: 13px 0;

                dt {
                  margin-right: 15px;
                  float: left;
                }

                dd {
                  float: left;
                  margin-right: 5px;
                  color: #666;
                  line-height: 24px;
                  padding: 2px 14px;
                  border-top: 1px solid #eee;
                  border-right: 1px solid #bbb;
                  border-bottom: 1px solid #bbb;
                  border-left: 1px solid #eee;
									cursor: pointer;

                  &.active {
                    color: green;
                    border: 1px solid green;
                  }
                }
              }
            }

            .cartWrap {
              .controls {
                width: 48px;
                position: relative;
                float: left;
                margin-right: 15px;

                .itxt {
                  width: 38px;
                  height: 35px;
                  border: 1px solid #ddd;
                  color: #555;
                  float: left;
                  border-right: 0;
                  text-align: center;
                }

                .plus,
                .mins {
                  width: 15px;
                  text-align: center;
                  height: 17px;
                  line-height: 17px;
                  background: #f1f1f1;
                  color: #666;
                  position: absolute;
                  right: -8px;
                  border: 1px solid #ccc;
                }

                .mins {
                  right: -8px;
                  top: 19px;
                  border-top: 0;
                }

                .plus {
                  right: -8px;
                }
              }

              .add {
                float: left;

                a {
                  background-color: #e1251b;
                  padding: 0 25px;
                  font-size: 16px;
                  color: #fff;
                  height: 36px;
                  line-height: 36px;
                  display: block;
                }
              }
            }
          }
        }
      }
    }

    .product-detail {
      width: 1200px;
      margin: 30px auto 0;
      overflow: hidden;

      .aside {
        width: 210px;
        float: left;
        border: 1px solid #ccc;

        .tabWraped {
          height: 40px;

          h4 {
            border-top: 3px solid #fff;
            float: left;
            line-height: 37px;
            width: 105px;
            text-align: center;
            border-bottom: 1px solid #ccc;

            &.active {
              border-top: 3px solid #e1251b;
              border-bottom: 0;
              font-weight: normal;
            }
          }
        }

        .tabContent {
          padding: 10px;

          .tab-pane {
            display: none;

            &.active {
              display: block;
            }

            &:nth-child(1) {
              .partList {
                overflow: hidden;

                li {
                  width: 50%;
                  float: left;
                  border-bottom: 1px dashed #ededed;
                  line-height: 28px;
                }
              }

              .goodsList {
                &>li {
                  margin: 5px 0 15px;
                  border-bottom: 1px solid #ededed;
                  padding-bottom: 5px;

                  .list-wrap {
                    .p-img {
                      text-align: center;

                      img {
                        width: 152px;
                      }
                    }

                    .price {
                      font-size: 16px;
                      color: #c81623;
                    }

                    .operate {
                      text-align: center;
                      margin: 5px 0;

                      a {
                        background-color: transparent;
                        border: 1px solid #8c8c8c;
                        color: #8c8c8c;
                        display: inline-block;
                        padding: 2px 14px;
                        line-height: 18px;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      .detail {
        width: 980px;
        float: right;

        .fitting {
          border: 1px solid #ddd;
          margin-bottom: 15px;

          .kt {
            border-bottom: 1px solid #ddd;
            background: #f1f1f1;
            color: #333;
            padding: 5px 0 5px 15px;
          }

          .good-suits {
            height: 170px;
            padding-top: 10px;

            .master {
              width: 127px;
              height: 165px;
              text-align: center;
              position: relative;
              float: left;

              img {
                width: 87px;
              }

              p {
                color: #c81623;
                font-size: 16px;
                font-weight: 700;
              }

              i {
                position: absolute;
                top: 48px;
                right: -25px;
                font-size: 16px;
              }
            }

            .suits {
              width: 668px;
              height: 165px;
              float: left;

              .suitsItem {
                float: left;
                width: 127px;
                padding: 0 20px;
                text-align: center;

                img {
                  width: 120px;
                  height: 130px;
                }

                p {
                  font-size: 12px;
                }

                label {
                  display: block;
                  position: relative;

                  input {
                    vertical-align: middle;
                  }

                  span {
                    vertical-align: middle;
                  }
                }
              }
            }

            .result {
              border-left: 1px solid #ddd;
              width: 153px;
              height: 165px;
              padding-left: 20px;
              float: left;

              .num {
                font-size: 14px;
                margin-bottom: 10px;
                margin-top: 10px;
              }

              .price-tit {
                font-weight: bold;
                margin-bottom: 10px;
              }

              .price {
                color: #B1191A;
                font-size: 16px;
                margin-bottom: 10px;
              }

              .addshopcar {
                background-color: #e1251b;
                border: 1px solid #e1251b;
                padding: 10px 25px;
                font-size: 16px;
                color: #fff;
                display: inline-block;
                box-sizing: border-box;
              }
            }
          }
        }

        .intro {
          .tab-wraped {
            background: #ededed;
            // border: 1px solid #ddd;
            overflow: hidden;

            li {
              float: left;

              &+li>a {
                border-left: 1px solid #ddd;
              }

              &.active {
                a {
                  // border: 0;
                  background: #e1251b;
                  color: #fff;
                }
              }

              a {
                display: block;
                height: 40px;
                line-height: 40px;
                padding: 0 11px;
                text-align: center;
                color: #666;
                background: #fcfcfc;
                border-top: 1px solid #ddd;
                border-bottom: 1px solid #ddd;
              }
            }
          }

          .tab-content {
            .tab-pane {
              display: none;

              &.active {
                display: block;
              }

              &:nth-child(1) {
                .goods-intro {
                  padding-left: 10px;

                  li {
                    margin: 10px 0;
                  }
                }

                .intro-detail {
                  img {
                    width: 100%;
                  }
                }
              }
            }

          }
        }
      }
    }
  }
</style>