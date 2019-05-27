const express = require('express');
const next = require('next');

const routes = require('./router');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

// dev (boolean) 判断 Next.js 应用是否在开发环境 - 默认false
const app = next({dev});
const handler = routes.getRequestHandler(app);

app.prepare()
  .then(() => {
    const server = express();
    server.use(handler).listen(3000, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`)
    });
  });