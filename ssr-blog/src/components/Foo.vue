<template>
  <div class="foo">
    <h1 @click="onHandleClick"> Foo Components ～</h1>
  </div>
</template>

<script>
export default {
  title () {
    return 'Foo'
  },
  methods: {
    onHandleClick () {
      alert('foo')
    }
  },
}
</script>

<style>
.foo {
  background: greenyellow;
}
</style>