/**
 * @module @zakkudo/query-string
 */

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
function getTypeName(data) {
    if (Object(data) === data) {
        return Object.prototype.toString.call(data).slice(8, -1);
    }

    return typeof data;
}

/**
 * @private
 */
function decode(key) {
    return decodeURIComponent(key);
}

/**
 * @private
 */
function encode(key) {
    if (typeof key === 'string') {
        return encodeURIComponent(key);
    }
}

/**
 * @private
 */
function deserialize(value) {
    try {
        return JSON.parse(value);
    } catch (e) {
        return value;
    }
}

/**
 * @private
 */
function serialize(value) {
    if (typeof value === 'string') {
        return value;
    } else if (value === undefined) {
        return undefined;
    }

    return JSON.stringify(value);
}

/**
 * @private
 */
function safeEncodePair([key, value]) {
    return [encode(key), encode(serialize(value))];
}

/**
 * @private
 */
function safeDecodePair([key, value]) {
    return [decode(key), deserialize(decode(value))];
}

/**
 * @private
 */
function unsafeEncodePair([key, value]) {
    return [key, serialize(value)];
}

/**
 * @private
 */
function unsafeDecodePair([key, value]) {
    return [key, deserialize(value)];
}

/**
 * @private
 */
function isValidPair([key, value]) {
    return key !== undefined && value !== undefined;
}

/**
 * @private
 * @param {String} data - The data to parse
 * @return {Object} The parsed data
 */
function parseString(data, decoder) {
    if (data.indexOf('?') !== data.lastIndexOf('?')) {
        throw createDuplicateQueryError(data);
    }

    return data.replace(/^.*\?/, '')
        .split(/[;&]/g)
        .map((p) => p.split('='))
        .filter(isValidPair)
        .map(decoder);
}

/**
 * @private
 * @param {*} data - The data to parse
 * @return {Object} The parsed data
 */
function parse(data, decoder) {
    if (data === undefined) {
        return {};
    } if (typeof data === 'string') {
        const parts = parseString(data, decoder);

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
     * Converts the object into its serialized query string representation
     * that can be used in a url.
     * @private
     * @return {String} The serialized representation of the `QueryString`.  It
     * will be an empty string if there are no params to serialize.
    */
function toString(encoder) {
    const keys = Object.keys(this);
    const pairs = keys.reduce((accumulator, k) => {
        const value = this[k];

        if (Array.isArray(value)) {
            return accumulator.concat(value.map((v) => [k, v]));
        }

        return accumulator.concat([[k, value]]);
    }, []).map(encoder).filter(isValidPair);
    const serialized = pairs.map((p) => p.join('=')).join('&');

    if (serialized.length) {
        return `?${serialized}`;
    }

    return '';
}

/**
 * @throws {module:@zakkudo/query-string/QueryStringError~QueryStringError} On
 * issues parsing or serializing the configuration
 */
class QueryString {
    /**
     * @param {String|Object|QueryString} [data] - Initial data.  A url `String`
     * will be parsed, and `Object`/`QueryString` instances will be copied.
     * @param {Object} [options] - Modifiers for how the query string object is contructed
     * @param {Boolean} [options.unsafe = false] - Disable url escaping of
     * key/value pairs. Useful for servers that use unsafe characters as delimiters
    */
    constructor(data, options = {}) {
        if (options.unsafe || (data instanceof UnsafeQueryString && options.unsafe !== false)) {
            return new UnsafeQueryString(data);
        }

        Object.assign(this, parse(data, safeDecodePair));
    }

    toString() {
        return toString.call(this, safeEncodePair);
    }
}

/**
 * @private
 */
class UnsafeQueryString extends QueryString {
    /**
     * @private
    */
    constructor(data) {
        super();
        Object.assign(this, parse(data, unsafeDecodePair));
    }

    toString() {
        return toString.call(this, unsafeEncodePair);
    }
}

export default QueryString;

