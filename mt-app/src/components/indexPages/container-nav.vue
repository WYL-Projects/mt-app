<template>
    <div class="index-container-nav">
        <dl :class="[navData.class]">
            <dt class="nav-title">{{navData.title}}</dt>
            <dd :class="{'nav-item':true, 'active':index==curIndex}" 
                v-for="(item, index) in navData.items" 
                v-bind:key="item"
                :data-index = "index"
                @mouseover="beActive($event)">
                {{item}}
            </dd>
            <dd class="total nav-item" v-if="navData.totalItem">
                <router-link to="totalItem.href">
                    <span>{{navData.totalItem.content}}</span>
                    <span class="right-arrow"></span>
                </router-link>
            </dd>
        </dl>
    </div>  
</template>
<script>
import {createNamespacedHelpers} from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('index') //index模块
export default {
    data() {
        return {
            navData:{
              title:'有格调',
              class:'scenes-nav-bg',
              items:['全部', '约会聚餐', '丽人SPA', '电影演出', '品质出游'],
            //   totalItem:{
            //       content:'全部',
            //       href:'https://maoyan.com/'
            //   }
            },
            curIndex:0,

        }
    },
    computed: {
        //在Index模块下查找
        ...mapState(['hasStyleList','allList'])
    },
    methods: {
        beActive(e) {
            this.curIndex = e.target.getAttribute('data-index');
            let navTagContent = e.target.innerText;
            //进行数据请求
            //console.log(this.hasStyleList)
            //console.log(this.$store)
            if(navTagContent=="全部"){
                //全部这一标签的数据
                this.$store.commit('index/setAllList', this.hasStyleList.all)
            }else if(navTagContent=="约会聚餐"){
                this.$store.commit('index/setAllList', this.hasStyleList.food)
            }else if(navTagContent=="丽人SPA"){
                this.$store.commit('index/setAllList', this.hasStyleList.spa)
            }//后两个标签没数据
            
        },  
        //在Index模块下查找
        ...mapActions(['setHasStyleList'])
    },
    created() {
        this.setHasStyleList()
        //一开始默认全部
    },
}
</script>
