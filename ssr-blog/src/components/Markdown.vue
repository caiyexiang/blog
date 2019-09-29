<template>
  <div v-highlight class="markdown" v-html="markedContent">
  </div>
</template>

<script>
import { marked } from '@/plugins/markdown.js'
import 'highlight.js/styles/github.css'
export default {
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  computed: {
    markedContent () {
      return marked(this.content)
    }
  }
}
</script>
<style scoped>
.markdown >>> img {
  display: block;
  margin: 0 auto;
  margin-top: 2em;
  margin-bottom: 2em;
  max-width: 100%;
  height: auto;
}
.markdown >>> code:not(.hljs) {
  color: #e96900;
  padding: 3px 5px;
  margin: 0 2px;
  border-radius: 2px;
  white-space: nowrap;
  font-size: 0.8em;
  background-color: #f8f8f8;
  -webkit-font-smoothing: initial;
}
.markdown >>> .hljs {
  background-color: #f8f8f8;
  font-size: 0.9em;
  padding: 1.5em;
  line-height: 1.5em;
}
.markdown >>> li {
  line-height: 1.8em;
}
.markdown >>> p {
  line-height: 1.8em;
}
.markdown >>> blockquote {
  display: block;
  padding: 1em 40px;
  background-color: #f8f8f8;
  margin: 0;
  border-left: 1em solid #d8d8d8;
}
</style>