var express = require('express')
var app = express()
var serveStatic = require('serve-static')

app.use(serveStatic(__dirname + '/build', {
  setHeaders: function (res, path) {
    res.setHeader('Cache-Control', 'public, max-age=1000000000000')
  }
}))

app.get('/', function(req, res){
	res.sendFile(__dirname + '/demo/index.html')
})

var server = app.listen(80, '0.0.0.0', function () {
  var host = server.address().address
  var port = server.address().port
  console.log('CoinCola is listening at http://%s:%s', host, port)
})
