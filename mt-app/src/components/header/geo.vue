<template>
    <div class="geo">
        <i class="el-icon-location"></i><span>{{position}}</span>
        <router-link :to="{name:'location'}" class="changeCity">切换城市</router-link>
        <span class="detail">
        [
        <span>大厂回族自治区</span><span>廊坊</span><span>固安县</span>
        ]
        </span>
        <router-link :to="{name:'login'}" class="login" v-if="!$store.state.index.userName">立即登录</router-link>
        <router-link :to="{name:'register'}" class="register" v-if="!$store.state.index.userName">注册</router-link>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    computed: {
        ...mapState('index',['position'])
    },
}
</script>

