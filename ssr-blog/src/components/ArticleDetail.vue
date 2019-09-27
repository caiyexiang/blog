<template>
  <div>
    <div id="article" v-if="articleDetail.title">
      <div class="header">
        <div class="title">
          <h2> {{articleDetail.title}} </h2>
        </div>
        <div class="info">
          <div><i class="el-icon-view" /> {{ articleDetail.pv }}</div>
          <div>{{ articleDetail.author }} · {{ articleDetail.time }} ·</div>
          <Tag size="small" :id="articleDetail.category._id">
            {{articleDetail.category.name}}
          </Tag>
        </div>
      </div>
      <div class="main">
        <Markdown :content="articleContent"/>
      </div>
    </div>
    <div class="notFound" v-if="!articleDetail.title">
      <h2 style="text-align:center">{{ msg }}</h2>
    </div>
  </div>
</template>

<script>
import Tag from '@/components/Tag.vue'
import Markdown from '@/components/Markdown.vue'
export default {
  name: 'ArticleDetail',
  components: {
    Tag,
    Markdown
  },
  data () {
    return {
      msg: `您没有权限访问该文章，或者该文章不存在，请联系博主哦 😂`
    }
  },
  computed: {
    articleDetail () {
      return this.$store.state.articleDetail
    },
    articleContent () {
      return this.$store.state.articleDetail.content
    }
  },
  mounted () {
    this.$store.dispatch('fetchArticleDetail', this.$route)
    this.setCopyrightInfo()
  },
  methods: {
    setCopyrightInfo () {
      const ele = document.querySelector('#article')
      function getInfo (data, author, link) {
        const info = [
          data,
          '\n\n\n',
          '----------------',
          '著作权归作者所有。',
          '商业转载请联系作者获得授权，非商业转载请注明出处。',
          `作者：${author}, 链接：${link}, 来源：某湘的博客。`
        ];
        return info.join('\n')
      }
      if (ele) {
        ele.addEventListener('copy', (event) => {
          const selectObj = window.getSelection()
          const originData = selectObj.toString()
          if (originData.length > 20) {
            if (event !== null && event.clipboardData !== null) {
              event.clipboardData.setData(
                'text/plain',
                getInfo(originData, this.articleData.author, window.location.href)
              )
              event.preventDefault()
            }
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
.header {
  border-bottom: 1px solid $border-color;
  .info {
    display: flex;
    direction: row;
    align-items: center;
    margin: 1rem 0 1rem 0;
    font-size: 0.8rem;
    color: $grey-color;
    div {
      margin-right: 0.8rem;
    }
  }
  .title {
    h2 {
      font-size: 1.5rem;
      margin: 0;
    }
  }
}
.main {
  margin-top: 2rem;
}
</style>