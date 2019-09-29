<template>
  <div id="app">
    <div @click.capture="hideSide">
      <Nav />
      <main>
        <div class="main-container">
          <transition name="fade" mode="out-in">
            <router-view />
          </transition>
        </div>
      </main>
      <Footer />
    </div>
    <SideBar/>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'
import SideBar from '@/components/SideBar.vue'
export default {
  name: 'App',
  components: {
    Nav,
    Footer,
    SideBar
  },
  methods: {
    hideSide () {
      this.$store.commit('HIDE_SIDE')
    }
  }
}
</script>

<style lang="scss">
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 15px;
}
#app {
  width: 100%;
  color: $font-color;
}
main {
  width: 100%;
  min-height: 800px;
  .main-container {
    @include container(2rem);
    @include phone-width() {
      padding-left: 0;
      padding-right: 0;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>