<template>
  <div class="register-container">
    <header class="header">
      <div class="header-child">
        <router-link to="/index" class="site-logo"></router-link>
        <div class="logo-block">
          <span class="tip">已有美团账号？</span>
          <router-link :to="{name:'login'}" class="login-btn">登录</router-link>
        </div>
      </div>
    </header>
    <div class="middle">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input type="text" v-model="ruleForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          <div class="pk_strength_bar">
            <div :class="['pk_strength_letter_mock',active]"></div>
            <div class="pk_strength_letter">
              <span class="pk_strength_span">弱</span>
              <span class="pk_strength_span">中</span>
              <span class="pk_strength_span no-marginRight">强</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn-container">
      <el-button type="primary" @click="submitForm('ruleForm')">同意以下协议并注册</el-button>
      <div class="term">
        <a class="f1" href="http://www.meituan.com/about/terms" target="_blank">《美团网用户协议》</a>
      </div>
      </div>
    </div>
    <div class="footer">
      <p class="copyright">
        ©
        <router-link to="/index">meituan.com</router-link>
        <router-link :to="{name:'index'}">京ICP证070791号</router-link>京公网安备11010502025545号
      </p>
    </div>
  </div>
</template>
<script>
import api from '@/api/api.js'
export default {
  data() {
    //检查用户名
    var checkUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      setTimeout(() => {
        if (!/(?=.*[A-Za-z])(?=.*[\d])(?=.*_).{4,16}/.test(value)) {
          callback(new Error("必须为4-16位的字母数字下划线组成"));
        } else {
          callback();
        }
      }, 1000);
    };
    //检查年龄
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    //检查输入的密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
        this.active = "";
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        this.checkPassword(value);
        callback();
      }
    };
    //检查再次输入的密码
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",
        userName: ""
      },
      active: "",
      rules: {
        pass: [{ validator: validatePass, trigger: "change" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
        userName: [{ validator: checkUserName, trigger: "blur" }]
      }
    };
  },
  methods: {
    checkPassword(value) {
      //第一个正则验证包含字母、数字、特殊符号
      const containCharNumSp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{8,64}$/,
        //判断含有数字和字母（大写或小写）
        containCharNum = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d).{12, 18}$/;
      if (containCharNumSp.test(value)) {
        this.active = "strong";
      } else if (containCharNum.test(value)) {
        this.active = "strong";
      } else {
        if (value.length > 20) {
          this.active = "strong";
        } else if (value.length > 10) {
          this.active = "moderate";
        } else {
          this.active = "weak";
        }
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          console.log(valid)
          api.register({
             userName:this.ruleForm.userName,
             password:this.ruleForm.pass,
             rePassword:this.ruleForm.checkPass
          }).then(res=>{
            if(res.data.status=="success"){
               alert("恭喜你注册成功!")
               this.$router.push({name:'login'})
            }else{
               alert(res.data.msg)
            }
              //alert(JSON.stringify(res))
          },rej=>{
            alert(rej)
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>    