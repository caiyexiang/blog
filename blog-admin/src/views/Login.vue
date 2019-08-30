<template>
  <div
    class="login"
    :style="{ background: `url(${backgroundUrl})` }"
  >
    <p class="statement">
      © 图片来源于bing每日图片，动态获取
    </p>
    <div class="mask" />
    <el-card
      class="login-card"
    >
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="rules"
        class="login-form"
        label-width="80px"
      >
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input v-model="loginForm.email" />
        </el-form-item>
        <el-form-item
          label="密码"

          prop="password"
        >
          <el-input
            v-model="loginForm.password"
            type="password"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >
            登陆
          </el-button>
          <el-button @click="resetForm('loginForm')">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import formMixin from '@/mixins/formMixin.js'
import { $validator } from '@/helper'
export default {
  name: 'Login',
  mixins: [formMixin],
  data () {
    return {
      backgroundUrl: '',
      loginForm: {
        email: '',
        password: ''
      },
      rules: {
        password: [
          { validator: $validator.validatePassword, trigger: 'blur' }
        ],
        email: [
          { validator: $validator.validateEmail, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.$store.getters.isLogin && this.$router.replace({ name: 'Home' })
  },
  mounted () {
    this.getBackground()
  },
  methods: {
    onSubmit () {
      this.validateForm('loginForm').then(valid => {
        const data = { email: this.loginForm.email, password: this.loginForm.password }
        this.$api.login(data).then(res => {
          this.$store.commit('setToken', res.token)
          this.$success('欢迎登陆博客')
          this.$router.push({ name: 'Home' })
        }, err => {
          this.$error(err)
        })
      })
    },
    getBackground () {
      this.$jsonp('https://jsonp.afeld.me/?callback=f&url=https%3A%2F%2Fcn.bing.com%2FHPImageArchive.aspx%3Fformat%3Djs%26idx%3D0%26n%3D1').then(res => {
        this.backgroundUrl = 'http://cn.bing.com' + res.images[0].url
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  @extend %center-container;
}
.login-card {
  position: relative;
  top: -10%;
  width: 25%;
  padding: 30px 30px 0 0;
  z-index: 10;
}
.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000;
  opacity: 0.7;
}
.statement {
  position: absolute;
  right: 10px;
  top: 0;
  color: white;
  z-index: 10;
}
</style>
