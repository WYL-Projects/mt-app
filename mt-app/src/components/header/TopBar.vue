<template>
<div class="fatherBar">
    <div class="topBar">
        <el-row>
            <el-col :span="10">
                <geo/>
            </el-col>
            <el-col :span="14">
                <nav1/>
            </el-col>
        </el-row>
    </div>
 </div>
</template>
<script>
import geo from './geo.vue'
import nav1 from './nav.vue'
export default {
    components:{
        geo,
        nav1
    }
}
</script>
<style lang="sass">
   @import '@/assets/css/header/topBar.scss'
</style>
