<template>
   <div :class="{'choose':true,
                'disabled1':provinceOrCity=='city'&&disabled}"
                >
       {{selectedPro || value}}
       <i class="el-icon-caret-bottom"></i> 
       <div :class="{'mt-provinces': true}" v-show="isShowPro || isShowCity">
           <p>{{value}}</p>
           <div class="columns">
           <div class="every-column" v-for="ele in columnNum" :key="ele">
               <span :class="{
                   'province':provinceOrCity=='province',
                   'city':provinceOrCity=='city'
                   //如果是城市的话且selectedPro等于空串即还没有选择哪个省
                   }"
                   
                 v-for="index in 12"  
                 :key="index" 
                 v-show="list[12*(ele-1) + index -1]"
                 v-on:click.stop="changeProOrCity($event, 12*(ele-1) + index - 1)"
                 >
                 <!-- 上面的index是从1开始的，原因是它相当于item，循环里面的每一个元素，循环12次所以后面的index都需要-1 -->
                   <a :href="'#'+list[12*(ele-1) + index -1]">{{list[12*(ele-1) + index-1 ]}}</a>
               </span>
           </div>
           </div>
       </div>
   </div>
</template>
<script>
export default {
    //provinceOrCity:省或者城市
   props: ['list', 'value', 'provinceOrCity', 'isShowPro', 'isShowCity', 'disabled'],
   data() {
       return {
           isActive:false,
           count: 0,
           flag: true,//这个用于第一次点击选择省份的时候获取当前索引，第二次点击省份的时候获取上一次索引
           selectedPro: ""
       }
   },
   created() {
       
   },
   methods:{
        changeProOrCity(e, index) {
            //获得选中的省份名称
            this.getProvinceName(e, index)
            this.transferToParent()
            this.skipIndexPage()
            //console.log(this.selectedPro,this.provinceOrCity=='city'&&this.selectedPro=='')
        },
        getProvinceName(e, index) {
            //console.log(e,e.target,e.target, e.target.parentNode.parentNode)
            //e.target.addClass('active')
            //去除所有的active
            //this.isActive = false
            //方法一
            // const domSet = document.getElementsByClassName('province')
            // for(let ele of domSet){
            //     ele.classList.remove('active')
            // }
            //方法二
            //console.log(index, this.count);
            //这个用于第一次点击选择省份的时候获取当前索引，第二次点击省份的时候获取上一次索引
            let index1 = this.flag?index:this.count,
                dom = document.getElementsByClassName(this.provinceOrCity)[index1];
            dom.classList.remove('active');
            e.target.parentNode.classList.add('active');
            //选中的省份名称
            this.selectedPro = e.target.innerText
            this.count = index
            this.flag = false
        },
        transferToParent() {
            //将三个数据传递给父级
            //点击完成之后隐藏下拉列表
            this.$emit('selected', {isShowPro:false, isShowCity:false, disabled:false, selectedPro:this.selectedPro})
        },
        skipIndexPage() {
            if(this.provinceOrCity == 'city'){
                this.$router.push({name:'index'})
                //将选中的城市提交
                this.$store.commit('index/setPosition', this.selectedPro)
            }
        }
   },
   computed: {
       //获取多少列
       columnNum() {
          return Math.ceil(this.list.length/12)
       }
   }
}
</script>

