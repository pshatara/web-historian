var path = require('path');
var archive = require('../helpers/archive-helpers');
var utils = require('./utils');
// require more modules/folders here!

var actionsMap = {
  GET: function(request, response) {
    utils.sendResponse(response, archive.paths.list);
  },
  POST: function(request, response) {
    utils.getData(request, response, function() {
      if (!archive.isUrlInList(request.url)) {
        archive.addUrlToList(request.url);
      }
    });
    //FIX THE DATA
    utils.sendResponse(response, data, 201);
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
