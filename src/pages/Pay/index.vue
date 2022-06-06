<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info">订单提交成功，请您及时付款，以便尽快为您发货~~</span>
        </h4>
        <div class="paymark">
          <span class="fl">请您在提交订单<em class="orange time">4小时</em>
					之内完成支付，超时订单会自动取消。订单号：<em>{{$route.query.order_id}}</em></span>
          <span class="fr"><em class="lead">应付金额：</em>
					<em class="orange money">￥{{payInfo.totalFee}}</em></span>
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>尚品汇商城支付平台目前支持<span class="zfb">微信</span>支付方式。</li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
        </ol>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay3.jpg"></li>
          </ul>

        </div>
        <div class="hr"></div>
        <div class="submit">
          <a class="btn" @click="handlePay">立即支付</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	import {reqPayInfo,reqPayStatus} from '@/api'
	import QRCode from 'qrcode'

  export default {
    name: 'Pay',
		data() {
			return {
				payInfo:{}
			}
		},
		methods:{
			// 获取支付信息
			async getPayInfo(){
				// 获取订单编号
				const {order_id} = this.$route.query
				// 发送请求获取支付信息
				const result = await reqPayInfo(order_id)
				// 判断业务逻辑是否成功
				if(result.code === 200){
					// 若获取支付信息成功，则存储数据
					this.payInfo = result.data
				}else{
					// 若获取支付信息失败，则提示原因
					this.$message.warning(result.message)
				}
			},
			// 立即支付按钮的回调（注意，handlePay这个函数，内容会越来越多）
			async handlePay(){
				try {
					// 将支付链接转为二维码（base64格式的）
					let base64Url = await QRCode.toDataURL(this.payInfo.codeUrl)
					// 准备一个html字符串，一会弹窗中要展示
					const htmlStr = `<img src="${base64Url}" style="width:200px">`
					// 准备一个弹窗配置对象
					const options = {
						dangerouslyUseHTMLString: true,//让弹窗可以解析html
						title:'微信扫码支付', //弹窗标题
						center:true, //居中布局
						showClose:false, //右上角的叉
						showCancelButton:true,//显示取消按钮
						cancelButtonText:'支付遇到问题',
						confirmButtonText:'已完成支付',
					}
					// 使用elementui弹窗
					this.$alert(htmlStr, {
						...options,
						callback:async(action)=>{
							if(action === 'confirm'){
								// 若点击了【已完成支付】，则：1.停止心跳。2.再次问问服务器，是否支付成功
								//1.停止心跳。
								clearInterval(this.heartbeatID)
								//2.再次问问服务器，是否支付成功
								const result = await reqPayStatus(this.payInfo.orderId)
								//判断是否真的支付成功了
								if(result.code === 200){
									// 若真的成功了，给提示，跳路由
									this.$message.success('您的订单已确认支付成功！')
									this.$router.push('/paysuccess')
								}else{
									// 若并未支付成功，则给提示
									this.$message.error('您的订单并未支付成功，请点击立即支付，重新付款！')
								}
							}else{
								// 若点击了【支付遇到问题】，则：1.停止心跳。2.给一个提示
								//1.停止心跳。
								clearInterval(this.heartbeatID)
								//2.给一个提示
								this.$message.warning('若支付遇到问题，请致电客服解决！')
							}
						}
					})
					// 发起心跳请求
					this.heartbeatID = setInterval(async ()=>{
						// 联系服务器，问问订单状态
						const result = await reqPayStatus(this.payInfo.orderId)
						// 判断订单状态
						if(result.code === 200){
							// 支付成功
							// 第一件事：停止心跳
							clearInterval(this.heartbeatID)
							// 第二件事：弹窗关闭
							this.$msgbox.close()
							// 第三件事：跳转到支付成功路由
							this.$router.push('/paysuccess')
						}
					},1000)
				} catch {
					// 若生成二维码失败，则提示
					this.$message.warning('支付二维码生成失败，请联系管理员！')
				}
			}
		},
		mounted(){
			// 组件一挂载，就获取支付信息
			this.getPayInfo()
		}
  }
</script>

<style lang="less" scoped>
  .pay-main {
    margin-bottom: 20px;

    .pay-container {
      margin: 0 auto;
      width: 1200px;

      a:hover {
        color: #4cb9fc;
      }

      .orange {
        color: #e1251b;
      }

      .money {
        font-size: 18px;
      }

      .zfb {
        color: #e1251b;
        font-weight: 700;
      }

      .checkout-tit {
        padding: 10px;

        .tit-txt {
          font-size: 14px;
          line-height: 21px;

          .success-icon {
            width: 30px;
            height: 30px;
            display: inline-block;
            background: url(./images/icon.png) no-repeat 0 0;
          }

          .success-info {
            padding: 0 8px;
            line-height: 30px;
            vertical-align: top;
          }
        }

        .paymark {
          overflow: hidden;
          line-height: 26px;
          text-indent: 38px;

          .fl {
            float: left;
          }

          .fr {
            float: right;

            .lead {
              margin-bottom: 18px;
              font-size: 15px;
              font-weight: 400;
              line-height: 22.5px;
            }
          }
        }
      }

      .checkout-info {
        padding-left: 25px;
        padding-bottom: 15px;
        margin-bottom: 10px;
        border: 2px solid #e1251b;

        h4 {
          margin: 9px 0;
          font-size: 14px;
          line-height: 21px;
          color: #e1251b;
        }

        ol {
          padding-left: 25px;
          list-style-type: decimal;
          line-height: 24px;
          font-size: 14px;
        }

        ul {
          padding-left: 25px;
          list-style-type: disc;
          line-height: 24px;
          font-size: 14px;
        }
      }

      .checkout-steps {
        border: 1px solid #ddd;
        padding: 25px;

        .hr {
          height: 1px;
          background-color: #ddd;
        }

        .step-tit {
          line-height: 36px;
          margin: 15px 0;
        }

        .step-cont {
          margin: 0 10px 12px 20px;

          ul {
            font-size: 0;

            li {
              margin: 2px;
              display: inline-block;
              padding: 5px 20px;
              border: 1px solid #ddd;
              cursor: pointer;
              line-height: 18px;
            }
          }
        }
      }

      .submit {
        text-align: center;

        .btn {
          display: inline-block;
          padding: 15px 45px;
          margin: 15px 0 10px;
          font: 18px "微软雅黑";
          font-weight: 700;
          border-radius: 0;
          background-color: #e1251b;
          border: 1px solid #e1251b;
          color: #fff;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
          user-select: none;
          text-decoration: none;
        }
      }
    }
  }
</style>