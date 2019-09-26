<template>
  <div class="about">
    <div class="title"> 欢迎 </div>
    <p>😁 欢迎来到我的博客</p>
    <p>😜 “关于”页面不知道要放啥</p>
    <p>😋 放一些社交账号吧，有空常联系。</p>
    <div class="title"> 小项目 </div>
    <a :href="projects[0][1]"> OJ 平台</a>
    <div class="title"> 社交账号 </div>
    <div class="accounts">
      <a v-for="(a,index) of accounts" :key="index" :href="a[1]" class="account" :style="{backgroundImage:`url(${a[2]})`}"></a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'About',
  title: '关于',
  data () {
    return {
      accounts: [
        [
          'Github',
          'https://github.com/caiyexiang',
          'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
        ],
        [
          '知乎',
          'https://www.zhihu.com/people/cai-ye-xiang/activities',
          'https://ss3.bdstatic.com/yrwDcj7w0QhBkMak8IuT_XF5ehU5bvGh7c50/logopic/346805af9a4035ae57e2907f5f8acf12_fullsize.jpg@s_1,w_484,h_484'
        ],
        [
          '简书',
          'https://www.jianshu.com/u/3750f7d813fe',
          'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1287453044,2162734814&fm=58&bpow=363&bpoh=363'
        ]
      ],
      projects: [['OJ', 'http://47.100.118.249', 'img']]
    }
  }
}
</script>

<style lang="scss" scoped>
.accounts {
  display: flex;
  direction: row;
}
.account {
  width: 50px;
  height: 50px;
  background: url(~@/assets/logo.png);
  background-size: contain;
  margin-right: 1rem;
  border-radius: 5px;
}
.title {
  margin: 2rem 0 1.5rem 0;
  font-size: 1.8rem;
  padding-left: 1rem;
  border-left: 5px solid $light-color;
  font-weight: bold;
}
</style>