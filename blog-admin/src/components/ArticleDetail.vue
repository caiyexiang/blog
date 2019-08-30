<template>
  <div class="container">
    <div>
      <el-page-header
        :content="title"
        @back="goBack"
      />
    </div>
    <div class="main">
      <el-form
        ref="articleForm"
        :model="articleData"
        :rules="rules"
      >
        <el-form-item
          label="标题"
          prop="title"
        >
          <el-input v-model="articleData.title" />
        </el-form-item>
        <el-form-item
          label="内容"
          prop="content"
        >
          <mavon-editor
            ref="md"
            v-model="articleData.content"
            @imgAdd="imgAdd"
            @imgDel="imgDel"
            @save="saveArticle"
          />
        </el-form-item>
        <el-form-item
          label="封面(可以在上面的markdown中取url哦)"
          prop="cover"
        >
          <el-input v-model="articleData.cover" />
        </el-form-item>
        <el-form-item
          label="阅读权限"
          prop="scope"
        >
          <el-switch
            v-model="articleData.scope"
            :active-value="2"
            :inactive-value="0"
            active-text="非公开"
            inactive-text="公开"
          />
        </el-form-item>
        <el-form-item
          label="标签"
          prop="category"
        >
          <el-select
            v-model="articleData.category"
            placeholder="请选择"
          >
            <el-option
              v-for="item in categoryData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >
            提交
          </el-button>
          <el-button @click="goBack">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import formMixin from '@/mixins/formMixin.js'
export default {
  mixins: [formMixin],
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      articleData: {
        title: '',
        content: '',
        cover: 'https://i.loli.net/2019/08/30/uFX3zgqKf9btirT.jpg',
        scope: 0,
        category: ''
      },
      categoryData: [
        { value: '', label: '' }
      ],
      imgUrl2Hash: {},
      rules: {
        title: [
          { validator: this.$validator.validateNotEmpty, trigger: 'blur' }
        ],
        content: [
          { validator: this.$validator.validateNotEmpty, trigger: 'blur' }
        ],
        cover: [
          { validator: this.$validator.validateNotEmpty, trigger: 'blur' }
        ],
        scope: [
          { validator: this.$validator.validateScope, trigger: 'blur' }
        ],
        category: [
          { validator: this.$validator.validateNotEmpty, trigger: 'blur' }
        ]
      },
      getDataAPI: this.$api.getArticle
    }
  },
  computed: {
    title () {
      return this.id ? '更新文章' : '新增文章'
    },
    submitAPI () {
      return this.id ? this.$api.updateArticle(this.id) : this.$api.addArticle
    }
  },
  mounted () {
    this.id && this.fetchData()
    this.fetchCategoryList()
  },
  methods: {
    async fetchData () {
      try {
        const res = await this.getDataAPI(this.id)
        this.articleData = res.data
        this.articleData.category = res.data.category._id
        this.articleData.scope = res.data.scope
      } catch (err) {
        this.$error(err)
      }
    },
    async fetchCategoryList () {
      try {
        const res = await this.$api.getCategoryList()
        this.categoryData = res.data.map(item => {
          return {
            label: item.name,
            value: item._id
          }
        })
      } catch (err) {
        this.$error(err)
      }
    },
    async onSubmit () {
      try {
        await this.submitForm()
        this.goBack()
      } catch (err) {
        this.$error(err)
      }
    },
    async submitForm () {
      try {
        await this.validateForm('articleForm')
        let { title, content, cover, scope, category } = this.articleData
        const { msg } = await this.submitAPI({ title, content, cover, scope, category })
        this.$success(msg)
      } catch (err) {
        this.$error(err)
      }
    },
    async saveArticle () {
      await this.submitForm()
    },
    imgAdd (pos, file) {
      let formData = new FormData()
      formData.append('smfile', file)
      this.$api.uploadImg(formData).then(res => {
        if (res.success) {
          this.$refs.md.$img2Url(pos, res.data.url)
          this.imgUrl2Hash[res.data.url] = res.data.hash
        } else {
          this.$error('上传 sm.ms 失败')
        }
      }).catch(err => {
        console.error(err)
        this.$error('未知错误, 请查看控制台')
      })
    },
    imgDel (fileArr) {
      const url = fileArr[0]
      const hash = this.imgUrl2Hash[url]
      this.$api.deleteImg(hash).then(res => {
        if (res.success) {
          this.$success('删除图片成功')
        } else {
          this.$error('删除失败, 请登陆 sm.ms 自行删除图片')
        }
        delete fileArr[1]
      }).catch(err => {
        console.error(err)
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  div {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>
