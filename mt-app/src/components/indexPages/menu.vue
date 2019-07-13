<template>
   <div class="page-index">
    <div class="menu">
      <dl @mouseleave="hiddenDetailWrapper">
         <dd>
            <span>全部分类</span>
         </dd>
         <dt v-for="(item, index) in categoryList" :key="index"
             class="nav-dt" 
             @mouseenter="showDetailWrapper(item)" >
            <i :class="'nav-icon ' + item.type"></i>
            <span>{{item.name}}</span>
            <i class="arrow"></i>
         </dt>
      </dl>
      <div v-if="curDetail" class="detail-wrapper" @mouseenter="detailEnter" @mouseleave="detailLeave">
            <template  v-for="(ele, index) in curDetail.items" >
                   <div class="detail-content" :key="index">
                      <div class="detail-content-header">
                      <h4>{{ele.title}}</h4>
                      <span>更多></span>
                      </div>
                      <div class="detail-content-main">
                     <router-link tag="span"
                      v-for="ele1 in ele.items" 
                      :key="ele1"
                      :to="{path:'/'}">
                        {{ele1}}
                     </router-link>
                     </div>
                  </div>
            </template>
         </div>
    </div>
   </div>
</template>
<script>
import api from '@/api/api.js'
export default {
    data (){
       return {
          categoryList:[],
          curDetail:null,
          timer:null
       }
    },
    methods:{
       showDetailWrapper (item){
          this.curDetail = item;
       },
       hiddenDetailWrapper (){
          this.timer =  setTimeout(()=>{
            this.curDetail = null;
          }, 200)
       },
       detailEnter (){
         clearTimeout(this.timer);
       },
       detailLeave (){
          this.curDetail = null;
       }
    },
    created() {
        api.getMenuList().then(res=>{
        //console.log(res)
        if(res.data.status=="fail") {
          alert(res.data.msg)
          return
        }
        this.categoryList = res.data.data
        },rej=>console.log(rej))
    }
}
</script>
