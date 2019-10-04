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
          @keyup.enter.native="getGoodsList"
        >
          <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
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

      <!-- 数据分页结构 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum - 0"
        :page-sizes="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total - 0"
      ></el-pagination>

      <!-- 编辑商品Dialog -->
      <el-dialog title="编辑商品" :visible.sync="editGoodsDialogFormVisible">
        <el-form :model="editGoodsForm" label-width="120px" ref="editGoodsForm" :rules="rules">
          <el-form-item label="商品名称">
            <el-input v-model="editGoodsForm.goods_name" autocomplete="off" disabled></el-input>
          </el-form-item>

          <el-form-item label="商品价格" prop="goods_price">
            <el-input v-model="editGoodsForm.goods_price" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="商品数量" prop="goods_number">
            <el-input v-model="editGoodsForm.goods_number" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="商品重量" prop="goods_weight">
            <el-input v-model="editGoodsForm.goods_weight" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editGoodsDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editGoodsConfirm">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  getAllGoodsListApi,
  removeGoodsApi,
  editGoodsApi
} from '@/api/goods.js'
export default {
  data () {
    return {
      rules: {
        goods_price: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ]
      },
      // 编辑商品的数据
      editGoodsForm: {
        goods_id: '',
        goods_number: '',
        goods_name: '',
        goods_price: '',
        goods_weight: ''
      },
      // 编辑商品对话框显示状态
      editGoodsDialogFormVisible: false,
      total: '',
      goodsList: [],
      userKey: '',
      pagenum: '1',
      pagesize: 5
    }
  },
  methods: {
    // 监听商品编辑确认按钮
    editGoodsConfirm () {
      this.$refs.editGoodsForm.validate(valid => {
        if (valid) {
          // 编辑功能有bug,无法更新数据,传入number类型提示id不是数字类型
          console.log(this.editGoodsForm.goods_id)
          console.log(typeof this.editGoodsForm.goods_id)
          // 验证通过就发送请求更新数据
          editGoodsApi(this.editGoodsForm)
            .then(res => {
              const { msg, status } = res.data.meta
              if (status === 200) {
                this.$message.success(msg)
                this.editGoodsDialogFormVisible = false
              } else {
                this.$message.error(msg)
              }
            }).catch(error => {
              this.$message.error(error)
            })
        } else {
          return false
        }
      })
    },
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
      this.editGoodsDialogFormVisible = true
      this.editGoodsForm.goods_id = obj.goods_id
      this.editGoodsForm.goods_name = obj.goods_name
      this.editGoodsForm.goods_price = obj.goods_price
      this.editGoodsForm.goods_number = obj.goods_number
      this.editGoodsForm.goods_weight = obj.goods_weight
    },
    // 监听商品删除按钮
    handleDelete (obj) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          removeGoodsApi(obj.goods_id)
            .then(res => {
              const { msg, status } = res.data.meta
              if (status === 200) {
                this.$message.success(msg)
                // 重新发送获取商品列表的请求刷新数据
                this.getGoodsList()
              } else {
                this.$message({
                  message: msg,
                  type: 'success'
                })
              }
            })
            .catch(error => {
              this.$message.error(error)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  mounted () {
    this.getGoodsList()
  }
}
</script>

<style lang="less" scoped>
</style>
