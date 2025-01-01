// Description: This file contains the routing logic for the application.
// It will be used to route the incoming requests to the appropriate handler functions.

const data = require('./data.js');
const http = require('http');

const handleRouting = (request, response) => {

    switch (request.method) {
        case 'GET':
            if (data.length > 0) {
                response.setHeader('Content-Type', 'application/json');
                response.writeHead(200);
                response.write(JSON.stringify({
                    status: http.STATUS_CODES[200], data: data.map( task => task.getTask() )
                }));
            }
            response.end();
            break;
        case 'POST':
            console.log('POST request');
            response.end();
            break;
        case 'PUT':
            console.log('PUT request');
            response.end();
            break;
        case 'DELETE':
            console.log('DELETE request');
            response.end();
            break;
        default:
            console.log('Invalid request');
            response.end();
            break;
    }
};

module.exports = handleRouting;