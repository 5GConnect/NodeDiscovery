'use strict';

var dotenv = require('dotenv')
if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: './.env-dev' })
}

var path = require('path');
var http = require('http');
const ws = require('ws');
var cors = require('cors')

//const logger = require('./utils/logger');
var serverPort = process.env.PORT;
var oasTools = require('oas-tools');
var jsyaml = require('js-yaml');
var fs = require('fs');
var express = require('express');

global.logger = require('./utils/logger');


// swaggerRouter configuration
var options = {
    loglevel: 'info',
    controllers: path.join(__dirname, './controllers')
};
oasTools.configure(options)
var spec = fs.readFileSync(path.join(__dirname, './api/openapi.yaml'), 'utf8');
var oasDoc = jsyaml.safeLoad(spec);
var app = express();

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    app.use(cors())
} else if (process.env.NODE_ENV === 'production') {
    app.use(cors({
        origin: "http://137.204.107.63:55000"
    }))
}

oasTools.initialize(oasDoc, app, function() {
    // Initialize the Swagger middleware
    let server = http.createServer(app).listen(serverPort, function() {
        logger.info(`Your server is listening on port ${serverPort}`);
    });
    global.wss = new ws.Server({ server: server });
    //module.exports = wss;
    wss.on('connection', (ws) => {
        logger.info('Client connected');
        ws.on('close', () => {
            logger.info('Client disconnected')
        });
    });
});