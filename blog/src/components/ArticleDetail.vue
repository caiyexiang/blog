<template>
  <div>
    <div id="article" v-if="articleData.title">
      <div class="header">
        <div class="title">
          <h2> {{articleData.title}} </h2>
        </div>
        <div class="info">
          <div><i class="el-icon-view" /> {{ articleData.pv }}</div>
          <div>{{ articleData.author }} · {{ articleData.time }} ·</div>
          <Tag size="small" :id="articleData.category._id">
            {{articleData.category.name}}
          </Tag>
        </div>
      </div>
      <div class="main mavon">
        <mavon-editor
          style="height: 100%"
          :ishljs="true"
          v-model="articleData.content"
          :defaultOpen="'preview'"
          :editable="false"
          :subfield="false"
          :toolbarsFlag="false">
        </mavon-editor>
      </div>
    </div>
    <div class="notFound" v-if="!articleData.title">
      <h2 style="text-align:center">{{ msg }}</h2>
    </div>
  </div>
</template>

<script lang='ts'>
import Tag from '@/components/Tag.vue';
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {
    Tag
  }
})
export default class ArticleDetail extends Vue {
  public articleId: string = '';
  public articleData = {
    title: '',
    author: '',
    content: '',
    scope: 0,
    category: '',
    time: ''
  };
  public msg = '';
  private created() {
    this.articleId = this.$route.params.id;
  }
  private async mounted() {
    await this.fetchData();
    this.setCopyrightInfo();
  }
  private setCopyrightInfo() {
    const ele = document.querySelector('#article') as HTMLElement;
    function getInfo(data: string, author: string, link: string) {
      const info = [
        data,
        '\n\n\n',
        '----------------',
        '著作权归作者所有。',
        '商业转载请联系作者获得授权，非商业转载请注明出处。',
        `作者：${author}, 链接：${link}, 来源：某湘的博客。`
      ];
      return info.join('\n');
    }
    if (ele) {
      ele.addEventListener('copy', (event: ClipboardEvent) => {
        const selectObj = window.getSelection() as Selection;
        const originData = selectObj.toString() as string;
        if (originData.length > 20) {
          if (event !== null && event.clipboardData !== null) {
            event.clipboardData.setData(
              'text/plain',
              getInfo(originData, this.articleData.author, window.location.href)
            );
            event.preventDefault();
          }
        }
      });
    }
  }
  private async fetchData() {
    try {
      const res = await this.$api.getArticle(this.articleId);
      const data = res.data;
      data.time = data.meta.updatedAt.split('T')[0];
      data.author = data.author.name;
      this.articleData = data;
    } catch (err) {
      this.msg = `您没有权限访问该文章，或者该文章不存在，请联系博主哦 😂`;
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
.shadow {
  box-shadow: none !important;
}
.v-show-content {
  background-color: white !important;
}
</style>