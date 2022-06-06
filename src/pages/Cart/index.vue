<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body" v-show="cartInfoList.length">
				<!-- 每一个商品 -->
        <ul class="cart-list" v-for="cartInfo in cartInfoList" :key="cartInfo.id">
					<!-- 勾选框 -->
          <li class="cart-list-con1">
            <input 
							type="checkbox" 
							name="chk_list" 
							:checked="cartInfo.isChecked"
							@click.prevent="handleCheckOne(cartInfo)"
						>
          </li>
					<!-- 商品图片+商品名 -->
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl">
            <div class="item-msg">{{cartInfo.skuName}}</div>
          </li>
					<!-- 单价 -->
          <li class="cart-list-con4">
            <span class="price">￥{{cartInfo.cartPrice}}</span>
          </li>
					<!-- 数量 -->
          <li class="cart-list-con5">

						<!-- 减按钮 -->
            <a class="mins" @click="handleChangeGoodNum('decrement',cartInfo)">-</a>
						<!-- 每个商品数量的输入框 -->
            <input 
							type="text" 
							class="itxt" 
							:value="cartInfo.skuNum" 
							@change="handleChangeGoodNum('input',cartInfo,$event)"
						>
						<!-- 加按钮 -->
            <a class="plus" @click="handleChangeGoodNum('increment',cartInfo)">+</a>


          </li>
					<!-- 小计 -->
          <li class="cart-list-con6">
            <span class="sum">￥{{cartInfo.cartPrice * cartInfo.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="handleDeleteOne(cartInfo.skuId)">删除</a>
            <br>
          </li>
        </ul>
      </div>
    </div>
		<!-- 购物车底部工具栏 -->
    <div class="cart-tool" v-show="cartInfoList.length">
      <div class="select-all">
        <input 
					class="chooseAll" 
					type="checkbox" 
					:checked="isAll"
					@click.prevent="handleCheckAll"
				>
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="handleBatchDelete">删除选中的商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{total}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
		<!-- 数据为空的展示 -->
		<div class="empty" v-show="!cartInfoList.length">
			<h2>购物车空空如也</h2>
			<img src="http://49.232.112.44/img/empty.751bed26.gif" alt="">
		</div>
  </div>
</template>

<script>
	import {
		reqCartList,
		reqCheckOneCart,
		reqCheckAllCart,
		reqDeleteOneCart,
		reqBatchDeleteCart,
		reqAddGood2Cart
	} from '@/api'
	
	import {goodNumReg} from '@/utils/reg'
	import _ from 'lodash'

  export default {
    name: 'Cart',
		data(){
			return {
				cartInfoList:[],
				isExecute:true
			}
		},
		computed:{
			// 用户标识是否全选
			isAll(){
				// 所有商品的isChecked都为1的时，isAll为true，否则false
				return this.cartInfoList.every( cartInfo => cartInfo.isChecked === 1)
			},
			// 总数
			total(){
				let n = 0 //初识化一个值，用于累加总数
				this.cartInfoList.forEach( cartInfo => {
					if(cartInfo.isChecked){
						n += cartInfo.skuNum
					}
				})
				return n
			},
			// 总金额
			totalPrice(){
				let n = 0 //初识化一个值，用于累加总金额
				this.cartInfoList.forEach( cartInfo => {
					if(cartInfo.isChecked){
						n += cartInfo.skuNum * cartInfo.cartPrice
					}
				})
				return n
			}
		},
		methods:{
			//用于获取购物车数据的函数
			async getCartList(){
				// 发请求获取购物车数据
				let result = await reqCartList()
				if(result.code === 200){
					// 如果购物车中有数据，在存储
					if(result.data[0]){
						this.cartInfoList = result.data[0].cartInfoList
					}
				}else{
					alert(result.message)
				}
			},
			// 勾选一个商品的回调
			async handleCheckOne(cartInfo){
				// 获取商品的：id，当前的勾选状态
				let {skuId,isChecked} = cartInfo
				// 对勾选状态进行取反
				isChecked = (isChecked === 1 ? 0 : 1)
				//联系服务器去勾选商品
				let result = await reqCheckOneCart(skuId,isChecked)
				if(result.code === 200){
					// 若服务器端，勾选成功，则更新本地数据
					cartInfo.isChecked = isChecked
				}else{
					// 若服务器端，勾选失败，则提示失败原因
					alert(result.message)
				}
			},
			// 全选的回调
			async handleCheckAll(){
				// 获取购物车中所有商品、当前的全选状态
				let {cartInfoList,isAll} = this
				// 全选状态取反
				let isChecked = (isAll ? 0 : 1)
				// 准备一个空数组，用于存储每一个id
				let idList = []
				// 将购物车中所有的商品id拿出来，形成一个数组
				cartInfoList.forEach( cartInfo => idList.push(cartInfo.skuId))
				// 发请求进行全选
				let result = await reqCheckAllCart(idList,isChecked)
				// 判断全选是否成功
				if(result.code === 200){
					// 若成功，更新本地数据
					cartInfoList.forEach( cartInfo => cartInfo.isChecked = isChecked)
				}else{
					// 若失败，提示原因
					alert(result.message)
				}
			},
			// 删除某个商品的回调
			async handleDeleteOne(id){
				// 如果用户确定删除
				if(confirm('确定删除吗？')){
					// 发请求去删除
					const result = await reqDeleteOneCart(id)
					// 判断删除是否成功？
					if(result.code === 200){
						// 若成功，维护本地数据

						// 第一种做法用filter去过滤
						// this.cartInfoList = this.cartInfoList.filter(cartInfo => cartInfo.skuId !== id)
						
						// 第二种做法用findIndex，找到索引值，随后再删（推荐）
						let index = this.cartInfoList.findIndex(cartInfo => cartInfo.skuId === id)
						this.cartInfoList.splice(index,1)
					}else{
						// 若失败，提示原因
						alert(result.message)
					}
				}
			},
			// 删除选中的商品回调
			async handleBatchDelete(){
				if(confirm('确定删除已选择的吗？')){
					// 准备好一个数组，用于收集商品skuId
					const idList = []
					// 遍历收集商品skuId
					this.cartInfoList.forEach( cartInfo => {
						if(cartInfo.isChecked) {
							idList.push(cartInfo.skuId)
						} 
					})
					// 联系服务器
					let result = await reqBatchDeleteCart(idList)
					// 判断业务逻辑是成功
					if(result.code === 200){
						// 若服务器端删除成功，则维护本地数据
						// 留下所有isChecked为0的，简言之：没勾的都留下，勾了的都不要
						this.cartInfoList = this.cartInfoList.filter( cartInfo => !cartInfo.isChecked)
					}else{
						// 若服务器端删除失败，则提示原因
						alert(result.message)
					}
				}
			},
			// 修改商品数量的回调
			async handleChangeGoodNum(type,cartInfo,e){
				// 若此时不可操作购物车数量，则停掉逻辑，否则正常执行
				if(!this.isExecute) return
				// 即将操作购物车数量，立刻锁定逻辑
				this.isExecute = false
				//注意switch中若出现终止逻辑的代码，请务必在终止前将isExecute置为true
				switch (type) {
					// 若是点击了加号
					case 'increment':
						if(cartInfo.skuNum === 200){
							alert('最大购买数量为200！')
						}
						else{
							// 发送请求让服务器+1
							let result = await reqAddGood2Cart(cartInfo.skuId,1)
							// 根据服务器返回的结果，来维护本地数
							if(result.code === 200){
								// 本地也加1
								cartInfo.skuNum++
								// 勾选
								cartInfo.isChecked = 1
							}else{
								alert(result.message)
							}
						}
						break;
					// 若是点击了减号
					case 'decrement':
						if(cartInfo.skuNum === 1){
							alert('最小购买数量为1！')
						}
						else{
							// 发送请求让服务器+1
							let result = await reqAddGood2Cart(cartInfo.skuId,-1)
							// 根据服务器返回的结果，来维护本地数
							if(result.code === 200){
								// 本地也加1
								cartInfo.skuNum--
								// 勾选
								cartInfo.isChecked = 1
							}else{
								alert(result.message)
							}
						}
						break;
					// 若是直接修改
					case 'input':
						// 获取用户的【输入的数量】
						const {value} = e.target
						// 获取【商品的skuId】、【商品先前的数量】
						const {skuId,skuNum} = cartInfo
						// 校验输入
						// 用户输入的合法
						if(goodNumReg.test(value)){
							// 若输入合法
							// 计算插值
							const disNum = value - skuNum
							// 发请求联系服务器
							let result = await reqAddGood2Cart(skuId,disNum)
							// 判断业务逻辑是否成功
							if(result.code === 200){
								// 修改数量成功了
								cartInfo.skuNum = value * 1
								// 只要修改数量成功，必勾选
								cartInfo.isChecked = 1
							}else{
								// 修改数量失败了（服务器太忙了，数据库崩溃了等等）
								alert(result.message)
								// 亲手操作DOM，将值变为输入前的值
								e.target.value = skuNum
							}
						}
						// 用户输入的太多了
						else if(value > 200){
							// 计算差值
							const disNum = 200 - skuNum
							// 如果差值是0，直接将DOM置为200，逻辑停止，请求根本无需发送。
							if(disNum === 0) {
								this.isExecute = true
								return e.target.value = 200
							}
							// 发请求联系服务器
							const result = await reqAddGood2Cart(skuId,disNum)
							// 判断业务逻辑是否成功
							if(result.code === 200){
								// 若成功，更新本地数据，同时直接操作DOM，将内容变为200
								cartInfo.skuNum = e.target.value = 200
								// 只要修改数量成功，必勾选
								cartInfo.isChecked = 1
							}else{
								// 若失败，更新本地数据
								alert(result.message)
								// 亲手操作DOM，将值变为输入前的值
								e.target.value = skuNum
							}
						}
						// 用户输入的很不合法（@、-9、12.8等等）
						else{
							// “一巴掌”打回之前的值
							e.target.value = skuNum
						}
				}
				// 释放数量修改逻辑
				this.isExecute = true
			}
		},
		mounted(){
			// 组件一挂载就调用getCartList，获取购物车数据
			this.getCartList()
		}
  }
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;
  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }
  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;
      & > div {
        float: left;
      }
      .cart-th1 {
        width: 25%;
        input {
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
        }
      }
      .cart-th2 {
        width: 25%;
      }
      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }
    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;
      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
        & > li {
          float: left;
        }
        .cart-list-con1 {
          width: 15%;
        }
        .cart-list-con2 {
          width: 35%;
          img {
            width: 82px;
            height: 82px;
            float: left;
          }
          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }
        .cart-list-con4 {
          width: 10%;
        }
        .cart-list-con5 {
          width: 17%;
          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
						text-decoration: none;
          }
          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 31px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
						text-decoration: none;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }
  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }
			

      .sumbtn {
        float: right;
        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
					text-decoration: none;
					&hover {
						color: white !important;
					}
        }
      }
    }
  }
	.empty{
		margin-top: 20px;
		text-align: center;
		h2{
			color: gray;
			text-align: center;
		}
		img{
			width: 300px;
		}
	}
}
</style>