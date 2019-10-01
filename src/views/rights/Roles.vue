<template>
  <div class="roles">
    <!-- 面包屑导航部分 -->
    <el-breadcrumb separator="/" style="line-height:45px;background-color:#fff">
      <el-breadcrumb-item :to="{ path: '/home/user' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加角色按钮 -->
    <el-button type="success" plain @click="addRolesDialogFormVisible=true">添加角色</el-button>

    <!-- 展开行表格 -->
    <el-table :data="rolesList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 使用element-ui的栅格系统实现 -->
          <el-row
            v-for="first in scope.row.children"
            :key="first.id"
            style="margin-bottom:10px;border-bottom:1px dashed #ccc"
          >
            <el-col :span="4">
              <el-tag closable type="success" v-if="first.children.length!==0">{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row
                v-for="second in first.children"
                :key="second.id"
                style="margin-bottom: 10px;"
              >
                <el-col :span="4">
                  <el-tag closable type="info" v-if="second.children.length !== 0">{{second.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    closable
                    type="danger"
                    v-for="third in second.children"
                    :key="third.id"
                    style="margin: 0 5px 8px 5px;"
                    @close = "deleteRight(scope.row, third.id)"
                  >{{third.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" v-if="scope.row.children.length === 0">没有任何的权限数据,请先添加</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="info" icon="el-icon-edit" @click="editRolesClick(scope.row)"></el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="角色授权" placement="top">
            <el-button type="success" icon="el-icon-share"></el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="warning" icon="el-icon-delete" @click="deleteRolesClick(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="addRolesDialogFormVisible">
      <el-form :model="addRolesForm" label-width="120px" ref="addRolesForm" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRolesForm.roleName" autocomplete="off" placeholder="例如:客服"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="roleDesc">
          <el-input v-model="addRolesForm.roleDesc" autocomplete="off" placeholder="例如:负责所有产品的咨询工作"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRolesDialogFormVisible = false;$refs.addRolesForm.resetFields()">取 消</el-button>
        <el-button type="primary" @click="addRolesConfirm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑角色对话框 -->
    <el-dialog title="编辑角色" :visible.sync="editRolesDialogFormVisible">
      <el-form :model="editRolesForm" label-width="120px" ref="editRolesForm" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRolesForm.roleName" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="roleDesc">
          <el-input v-model="editRolesForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editRolesDialogFormVisible = false;$refs.editRolesForm.resetFields()">取 消</el-button>
        <el-button type="primary" @click="editRolesConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRolesListApi,
  addRolesApi,
  deleteRolesApi,
  editRolesApi,
  deleteRolesRightsApi
} from '@/api/roles.js'
export default {
  data () {
    return {
      // 编辑角色表单数据
      editRolesForm: {
        roleName: '',
        roleDesc: '',
        id: ''
      },
      // 编辑角色对话框
      editRolesDialogFormVisible: false,
      // 添加角色对话框的表单验证规则
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      },
      // 添加角色对话框数据
      addRolesForm: {
        roleName: '',
        roleDesc: ''
      },
      // 添加角色对话框显示隐藏状态
      addRolesDialogFormVisible: false,
      rolesList: []
    }
  },
  methods: {
    // 删除角色权限
    deleteRight (row, rightid) {
      deleteRolesRightsApi(row.id, rightid)
        .then(res => {
          const { msg, status } = res.data.meta
          if (status === 200) {
            this.$message.success(msg)
            row.children = res.data.data
          } else {
            this.$message.error(msg)
          }
        })
        .catch(error => {
          this.$message.error(error)
        })
    },
    // 编辑角色确定
    editRolesConfirm () {
      this.$refs.editRolesForm.validate(valid => {
        if (valid) {
          editRolesApi(this.editRolesForm)
            .then(res => {
              const { msg, status } = res.data.meta
              if (status === 200) {
                this.$message.success(msg)
                // 关闭对话框
                this.editRolesDialogFormVisible = false
                this.getAllRoles()
              } else {
                this.$message({
                  type: 'error',
                  message: msg
                })
              }
            })
            .catch(error => {
              this.$message.error(error)
            })
        } else {
          return false
        }
      })
    },
    // 编辑角色
    editRolesClick (obj) {
      this.editRolesDialogFormVisible = true
      this.editRolesForm.roleName = obj.roleName
      this.editRolesForm.roleDesc = obj.roleDesc
      this.editRolesForm.id = obj.id
    },
    // 删除角色
    deleteRolesClick (obj) {
      this.$confirm(`此操作将删除ID为:${obj.id}的角色, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteRolesApi(obj.id)
            .then(res => {
              const { msg, status } = res.data.meta
              status === 200
                ? this.$message.success(msg)
                : this.$message.error(msg)
              this.getAllRoles()
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
    },
    // 添加角色确认按钮
    addRolesConfirm () {
      // 验证表单
      this.$refs.addRolesForm.validate(valid => {
        if (valid) {
          // 验证通过，发送请求提交数据
          addRolesApi(this.addRolesForm)
            .then(res => {
              let { msg } = res.data.meta
              let { status } = res.data.meta
              if (status === 201) {
                this.$message({
                  type: 'success',
                  message: msg
                })
                this.addRolesDialogFormVisible = false
                this.$refs.addRolesForm.resetFields()
                this.getAllRoles()
              } else {
                this.$message.error(msg)
              }
            })
            .catch(error => {
              this.$message.error(error)
            })
        } else {
          // 验证失败就不允许发送请求
          return false
        }
      })
    },
    getAllRoles () {
      getRolesListApi()
        .then(res => {
          this.rolesList = res.data.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted () {
    this.getAllRoles()
  }
}
</script>

<style lang="less" scoped>
</style>
