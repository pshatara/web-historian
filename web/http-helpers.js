var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(response, asset, callback) {
  var statusCode = 200;
  response.writeHead(statusCode, headers);
  fs.readFile(asset, 'utf8', function(err, data) {
    if (err) { throw err; }
    else { response.end(data); }
  });

};

exports.getData = function(request, response, callback) {
  var sites = '';
  request.on('data', function(chunk) {
    sites += chunk;
  });
  request.on('end', function() {
    callback(JSON.parse(sites));
  });
};

exports.sendResponse = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};


// As you progress, keep thinking about what helper functions you can put here!
