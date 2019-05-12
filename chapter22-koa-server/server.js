const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = new Koa()
        const router = new Router()

        /**
         * ctx.respond: 绕过Koa的内置响应处理，您可以显式设置ctx.respond = false;。如果要写入原始res对象而不是让Koa为您处理响应，请使用此选项
         */
        router.get('/a', async ctx => {
            await app.render(ctx.req, ctx.res, '/b', ctx.query)
            ctx.respond = false
        })

        router.get('/b', async ctx => {
            await app.render(ctx.req, ctx.res, '/a', ctx.query)
            ctx.respond = false
        })

        router.get('*', async ctx => {
            await handle(ctx.req, ctx.res)
            ctx.respond = false
        })

        server.use(async (ctx, next) => {
            ctx.res.statusCode = 200
            await next()
        })

        server.use(router.routes())
        server.listen(port, () => {
            console.log(`> Ready on http://localhost:${port}`)
        })
    })