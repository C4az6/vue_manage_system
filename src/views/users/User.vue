<template>
  <div class="user">
    <!-- 路径导航——面包屑 -->
    <el-breadcrumb separator="/" style="line-height:45px;background-color:#fff">
      <el-breadcrumb-item :to="{ path: '/home/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索区域 -->
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        v-model="input3"
        class="input-with-select"
        style="width:300px;margin-right:15px;"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="success" plain>添加用户</el-button>
    </div>

    <!-- 表格部分 -->
    <el-table ref="singleTable" :data="userList" style="width: 100%;margin-top:15px;" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="username" label="姓名" width="120"></el-table-column>
      <el-table-column property="email" label="邮箱" width="240"></el-table-column>
      <el-table-column property="mobile" label="电话" width="140"></el-table-column>
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">
          <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="change(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
            <el-button type="success" icon="el-icon-share"></el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="warning" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页部分 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total - 0"
    ></el-pagination>
  </div>
</template>

<script>
import { getUserList } from '@/api/user.js'
export default {
  data () {
    return {
      input3: '',
      userList: [],
      value: true,
      // 当前页码
      pagenum: 1,
      pagesize: 1,
      total: 10
    }
  },
  methods: {
    handleEdit (scope) {
      // console.log(scope)
    },
    change (scope) {
      // console.log(scope)
    },

    // 切换每页显示记录数的时候触发
    handleSizeChange (val) {
      // val就是当前设置之后的每页的记录数，我们只需要重置pagesize
      this.pagesize = val
      this.init()
    },

    // 切换当前页码时触发
    handleCurrentChange (val) {
      this.pagenum = val
      this.init()
    },

    // 请求用户数据的方法
    init () {
      getUserList({
        pagesize: this.pagesize,
        pagenum: this.pagenum
      })
        .then(res => {
          this.userList = res.data.data.users
          this.total = res.data.data.total
          this.pagenum = res.data.data.pagenum
        })
        .catch(err => {
          console.log(err)
        })
    }

  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
</style>
