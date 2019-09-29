<template>
  <div class="rights">
    <!-- 面包屑导航部分 -->
    <el-breadcrumb separator="/" style="line-height:45px;background-color:#fff">
      <el-breadcrumb-item :to="{ path: '/home/user' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表格部分 -->
    <el-table :data="allRightsList" style="width: 100%" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="authName" label="权限" width="280"></el-table-column>
      <el-table-column prop="path" label="路径" width="280"></el-table-column>
      <el-table-column prop="level" label="层级">
        <template slot-scope="scope">
          <span>{{scope.row.level | levelFilter}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllRightsApi } from '@/api/rights.js'
export default {
  // 添加局部过滤器
  filters: {
    levelFilter: (level) => {
      // level其实就是scope.row.level
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else if (level === '2') {
        return '三级'
      }
      return ''
    }
  },
  data () {
    return {
      allRightsList: []
    }
  },
  methods: {
    getAllRight () {
      getAllRightsApi('list')
        .then(res => {
          this.allRightsList = res.data.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted () {
    this.getAllRight()
  }
}
</script>

<style lang="less" scoped>
</style>
