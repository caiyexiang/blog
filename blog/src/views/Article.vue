<template>
  <div>
    <ArticleDetail />
  </div>
</template>

<script lang="ts">
import ArticleDetail from '@/components/ArticleDetail.vue';
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {
    ArticleDetail
  }
})
export default class Article extends Vue {}
</script>

<style lang="scss" scoped>
</style>
