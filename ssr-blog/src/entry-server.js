import { createApp } from './app.js'

export default context =>
  new Promise((resolve, reject) => {
    const { app, store, router } = createApp()

    const { url } = context
    const { fullPath } = router.resolve(url).route
    if (fullPath !== url) {
      return reject({ url: fullPath })
    }

    router.push(url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()

      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      Promise.all(
        matchedComponents.map(component => {
          if (component.asyncData) {
            return component.asyncData({ store, route: router.currentRoute })
          }
        })
      ).then(() => {
        // 对vue-ssr插件来说，如果createBundleRenderer中有设置template，那么context.state会自动设置为window.__INITIAL_STATE__
        context.state = store.state
        resolve(app)
      }, reject)
    })
  })
