<template>
  <div class="swiper-container" ref="detail_swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="img in imgList" :key="img.id">
        <img :src="img.imgUrl" @click="$bus.$emit('send-imgurl',img.imgUrl)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
	import 'swiper/css/swiper.min.css'

  export default {
    name: "ImageList",
		props:['imgList'],
		watch:{
			imgList(){
				this.$nextTick(()=>{
					new Swiper(this.$refs.detail_swiper,{
						spaceBetween: 30, //每一屏之间的距离
						speed:500, //屏的切换速度
						slidesPerView:'auto',//同时展示几屏
						navigation: {
							nextEl: '.swiper-button-next', //下一张按钮的选择器
							prevEl: '.swiper-button-prev', //上一张按钮的选择器
						}
					})
				})
			}
		}
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 402px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>