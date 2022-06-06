<template>
  <div class="spec-preview">
		<vue-photo-zoom-pro 
			:url="afterImgurl || imgurl" 
			:high-url="afterImgurl || imgurl"
			:width="200"
			:height="200"
			:out-zoomer="true"
		/>
  </div>
</template>

<script>
	import vuePhotoZoomPro from 'vue-photo-zoom-pro'
	import 'vue-photo-zoom-pro/dist/style/vue-photo-zoom-pro.css'
  export default {
    name: "Zoom",
		props:['imgurl'],
		data() {
			return {
				afterImgurl:'' //用于存储后期切换的url
			}
		},
		components: {vuePhotoZoomPro},
		mounted(){
			this.$bus.$on('send-imgurl',(url)=>{
				this.afterImgurl = url
			})
		},
		beforeDestroy(){
			this.$bus.$off('send-imgurl')
		}
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

		.out-zoomer{
			z-index: 3;
		}

		.selector{
			background-color: rgba(255, 0, 0, 0.333);
		}

  }
</style>