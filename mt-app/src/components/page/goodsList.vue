<template>
  <div class="detailList">
    <el-row>
      <crumb/>
    </el-row>
    <el-row>
      <el-col :span="19">
        <el-row class="filter-section-wrapper">
          <classify :list="classifyData"  title="分类"/>
          <classify :list="areaList"  title="区域"/>
        </el-row>
        <el-row class="attraction-list">
          <attraction/>
        </el-row>
      </el-col>
      <el-col :span="5">rewrw</el-col>
    </el-row>
  </div>
</template>
<script>
import api from '@/api/api.js'
import crumb from "@/components/detailList/crumb.vue";//面包屑导航
import classify from "@/components/detailList/classify.vue"; //分类
import attraction from "@/components/detailList/attraction.vue"; //旅游胜地
export default {
  components: {
    crumb,
    classify,
    attraction
  },
  data() {
    return {
    classifyData: [],
    areaList: [
      {
        title: "推荐商圈",
        subList: [
          {
            name: "望京",
            id: 120000
          },
          {
            name: "昌平",
            id: 12222
          }
        ]
      }
    ]
    }
  },
  created() {
      this.apiRequest(api.getClassifyList(), this.setClassifyData)
      this.apiRequest(api.getAreaList(), this.setAreaList)
  },
  methods:{
      apiRequest(promise, callback) {
         promise.then(res=>{
        //console.log(res)
        if(res.data.status=="fail") {
          alert(res.data.msg)
          return
        }
        if(typeof res.data == 'string'){
          //由于字符串一直少']}'，所以一直报错
            res.data = JSON.parse(res.data.replace(/[\r\n\ +]/g, "")+']}')
        }
        callback(res.data.data)
        },rej=>console.log(rej))
      },
     setClassifyData(dataArr) {
        this.classifyData = dataArr
     },
     setAreaList(dataArr){
        this.areaList = dataArr
     }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/page/detailList/detail.scss";
</style>