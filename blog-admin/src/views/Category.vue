<template>
  <div>
    <AdminTable
      :title="title"
      :table-data="tableData"
      :config="config"
      :column="column"
      @add="addView = true"
      @delete="handleDelete"
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
          label="标签名"
          prop="name"
        >
          <el-input v-model="addData.name" />
        </el-form-item>
        <el-form-item
          label="标签key"
          prop="key"
        >
          <el-input v-model="addData.key" />
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
  name: 'Category',
  components: {
    AdminTable
  },
  mixins: [formMixin],
  data () {
    return {
      title: '标签管理',
      tableData: [],
      column: { name: '标签名', key: '标签key' },
      addData: { name: '', key: '' },
      searchKeyword: '',
      addView: false,
      config: {
        canSearch: false,
        canEdit: false,
        canAdd: true,
        canPaginate: false
      },
      rules: {
        name: [
          { validator: this.$validator.validateNotEmpty, trigger: 'blur' }
        ],
        key: [
          { validator: this.$validator.validateNotEmpty, trigger: 'blur' }
        ]
      },
      getDataAPI: this.$api.getCategoryList,
      deleteAPI: this.$api.deleteCategory,
      addAPI: this.$api.addCategory,
      updateAPI: this.$api.updateCategory
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      try {
        const res = await this.getDataAPI()
        this.tableData = res.data
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
    }
  }
}
</script>
