var http = require("http");
var url = require("url");
var utils = require("./http-helpers");
var handler = require("./request-handler");
var archivehandler = require("./archive-handler")
var archive = require('../helpers/archive-helpers');

var port = 8080;
var ip = "127.0.0.1";

archive.readListOfUrls();


var server = http.createServer(function(request, response) {
  console.log('OMG')//, router[url.parse(request.url).pathname])
  if (router[url.parse(request.url).pathname]) {
    console.log("we're inside router");
    router[url.parse(request.url).pathname](request, response);
  } else {
    utils.sendResponse(request, null, 404);
  }
});
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);




var router = {
  '/': handler.handleRequest,
  '/www.google.com': archivehandler.handleRequest
}
