 <template>
  <div class="login-container">
    <header class="header">
        <a class="site-logo" href="http://www.meituan.com"></a>
    </header>
    <div class="site-body-wrapper">
        <div class="promotion-banner">
            <img src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg" width="480" height="370" alt="美团网">
        </div>
        <div class="login-section">
            <div class="validate-info" 
            :style="{'visibility':isShowError?'visible':'hidden'}">
                <i class="el-icon-error"></i>
                <span>{{errorInfo}}</span>
            </div>
            <div class="login-title">
                <span class="zh-login">账号登录</span>
            </div>
            <div :class="{'userName-input input':true, 'error':!userName&&isShowError}" >
                <el-input v-model="userName" placeholder="手机号/用户名/邮箱" prefix-icon="profile" @focus="input"></el-input>
            </div> 
            <div :class="{'password-input input':true, 'error':!password&&isShowError}">
                <el-input v-model="password" type="password" placeholder="密码" prefix-icon="password" @focus="input"></el-input>
            </div>
            <div class="forget-pwd">
                <a href="#">忘记密码？</a>
            </div>
            <div class="login-btn" @click="login">
                登录
            </div>
            <div class="to-register">
                还没有账号？<router-link :to="{name:'register'}">免费注册</router-link>
            </div>
        </div>
    </div> 
    <footer class="footer">
        <div class="site-info-nav">
            <ul>
                <li class="first">关于美团</li>
                <li>加入我们</li>
                <li>商家入驻</li>
                <li>帮助中心</li>
                <li>美团手机版</li>
            </ul>
        </div>
        <div class="copyright">
             ©2019 美团网团购
        <router-link to="/index">meituan.com</router-link>
        <router-link :to="{name:'index'}">京ICP证070791号</router-link>京公网安备11010502025545号
        </div>
    </footer>
  </div>
</template>
<script>
import api from '@/api/api.js'
export default {
    data(){
        return {
            userName:"",
            password:"",
            isShowError:false,
            errorInfo:""
        }
    },
    methods:{
        login() {
            if(!this.userName && this.password) {
                this.isShowError = true;
                this.errorInfo = "请输入账号"
            }else if(!this.password && this.userName) {
                this.isShowError = true;
                this.errorInfo = "请输入密码"
            }else  if(!this.userName && !this.password) {
                this.isShowError = true;
                this.errorInfo = "请输入和密码"
            }else {
                //账号密码均不为空
                this.isShowError = false
                //登录
                api.login({
                    userName:this.userName,
                    password:this.password
                }).then(res=>{
                    if(res.data.status == 'success') {
                        alert("恭喜"+this.userName+"登录成功")
                        this.$store.commit('index/setUserName', this.userName)
                        this.$router.push({name:'index'})
                    }else{
                        this.isShowError = true;
                        this.errorInfo = res.data.msg
                    }
                },rej=>{
                     console.log(res)
                })
            }
            
        },
        input() {
            this.isShowError = false
        }
    }
};
</script>