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

<script>
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'App',
  components: {
    Nav,
    Footer
  }
}
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