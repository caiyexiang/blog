<template>
  <div class="article-container">
    <ArticleDetail />
  </div>
</template>

<script>
import ArticleDetail from '@/components/ArticleDetail.vue'
const asyncData = ({ store, route }) => {
  return store.dispatch('fetchArticleDetail', route)
}
export default {
  name: 'Article',
  components: {
    ArticleDetail
  },
  asyncData,
  mounted () {
    const store = this.$store
    const route = this.$route
    asyncData({ store, route })
  },
  title () {
    return this.$store.state.articleDetail.title || ''
  }
}
</script>

<style lang="scss" scoped>
.article-container {
  font-size: 1rem;
  @include phone-width() {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
</style>
