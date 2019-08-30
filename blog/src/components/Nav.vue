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

<script lang="ts">
import utils from '@/helper/utils';
import { Component, Vue, Watch } from 'vue-property-decorator';

interface ClassObj {
  [propName: string]: boolean;
}

@Component
export default class Nav extends Vue {
  public keyword: string = '';
  public nav: any[] = [
    { name: '首页', route: { name: 'Home' } },
    { name: '关于', route: { name: 'About' } }
  ];
  private changeKeyword = utils.debounce((vm: any, keyword: string) => {
    const { category } = vm.$route.query;
    const query = { page: '1', keyword: keyword || undefined, category };
    vm.$router.replace({ query });
  }, 600);
  private activeNav(name: string): ClassObj {
    return {
      activeNav: name === this.$route.name
    };
  }
  private navTo(index: number): void {
    this.$router.push(this.nav[index].route);
  }
  private goToHome(): void {
    this.$router.push({ name: 'Home' });
  }
  @Watch('keyword')
  private onChangeKeyword(newVal: string, oldVal: string) {
    this.changeKeyword(this, newVal);
  }
}
</script>

<style lang="scss" scoped>
header {
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