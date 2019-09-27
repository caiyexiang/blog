<template>
  <div>
    <div class="card" v-for="article of articleList" :key="article._id" @click="goToDetail(article._id)">
      <div class="card-info-container">
        <div class="top">
          <div v-if="article.scope > 0"><i class="el-icon-lock"></i></div>
          <div>{{ article.author }} · {{ article.time }} ·</div>
          <Tag size="small">
            {{article.category}}
          </Tag>
        </div>
        <div class="mid">
          <h2>{{article.title}}</h2>
        </div>
        <div class="bottom">
          <div><i class="el-icon-view" /> {{ article.pv }}</div>
          <div><i class="el-icon-s-comment" /> {{ article.comments_num }}</div>
        </div>
      </div>
      <div class="card-img-container" :style="{backgroundImage:`url(${article.cover})`}">
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        :page-size="10"
        layout="prev, pager, next"
        :total="total"
        background
        :current-page.sync="currentPage"
        v-if="total"
      />
    </div>
  </div>
</template>

<script>
import Tag from '@/components/Tag.vue'
export default {
  components: {
    Tag
  },
  name: 'ArticleList',
  data () {
    return {
      pageSize: 10,
      currentPage: Number(this.$route.query.page) || 1
    }
  },
  computed: {
    articleList () {
      return this.$store.state.articleList
    },
    total () {
      return this.$store.state.totalPage
    }
  },
  watch: {
    currentPage () {
      const query = this.$route.query
      query.page = this.currentPage
      this.$router.replace({ query }).catch(_ => { })
      this.$store.dispatch('fetchArticleList', this.$route)
    }
  },
  methods: {
    goToDetail (id) {
      this.$router.push({ name: 'Article', params: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  @extend %card;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  .card-info-container {
    %info-part {
      display: flex;
      direction: row;
      align-items: center;
    }
    .mid {
      @extend %info-part;
      padding-left: 1rem;
      border-left: 5px solid $light-color;
      margin-bottom: 1rem;
      h2 {
        font-size: 1.3rem;
        margin: 0;
      }
    }
    .top {
      @extend %info-part;
      margin-bottom: 0.8rem;
      font-size: 0.8rem;
      color: $grey-color;
      div {
        margin-right: 0.8rem;
      }
    }
    .bottom {
      @extend %info-part;
      font-size: 0.9rem;
      color: $grey-color;
      div {
        margin-right: 0.9rem;
      }
    }
  }
  .card-img-container {
    width: 120px;
    height: 90px;
    background: url(~@/assets/logo.png);
    background-size: cover;
  }
}
.pagination {
  text-align: center;
}
</style>
