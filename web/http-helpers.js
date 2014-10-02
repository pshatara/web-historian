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
  console.log('WENT WRONG WAY')
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
    callback(sites.slice(4));
  });
};

exports.sendResponse = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(data);
};


// As you progress, keep thinking about what helper functions you can put here!
