<template>
  <div class="add">
    <!-- 路径导航——面包屑 -->
    <el-breadcrumb separator="/" style="line-height:45px;background-color:#fff">
      <el-breadcrumb-item :to="{ path: '/home/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 添加步骤条 -->
      <el-steps :active="activeName - 0" finish-status="success">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
        <el-step title="步骤 4"></el-step>
      </el-steps>

      <!-- 添加标签页 -->
      <el-tabs v-model="activeName" :tab-position="'left'" style="height: 100%;margin-top:14px">
        <el-tab-pane label="基本参数">
          <el-form ref="goodsForm" :model="goodsForm" label-width="80px">
            <el-form-item label="商品名称">
              <el-input v-model="goodsForm.goods_name" placeholder="请输入商品名称"></el-input>
            </el-form-item>

            <el-form-item label="商品价格">
              <el-input v-model="goodsForm.goods_price" placeholder="请输入商品价格"></el-input>
            </el-form-item>

            <el-form-item label="商品数量">
              <el-input v-model="goodsForm.goods_number" placeholder="请输入商品数量"></el-input>
            </el-form-item>

            <el-form-item label="商品重量">
              <el-input v-model="goodsForm.goods_weight" placeholder="请输入商品重量"></el-input>
            </el-form-item>

            <el-form-item label="商品分类">
              <el-cascader :options="cateList" :props="cateprops" clearable @change="getcatid"></el-cascader>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品图片">
          <el-upload
            class="upload-demo"
            action="http://localhost:8888/api/private/v1/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :headers='getToken()'
            list-type="picture"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品描述"><quill-editor v-model="goodsForm.goods_introduce" ref="myQuillEditor" :options="editorOption" style='height:300px;border-bottom: 1px solid #ccc'></quill-editor></el-tab-pane>
        <el-tab-pane label="商品参数">定时任务补偿</el-tab-pane>
      </el-tabs>
      <el-button type="primary" style='float:right;margin:20px 0' @click='addGoods'>添加商品</el-button>
    </el-card>
  </div>
</template>

<script>
import { getCategoriesListApi } from '@/api/category.js'
import { addGoodsApi } from '@/api/goods.js'
export default {
  data () {
    return {
      editorOption: {},
      fileList: [],
      // 商品分类数据
      cateList: [],
      // 级联选择器配置选项
      cateprops: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 添加商品表单数据
      goodsForm: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: [],
        atts: []
      },
      activeName: '0'
    }
  },
  methods: {
    // 图片上传之前的钩子函数
    beforeUpload (file) {
      console.log(file)
      if (file.type.indexOf('image/') !== 0) {
        this.$message({
          type: 'warning',
          message: '请选择图片格式的文件'
        })
        // return false会触发handleRemove操作
        return false
      }
    },
    addGoods () {
      addGoodsApi(this.goodsForm)
        .then(res => {
          const { status, msg } = res.data.meta
          if (status === 201) {
            this.$message({
              type: 'success',
              message: msg
            })
            this.$router.push({ name: 'List' })
          } else {
            this.$message.error(msg)
          }
        }).catch(error => {
          this.$message.error(error)
        })
    },
    // 上传成功的钩子函数
    handleSuccess (response, file, fileList) {
      // 数据存储在response中
      this.goodsForm.pics.push({ pic: response.data.tmp_path })
    },
    // 移除时的钩子函数
    handleRemove (file, fileList) {
      // file就是当前你移出的文件
      var filename = file.response.data.tmp_path
      // 我们要根据file里面的数据删除this.goodsForm.pics中的数据
      for (var i = 0; i < this.goodsForm.pics.length; i++) {
        if (this.goodsForm.pics[i].pic === filename) {
          this.goodsForm.pics.splice(i, 1)
          break
        }
      }
    },
    // 设置请求头传递token
    getToken () {
      var token = localStorage.getItem('user_token')
      return { 'Authorization': token }
    },
    // 单击预览图片时触发的函数
    handlePreview (value) {
    },
    getcatid (value) {
      this.goodsForm.goods_cat = value.join(',')
    }
  },
  mounted () {
    getCategoriesListApi([3])
      .then(res => {
        this.cateList = res.data.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="less" scoped>
</style>
