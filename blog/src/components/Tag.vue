<template>
  <div :class="tagStyle" @click="changeCategory">
    <slot></slot>
  </div>
</template>

<script lang=ts>
import { Prop, Component, Vue } from 'vue-property-decorator';
@Component
export default class Tag extends Vue {
  @Prop(String) private readonly size!: string;
  @Prop(String) private readonly id!: string;
  get tagStyle() {
    return {
      'tag-block': this.size === 'big',
      'tag-inline': this.size === 'small'
    };
  }
  private changeCategory() {
    const { keyword } = this.$route.query;
    const query = { page: '1', keyword, category: this.id || undefined };
    const name = 'Home';
    this.$router.replace({ name, query });
  }
}
</script>

<style lang="scss" scoped>
.tag-inline {
  cursor: pointer;
  font-size: 0.8rem;
  color: white;
  background-color: $light-color;
  padding: 2px;
  border-radius: 3px;
  font-weight: 600;
  word-break: keep-all;
}
.tag-block {
  cursor: pointer;
  font-size: 0.9rem;
  color: $light-color;
  border: 1px solid $light-color;
  padding: 0.5rem;
  border-radius: 3px;
  font-weight: 500;
  word-break: keep-all;
  margin-right: 1rem;
  margin-bottom: 1rem;
}
</style>