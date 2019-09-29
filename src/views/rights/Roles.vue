<template>
  <div class="roles">
    <!-- 面包屑导航部分 -->
    <el-breadcrumb separator="/" style="line-height:45px;background-color:#fff">
      <el-breadcrumb-item :to="{ path: '/home/user' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="success" plain>添加角色</el-button>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>

</style>
