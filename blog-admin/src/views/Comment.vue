<template>
  <div>
    <AdminTable
      :title="title"
      :table-data="tableData"
      :config="config"
      :column="column"
      :total="total"
      @add="addView = true"
      @delete="handleDelete"
      @page="handlePage"
    />
    <el-dialog
      :visible.sync="addView"
      width="50%"
      @close="resetForm('addForm')"
    >
      <el-form
        ref="addForm"
        label-position="left"
        label-width="80px"
        :model="addData"
        :rules="rules"
      >
        <el-form-item
          label="用户名"
          prop="name"
        >
          <el-input v-model="addData.name" />
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input v-model="addData.email" />
        </el-form-item>
        <el-form-item
          label="评论文章"
          prop="article"
        >
          <el-input v-model="addData.article" />
        </el-form-item>
        <el-form-item
          label="评论内容"
          prop="content"
        >
          <el-input v-model="addData.content" />
        </el-form-item>
        <el-form-item
          label="回复评论"
          prop="parent"
        >
          <el-input v-model="addData.parent" />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addView = false">取消</el-button>
        <el-button
          type="primary"
          @click="handleAddItem"
        >创建</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import formMixin from '@/mixins/formMixin.js'
import AdminTable from '@/components/AdminTable.vue'
export default {
  name: 'Comment',
  components: {
    AdminTable
  },
  mixins: [formMixin],
  data () {
    return {
      title: '评论管理',
      tableData: [],
      column: { name: '用户名', email: '邮箱', article: '评论文章', content: '评论内容', parent: '回复评论' },
      addData: { name: '', email: '', article: '', content: '', parent: '' },
      searchKeyword: '',
      addView: false,
      activePage: 1,
      total: 0,
      config: {
        canSearch: false,
        canEdit: false,
        canAdd: true,
        canPaginate: true
      },
      rules: {
        name: [
          { validator: this.$validator.validateNotEmpty, trigger: 'blur' }
        ],
        email: [
          { validator: this.$validator.validateNotEmpty, trigger: 'blur' }
        ],
        article: [
          { validator: this.$validator.validateNotEmpty, trigger: 'blur' }
        ],
        content: [
          { validator: this.$validator.validateNotEmpty, trigger: 'blur' }
        ]
      },
      getDataAPI: this.$api.getCommentList,
      deleteAPI: this.$api.deleteComment,
      addAPI: this.$api.addComment,
      updateAPI: this.$api.updateComment
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      try {
        const res = await this.getDataAPI({ page: this.activePage })
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
    async handleAddItem () {
      try {
        await this.validateForm('addForm')
        const { msg } = await this.addAPI(this.addData)
        this.$success(msg)
        this.addView = false
        await this.fetchData()
      } catch (err) {
        this.$error(err)
      }
    },
    async handlePage (page) {
      this.activePage = page
      await this.fetchData()
    }
  }
}
</script>
