<template>
  <ArticleDetail :id="id" />
</template>

<script>
import ArticleDetail from '@/components/ArticleDetail.vue'
export default {
  name: 'AddArticle',
  components: {
    ArticleDetail
  },
  data () {
    return {
      id: this.$route.params.id
    }
  }
}
</script>
