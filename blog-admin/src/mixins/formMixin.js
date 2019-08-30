export default {
  data () {
    return {
      captchaSrc: ''
    }
  },
  methods: {
    validateForm (formName) {
      return new Promise((resolve, reject) => {
        this.$refs[formName].validate(valid => {
          if (!valid) {
            this.$error('表单信息错误')
          } else {
            resolve(valid)
          }
        })
      })
    },
    getCaptchaSrc () {
      this.$apis.getCaptcha().then(res => {
        this.captchaSrc = res.data
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
