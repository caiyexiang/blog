<template>
  <div>
    <ArticleDetail />
  </div>
</template>

<script>
import ArticleDetail from '@/components/ArticleDetail.vue'
const asyncData = ({ store, route }) => store.dispatch('fetchArticleDetail', route)
export default {
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
</style>
