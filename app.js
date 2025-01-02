/**
 * Main entry point of the application
 */

// Importing the http module to create a server
const http = require('http');
const url = require('url');
const { handleRouting } = require('./routing');

// Load the environment variables
require('dotenv').config();

// Define the host and port
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const REQUIRED_PATH_NAMES = ['tasks']

const server = http.createServer( (request, response) => {
    if (REQUIRED_PATH_NAMES.some( pathName => request.url.split('/')[1] === `${pathName}`)) {
        handleRouting(request, response);
    } else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ status: http.STATUS_CODES[400], message: 'Route not found' }));
    }
});

// Start the server
server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
})
