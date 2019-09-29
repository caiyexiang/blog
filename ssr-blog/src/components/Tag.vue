<template>
  <div :class="tagStyle" @click="changeCategory">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    }
  },
  computed: {
    tagStyle () {
      return {
        'tag-block': this.size === 'big',
        'tag-inline': this.size === 'small'
      }
    }
  },
  methods: {
    changeCategory () {
      const { keyword } = this.$route.query;
      const query = { page: '1', keyword, category: this.id || undefined };
      this.$router.replace({ name: 'Home', query });
    }
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
  @include phone-width() {
    font-size: 0.8rem;
    padding: 0.2rem;
  }
}
</style>