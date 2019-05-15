const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'

const {createServer} = require('http')
const {parse} = require('url')
const next = require('next')
const mobxReact = require('mobx-react')
const app = next({dev})
const handle = app.getRequestHandler()

/**
 * useStaticRendering方法，用于避免mobx服务端渲染的内存泄漏问题; 该方法只需要在server启动时设置一次
 */
mobxReact.useStaticRendering(true)

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true)
        handle(req, res, parsedUrl)
    }).listen(port, err => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
});