<template>
<div class="index-container">
    <div class="banner-container">
        <!-- 中间上部分 -->
        <el-row >
            <el-col :span="5">
                <m-menu/>
            </el-col>
            <el-col :span="19">
                <life/>    
            </el-col>
        </el-row>
    </div>
    <div class="scenes-container">
         <container-nav/>
         <scenes-container/>
    </div> 
</div>
</template>
<script>
import MMenu from "../indexPages/menu.vue"
import Life from "../indexPages/life.vue"
// const ContainerNav = () => import('../indexPages/container-nav.vue')
import ContainerNav from "../indexPages/container-nav.vue"
import ScenesContainer from "../indexPages/ScenesContainer.vue"
export default {
    components:{
        MMenu,
        Life,
        ContainerNav,
        ScenesContainer
    }
}
</script>
<style lang="sass">
   @import "@/assets/css/page/index/banner-container.scss"
   @import "@/assets/css/page/index/nav-container.scss"
   @import "@/assets/css/page/index/scenes-container.scss"
</style>


