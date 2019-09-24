<template>
  <div class="login">
    <div class="project-name">Vue后台管理系统</div>
    <div class="container">
      <img src="../assets/avatar2.jpg" alt class="avatar" />
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-loginForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" clearable placeholder="请输入用户名"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="loginForm.password" clearable placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="login-btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  // data是一个函数,返回一个对象
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      // 添加验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url("../assets/bg.jpg");
  .project-name {
    width: 100%;
    // background-color: red;
    font-size: 28px;
    height: 100px;
    line-height: 300px;
    color: #fff;
    text-align: center;
  }
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
