import Koa from 'koa'
import Router from '@koa/router'
import koaBody from 'koa-body'

const app = new Koa()
const router = new Router({
  prefix: '/api'
})
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

router.get('/get-shit', async (ctx, next) => {
  await sleep(2600)
  const requestBody = ctx.request.body
  ctx.body = {
    code: 0,
    msg: '',
    data: {
      shit: 1,
      ...(requestBody || {})
    }
  }
  ctx.status = 200
  await next()
})

router.get('/get-another-shit', async (ctx, next) => {
  await sleep(1456)
  ctx.body = {
    code: 0,
    msg: '',
    data: {
      shit: 1
    }
  }
  ctx.status = 200
  await next()
})


router.put('/put-shit', async (ctx, next) => {
  await sleep(1789)
  ctx.body = {
    code: 0,
    msg: '',
    data: ctx.request.body
  }
  ctx.status = 200
  await next()
})

router.post('/post-shit', async (ctx, next) => {
  await sleep(1999)
  ctx.body = {
    code: 0,
    msg: '',
    data: ctx.request.body
  }
  ctx.status = 200
  await next()
})

router.delete('/delete-shit', async (ctx, next) => {
  await sleep(999)
  ctx.body = {
    code: 0,
    msg: '',
    data: ctx.request.query
  }
  ctx.status = 200
  await next()
})

router.get('/request-error', async (ctx, next) => {
  await sleep(1234)
  ctx.status = 500
  ctx.body = 'request error shit happened'
  await next()
})

router.get('/error', async (ctx, next) => {
  await sleep(1024)
  ctx.status = 200
  ctx.body = {
    code: 1,
    msg: 'error shit happened',
    data: ctx.request.query
  }
  await next()
})

router.get('/timeout', async (ctx, next) => {
  await sleep(9999999)
  ctx.status = 200
  ctx.body = {
    code: 1,
    msg: 'error shit happened',
    data: ctx.request.query
  }
  await next()
})

const PORT = 3211
app.use(koaBody.default())
app.use(router.routes())

app.listen(PORT)
console.log('Demo server now running on port ' + PORT)
