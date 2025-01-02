/**
 * @class Response
 * @param {http.IncomingMessage} request
 * @param {number} status
 * @param {string} message
 * @param {Object} data
 * @param {Object} extras
 * @export Response
 */

class Response {
    #status
    #message
    #data
    #extras

    constructor ( request, status, message, data, extras={} ) {
        this.#status = status;
        this.#message = message;
        this.#data = data;
        this.#extras = {
            path: request.url,
            method: request.method,
            ...extras
        };
    }

    getResponse () {
        return {
            status: this.#status,
            message: this.#message,
            data: this.#data,
            extras: {...this.#extras}
        };
    }
}

module.exports = Response;