/**
 * @module routing
 * @param {http.IncomingMessage} request
 * @param {http.ServerResponse} response
 */


// const data = require('./data.js');
const http = require('http');
const Response = require('./response.js');

const data = [];

const { Task } = require('./task.js');
const { TaskStatus } = require('./task.js');

const task = new Task(
    title='Task 1',
    description='Description of task 1',
    dueDate=1735779098988.348,
    status=TaskStatus.NOT_STARTED
)

data.push(task);

const handleRouting = (request, response) => {

    switch (request.method) {
        case 'GET':
            let taskResponse;
            if (request.url.endsWith('/tasks')) {
                response.setHeader('Content-Type', 'application/json');
                response.writeHead(200);
                taskResponse = new Response(
                    request,
                    200,
                    'Data retrieved successfully',
                    data.map(task => task.getTask())
                )
                response.write(JSON.stringify(taskResponse.getResponse()));
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

module.exports.handleRouting = handleRouting;
module.exports.data = data;