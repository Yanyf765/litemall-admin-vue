<template>
<div class="app-container">
  <!--查询和其他操作-->
  <div class="filter-container">
    <el-input v-model="listQuery.userId" class="filter-item"></el-input>
  </div>
</div>
</template>

<script>
export default {
  name: 'comment',
  data () {
    return {
      downloadLoading: false,
      listQuery: {
        userId: undefined,
        value: undefined
      }
    }
  }
}
</script>

<style scoped>

</style>
