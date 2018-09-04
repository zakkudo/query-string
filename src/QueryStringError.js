/**
 * @module @zakkudo/query-string/QueryStringError
 */

/**
 * @alias module:@zakkudo/query-string/QueryStringError
 * @extends Error
 * Generates an error representing a problem.
 */
class QueryStringError extends Error {
    /**
     * @param {String} message - The error string
     * @param {String} url - The url of the error
     */
    constructor(message, url) {
        super(`${message} <${url}>`);
        this.url = url;
    }

    /**
     * Stringifies the error
     */
    toString() {
        return `QueryStringError: ${this.message}`;
    }
}

export default QueryStringError;
