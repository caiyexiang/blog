<template>
  <div class="bar">
    <h1 @click="onHandleClick"> Bar Components</h1>
    <h2> 异步Ajax数据: </h2>
    <span>{{ msg }}</span>
  </div>
</template>

<script>
const fetchData = ({ store }) => {
  return store.dispatch('fetchBar')
}
export default {
  name: 'Bar',
  asyncData: fetchData,
  title () {
    return 'bar'
  },
  methods: {
    onHandleClick () {
      alert('bar')
    }
  },
  mounted () {
    // 服务端渲染只用到beforeCreate 和 created
    // 把 Ajax 数据写在这里，仅供纯浏览器渲染使用
    const store = this.$store
    fetchData({ store })
  },
  computed: {
    msg () {
      return this.$store.state.bar
    }
  }
}
</script>

<style>
.bar {
  background: cyan;
}
</style>