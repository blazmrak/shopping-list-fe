import { Context, Middleware } from '@nuxt/types'

const auth: Middleware = (ctx: Context, next) => {
  if (ctx.store.state.loggedIn) {
    next()
  } else {
    ctx.redirect('/login')
  }
}

export default auth
