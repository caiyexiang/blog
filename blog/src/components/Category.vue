<template>
  <div>
    <div class="card">
      <div class="title">
        <i class="el-icon-collection-tag"></i> 标签
      </div>
      <div class="categroy-list">
        <Tag size="big"> 全部文章 </Tag>
        <Tag v-for="tag of categoryList" :key="tag._id" size="big" :id="tag._id">
          {{ tag.name }}({{ tag.count || 0 }})
        </Tag>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Tag from '@/components/Tag.vue';
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {
    Tag
  }
})
export default class Category extends Vue {
  public categoryList: any[] = [];
  private async mounted() {
    await this.fetchData();
  }
  private async fetchData() {
    try {
      const res = await this.$api.getCategoryList();
      const data = res.data;
      this.categoryList = data;
    } catch (err) {
      this.$error(err.toString());
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  @extend %card;
  .title {
    line-height: 2rem;
    border-bottom: 1px solid $border-color;
    margin-bottom: 1rem;
  }
  .categroy-list {
    display: flex;
    direction: row;
    flex-wrap: wrap;
  }
}
</style>