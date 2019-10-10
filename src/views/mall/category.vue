<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
        <el-button v-permission="['POST /admin/category/create']" class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" row-key="id" border fit highlight-current-row>
      <el-table-column align="center" label="类目ID" prop="id"></el-table-column>
      <el-table-column align="center" label="类目名" prop="name"></el-table-column>
      <el-table-column align="center" label="类目图标" property="iconUrl">
        <template slot-scope="scope">
          <img v-if="scope.row.iconUrl" :src="scope.row.iconUrl" width="40">
        </template>
      </el-table-column>
      <el-table-column align="center" property="picUrl" label="类目图片">
        <template slot-scope="scope">
          <img v-if="scope.row.picUrl" :src="scope.row.picUrl" width="80">
        </template>
      </el-table-column>

      <el-table-column align="center" label="关键字" prop="keywords"/>

      <el-table-column align="center" label="简介" min-width="100" prop="desc"/>

      <el-table-column align="cener" label="级别" prop="level">
          <template slot-scope="scope">
            <el-tag :type="scope.row.level === 'L1' ? 'primary' : 'info'">{{scope.row.level === 'L1' ? '一级类目' : '二级类目'}}</el-tag>
          </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-permission="['POST /admin/category/update']" type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button v-permission="['POST /admin/category/delete']" type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或者修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 400px;margin-left: 50px; ">
        <el-form-item label="类目名称" prop="name">
          <el-input v-model="dataForm.name"/>
        </el-form-item>
        <el-form-item label="关键字" prop="keywords">
          <el-input v-model="dataForm.keywords"/>
        </el-form-item>
        <el-form-item label="级别" prop="level">
          <el-select v-model="dataForm.level" @change="onLevelChange">
            <el-option label="一级类目" value="L1"/>
            <el-option label="二级类目" value="L2"/>
          </el-select>
        </el-form-item>
        <el-form-item label="服类目" prop="pid">
          <el-select v-model="dataForm.pid">
            <el-option v-for="item in catL1" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { listCategory,listCatL1 } from '@/api/category'
export default {
  name: 'category',
  data () {
    return {
      listLoading: false,
      list: [],
      textMap: {
        update: '编辑',
        create: '创建'
      },
      dialogStatus: '',
      dialogFormVisible: false,
      dataForm: {
        id: undefined,
        name: '',
        keywords: '',
        level: '',
        pid: 0,
        desc: '',
        iconUrl: '',
        picUrl: ''
      },
      rules: {
        name: [{required: true, message: '类目名不能为空', trigger: 'blur'}]
      },
      catL1: {}
    }
  },
  created () {
    this.getList()
    this.getCatL1()
  },
  methods: {
    handleCreate () {

    },
    getList () {
      this.listLoading = true
      listCategory().then(response => {
        this.list = response.data.data.list
        this.listLoading = false
      })
        .catch(() => {
          this.list = []
          this.listLoading = false
        })
    },
    getCatL1 () {
      listCatL1().then(response => {
        this.catL1 = response.data.data.list
      })
    },
    handleUpdate (row) {
      this.dataForm = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete () {
    },
    onLevelChange: function (value) {
      if (value === 'L1') {
        this.dataForm.level = 0
      }
    }
  }
}
</script>

<style scoped>
.filter-item{
  margin-left: 100px;
}
</style>
