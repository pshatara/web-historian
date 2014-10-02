var path = require('path');
var archive = require('../helpers/archive-helpers');
var utils = require('./http-helpers');
// require more modules/folders here!

var actionsMap = {
  GET: function(request, response) {
    utils.serveAssets(response, archive.paths.siteAssets + '/index.html');
  },
  POST: function(request, response) {
    console.log('inside post');
    utils.getData(request, response, function(sitestring) {
      console.log('sitestring', sitestring)
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
