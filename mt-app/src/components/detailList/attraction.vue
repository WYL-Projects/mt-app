<template>
  <div class="attractionList">
    <ul class="aL-nav">
      <li
        :class="{'active':index==curIndex}"
        v-for="(item, index) in nav"
        :key="item.key"
        @click="beActive(index)"
      >
        {{index!=1?item.name:orderRule}}
        <div class="el-icon-caret" v-if="index==1">
          <i :class="{'el-icon-caret-top':true, 'orderRule':index==curIndex&&orderRule=='价格最低'}"></i>
          <i :class="{'el-icon-caret-bottom':true, 'orderRule':index==curIndex&&orderRule=='价格最高'}"></i>
        </div>
      </li>
    </ul>
    <el-row>
      <exhibition-area :products="products"/>
    </el-row>
  </div>
</template>
<script>
import api from '@/api/api.js'
import ExhibitionArea from "@/components/detailList/exhibitionArea.vue"
export default {
  components:{
      ExhibitionArea
  },
  data() {
    return {
      nav: [
        {
          key: "s-default",
          name: "智能排序"
        },
        {
          key: "s-price",
          name: "价格排序"
        },
        {
          key: "s-score",
          name: "人气最高"
        },
        {
          key: "s-comment",
          name: "评价最高"
        }
      ],
      curIndex: 0,
      orderRule: "价格排序",
      products: []
    };
  },
  methods: {
    beActive(index) {
      this.curIndex = index;
      if (index == 1) {
        if (this.orderRule == "价格排序") {
          this.orderRule = "价格最低";
          return;
        }
        this.orderRule = this.orderRule == "价格最低" ? "价格最高" : "价格最低";
        console.log(this.orderRule, this.curIndex);
      }
    }
  },
  created() {
      api.getGoodsList().then(res=>{
        //console.log(res)
        if(res.data.status=="fail") {
          alert(res.data.msg)
          return
        }
        this.products = res.data.data
        },rej=>console.log(rej))
  }
};
</script>
