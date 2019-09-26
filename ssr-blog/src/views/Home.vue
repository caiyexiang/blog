<template>
  <div class="home">
    <ArticleList id="article"/>
    <Category id="category"/>
  </div>
</template>

<script>
import ArticleList from '@/components/ArticleList.vue'
import Category from '@/components/Category.vue'
const asyncData = async ({ store, route }) => {
  await store.dispatch('fetchArticleList', route)
  await store.dispatch('fetchCategory')
}
export default {
  name: 'Home',
  title: '首页',
  components: {
    ArticleList,
    Category
  },
  asyncData,
  mounted () {
    const store = this.$store
    const route = this.$route
    asyncData({ store, route })
  },
}
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