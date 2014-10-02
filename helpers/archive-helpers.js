var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.urlIndex = {};

exports.readListOfUrls = function(){
  //Populate indexer object on initialize
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    if (err) { throw err; }
    else {
      var arr = data.trim().split('\n');
      for (var i = 0; i < arr.length; i++) {
        exports.urlIndex[arr[i]] = arr[i];
      }
    }
  });
};

exports.isUrlInList = function(key){
  //check the indexer object
  console.log('CHECK THAT URL IS IN LIST')
  return !!(exports.urlIndex[key]);
};

exports.addUrlToList = function(key){
  //addurltolist AND add reference to indexer object
  console.log('ADDING URL TO LIST')
  console.log('key', key, typeof key)
  //exports.urlIndex[key] = key;
  fs.appendFile(exports.paths.list, key + '\n', 'utf8', function(err) {
    if (err) { throw err; }
    else { console.log('Saved to file list.') }
  })
  console.log('URL INDEX AFTER ADD', exports.urlIndex)
};

exports.isURLArchived = function(){
  //We will need an indexer object, to keep track of what's been archived?
  //Use fs.readdir to repopulate wiped object on init.
  //http://stackoverflow.com/questions/2727167/getting-all-filenames-in-a-directory-with-node-js
};

exports.downloadUrls = function(){
  //if not archived, download the webpage
};
