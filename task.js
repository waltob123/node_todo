/**
 * Task class
 * @class Task
 * @constructor
 * @param {string} title
 * @param {string} description
 * @param {number} dueDate
 * @param {string} status
 * @export Task
 * @module task
 */


class Task {
    #id
    #title
    #description
    #status
    #dueDate
    #createdAt
    #updatedAt
    #deletedAt
    #isDeleted

    constructor( title, description, dueDate, status=TaskStatus.NOT_STARTED) {
        this.#id = Math.floor(Math.random() * 1000);
        this.#title = title;
        this.#description = description;
        this.#status = status;
        this.#dueDate = new Date(dueDate);
        this.#createdAt = new Date();
        this.#updatedAt = null;
        this.#deletedAt = null;
        this.#isDeleted = false;
    }

    get id () { return this.#id; }

    get title () { return this.#title; }

    get description () { return this.#description; }

    get status () { return this.#status; }

    get dueDate () { return this.#dueDate.toLocaleDateString(); }

    get dueTime () { return this.#dueDate.toLocaleTimeString(); }

    get createdAt () { return this.#createdAt.toLocaleDateString(); }

    get updatedAt () { return this.#updatedAt !== null ? this.#updatedAt.toLocaleDateString() : null; }

    get deletedAt () { return this.#deletedAt !== null ? this.#deletedAt.toLocaleDateString() : null; }

    get isDeleted () { return this.#isDeleted; }

    set title ( title ) { this.#title = title; }

    set description ( description ) { this.#description = description; }

    set dueDate ( dueDate ) { this.#dueDate = dueDate; }

    set updatedAt ( updatedAt ) { this.#updatedAt = updatedAt; }

    complete () {
        this.#status = TaskStatus.COMPLETED;
    }

    start () {
        this.#status = TaskStatus.IN_PROGRESS;
    }

    delete () {
        this.#isDeleted = true;
        this.#status = TaskStatus.NOT_STARTED;
        this.#deletedAt = new Date();
    }

    restore () {
        this.#isDeleted = false;
        this.#deletedAt = null;
    }

    update ( title, description, dueDate, status ) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = new Date(dueDate);
        this.#status = status;
        this.#updatedAt = new Date();
    }

    getTask () {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            status: this.status,
            dueDate: this.dueDate,
            dueTime: this.dueTime,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}


/**
 * TaskStatus class
 * @class TaskStatus
 * @export TaskStatus
 */

class TaskStatus {
    static COMPLETED = 'completed';
    static IN_PROGRESS = 'in-progress';
    static NOT_STARTED = 'not-started';
}


module.exports.Task = Task;
module.exports.TaskStatus = TaskStatus;
