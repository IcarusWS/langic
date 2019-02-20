/*!
 * langic.js v1.1.0
 * @copyright 2019 Icarus, Inc.
 */
// This script uses ES6 code at some instances. If you want to use the fully supported ES5 script, try using langic.old.js
var langic = {};
langic.latest = {};
langic.path = "/languages/";
langic.preFileExtension = '.lang';
langic.fileExtension = '.json';
langic.util = {};

langic.setLanguage = async function (language) {
  var path = langic.util.resolveRequestPath(language);
  var data = await langic.util.Request(path);
  data.json().then(function (j) {
    langic.util.applyLanguage(j);
  });
};

langic.setKey = async function (key, language) {
  if (!langic.latest[language]) {
    await langic.util.loadLanguage(language);
  }

  langic.util.changeDOMElement(key, langic.latest[language][key]);
  return true;
};

langic.setPath = function (path) {
  langic.path = path;
  return true;
};

langic.setFileExtension = function (extension) {
  langic.fileExtension = extension;
  return true;
};

langic.setFilePreExtension = function (preextn) {
  langic.preFileExtension = preextn;
  return true;
};

langic.util.Request = function (url) {
  return new Promise(resolve => {
    fetch(url).then(data => {
      resolve(data);
    });
  });
};

langic.util.applyLanguage = function (j) {
  var result = [];
  result[0] = result[1] = 0;

  for (var i = 0; i < Object.keys(j).length; i++) {
    var key = Object.keys(j)[i];
    var value = j[key];
    var r = langic.util.changeDOMElement(key, value);

    if (r) {
      result[0] += 1;
    } else {
      result[1] += 1;
    }
  }

  langic.util.logChangeResults(result);
  return true;
};

langic.util.changeDOMElement = function (key, value) {
  var element = document.getElementById(key);

  if (element) {
    element.textContent = value;
    return true;
  } else {
    return false;
  }
};

langic.util.loadLanguage = async function (language) {
  return new Promise(async resolve => {
    var path = langic.util.resolveRequestPath(language);
    var data = await langic.util.Request(path);
    data.json().then(function (j) {
      langic.latest[language] = j;
      resolve(true);
    });
  });
};

langic.util.resolveRequestPath = function (language) {
  return langic.path + language + langic.fileExtension;
};

langic.util.logChangeResults = function (r) {
  console.log('Language changed: ' + r[0] + ' successes, ' + r[1] + " failures");
};