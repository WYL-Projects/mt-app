<template>
  <div class="page">
    <el-row class="select-area">
      <div class="choose-by-province">
        <span class="keyWord">按省份选择：</span>
        <!-- 省 下拉框 -->
        <show-city-list 
        :list="provinceList" 
        value="省份" 
        :isShowPro="isShowPro" 
        provinceOrCity="province" 
        @click.native.stop="showPro"
        @selected="select"/> 
         <!-- 城市 下拉框 -->
        <show-city-list 
        :list="cityList" 
        value="城市" 
        :isShowCity="isShowCity" 
        provinceOrCity="city" 
        :disabled="disabled"
        @click.native.stop="showCity"
        @selected="select"/>
      </div>
      <div class="searchCity">
        <span class="keyWord">直接搜索：</span>
        <!-- 远程搜索 -->
        <el-select
          v-model="value1"
          multiple
          filterable
          remote
          reserve-keyword
          placeholder="请输入城市中文或者拼音"
          :remote-method="remoteMethod"
          :loading="loading"
          class="search-text"
        >
        <!-- label才是用于显示名称的 
             注意：这里是组件，所有得加原生点击事件-->
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.value" 
            :value="item.value"
            @click.native="selectCity($event, item.value)" 
          ></el-option>
        </el-select>
      </div>
    </el-row>
    <el-row><city-list title="热门城市：" :cityList="hotList"/></el-row>
    <el-row><city-list title="最近访问：" :cityList="recentSearchList"/></el-row>
    <el-row>
       <alphabet/> 
    </el-row>
  </div>
</template>
<script>
import api from '@/api/api.js'
import ShowCityList from "@/components/changeCity/showCityList.vue"
import CityList from "@/components/changeCity/cityList.vue"
import alphabet from "@/components/changeCity/alphabetChangeCity.vue"
export default {
     data() {
        return {
            allData:[],//所有省份数据包括城市
            loading: false,//远程搜索加载
            provinceList:[],
            cityList:[],
            value1: [],//只能是一个数组
            options:[],//搜索显示的下拉框
            list:[],//用于构造出label和item
            allCityData:["南昌","九江","景德镇","萍乡","新余","鹰潭","赣州","吉安","宜春","抚州","上饶","婺源","井冈山","三清三","乐平","瑞金"],
            isShowPro: false,
            isShowCity: false,
            disabled: true,//一开始城市是不能点的，直到显示哪个省的时候才能显示
            hotList:['北京','上海','广州','深圳','天津','西安','重庆','杭州','南京','武汉','成都'],
            recentSearchList:[],
            provinceName:''
        }
    },
    components:{
        ShowCityList,
        CityList,
        alphabet
    },
    created() {
      this.renderProvinceData()
      //渲染最近访问的城市
      this.renderRecentFindCities()
    },
    methods:{
        //渲染省份数据
       renderProvinceData() {
        //获取省份数据
       api.getProvinceList().then(res=>{
         const dataArr = res.data.data
         this.allData = dataArr
         if(res.data.status=="fail") {
          alert(res.data.msg)
          return
        }
        //console.log(dataArr)
        //将省份数据map一下，将省份名称挑出来放到一个新数组里面
        this.provinceList = dataArr.map(ele=>{
             return ele.provinceName 
        })
        this.getSelectInpData(dataArr)
       },rej=>{
           console.log(rej)
       })
      },
        //显示省
        showPro() {
           this.isShowCity = false
           this.isShowPro = true
        },
        //显示城市
        showCity() {
           if(this.disabled) return !this.disabled //实现第一次不能点且显示阻止点击的图标
           this.isShowCity = true
           this.isShowPro = false
        },
        getRelativeCityList(dataArr, selectedPro) {
           dataArr.forEach(ele=>{
                if(ele.provinceName == selectedPro){
                  //取到城市名称数组
                  this.cityList = ele.cityInfoList.map(ele=>{
                    return ele.name 
                })
                }
            })
            //console.log(this.cityList)
        },
        //父组件的自定义事件
        select({isShowPro, isShowCity, disabled, selectedPro}) {
           this.isShowPro = isShowPro
           this.isShowCity = isShowCity
           this.disabled = disabled
           //console.log('selectedPro='+selectedPro)
           //根据子组件传递而来的省份得到城市列表
           this.getRelativeCityList(this.allData, selectedPro)
        },
        //搜索框的方法
        remoteMethod(query){
          //console.log(value)
          //接收的参数为输入的值
          if(query == ''){
             this.options = []
             return
          }
          this.loading = true
          //console.log(this.list)
           setTimeout(()=>{
             //相当于对请求来的数据做出操作，定时器模拟请求时间
              this.options = this.list.filter(function(ele){
                //这里是名字和拼音均可搜索
                       return ele.label.toLowerCase().indexOf(query.toLowerCase())>-1 || 
                         ele.value.toLowerCase().indexOf(query.toLowerCase())>-1
                })
              //console.log(this.options)
              this.loading = false
           },200)
           
        },
        //得到搜素框下面的数据
        getSelectInpData(dataArr) {
           dataArr.forEach(ele=>{
              ele.cityInfoList.forEach(item=>{
                this.list.push({value: item.name, label: item.pinyin})
              })
           })  
           //console.log(this.list)
        },
        //直接搜索城市
        selectCity(e, value) {
           console.log(value)
           this.$store.commit('index/setPosition', value)
           this.$router.push({name:'index'})
        },
        renderRecentFindCities() {
           api.getRecentsCityList().then(res=>{
                if(res.data.status=="fail") {
                  alert(res.data.msg)
                  return
                }
                this.recentSearchList = res.data.data.map(ele=>ele.name)
           },rej=>console.log(rej))
        }
    }, 
    mounted() {
       document.addEventListener('click',(e)=>{
          this.isShowPro = false
          this.isShowCity = false
       },false)
    },
};
</script>
<style lang="sass">
   @import  '@/assets/css/page/changeCity/changeCity.scss'
</style>
