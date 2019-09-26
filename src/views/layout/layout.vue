<template>
    <div :class="classObj" class="app-wrapper">
      <div v-if="device === 'mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside">
      </div>
      <sidebar class="sidebar-container" />
      <div class="main-container">
        <navbar></navbar>
        <tags-view></tags-view>
        <app-main></app-main>
      </div>

    </div>
</template>

<script>
import Navbar from '@/views/layout/components/Navbar'
import TagsView from '@/views/layout/components/TagsView'
import AppMain from '@/views/layout/components/AppMain'
import Sidebar from '@/views/layout/components/Sidebar/index'
export default {
  name: 'Layout',
  components: {
    Navbar, TagsView, AppMain, Sidebar
  },
  computed: {
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside () {
      this.$store.dispatch('closeSideBar', {withoutAnimation: false})
    }
  }
}
</script>

<style scoped>

</style>
