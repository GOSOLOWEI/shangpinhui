<template>
  <div class="trade-container">
		<br>
		<br>
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>

      <div class="address clearFix" v-for="address in addressList" :key="address.id">
        <span class="username" :class="{selected:address.isDefault == 1}">{{address.consignee}}</span>
        <p @click="changeAddress(address.id)">
          <span class="s1">{{address.fullAddress}}</span>
          <span class="s2">{{address.phoneNum}}</span>
          <span class="s3" v-show="address.isDefault == 1">默认地址</span>
        </p>
      </div>
			
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="detail">

        <ul class="list clearFix" v-for="detail in tradeInfo.detailArrayList" :key="detail.skuId">
          <li>
            <img :src="detail.imgUrl" alt="">
          </li>
          <li>
            <p>{{detail.skuName}}</p>
          </li>
          <li>
            <h3>￥{{detail.orderPrice}}</h3>
          </li>
          <li>X{{detail.skuNum}}</li>
          <li>有货</li>
        </ul>

      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea v-model="message" placeholder="建议留言前先与商家沟通确认" class="remarks-cont"></textarea>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b><i>{{tradeInfo.totalNum}}</i>件商品，总商品金额</b>
          <span>¥{{tradeInfo.originalTotalAmount}}</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">应付金额:　<span>¥{{tradeInfo.totalAmount}}</span></div>
      <div class="receiveInfo">
        寄送至:
        <span>{{selectedAddress.fullAddress}}</span>
        收货人：<span>{{selectedAddress.consignee}}</span>
        <span>{{selectedAddress.phoneNum}}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <a class="subBtn" @click="submitOrder">提交订单</a>
    </div>
  </div>
</template>

<script>
	import {reqUserAddressList,reqTradeInfo,reqSubmitOrder} from '@/api'
  
	export default {
    name: 'Trade',
		data() {
			return {
				addressList:[],//收货地址
				tradeInfo:{}, //交易信息
				message:'' //买家留言
			}
		},
		computed:{
			selectedAddress(){
				return this.addressList.find(address => address.isDefault == 1) || {}
			}
		},
		methods:{
			// 获取交易页的所有信息
			async getTradeAbout(){
				const r1 = await reqUserAddressList()
				const r2 = await reqTradeInfo()
				this.addressList = r1.data
				this.tradeInfo = r2.data
			},
			// 切换收货地址的回调
			changeAddress(id){
				this.addressList.forEach((address)=>{
					if(address.id === id) {
						address.isDefault = '1'
					}else{
						address.isDefault = '0'
					}
				})
			},
			// 提交订单的回调
			async submitOrder(){
				// 获取交易编号
				const {tradeNo} = this.tradeInfo
				// 获取其他参数
				const {consignee,fullAddress,phoneNum} = this.selectedAddress
				const {detailArrayList} = this.tradeInfo
				// 整理一个参数对象
				const paramsObj = {
					consignee, //收货人姓名
					consigneeTel:phoneNum,//电话
					deliveryAddress:fullAddress,//地址
					paymentWay:'ONLINE',//支付方式
					orderComment:this.message,//买家留言
					orderDetailList:detailArrayList//商品清单
				}
				// 发请求提交订单
				const result = await reqSubmitOrder(tradeNo,paramsObj)
				if(result.code === 200){
					// 提示
					this.$message.success('订单提交成功，请及时支付！')
					// 跳转到支付路由，同时携带着订单编号
					this.$router.push({
						path:'/pay',
						query:{order_id:result.data}
					})
				}else{
					this.$message.warning(result.message)
				}
			}
		},
		mounted(){
			this.getTradeAbout()
		}
  }
</script>

<style lang="less" scoped>
  .trade-container {
    .title {
      width: 1200px;
      margin: 0 auto;
      font-size: 14px;
      line-height: 21px;
    }

    .content {
      width: 1200px;
      margin: 10px auto 0;
      border: 1px solid rgb(221, 221, 221);
      padding: 25px;
      box-sizing: border-box;

      .receive,
      .pay {
        line-height: 36px;
        margin: 18px 0;
      }

      .address {
        padding-left: 20px;
        margin-bottom: 15px;

        .username {
          float: left;
          width: 100px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border: 1px solid #ddd;
          position: relative;
        }

        .username::after {
          content: "";
          display: none;
          width: 13px;
          height: 13px;
          position: absolute;
          right: 0;
          bottom: 0;
          background: url(./images/choosed.png) no-repeat;
        }

        .username.selected {
          border-color: #e1251b;
        }

        .username.selected::after {
          display: block;
        }

        p {
          width: 610px;
          float: left;
          line-height: 30px;
          margin-left: 10px;
          padding-left: 5px;
          cursor: pointer;

          .s1 {
            float: left;

          }

          .s2 {
            float: left;
            margin: 0 5px;
          }

          .s3 {
            float: left;
            width: 56px;
            height: 24px;
            line-height: 24px;
            margin-left: 10px;
            background-color: #878787;
            color: #fff;
            margin-top: 3px;
            text-align: center;
          }
        }

        p:hover {
          background-color: #ddd;
        }
      }

      .line {
        height: 1px;
        background-color: #ddd;
      }

      .way {
        width: 1080px;
        height: 110px;
        background: #f4f4f4;
        padding: 15px;
        margin: 0 auto;

        h5 {
          line-height: 50px;
        }

        .info {
          margin-top: 20px;

          .s1 {
            float: left;
            border: 1px solid #ddd;
            width: 120px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            margin-right: 10px;
          }

          p {
            line-height: 30px;
          }
        }
      }

      .detail {
        width: 1080px;

        background: #feedef;
        padding: 15px;
        margin: 2px auto 0;

        h5 {
          line-height: 50px;
        }

        .list {
          display: flex;
          justify-content: left;

          li {
            line-height: 30px;
						margin-left: 20px;

            p {
							max-width: 500px;
              margin-bottom: 20px;
            }

            h4 {
              color: #c81623;
              font-weight: 400;
            }

            h3 {

              color: #e12228;
            }
						img{
							width: 100px;
						}
          }
        }
      }

      .bbs {
        margin-bottom: 15px;

        h5 {
          line-height: 50px;
        }

        textarea {
          width: 100%;
          border-color: #e4e2e2;
          line-height: 1.8;
          outline: none;
          resize: none;
        }
      }

      .bill {
        h5 {
          line-height: 50px;
        }

        div {
          padding-left: 15px;
        }
      }
    }

    .money {
      width: 1200px;
      margin: 20px auto;

      ul {
        width: 220px;
        float: right;

        li {
          line-height: 30px;
          display: flex;
          justify-content: space-between;

          i {
            color: red;
          }
        }
      }
    }

    .trade {
      box-sizing: border-box;
      width: 1200px;
      padding: 10px;
      margin: 10px auto;
      text-align: right;
      background-color: #f4f4f4;
      border: 1px solid #ddd;

      div {
        line-height: 30px;
      }

      .price span {
        color: #e12228;
        font-weight: 700;
        font-size: 14px;
      }

      .receiveInfo {
        color: #999;
      }
    }

    .sub {
      width: 1200px;
      margin: 0 auto 10px;

      .subBtn {
        float: right;
        width: 164px;
        height: 56px;
        font: 700 18px "微软雅黑";
        line-height: 56px;
        text-align: center;
        color: #fff;
        background-color: #e1251b;

      }
    }

  }
</style>