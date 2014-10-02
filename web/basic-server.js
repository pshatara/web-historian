var http = require("http");
var url = require("url");
var utils = require("./http-helpers");
var handler = require("./request-handler");
var archivehandler = require("./archive-handler")
var archive = require('../helpers/archive-helpers');

var port = 8080;
var ip = "127.0.0.1";

archive.readListOfUrls();

var router = {
  '/': handler.handleRequest,
  '/www.google.com': archivehandler.handleRequest
}
console.log('/arglebargle' in router)

var server = http.createServer(function(request, response) {
  if (url.parse(request.url).pathname in router) {
    router[url.parse(request.url).pathname](request, response);
  } else {
    utils.sendResponse(request, null, 404);
  }
});

console.log("Listening on http://" + ip + ":" + port);

server.listen(port, ip);

