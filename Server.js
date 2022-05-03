#!/usr/bin/env node

// This file came with the template so im leaving it in lol
// *Some stuff have been edited

/**
 * Module dependencies.
 */
const app = require('./App');
const http = require('http');
const {normalizePort, getListeners} = require("./Util/ServerStartupUtils");

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);

const {onError, onListening} = getListeners(server, port);
/**
 * Event listener for HTTP server "error" event.
 */
server.on('error', onError);

/**
 * Event listener for HTTP server "listening" event.
 */
server.on('listening', onListening);
