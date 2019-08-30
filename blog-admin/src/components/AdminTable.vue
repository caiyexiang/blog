<template>
  <div class="page-container">
    <div class="table-header">
      <div><h2>{{ title }}</h2></div>
      <div>
        <el-button
          v-if="config.canAdd"
          type="success"
          icon="el-icon-plus"
          circle
          @click="$emit('add')"
        />
      </div>
      <div>
        <el-input
          v-if="config.canSearch"
          v-model="keyword"
          class="search-bar"
          placeholder="关键字检索"
          prefix-icon="el-icon-search"
          clearable
        />
      </div>
    </div>
    <div class="table-container">
      <el-table
        :data="tableData"
        stripe
      >
        <el-table-column
          v-for="(value, name, index) in column"
          :key="index"
          :prop="name"
          :label="value"
        />
        <el-table-column
          prop="_id"
          align="right"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              v-if="config.canEdit"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="$emit('edit',scope.row._id)"
            />
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="$emit('delete',scope.row._id)"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div
      v-if="config.canPaginate"
      class="pagination"
    >
      <el-pagination
        :page-size="10"
        layout="prev, pager, next"
        :total="total"
        background
        :current-page.sync="currentPage"
      />
    </div>
  </div>
</template>

<script>
import { $public } from '@/helper'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    tableData: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    },
    column: {
      type: Object,
      default: null
    },
    config: {
      type: Object,
      default: () => {
        return {
          canSearch: false,
          canAdd: false,
          canEdit: false,
          canPaginate: false
        }
      }
    }
  },
  data () {
    return {
      routeName: this.$route.name,
      keyword: this.$route.query.keyword || '',
      pageSize: 10,
      currentPage: parseInt(this.$route.query.page) || 1
    }
  },
  watch: {
    keyword () {
      this.emitSearch(this, this.keyword)
    },
    currentPage () {
      this.$emit('page', this.currentPage)
      let query = { page: this.currentPage }
      if (this.keyword) query['keyword'] = this.keyword
      this.$router.replace({ name: this.routeName, query })
    }
  },
  methods: {
    emitSearch: $public._debounce((vm, keyword) => {
      vm.$emit('search', keyword)
      vm.currentPage = 1
      vm.$router.replace({ name: vm.routeName, query: { page: vm.currentPage, keyword: keyword } })
    })
  }
}
</script>

<style lang="scss" scoped>
.table-header {
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  * {
    margin-right: 15px;
  }
  .search-bar {
    width: 300px;
  }
}
.table-container {
  width: 100%;
  margin-bottom: 30px;
}
.pagination {
  width: 100%;
  text-align: center;
}
</style>
