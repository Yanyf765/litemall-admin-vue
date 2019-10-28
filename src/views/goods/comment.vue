<template>
<div class="app-container">
  <!--查询和其他操作-->
  <div class="filter-container">
    <el-input v-model="listQuery.userId" clearable class="filter-item" style="width: 200px;" placeholder="请输入用户ID"/>
    <el-input v-model="listQuery.valueId" clearable class="filter-item" style="width: 200px;" placeholder="请输入商品ID"/>
    <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    <el-button  class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>
  </div>

  <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中..." border fit highlight-current-row>
    <el-table-column align="center" label="用户ID" prop="userId"/>
    <el-table-column align="center" label="商品ID" prop="valueId"/>
    <el-table-column align="center" label="打分" prop="star"/>
    <el-table-column align="center" label="评论内容" prop="content"/>

    <el-table-column align="center" label="评论图片" prop="picUrls">
      <template slot-scope="scope">
        <img v-for="item in scope.row.picUrls" :key="item" :src="item" width="40">
      </template>
    </el-table-column>

    <el-table-column align="center" label="时间" prop="addTime"/>

    <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
      <template slot-scope="scope">
        <el-button type="primary" size="mini" @click="handleReply(scope.row)">回复</el-button>
        <el-button type="primary" size="mini" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  name: 'comment',
  data () {
    return {
      list: [],
      downloadLoading: false,
      listQuery: {
        userId: undefined,
        valueId: undefined
      },
      listLoading: false
    }
  },
  methods: {
    handleFilter () {

    },
    handleDownload () {
    },
    handleReply (row) {
    },
    handleDelete (row) {
    }
  }
}
</script>

<style scoped>

</style>
