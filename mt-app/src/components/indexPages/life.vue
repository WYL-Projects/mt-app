<template>
    <div class="right-banner">
        <div class="home-header-links">
            <ul>
                <router-link tag="li" :to="{path:'/sd'}">美团外卖</router-link>
                <router-link tag="li" :to="{path:'/wqe'}">猫眼电影</router-link>
                <router-link tag="li" :to="{path:'/rew'}">美团酒店</router-link>
                <router-link tag="li" :to="{path:'/ewq'}">民宿/公寓</router-link>
                <router-link tag="li" :to="{path:'/qw'}">商家入驻</router-link>
                <router-link tag="li" :to="{path:'/ewqe'}">美团公益</router-link>
            </ul>
        </div>
        <el-row :span="24">
            <el-col :span="14" ><swiper/></el-col>
            <el-col :span="4" class="pic-1">

            </el-col>
            <el-col :span="6" class="login-container">
                <div class="head-img">
                    <img src="//s0.meituan.net/bs/fe-web-meituan/2d05c2b/img/avatar.jpg" alt="">
                </div>
                <p class="userName">Hi! {{$store.state.index.userName?$store.state.index.userName : '你好'}}</p>
                <router-link :to="{name:'register'}">注册</router-link>
                <router-link :to="{name:'login'}">立即登录</router-link>
            </el-col>
        </el-row>
        <el-row :span="24">
            <el-col :span="7" class="show">
                <router-link  class="pic-2" tag="div" to="/"></router-link>
            </el-col>
            <el-col :span="7" class="show">
                <router-link class="pic-3" tag="div" to="/"></router-link>
            </el-col>
            <el-col :span="4" class="show">
                <router-link class="pic-4" tag="div" to="/"></router-link>
            </el-col>
            <el-col :span="6" class="download show">
                <div class="qrcode-box">
                <img src="//s1.meituan.net/bs/fe-web-meituan/60ac9a0/img/download-qr.png" alt="下载">
                </div>
                 <p class="app-name">美团APP手机版</p>
                 <p class="sl">
                     <span class="red">一元起</span>
                    <span class="gray">
                        吃喝玩乐
                    </span>
                 </p>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import Swiper from '../indexPages/swiper.vue'
export default {
    components:{
        Swiper
    }
}
</script>
