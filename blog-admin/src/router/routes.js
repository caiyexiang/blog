import Login from '@/views/Login.vue'
const routes = [
  {
    path: '/',
    name: 'Login',
    meta: {
      isNotNeedLogin: true
    },
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/home/article',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: 'article',
        name: 'Article',
        component: () => import('@/views/Article.vue')
      },
      {
        path: 'article/add',
        name: 'AddArticle',
        component: () => import('@/views/Article/AddArticle.vue')
      },
      {
        path: 'article/edit/:id',
        name: 'EditArticle',
        component: () => import('@/views/Article/EditArticle.vue')
      },
      {
        path: 'comment',
        name: 'Comment',
        component: () => import('@/views/Comment.vue')
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/Category.vue')
      }
    ]
  }
]
export default routes
