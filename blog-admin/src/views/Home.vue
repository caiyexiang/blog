<template>
  <el-container class="admin-container">
    <el-aside
      v-show="showSide"
      class="side"
    >
      <SideBar />
    </el-aside>
    <el-container>
      <el-main class="view-container">
        <el-button
          id="toggleBtn"
          size="mini"
          @click="showSide = !showSide"
        >
          {{ toggleText }}
        </el-button>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideBar from '@/partials/SideBar.vue'
export default {
  name: 'Home',
  components: {
    SideBar
  },
  data () {
    return {
      showSide: true
    }
  },
  computed: {
    toggleText () {
      return this.showSide ? '<' : '>'
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-container {
  height: 100%;
}
.side {
  height: 100%;
  border-right: solid 1px $border-color;
}
.view-container {
  padding: 20px 60px 20px 60px;
  position: relative;
}
#toggleBtn {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
