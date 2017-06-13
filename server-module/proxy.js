var http = require('http')
var qs = require('querystring')
module.exports = function (request, response, next) {
	var path = request.originalUrl.replace('/static', '')
  var options = {
    port: '3001',
    host: 'localhost',
    path: path,
    method: 'GET',
    headers: request.headers
  }
  var req = http.request(options, function (res) {
    var result = '';
    res.on('data', function (chunk) {
      result = result + chunk
    })
    res.on('end', function () {
      response.status(res.statusCode).send(result)
    })
  })
  req.write(qs.stringify(request.body))
  req.end()
}
