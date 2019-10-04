<template>
  <div class="list">
    <!-- 路径导航——面包屑 -->
    <el-breadcrumb separator="/" style="line-height:45px;background-color:#fff">
      <el-breadcrumb-item :to="{ path: '/home/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 搜索框和添加商品按钮 -->
      <div style="margin-top:15px">
        <el-input
          placeholder="请输入内容"
          v-model="userKey"
          class="input-with-select"
          style="width:300px;margin-right:14px"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" plain @click="$router.push({name: 'Add'})">添加商品</el-button>
      </div>

      <!-- 表格数据 -->
      <el-table :data="goodsList" style="width: 100%;margin-top: 20px;" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="580"></el-table-column>
        <el-table-column prop="goods_price" label="价格" width="180"></el-table-column>
        <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
        <el-table-column prop="add_time" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum - 0"
        :page-sizes="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total - 0"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getAllGoodsListApi } from '@/api/goods.js'
export default {
  data () {
    return {
      total: '',
      goodsList: [],
      userKey: '',
      pagenum: '1',
      pagesize: 5
    }
  },
  methods: {
    // 每页显示多少条数据改变时触发
    handleSizeChange (value) {
      this.pagesize = value
      this.getGoodsList()
    },
    // 当前页码改变时触发
    handleCurrentChange (value) {
      this.pagenum = value
      this.getGoodsList()
    },
    // 获取商品列表数据并分页
    getGoodsList () {
      getAllGoodsListApi({
        query: this.userKey,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
        .then(res => {
          this.total = res.data.data.total
          this.pagenum = res.data.data.pagenum
          this.goodsList = res.data.data.goods
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 监听商品编辑按钮
    handleEdit (obj) {
      console.log(obj)
    },
    // 监听商品删除按钮
    handleDelete (obj) {
      console.log(obj)
    }
  },
  mounted () {
    this.getGoodsList()
  }
}
</script>

<style lang="less" scoped>
</style>
