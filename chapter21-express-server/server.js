const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production';

// dev (boolean) 判断 Next.js 应用是否在开发环境 - 默认false
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()

        server.get('/a/:id', (req, res) => {
            return app.render(req, res, '/b', req.query)
        })

        server.get('/b/:id', (req, res) => {
            return app.render(req, res, '/a', req.query)
        })

        server.get('/posts/:id', (req, res) => {
            return app.render(req, res, '/posts', { id: req.params.id })
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(port, (err) => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${port}`)
        })
    })