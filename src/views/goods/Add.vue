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
              <el-cascader :options="cateList" :props="cateprops" clearable></el-cascader>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品图片">配置管理</el-tab-pane>
        <el-tab-pane label="商品描述">角色管理</el-tab-pane>
        <el-tab-pane label="商品参数">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getCategoriesListApi } from '@/api/category.js'
export default {
  data () {
    return {
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
        pics: '',
        attr: ''
      },
      activeName: '0'
    }
  },
  mounted () {
    getCategoriesListApi([3])
      .then(res => {
        console.log(res)
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
