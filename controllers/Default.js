'use strict';
const activeUeHandler = require('./handlers/DefaultHandler')

module.exports.getActiveUEs = function getActiveUEs (req, res, next) {
    res.status(200).send(activeUeHandler.retrieveAllUEendpoint())
};

module.exports.unregisterUE = function unregisterUE (req, res, next) {
    activeUeHandler.invalidateUEendpoint(req.params.supi)
    res.status(200).send('OK')
};

module.exports.registerOrUpdateUE = function registerOrUpdateUE (req, res, next) {
    activeUeHandler.addUEendpoint(req.body.supi, req.body.ip, req.body.port)
    res.status(200).send('OK')
};
