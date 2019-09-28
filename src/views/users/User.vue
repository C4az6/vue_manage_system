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
      <el-button type="success" plain @click="addDialogFormVisible = true">添加用户</el-button>
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
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="change(scope.row.id, scope.row.mg_state)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" @click="Edit(scope.row)"></el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
            <el-button type="success" icon="el-icon-share" @click="assignRoles(scope.row)"></el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="warning" icon="el-icon-delete" @click="deleteUserInfo(scope.row)"></el-button>
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

    <!-- 添加用户弹出的对话框 -->
    <el-dialog title="新增用户" :visible.sync="addDialogFormVisible" :before-close="handleClose">
      <el-form :model="addUserForm" :label-width="'120px'" :rules="rules" ref="addUserForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addUserForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false;$refs.addUserForm.resetFields()">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户弹出的对话框 -->
    <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
      <el-form :model="editUserForm" :label-width="'120px'" :rules="rules" ref="editUserForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editUserForm.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editUserForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配用户角色的对话框 -->
    <el-dialog title="分配角色" :visible.sync="roleDialogFormVisible" :before-close="hanldeRoleClose">
      <el-form :model="roleUserForm" :label-width="'120px'" :rules="rules" ref="roleUserForm">
        <el-form-item label="用户名">
          <el-input
            v-model="roleUserForm.username"
            autocomplete="off"
            disabled
            style="width:200px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色列表">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.id" :value="item.roleName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialogFormVisible = false; value = null">取 消</el-button>
        <el-button type="primary" @click="roleConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserList,
  addUser,
  editUser,
  deleteUser,
  changeUserStatus,
  userRole,
  getUserInfo,
  getRolesList
} from '@/api/user.js'
export default {
  data () {
    return {
      // 分配角色相关
      roleDialogFormVisible: false,
      roleUserForm: {
        username: '',
        id: '',
        rid: ''
      },
      options: [],
      value: '',
      //* ***************************************************************************** */
      // 编辑用户窗口
      editDialogFormVisible: false,
      // 编辑用户表单双向数据绑定
      editUserForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      // 新增用户表单双向数据绑定
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 新增用户验证规则,rules是一个数组
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          // 匹配合法邮箱的正则表达式
          {
            pattern: /\w+[@]\w+[.]\w+/,
            message: '请输入合法的邮箱',
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          // 匹配合法手机号的正则表达式
          {
            pattern: /^1[35789]\d{9}$/,
            message: '请输入合法的11位手机号',
            trigger: 'blur'
          }
        ]
      },
      // 添加用户弹框状态值
      addDialogFormVisible: false,
      input3: '',
      userList: [],
      // 当前页码
      pagenum: 1,
      // 每页显示条数
      pagesize: 4,
      total: 10
    }
  },
  methods: {
    // 分配角色对话框关闭
    hanldeRoleClose () {
      this.value = null
      this.roleDialogFormVisible = false
    },
    // 分配角色确认按钮
    roleConfirm () {
      userRole(this.roleUserForm.id, this.roleUserForm.rid).then(res => {
        if (res.data.meta.status === 200) {
          this.$message.success('分配角色成功！')
          this.roleDialogFormVisible = false
          // 清空value的值
          this.value = null
        }
      })
    },
    // 分配角色
    assignRoles (obj) {
      // 获取角色信息
      getRolesList().then(res => {
        this.options = res.data.data
      })
      this.roleDialogFormVisible = true
      this.roleUserForm.username = obj.username
      this.roleUserForm.id = obj.id
      getUserInfo(this.roleUserForm.id)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.roleUserForm.rid = res.data.data.rid
          } else {
            console.log(res.data.meta.msg)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 删除用户信息
    deleteUserInfo (obj) {
      this.$confirm(`删除id为${obj.id}的用户,是否继续?`, '提示', {
        confirmButtionText: '确定',
        cancelButtonText: '取消',
        type: 'wraning'
      })
        .then(() => {
          deleteUser(obj.id)
            .then(res => {
              if (res.data.meta.status === 200) {
                this.$message({
                  type: 'success',
                  message: `id为${obj.id}的用户${res.data.meta.msg}`
                })
                this.init()
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.meta.msg
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
    },
    // 编辑用户的确认按钮
    editConfirm () {
      this.$refs.editUserForm.validate(valid => {
        if (valid) {
          editUser(this.editUserForm)
            .then(res => {
              if (res.data.meta.status === 200) {
                this.$message({
                  message: res.data.meta.msg,
                  type: 'success'
                })
                this.editDialogFormVisible = false
                this.init()
              } else {
                this.$message({
                  message: res.data.meta.msg,
                  type: 'error'
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
    // 编辑用户按钮
    Edit (scope) {
      this.editDialogFormVisible = true
      this.editUserForm.id = scope.id
      this.editUserForm.username = scope.username
      this.editUserForm.email = scope.email
      this.editUserForm.mobile = scope.mobile
    },
    // 新增用户关闭按钮
    handleClose () {
      this.addDialogFormVisible = false
      this.$refs.addUserForm.resetFields()
    },
    // 新增用户确定函数
    add () {
      this.$refs.addUserForm.validate(valid => {
        if (valid) {
          addUser(this.addUserForm)
            .then(res => {
              if (res.data.meta.status === 201) {
                // 创建成功,提示信息
                this.$message({
                  message: res.data.meta.msg,
                  type: 'success'
                })
                this.addDialogFormVisible = false
                this.$refs.addUserForm.resetFields()
                this.init()
              } else {
                this.$message({
                  message: res.data.meta.msg,
                  type: 'error'
                })
              }
            })
            .catch(err => {
              this.$message.error(err)
            })
        } else {
          return false
        }
      })
    },
    handleEdit (scope) {},
    // 修改用户状态
    change (id, type) {
      changeUserStatus(id, type)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.$message({
              type: 'success',
              message: res.data.meta.msg
            })
            this.init()
          } else {
            this.$message({
              type: 'error',
              message: res.data.meta.msg
            })
          }
        })
        .catch(error => {
          this.$message({
            type: 'error',
            message: error
          })
        })
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

    // 请求用户数据的函数
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
