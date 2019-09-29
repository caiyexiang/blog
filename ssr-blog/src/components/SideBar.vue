<template>
  <div :class="['bar', barState]">
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
      :size="size"
    />
  </div>
</template>

<script>
import utils from '@/helper/utils'
export default {
  name: 'SideBar',
  data () {
    return {
      keyword: '',
      nav: [
        { name: '首页', route: { name: 'Home' } },
        { name: '关于', route: { name: 'About' } }
      ],
      size: 'mini'
    }
  },
  watch: {
    keyword () {
      this.changeKeyword(this, this.keyword, this.$route.query.category)
    }
  },
  computed: {
    barState () {
      return this.$store.state.showSide ? 'show-bar' : 'hide-bar'
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
    changeKeyword: utils.debounce((vm, keyword, category) => {
      const query = { page: '1', keyword, category }
      vm.$router.replace({ query });
    }, 600)
  }
}
</script>

<style lang="scss" scoped>
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
li {
  cursor: pointer;
  margin: 0 1rem 1rem 0;
  display: inline-block;
  font-size: 1.2rem;
  clear: right;
}
.activeNav {
  font-weight: 600;
  border-bottom: 2px solid $light-color;
}
.bar {
  position: fixed;
  box-sizing: border-box;
  width: 220px;
  padding: 2rem;
  height: 100%;
  top: 0;
  left: -280px;
  z-index: 10;
  background-color: #f3f3f3;
  box-: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0, 1);
}
.show-bar {
  transform: translate(280px, 0);
}
.hide-bar {
  transform: translate(0, 0);
}
</style>