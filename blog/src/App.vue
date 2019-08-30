<template>
  <div id="app">
    <Nav />
    <main>
      <div class="main-container">
        <router-view />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script lang='ts'>
import Nav from '@/components/Nav.vue';
import Footer from '@/components/Footer.vue';
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {
    Nav,
    Footer
  }
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  color: $font-color;
}
main {
  width: 100%;
  min-height: 800px;
  .main-container {
    @include container(2rem);
  }
}
</style>
