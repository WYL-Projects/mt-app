<template>
  <div class="filter-component">
     <div class="label">
       <label class="name">{{title}}</label>
       <span class="totalTag">全部</span>
     </div>
     <div class="tags">
       <div class="tag-group">
         <div :class="{'tag':true}" 
         v-for="(item, index) in list" 
         :key="index" 
         >
         <span  @mouseenter='hoverShow($event, index)' @mouseleave='leaveHidden' >
       <span>{{item.title}}</span> <i class="el-icon-caret-bottom"></i>
          <div  :class="{'dropDownList':true}"
           v-show="index==activeIndex">
               <p>{{item.title}}</p>
               <div class="subList" >  
                 <div class="every-tag" v-for="ele in item.subList" :key="ele.id">{{ele.name}}</div>
               </div>
          </div> 
         </span>
         </div>
        </div>
     </div>
  </div>
</template>
<script>
export default {
   props: ['list','title'],
   data() {
     return {
       activeIndex:null, //显示下拉框的标签对应的当前索引值
       tagLen:0,
       tagHeight:0
     }
   },
   methods:{
     //将下标定位到tag中间
     positionDownSign(e) {
        this.tagLen = e.target.offsetWidth
        this.tagHeight = e.target.offsetHeight
        const len = e.target.children[0].offsetWidth/2, left =len-26 //26代表三角距离左边框的默认距离left=26
        const dropDownList = e.target.children[2]
        if(left < 0) {
           dropDownList.style.left = 10+left+'px'
        }
     },
     hoverShow(e, index) {
       clearTimeout(this.timer)
       this.timer = setTimeout(()=>{
          this.activeIndex = index
       },500)
       this.positionDownSign(e)
       //console.log('hoverShow=', e)
     },
     leaveHidden(e){
       //通过判断移出时的位置，做出不同的措施
         clearTimeout(this.timer)
        // console.log('leaveHidden',e)
         //从左边区域
           //从下拉框出去
           
           if(e.offsetY>=this.tagHeight-5) {//当从下拉框的右上出来时，如果不将this.tagHeight-5的话，会出现
             this.timer=setTimeout(()=>{
               this.activeIndex = null
             },500)
           }else {
              this.activeIndex = null
           }
     }
   }
};
</script>