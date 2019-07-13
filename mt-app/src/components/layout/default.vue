<template>
  <div class="container">
    <el-container>
      <!-- el-header默认为60px  height="" 这样写可以让高度被撑开-->
      <el-header  height="">
          <Header/>
      </el-header>
      <el-main >
        <router-view></router-view>
        
      </el-main>
      <el-footer height="">
        <Footer/>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Header from "../header/header.vue"
import Footer from "../footer/footer.vue"
export default {
    components:{
        Header,
        Footer
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
  @import '@/assets/css/main.scss';
</style>
