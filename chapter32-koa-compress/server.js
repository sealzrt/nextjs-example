const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const static = require('koa-static');
const compress = require('koa-compress');
const app = new Koa();

const port = parseInt(process.env.PORT, 10) || 3000

// 加载模板引擎
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}));

app.use(compress({
  filter: function (content_type) {
    return /text|javascript/i.test(content_type)
  },
  threshold: 100,
  flush: require('zlib').Z_SYNC_FLUSH
}));

app.use(static(
  path.join(__dirname, './static')
));

app.use(async (ctx) => {
  await ctx.render('index', {title: '我是首页'})
});

app.listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`)
});