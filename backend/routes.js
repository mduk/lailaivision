'use strict'
const simple = require('./handlers/simple')

module.exports = function (app, opts) {
  app.get('/', simple)
}
