<template>
  <header>
      <div class="header-container">
        <div class="logo-container" @click="goToHome"/>
        <div class="tool-container">
          <ul>
            <li v-for="(item,index) of nav" :key="index" @click="navTo(index)" :class="activeNav(item.route.name)">
              {{ item.name }}
            </li>
          </ul>
          <el-input
            v-show="$route.name === 'Home'"
            placeholder="文章标题检索"
            class="search-bar"
            clearable
            prefix-icon="el-icon-search"
            v-model="keyword"
          />
        </div>
      </div>
    </header>
</template>

<script>
import utils from '@/helper/utils'

export default {
  name: 'Nav',
  data () {
    return {
      keyword: '',
      nav: [
        { name: '首页', route: { name: 'Home' } },
        { name: '关于', route: { name: 'About' } }
      ]
    }
  },
  watch: {
    keyword () {
      this.changeKeyword(this, this.keyword, this.$route.query.category)
    }
  },
  methods: {
    activeNav (name) {
      return {
        activeNav: name === this.$route.name
      }
    },
    navTo (index) {
      this.$router.push(this.nav[index].route).catch(_ => { })
    },
    goToHome () {
      this.$router.push({ name: 'Home' }).catch(_ => { })
    },
    changeKeyword: utils.debounce((vm, keyword, category) => {
      const query = { page: '1', keyword, category }
      vm.$router.replace({ query });
    }, 600)
  }
}
</script>

<style lang="scss" scoped>
header {
  ul,
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  li {
    cursor: pointer;
  }
  width: 100%;
  border-bottom: 1px solid $border-color;
  background-color: rgba(255, 255, 255, 0.4);
  .header-container {
    @include container;
    display: flex;
    justify-content: space-between;
    .tool-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      .search-bar {
        width: 300px;
      }
      .activeNav {
        color: $light-color;
      }
      ul {
        display: flex;
        flex-direction: row;
        li {
          margin-right: 20px;
          display: block;
        }
      }
    }
    .logo-container {
      cursor: pointer;
      width: 50px;
      height: 50px;
      background: url(~@/assets/logo.png);
      background-size: 50px 50px;
    }
  }
}
</style>