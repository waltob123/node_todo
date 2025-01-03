/**
 * @module routing
 * @type {Response|{}}
 */


// const data = require('./data.js');
const Response = require('./response.js');

const data = [];

const { Task } = require('./task.js');
const { TaskStatus } = require('./task.js');

// const task = new Task(
//     title='Task 1',
//     description='Description of task 1',
//     dueDate=1735779098988.348,
//     status=TaskStatus.NOT_STARTED
// )
//
// data.push(task);

/**
 * Handle routing for the application
 * @param request
 * @param response
 */
const handleRouting = (request, response) => {
    const urlPaths = request.url.split('/');

    switch (request.method) {
        case 'GET':
            let taskResponse;
            if (urlPaths[1] === 'tasks' && urlPaths.length === 2) {
                response.setHeader('Content-Type', 'application/json');
                response.writeHead(200);
                taskResponse = new Response(
                    request,
                    200,
                    'Data retrieved successfully',
                    data.map(task => task.getTask())
                )
                response.write(JSON.stringify(taskResponse.getResponse()));
            } else if ( urlPaths.length > 2) {
                if (Boolean(urlPaths[2])) {
                    const taskId = parseInt(urlPaths[2]);
                    const task = data.find( task => task.id === taskId);
                    if (task) {
                        response.setHeader('Content-Type', 'application/json');
                        response.writeHead(200);
                        taskResponse = new Response(
                            request,
                            200,
                            'Data retrieved successfully',
                            task.getTask()
                        )
                        response.write(JSON.stringify(taskResponse.getResponse()));
                    } else {
                        response.writeHead(404);
                        taskResponse = new Response(
                            request,
                            404,
                            'Task not found',
                            {}
                        )
                        response.write(JSON.stringify(taskResponse.getResponse()));
                    }
                }
            }
            response.end();
            break;
        case 'POST':
            if (urlPaths[1] === 'tasks' && urlPaths.length === 2) {
                request.on('data', chunk => {
                    const { title, description, dueDate, status } = JSON.parse(chunk);
                    const task = new Task(title, description, dueDate, status);
                    data.push(task);
                    const taskResponse = new Response(
                        request,
                        201,
                        'Task created successfully',
                        task.getTask()
                    )
                    response.setHeader('Content-Type', 'application/json');
                    response.writeHead(201);
                    response.write(JSON.stringify(taskResponse.getResponse()));
                    response.end();
                });
            }
            break;
        case 'PUT':
            if (urlPaths.length > 2) {
                if (Boolean(urlPaths[2])) {
                    const taskId = parseInt(urlPaths[2]);
                    const task = data.find(task => task.id === taskId);
                    if (task) {
                        request.on('data', chunk => {
                            const {title, description, dueDate, status} = JSON.parse(chunk);
                            task.update(title, description, dueDate, status);
                        });
                        response.setHeader('Content-Type', 'application/json');
                        response.writeHead(200);
                        const taskResponse = new Response(
                            request,
                            200,
                            'Task updated successfully',
                            task.getTask()
                        )
                        response.write(JSON.stringify(taskResponse.getResponse()));
                        response.end();
                    } else {
                        response.writeHead(404);
                        const taskResponse = new Response(
                            request,
                            404,
                            'Task not found',
                            {}
                        )
                        response.write(JSON.stringify(taskResponse.getResponse()));
                    }
                }
            }
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