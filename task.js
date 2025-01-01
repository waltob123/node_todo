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
        this.#dueDate = new Date(this.#dueDate);
        this.#createdAt = new Date();
        this.#updatedAt = null;
        this.#deletedAt = null;
        this.#isDeleted = false;
    }

    get id () { return this.#id; }

    get title () { return this.#title; }

    get description () { return this.#description; }

    get status () { return this.#status; }

    get dueDate () { return this.#dueDate.toString(); }

    get createdAt () { return this.#createdAt.toString(); }

    get updatedAt () { return this.#updatedAt !== null ? this.#updatedAt.toString() : null; }

    get deletedAt () { return this.#deletedAt !== null ? this.#deletedAt.toString() : null; }

    get isDeleted () { return this.#isDeleted; }
}


class TaskStatus {
    static COMPLETED = 'completed';
    static IN_PROGRESS = 'in-progress';
    static NOT_STARTED = 'not-started';
}