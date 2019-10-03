<template>
  <div class="list">
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
        <el-button type="success" plain>添加商品</el-button>
      </div>

      <!-- 表格数据 -->
      <el-table
        :data="goodsList"
        style="width: 100%;margin-top: 20px;"
        border
      >
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
    </el-card>
  </div>
</template>

<script>
import { getAllGoodsListApi } from '@/api/goods.js'
export default {
  data () {
    return {
      goodsList: [],
      userKey: '',
      pagenum: 1,
      pagesize: 10
    }
  },
  methods: {
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
    getAllGoodsListApi({
      query: this.userKey,
      pagenum: this.pagenum,
      pagesize: this.pagesize
    })
      .then(res => {
        this.goodsList = res.data.data.goods
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style lang="less" scoped>
el-table {
}
</style>
