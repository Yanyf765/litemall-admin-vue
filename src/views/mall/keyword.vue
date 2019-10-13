<template>
<div class="app-container">
  <!--查询和其他操作-->
  <div class="filter-container">
    <el-input v-model="listQuery.keyword" clearable class="filter-item" style="width: 200px;" placeholder="请输入关键字"/>
    <el-input v-model="listQuery.url" clearable class="filter-item" style="width: 200px;" placeholder="请输入跳转链接"/>
    <el-button v-permission="['GET /admin/keyword/list']" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    <el-button v-permission="['POST /admin/keyword/create']" class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
    <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>
  </div>

  <!-- 查询结果 -->
  <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
    <el-table-column align="center" width="150px" label="关键词ID" prop="id" sortable/>
    <el-table-column align="center" min-width="100px" label="关键词" prop="keyword" />
    <el-table-column align="center" min-width="300px" label="跳转链接" prop="url" />
    <el-table-column align="center" min-width="100px" label="是否推荐" prop="isHot" >
      <template slot-scope="scope">
        <el-tag :type="scope.row.isHot ? 'success':'error'">{{scope.row.isHot ? '是' : '否'}}</el-tag>
      </template>
    </el-table-column>

    <el-table-column align="center" min-width="100px" label="是否默认" prop="isDefault">
      <template slot-scope="scope">
        <el-tag :type="scope.row.isDefault ? 'success':'error' ">{{scope.row.isDefault? '是' : '否'}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import {listKeyWord}
export default {
  name: 'keyword',
  data () {
    return {
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        keyword: undefined,
        url: undefined,
        sort: 'add_time',
        order: 'desc'
      },
      dataForm: {
        id: undefined,
        keyword: undefined,
        url: undefined,
        isHot: undefined,
        isDefault: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules: {
        keyword: [{required: true, message: '关键词不能为空', trigger: 'blur'}]
      },
      downloadLoading: false
    }
  },
  methods: {
    getList () {
      this.listLoading = true
      listKeyWord(this.listQuery).then(response => {

      })
    },
    handleFilter () {
    },
    handleCreate () {
    },
    handleDownload () {
    }
  }
}
</script>

<style scoped>

</style>
