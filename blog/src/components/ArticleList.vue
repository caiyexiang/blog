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

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Tag from '@/components/Tag.vue';
@Component({
  components: {
    Tag
  }
})
export default class ArticleList extends Vue {
  public keyword: string = '';
  public category: string = '';
  public routeName: string = '';
  public articleList: any[] = [];
  public pageSize: number = 10;
  public total: number = 0;
  public currentPage: number = 1;
  @Watch('currentPage')
  public onChangePage(newVal: number, oldVal: number) {
    interface Query {
      [propName: string]: string;
    }
    const query: Query = { page: this.currentPage.toString() };
    if (this.keyword) {
      query.keyword = this.keyword;
    }
    this.$router.replace({ name: this.routeName, query });
    this.fetchData();
  }
  @Watch('$route.query.keyword')
  public onChangeKeyword(newVal: string, oldVal: string) {
    this.keyword = newVal;
    this.fetchData();
  }
  @Watch('$route.query.category')
  public onChangeCategory(newVal: string, oldVal: string) {
    this.category = newVal;
    this.fetchData();
  }
  private created() {
    this.currentPage = Number(this.$route.query.page as string) || 1;
    if (this.$route.query.category) {
      this.category = this.$route.query.category as string;
    }
    if (this.$route.query.keyword) {
      this.keyword = this.$route.query.keyword as string;
    }
    this.routeName = this.$route.name || '';
  }
  private async mounted() {
    await this.fetchData();
  }
  private async fetchData() {
    try {
      const params = {
        page: this.currentPage.toString(),
        keyword: this.keyword,
        category: this.category
      };
      const res = await this.$api.getArticleList(params);
      const data = res.data.data;
      data.forEach((item: any) => {
        item.time = item.meta.updatedAt.split('T')[0];
      });
      this.articleList = data;
      this.total = res.data.meta.total;
    } catch (err) {
      this.$error(err.toString());
    }
  }
  private goToDetail(id: string) {
    this.$router.push({ name: 'Article', params: { id } });
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
