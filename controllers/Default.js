'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.uEGET = function uEGET (req, res, next) {
  Default.uEGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.uEImsiDELETE = function uEImsiDELETE (req, res, next, imsi) {
  Default.uEImsiDELETE(imsi)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.uEPOST = function uEPOST (req, res, next, body) {
  Default.uEPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
