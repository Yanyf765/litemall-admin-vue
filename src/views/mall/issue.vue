<template>
<div class="app-container">

  <!--查询和其他操作-->
  <div>
    <el-input v-model="listQuery.question" clearable class="filter-item" style="width: 200px;" placeholder="请输入问题"/>
    <el-button v-permission="['GET /admin/issue/list']" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    <el-button v-permission="['GET /admin/issue/create']" class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
    <el-button :loading="downloading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>
  </div>

  <!-- 查询结果 -->
  <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
    <el-table-column align="center" width="100px" label="问题ID" prop="id" sortable/>
    <el-table-column align="center" width="200px" label="问题内容" prop="question" />
    <el-table-column align="center" width="400px" label="问题回复" prop="answer" />

    <el-table-column align="center" label="操作" width="250" class-name="small-padding fixed-width">
      <template slot-scope="scope">
        <el-button v-permission="['POST /admin/issue/update']" type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
        <el-button v-permission="['POST /admin/issue/update']" type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"></pagination>

  <!--添加或修改对话框-->
  <el-dialog>

  </el-dialog>
</div>
</template>

<script>
import {listIssue} from '../../api/issue'
import Pagination from '@/components/Pagination'
export default {
  name: 'issue',
  components: {Pagination},
  data () {
    return {
      total: 0,
      listQuery: {
        question: undefined,
        page: 1,
        limit: 20,
        sort: 'add_time',
        order: 'desc'
      },
      dataForm: {
        id: undefined,
        question: '',
        answer: ''
      },
      downloading: false,
      listLoading: false,
      list: null,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules: {
        question: [{require: true, message: '问题不能为空', trigger: 'blur'}],
        answer: [{require: true, message: '回复不能为空', trigger: 'blur'}]
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.listLoading = true
      listIssue(this.listQuery).then(response => {
        this.list = response.data.data.list
        this.total = response.data.data.total
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    },
    handleFilter () {
    },
    handleDownload () {
    },
    handleCreate () {
    }
  }
}
</script>

<style scoped>

</style>
