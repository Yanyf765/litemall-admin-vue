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
    </el-table>
  </div>
</template>

<script>
import { listCategory } from '@/api/category'
export default {
  name: 'category',
  data () {
    return {
      listLoading: false,
      list: []
    }
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
    }
  }
}
</script>

<style scoped>
.filter-item{
  margin-left: 100px;
}
</style>
