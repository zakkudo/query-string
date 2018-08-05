/**
 * Error for query formatting issues
 * @private
 * @module QueryStringError
 */
export default class QueryStringError extends Error {
    constructor(message, url) {
        super(`${message} <${url}>`);
        this.url = url;
    }

    toString() {
        return `QueryStringError: ${this.message}`;
    }
}
