<template>
  <div class="home">
    <ArticleList id="article"/>
    <Category id="category"/>
  </div>
</template>

<script lang="ts">
import ArticleList from '@/components/ArticleList.vue';
import Category from '@/components/Category.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  components: {
    ArticleList,
    Category
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  #article {
    width: 70%;
  }
  #category {
    width: 29%;
  }
}
</style>
