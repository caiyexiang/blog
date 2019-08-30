<template>
  <div>
    <div class="title-container">
      <div class="logo-container" />
      <div>
        Blog Admin
      </div>
    </div>
    <div class="userinfo-container">
      <div :class="userLevelClass">
        {{ userInfo && userInfo.name }}
      </div>
      <el-button
        type="danger"
        @click="logout"
      >
        注销
      </el-button>
    </div>
    <el-menu
      :default-active="activeIndex"
      router
      class="side-menu"
      text-color="#34495e"
      active-text-color="#42b983"
    >
      <el-menu-item
        index="Article"
        :route="{name: 'Article'}"
      >
        文章管理
      </el-menu-item>
      <el-menu-item
        index="Comment"
        :route="{name: 'Comment'}"
      >
        评论管理
      </el-menu-item>
      <el-menu-item
        index="Category"
        :route="{name: 'Category'}"
      >
        标签管理
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      activeIndex: this.$route.name
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    userLevelClass () {
      return {
        'manager': this.userInfo && this.userInfo.level === 2,
        'super-manager': this.userInfo && this.userInfo.level === 3
      }
    }
  },
  async created () {
    await this.getUserInfo()
  },
  methods: {
    ...mapActions(['getUserInfo']),
    logout () {
      this.$store.commit('deleteUser')
      this.$router.replace({ name: 'Login' })
    }
  }
}
</script>

<style lang="scss" scoped>
.side-menu {
  border: 0;
}
%container {
  display: flex;
  align-items: center;
}
.title-container {
  @extend %container;
  padding: 20px;
  div {
    margin-right: 20px;
    color: $dark-color;
    font-size: 20px;
    font-weight: 600;
  }
}
.userinfo-container {
  @extend %container;
  padding: 10px;
  justify-content: space-between;
  background-color: $dark-color;
  div {
    color: white;
  }
  .manager:before {
    content: '🔨';
  }
  .super-manager:before {
    content: '👓';
  }
}
.logo-container {
  width: 50px;
  height: 50px;
  background: url(~@/assets/logo.png);
  background-size: 50px 50px;
}
</style>
