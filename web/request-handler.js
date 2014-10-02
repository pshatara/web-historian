var archive = require('../helpers/archive-helpers');
var utils = require('./http-helpers');
var url = require("url");

// require more modules/folders here!

var actionsMap = {
  GET: function(request, response) {
    console.log('URL PATHNAME',url.parse(request.url).pathname)
    utils.serveAssets(response, archive.paths.siteAssets + '/index.html');
  },
  POST: function(request, response) {
    utils.getData(request, response, function(sitestring) {
      if (!archive.isUrlInList(sitestring)) {
        archive.addUrlToList(sitestring);
      }
    });
    //FIX THE DATA
    utils.sendResponse(response, null, 302);
  },
  OPTIONS: function(request, response) {
    utils.sendResponse(response, null);
  }
}

exports.handleRequest = function (request, response) {
  var actions = actionsMap[request.method];

  if (actions) {
    actions(request, response);
  } else {
    utils.sendResponse(response, null, 404);
  }
};
