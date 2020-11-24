/*jshint esversion: 6 */

// Modules
const express = require('express');
const path = require('path');

// Read in our configuration file
const config = require('./config.json');

// Configure our routes
const routerIndex = require('./routes/index');
const routerBom = require('./routes/bom');
const routerConfig = require('./routes/config');

// Set which environment, chosen via environment variable NODE_ENV
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
global.gEnvironmentConfig = environmentConfig;
console.log("global.gEnvironmentConfig: %s", JSON.stringify(global.gEnvironmentConfig, null, 2));

// Determine listening port
const HTTP_PORT = global.gEnvironmentConfig.application.http.port;

// Setup server
let app = express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')

    // Index router, our default route
    .use('/', routerIndex)

    // BOM router
    .use('/bom', routerBom)

    // Config router, so we may inspect running application config
    .use('/config', routerConfig)

    // Startup
    .listen(HTTP_PORT, () => console.log(`Listening on ${ HTTP_PORT }`));

exports.app = app;
