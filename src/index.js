import getTypeName from './getTypeName';
import QueryStringError from './QueryStringError';

/**
 * @private
 * @param {String} url - The url
 */
function createDuplicateQueryError(url) {
    return new QueryStringError('Trying to add duplicate query param when already exists', url);
}

/**
 * @private
 */
function decodeKey(key) {
    return decodeURIComponent(key);
}

/**
 * @private
 */
function encodeKey(key) {
    return encodeURIComponent(key);
}

/**
 * @private
 */
function decodeValue(value) {
    const decoded = decodeURIComponent(value);

    try {
        return JSON.parse(decoded);
    } catch (e) {
        return decoded;
    }
}

/**
 * @private
 */
function encodePair([key, value]) {
    return [encodeKey(key), encodeValue(value)];
}

/**
 * @private
 */
function isValidPair([key, value]) {
    return value !== undefined;
}

/**
 * @private
 */
function decodePair([key, value]) {
    return [decodeKey(key), decodeValue(value)];
}

/**
 * @private
 * @param {String} value - The value to serialize
 */
function encodeValue(value) {
    if (typeof value === 'string') {
        return encodeURIComponent(value);
    } else if (value === undefined) {
        return undefined;
    }

    return encodeURIComponent(JSON.stringify(value));
}

/**
 * @private
 * @param {String} data - The data to parse
 * @return {Object} The parsed data
 */
function parseString(data) {
    if (data.indexOf('?') !== data.lastIndexOf('?')) {
        throw createDuplicateQueryError(data);
    }

    return data.replace(/^.*\?/, '')
        .split(/[;&]/g)
        .map((p) => p.split('='))
        .filter(isValidPair)
        .map(decodePair);
}

/**
 * @private
 * @param {*} data - The data to parse
 * @return {Object} The parsed data
 */
function parse(data) {
    if (data === undefined) {
        return {};
    } if (typeof data === 'string') {
        const parts = parseString(data);

        return parts.reduce((accumulator, [key, value]) => {
            if (!accumulator.hasOwnProperty(key)) {
                accumulator[key] = value;
            } else if (Array.isArray(accumulator[key])) {
                accumulator[key].push(value);
            } else {
                accumulator[key] = [accumulator[key], value];
            }

            return accumulator;
        }, {});
    } else if (Array.isArray(data)) {
        throw new TypeError(`${getTypeName(data)} isn't an accepted constructor type`);
    } else if (data instanceof QueryString || Object(data) === data) {
        return data;
    }

    throw new TypeError(`${getTypeName(data)} isn't an accepted constructor type`);
}

/**
 * Make working with url query-strings enjoyable.
 *
 * Why use this?
 *
 * - Consistancy with simplicity
 * - The instance acts like a plain-old-object
 * - `JSON.stringify()` will serialize it to json like it was a normal object
 * - Casting to a string will format it to be directly usable in a query
 *   Update the properties after initialization and the serialization will reflect the updates
 * - Complex params are automatically serialized and deserialized from json
 *
 * Install with:
 *
 * ```console
 * yarn add @zakkudo/query-string
 * ```
 *
 * @example
 * import QueryString from '@zakkudo/query-string';
 *
 * const query = new QueryString({
 *   page: 3,
 *   title: 'awesomeness',
 *   complex: {'test': 'value'}
 * });
 *
 * String(query) // '?page=3&title=awesomeness&complex=%7B%22test%22%3A%22value%22%7D&'
 * query.toString() // '?page=3&title=awesomeness&complex=%7B%22test%22%3A%22value%22%7D&'
 *
 * const url = `http://example${query}` //Automatically serializes correctly
 *
 * @example <caption>Parsing an invalid query string</caption>
 * import QueryString from '@zakkudo/query-string';
 * import QueryStringError from '@zakkudo/query-string/QueryStringError';
 *
 * try {
 * const query = new QueryString('http://invalid.com/?first=1?second=2')
 * } catch(e) {
 *     if (e instanceof QueryStringError) {
 *         console.error(e.message); // Trying to add duplicate query param when already exists
 *     }
 * }
 *
 * @throws {QueryStringError} On issues during serialization or construction
 * @module QueryString
 */
export default class QueryString {
    /**
     * @param {String|Object|QueryString} data - Initial data.  A url string
     * will be parsed, and Object/QueryString instances will be copied.
    */
    constructor(data) {
        Object.assign(this, parse(data));
    }

    /**
     * Converts the object into it's serialized query string representation
     * that can be used in a url.
     * @return {String} The serialized representation of the QueryString.  It
     * will be an empty string if there are no params to serialize.
    */
    toString() {
        const keys = Object.keys(this);
        const pairs = keys.reduce((accumulator, k) => {
            const value = this[k];

            if (Array.isArray(value)) {
                return accumulator.concat(value.map((v) => [k, v]));
            }

            return accumulator.concat([[k, value]]);
        }, []).map(encodePair).filter(isValidPair);
        const serialized = pairs.map((p) => p.join('=')).join('&');

        if (serialized.length) {
            return `?${serialized}`;
        }

        return '';
    }
}
