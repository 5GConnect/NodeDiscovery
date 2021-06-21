'use strict';


/**
 * Retrieve all active UE digital entities endpoint.
 *
 * returns List
 **/
exports.uEGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "ip" : {
    "ipv6Addr" : "",
    "ipv4Addr" : "ipv4Addr",
    "ipv6Prefix" : ""
  },
  "supi" : "supi"
}, {
  "ip" : {
    "ipv6Addr" : "",
    "ipv4Addr" : "ipv4Addr",
    "ipv6Prefix" : ""
  },
  "supi" : "supi"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * De-register a UE digital entity from the registry
 *
 * imsi Supi 
 * no response value expected for this operation
 **/
exports.uEImsiDELETE = function(imsi) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Register as a new UE digital entity to the registry, or keep alive an old one
 *
 * body String  (optional)
 * no response value expected for this operation
 **/
exports.uEPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

