<template>
  <div class="quality-area">
    <a href="#" 
    v-for="(area, index) in qualityAreas" 
    :key="index" 
    class="quality-card">
      <div class="quality-img">
        <img :src="area.image" class="image">
      </div>
      <div class="poi-info">
        <div class="title" :title="area.title">{{area.title}}</div>
        <div
          class="sub-title"
          :title="area.subTitle"
        >{{area.subTitle}}</div>
        <div class="price-info">
          <span class="current-price-wrapper">
            <span class="price-symbol numfont">¥</span>
            <span class="current-price numfont">
              {{area.price}}
              <span v-if="!area.oldPrice" class="current-price-type">/人均</span>
              <span v-else class="old-price">{{"门市价￥"+ area.price}}</span>
            </span>
            <span class="sold" v-if="area.address">{{area.address}}</span>
          </span>
        </div>
      </div>
    </a>
  </div>
</template>
<script>
import api from '@/api/api.js'
import {mapState} from 'vuex'
export default {
  methods: {
       
  },
  computed: {
    ...mapState('index', {
      qualityAreas:'allList'
    })
    //  qualityAreas() {
    //    return this.$store.state.index.allList
    //  }
  }
};
</script>

