<template>
  <el-row class="header-content">
    <el-col :span="6" class="header-title">
      <router-link :to="{name:'home'}">
        <img src="https://s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="美团">
      </router-link>
    </el-col>
    <el-col :span="18" class="header-search-module">
    <div class="top">
      <el-input class="header-search-input" placeholder="搜索商家和地点"  v-model="searchWord" clearable @focus="focus" @blur="blur" @input="search" ></el-input>
      <el-button class="header-search-btn" type="primary" icon="el-icon-search" @click="clickSearch"></el-button>
      <div class="header-search-hasinput" v-show="searchWord && isFocused">
           <p v-for="(item, index) in selectedList"  :key="index"  @click="aClick(item)">{{item}}</p>
      </div>

       <div class="header-search-hotSearch" v-show="isHot">
           <p class="header-search-hotword">热门搜索</p>
           <div><router-link v-for="(item, index) in hotList"  @click.native="aClick(item)" :key="index" :to="{name:'goods', params:{place:item}}">{{item}}</router-link></div>
       </div>

      </div>
      <div class="header-search-success">
          <router-link v-for="item in successList" :key="item" @click.native="aClick(item)" :to="{name:'goods', params:{place:item}}">{{item}}</router-link>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import api from '@/api/api.js'
import {mapState} from 'vuex'
export default {
    data(){
        return {
            searchWord: "",
            isFocused:false,
            successList:[],
            hotList:['故宫博物院','北京欢乐谷','八达岭长城','北京动物园','颐和园','北京野生动物园'],
            serachList:[],
            selectedList:[]
        }
    },
    computed: {
        isHot(){
            return this.isFocused && !this.searchWord
        },
        
    },
    methods: {
        focus(){
           this.isFocused =  true
        },
        blur(){
          const self = this;
          //当点击热搜的时候，先触发的是失焦事件，没有定时器的话isFocused会先变成false即热搜消失
          setTimeout(()=>{
            self.isFocused =  false
          },200)
        },
        //根据输入文字查询
        search() {
           this.selectedList = this.serachList.filter(ele=>{
              return ele.indexOf(this.searchWord) > -1
           })
           console.log(this.selectedList)
        },
        //点击热门城市和推荐城市
        aClick(content) {
           this.searchWord = content
        },
        clickSearch() {
           this.$router.push({path:'/s/'+this.searchWord})
        }
    },
    created() {
      //获取SearchList
      api.getSearchList().then(res=>this.serachList = res.data.data.list,rej=>console.log(rej))
      //获取热门城市
      api.getHotCities().then(res=>{
        //console.log(res)
        if(res.data.status=="fail") {
          alert(res.data.msg)
          return
        }
        this.hotList = res.data.data
        this.successList = this.hotList
        },rej=>console.log(rej))
    },
};
</script>
<style lang="scss">
@import "@/assets/css/header/searchBar.scss";
</style>
