const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const proxy = require('koa-server-http-proxy')
const mount = require('koa-mount')
const path = require('path')
const fs = require('fs')
const LRU = require('lru-cache')
const favicon = require('koa-favicon')
const readEnv = require('./read-env')
const resolve = dir => path.join(__dirname, '..', dir)

const app = new Koa()
const router = new Router()
const fileRouter = new Router()

const { createBundleRenderer } = require('vue-server-renderer')
const templatePath = resolve('src/index.template.html')
const isProd = process.env.NODE_ENV === 'production'
const serverInfo =
  `koa/${require('koa/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

// env数据读取
// dev模式下进行proxy代理 - 这个代理针对的是浏览器渲染时的ajax
if (!isProd) {
  process.env = Object.assign(process.env, readEnv('../.env.dev'))
  app.use(
    proxy('/api', {
      target: process.env.API_URL,
      pathRewrite: { '^/api': '' },
      changeOrigin: true
    })
  )
} else {
  process.env = Object.assign(process.env, readEnv('../.env.prod'))
}

const microCache = new LRU({
  max: 100,
  maxAge: 1000 // 重要提示：条目在 1 秒后过期。
})
const isCacheable = req => {
  // 实现逻辑为，检查请求是否是用户特定(user-specific)。
  // 只有非用户特定 (non-user-specific) 页面才会缓存
  // 目前设为所有用户都进行缓存, 但为了通用性保留该函数
  return true
}

const createRender = (bundle, options) => {
  return createBundleRenderer(
    bundle,
    Object.assign(options, {
      runInNewContext: false
    })
  )
}

let renderer
let readyPromise
if (isProd) {
  const template = fs.readFileSync(templatePath, 'utf-8')
  const serverBundle = require(resolve('dist/vue-ssr-server-bundle.json'))
  const clientManifest = require(resolve('dist/vue-ssr-client-manifest.json'))
  renderer = createRender(serverBundle, {
    template,
    clientManifest
  })
} else {
  readyPromise = require(resolve('build/setup-dev-server'))(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRender(bundle, options)
    }
  )
}

const serve = (path, cache) =>
  static(resolve(path), {
    maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
  })

fileRouter.get('/service-worker.js', async ctx => {
  ctx.type = 'text/javascript'
  ctx.body = fs.createReadStream(resolve('dist/service-worker.js'))
})
fileRouter.get('/manifest.json', async ctx => {
  ctx.type = 'application/json'
  ctx.body = fs.createReadStream(resolve('manifest.json'))
})
app.use(fileRouter.routes()).use(fileRouter.allowedMethods())
app.use(favicon(resolve('public/logo-48.png')))
app.use(mount('/dist', serve('/dist')))
app.use(mount('/public', serve('public')))

const render = async (ctx, next) => {
  const s = Date.now()
  ctx.set('Content-Type', 'text/html')
  ctx.set('Server', serverInfo)
  const handleError = err => {
    if (err.url) {
      ctx.redirect(err.url)
    } else if (err.code === 404) {
      ctx.status = 404
      ctx.body = {
        code: 'PageNotFound',
        msg: '找不到页面'
      }
    } else {
      ctx.status = 500
      ctx.body = {
        code: 'InternalError',
        msg: '服务器错误'
      }
      console.error(`error during render : ${ctx.url}`)
      console.error(err.stack)
    }
  }
  const cacheable = isCacheable(ctx)
  const hit = cacheable && microCache.get(ctx.url)
  if (hit) {
    ctx.status = 200
    ctx.body = hit
  } else {
    const context = {
      title: 'Blog',
      url: ctx.url
    }
    try {
      const html = await renderer.renderToString(context)
      ctx.body = html
      ctx.status = 200
      if (cacheable) {
        microCache.set(ctx.url, html)
      }
    } catch (err) {
      handleError(err)
    }
  }
  if (!isProd) {
    console.log(`whole request: ${Date.now() - s}ms`)
  }
}
router.get(
  '*',
  isProd
    ? render
    : async (ctx, next) => {
        await readyPromise
        await render(ctx, next)
      }
)

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000, () => {
  console.log('服务器渲染地址: http://localhost:3000/')
})
