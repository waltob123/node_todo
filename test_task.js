const { Task } = require('./task.js');
const { TaskStatus } = require('./task.js');
const { data } = require('./routing.js');

const task = new Task(
    title='Task 1',
    description='Description of task 1',
    dueDate=1735779098988.348,
    status=TaskStatus.NOT_STARTED
)

data.push(task);