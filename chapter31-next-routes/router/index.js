const routes = require('next-routes');

module.exports = routes()
  .add('index', '/index/:id', 'index')
  .add('other', '/other/:id', 'other')