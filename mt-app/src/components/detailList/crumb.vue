<template>
    <!-- 
        <router-link :to="'/index'">{{$store.state.position+'美团'}}</router-link>>
        <router-link :to="'/s/'+$route.params.place">{{$store.state.position+$route.params.place}}</router-link>
     -->
     <div class="crumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">{{$store.state.index.position+'美团'}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="'/s/'+$route.params.place">{{$store.state.index.position+$route.params.place}}</el-breadcrumb-item>
    </el-breadcrumb>
    </div>
</template>
<script>
export default {
    watch: {
        
    },
}
</script>