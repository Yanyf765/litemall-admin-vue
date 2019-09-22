<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse">
    </el-menu>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'Item',
  methods: {
    isCollapse () {
      return !this.sidebar.opened
    }
  }
}
</script>

<style scoped>

</style>
