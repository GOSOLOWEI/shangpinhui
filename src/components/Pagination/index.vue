<template>
	<div class="pagination" v-show="total">
		<button :disabled="pageNo === 1" @click="sendPageNo(pageNo-1)">上一页</button>
		<button v-show="startEnd.start !== 1" @click="sendPageNo(1)">1</button>
		<span v-show="startEnd.start > 2">···</span> 
    
		<!-- 连续页区域 -->
    <button 
			v-for="(number,index) in (startEnd.end - startEnd.start + 1)" 
			:key="index" 
			:class="{active: (index + startEnd.start) === pageNo }"
			@click="sendPageNo(index + startEnd.start)"
		>
			{{index + startEnd.start}}
		</button>
	
		<span v-show="startEnd.end < totalPage - 1">···</span>
		<button v-show="startEnd.end !== totalPage" @click="sendPageNo(totalPage)">{{totalPage}}</button>
		<button :disabled="pageNo === totalPage" @click="sendPageNo(pageNo+1)">下一页</button>
		<span>共 {{total}} 条</span> 
  </div>
</template>

<script>
	export default {
		name:'Pagination',
		props:['total','pageSize','pageNo','continues','sendPageNo'],
		computed:{
			//计算总页数
			totalPage(){
				return Math.ceil(this.total / this.pageSize)
			},
			//计算连续页的：起始页、结束页
			startEnd(){
				let start = 0 //起始页的初始值
				let end = 0 //起始页的初始值
				//获取即将用到的数据
				const {pageNo,continues,totalPage} = this

				/* 运算开始 */
				if(continues > totalPage){
					// 若“您的要求太高了”（我一共就4页，你要连续的5页）
					start = 1
					end = totalPage
				}else{
					// 正常的左推，正常的右推
					start = pageNo - (continues-1) / 2 //左推
					end = pageNo + (continues-1) / 2 //右推
					// 推完之后，进行判断，看看左边是否推多了，什么是多？—— start<1
					if(start < 1){
						start = 1 //左重置
						end = continues
					}
					// 推完之后，进行判断，看看右边是否推多了，什么是多？—— end > totalPage
					if(end > totalPage){
						start = totalPage - continues + 1
						end = totalPage
					}
				}
				/* 运算结束 */

				return {start,end}
			}
		}
	}
</script>

<style lang="less" scoped>
	.pagination {
    text-align: center;

    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: gray;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #c81623;
        color: #fff;
      }
    }

    span {
      display: inline-block;
      line-height: 28px;
      font-size: 14px;
      color: gray;
      vertical-align: middle;
    }
  }
</style>