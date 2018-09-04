/**
 * @module @zakkudo/query-string/QueryStringError
 */

/**
 * Error class used by QueryString for raising errors
 * generated during parsing or serialization.
 * @extends Error
 */
class QueryStringError extends Error {
    /**
     * @param {String} message - A message describing the reason for the error.
     * @param {String} url - The related url fragment that generated the error.
     */
    constructor(message, url) {
        super(`${message} <${url}>`);

        /**
         * The related url fragment that generated the error
         */
        this.url = url;
    }

    /**
     * @private
     */
    toString() {
        return `QueryStringError: ${this.message}`;
    }
}

export default QueryStringError;
