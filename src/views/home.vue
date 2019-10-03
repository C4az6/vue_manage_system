<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <div class="logo">Vue.js</div>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :router="true"
        >
          <!-- 用户管理 -->
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 路由映射组件
            映射就是指：让路由所对应的组件在指定router-view中展示
            指定router-view：关注组件的嵌套结构
             -->
            <el-menu-item :index="'/home/'+subitem.path" v-for="subitem in item.children" :key="subitem.id">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{subitem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="myicon myicon-menu toggle-btn"></span>
          <h3 class="system-title">后台管理系统</h3>
          <div class="welcome">
            <span>你好：admin</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="javascript:;">退出</a>
          </div>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getLeftMenuApi } from '@/api/user'
export default {
  data () {
    return {
      // 左侧菜单项
      menuList: []
    }
  },
  mounted () {
    getLeftMenuApi()
      .then(res => {
        const { msg, status } = res.data.meta
        status === 200 ? this.menuList = res.data.data : console.log(msg)
      }).catch(error => {
        console.log(error)
      })
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-menu {
    border: none;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    // background: url(../assets/logo.png);
    // background-size: 50% 50%;
    // background-repeat: no-repeat;
    background-color: #545c64;
    color: #fff;
    font-size: 40px;
    line-height: 60px;
    text-align: center;

  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>
