<template>
  <footer>
      <div class="footer-container">
        <p>🎉 www.caiyexiang.com - 某湘的博客 - 粤ICP备16117702号-1 🎉</p>
      </div>
    </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
footer {
  background-color: $dark-color;
  color: $font-light-color;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  p {
    text-align: center;
  }
}
</style>