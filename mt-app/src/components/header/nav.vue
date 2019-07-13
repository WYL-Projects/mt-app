<template>
  <div class="nav">
    <!-- <router-link ></router-link>
        <router-link ></router-link>
        <router-link ></router-link>
    <router-link ></router-link>-->
    <div class="list my">
      <router-link to="/home" class="my-meituan">我的美团</router-link>
      <dl class="my-meituan-pro">
        <dd>
          <router-link to="/">我的订单</router-link>
        </dd>
        <dd>
          <router-link to="/">我的订单</router-link>
        </dd>
        <dd>
          <router-link to="/">我的订单</router-link>
        </dd>
        <dd>
          <router-link to="/">我的订单</router-link>
        </dd>
      </dl>
    </div>
    <div class="list">
      <router-link to="/">手机app</router-link>
    </div>
    <div class="list bd">
      <router-link to="/">商家中心</router-link>
      <dl>
        <dd>
          <router-link :to="{path: '/'}">登录商家中心</router-link>
        </dd>
        <dd>
          <router-link :to="{path: '/'}">美团智能收银</router-link>
        </dd>
        <dd>
          <router-link :to="{path: '/'}">我想合作</router-link>
        </dd>
        <dd>
          <router-link :to="{path: '/'}">账户设置</router-link>
        </dd>
      </dl>
    </div>
    <div class="list site">
      <router-link to="/">网站导航</router-link>
      <div class="subContainer">
        <dl class="hotel">
          <dt>酒店旅游</dt>
          <div class="content">
            <div class="item1">
              <dd>
                <router-link :to="{path: '/'}">我的订单</router-link>
              </dd>
              <dd>
                <router-link :to="{path: '/'}">我的收藏</router-link>
              </dd>
              <dd>
                <router-link :to="{path: '/'}">抵用券</router-link>
              </dd>
              <dd>
                <router-link :to="{path: '/'}">账户设置</router-link>
              </dd>
              <dd>
                <router-link :to="{path: '/'}">我的订单</router-link>
              </dd>
            </div>
            <div class="item2">
              <dd>
                <router-link :to="{path: '/'}">我的收藏</router-link>
              </dd>
              <dd>
                <router-link :to="{path: '/'}">抵用券</router-link>
              </dd>
              <dd>
                <router-link :to="{path: '/'}">账户设置</router-link>
              </dd>
              <dd>
                <router-link :to="{path: '/'}">我的订单</router-link>
              </dd>
            </div>
            <div class="item3">
              <dd>
                <router-link :to="{path: '/'}">我的收藏</router-link>
              </dd>
              <dd>
                <router-link :to="{path: '/'}">抵用券</router-link>
              </dd>
              <dd>
                <router-link :to="{path: '/'}">账户设置</router-link>
              </dd>
              <dd>
                <router-link :to="{path: '/'}">账户设置</router-link>
              </dd>
            </div>
          </div>
        </dl>
        <dl class="food">
          <dt>吃美食</dt>
          <div class="content">
            <div>
              <dd>
                <router-link :to="{path: '/'}">我的订单</router-link>
              </dd>
              <dd>
                <router-link :to="{path: '/'}">我的收藏</router-link>
              </dd>
              <dd>
                <router-link :to="{path: '/'}">抵用券</router-link>
              </dd>
            </div>

            <div>
              <dd>
                <router-link :to="{path: '/'}">账户设置</router-link>
              </dd>
              <dd>
                <router-link :to="{path: '/'}">账户设置</router-link>
              </dd>
              <dd>
                <router-link :to="{path: '/'}">账户设置</router-link>
              </dd>
            </div>
          </div>
        </dl>
        <dl class="movie">
          <dt>看电影</dt>
          <dd>
            <router-link :to="{path: '/'}">我的订单</router-link>
          </dd>
          <dd>
            <router-link :to="{path: '/'}">我的收藏</router-link>
          </dd>
          <dd>
            <router-link :to="{path: '/'}">抵用券</router-link>
          </dd>
          <dd>
            <router-link :to="{path: '/'}">账户设置</router-link>
          </dd>
        </dl>
        <dl class="app">
          <dt>手机应用</dt>
          <dd>
            <img
              class="appicon"
              src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/appicons/meituan.png"
              title="美团app"
              alt="美团app"
            >
            <img
              class="appicon"
              src="https://s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/waimai.png"
              title="外卖app"
              alt="外卖app"
            >
            <img
              class="appicon"
              src="https://s0.meituan.net/bs/fe-web-meituan/404d350/img/appicons/zhenguo.png"
              title="榛果app"
              alt="榛果app"
            >
            <img
              class="appicon"
              src="https://s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/dianping.png"
              title="点评app"
              alt="点评app"
            >
            <img
              class="appicon"
              src="https://s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/maoyan.png"
              title="猫眼app"
              alt="猫眼app"
            >
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>