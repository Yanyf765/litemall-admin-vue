<template>
  <div class="app-container">

    <!--查询和其他操作-->
    <div class="filter-container">
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px" placeholder="请输入广告标题"/>
      <el-input v-model="listQuery.content" clearable class="filter-item" style="width: 200px" placeholder="请输入广告内容"/>
      <el-button v-permission="['GET /admin/ad/list']" class="filter-item" type="primary" icon="el-icon-search"  @click="handleFilter">查找</el-button>
    </div>
  </div>
</template>

<script>
import {listAd} from '@/api/ad'

export default {
  name: 'ad',
  data () {
    return {
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined,
        content: undefined,
        sort: 'add_time',
        order: 'desc'
      },
      dataForm: {
        id: undefined,
        name: undefined,
        content: undefined,
        url: undefined,
        link: undefined,
        position: 1,
        enable: true
      }
    }
  },
  methods: {
    getList () {
      this.listLoading = true
      listAd(this.listLoading).then(response => {
        this.list = response.data.data.list
        this.total = response.data.data.total
        this.listLoading = false
      })
        .catch(() => {
          this.list = []
          this.total = 0
          this.listLoading = false
        })
    },
    handleFilter () {
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>

<style scoped>

</style>
