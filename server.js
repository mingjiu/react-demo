const express = require('express')
const app = express()
const serveStatic = require('serve-static')

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.dev.config')

const DEVPORT = 3001
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  quiet: false,
  noInfo: true,
  stats: {
    colors: true
  }
}).listen(DEVPORT, 'localhost', function (err, result) {
  if (err) {
    return console.log(err)
  }
})

app.get('/*.js', function(req, res){
  res.redirect('http://localhost:' + DEVPORT + req.path)
})

app.use(serveStatic(__dirname + '/build', {
  setHeaders: function (res, path) {
    res.setHeader('Cache-Control', 'public, max-age=1000000000000')
  }
}))

app.get('/', function(req, res){
	res.sendFile(__dirname + '/demo/index.html')
})

const server = app.listen(80, '0.0.0.0', function () {
  const host = server.address().address
  const port = server.address().port
  console.log('CoinCola is listening at http://%s:%s', host, port)
})
