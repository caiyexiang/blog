<template>
  <div>
    <AdminTable
      :title="title"
      :table-data="tableData"
      :config="config"
      :column="column"
      :total="total"
      @add="handleAdd"
      @delete="handleDelete"
      @edit="handleEdit"
      @search="handleSearch"
      @page="handlePage"
    />
  </div>
</template>

<script>
/**
 * article api:
 *     add - post. /article : title content cover category scope
 *     update - put. /article/${id}
 *     get - get. /article/${id} (return content/title/cover/author/_id/pv/scope/category/comments)
 */
import AdminTable from '@/components/AdminTable.vue'
export default {
  name: 'Article',
  components: {
    AdminTable
  },
  data () {
    return {
      title: '文章管理',
      tableData: [],
      column: { title: '标题', author: '作者', scope: '权限', category: '标签', pv: '观看数', comments_num: '评论数' },
      total: 0,
      searchKeyword: '',
      addView: false,
      activePage: 1,
      config: {
        canSearch: true,
        canEdit: true,
        canAdd: true,
        canPaginate: true
      },
      getDataAPI: this.$api.getArticleList,
      deleteAPI: this.$api.deleteArticle,
      addAPI: this.$api.addArticle,
      updateAPI: this.$api.updateArticle
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      try {
        let params = { page: this.activePage, keyword: this.searchKeyword }
        const res = await this.getDataAPI(params)
        this.total = res.data.meta.total
        this.tableData = res.data.data
      } catch (err) {
        this.$error(err)
      }
    },
    async handleDelete (id) {
      try {
        const { msg } = await this.deleteAPI(id)
        this.$success(msg)
        await this.fetchData()
      } catch (err) {
        this.$error(err)
      }
    },
    async handleAdd () {
      this.$router.push({ name: 'AddArticle' })
    },
    async handleEdit (id) {
      this.$router.push({ name: 'EditArticle', params: { id } })
    },
    async handleSearch (keyword) {
      this.searchKeyword = keyword
      await this.fetchData()
    },
    async handlePage (page) {
      this.activePage = page
      await this.fetchData()
    }
  }
}
</script>
