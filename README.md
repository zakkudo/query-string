# @zakkudo/query-string

Make working with url query-strings enjoyable.

[![Build Status](https://travis-ci.org/zakkudo/query-string.svg?branch=master)](https://travis-ci.org/zakkudo/query-string)
[![Coverage Status](https://coveralls.io/repos/github/zakkudo/query-string/badge.svg?branch=master)](https://coveralls.io/github/zakkudo/query-string?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/zakkudo/query-string/badge.svg)](https://snyk.io/test/github/zakkudo/query-string)
[![Node](https://img.shields.io/node/v/@zakkudo/query-string.svg)](https://nodejs.org/)
[![License](https://img.shields.io/npm/l/@zakkudo/query-string.svg)](https://opensource.org/licenses/BSD-3-Clause)

## Why use this?

- Consistancy with simplicity
- The instance acts like a plain-old-object
- `JSON.stringify()` will serialize it to json like it was a normal object
- Casting to a string will format it to be directly usable in a query
  Update the properties after initialization and the serialization will reflect the updates
- Complex params are automatically serialized and deserialized from json

## Install

```console
# Install using npm
npm install @zakkudo/query-string
```

``` console
# Install using yarn
yarn add @zakkudo/query-string
```

## Examples

### Initializing with an object
```javascript
import QueryString from '@zakkudo/query-string';

const query = new QueryString({
  page: 3,
  title: 'awesomeness',
  complex: {'test': 'value'}
});

String(query) // '?page=3&title=awesomeness&complex=%7B%22test%22%3A%22value%22%7D&'
query.toString() // '?page=3&title=awesomeness&complex=%7B%22test%22%3A%22value%22%7D&'

const url = `http://example${query}` //Automatically serializes correctly

const url = `http://example${query}` //Automatically serializes correctly with changes
```

### Initializing with a URL and making changes dynamically
```javascript
import QueryString from '@zakkudo/query-string';

const query = new QueryString('http://example?page=3&title=awesomeness');

delete query.page;

String(query) // '?title=awesomeness'
query.toString() // '?title=awesomeness'
```

### Error handling
```javascript
import QueryString from '@zakkudo/query-string';
import QueryStringError from '@zakkudo/query-string/QueryStringError';

try {
    const query = new QueryString('http://invalid.com/?first=1?second=2')
} catch(e) {
    if (e instanceof QueryStringError) {
        console.error(e.message); // Trying to add duplicate query param when already exists
    } else {
        throw e;
    }
}
```

## API

<a name="module_@zakkudo/query-string"></a>

<a name="module_@zakkudo/query-string..QueryString"></a>

### @zakkudo/query-string~QueryString ⏏

**Kind**: Exported class

<a name="new_module_@zakkudo/query-string..QueryString_new"></a>

#### new QueryString([data], [options])
**Throws**:

- [<code>QueryStringError</code>](#module_@zakkudo/query-string/QueryStringError..QueryStringError) On
issues parsing or serializing the configuration

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [data] | <code>String</code> \| <code>Object</code> \| <code>QueryString</code> |  | Initial data.  A url `String` will be parsed, and `Object`/`QueryString` instances will be copied. |
| [options] | <code>Object</code> |  | Modifiers for how the query string object is contructed |
| [options.unsafe] | <code>Boolean</code> | <code>false</code> | Disable url escaping of key/value pairs. Useful for servers that use unsafe characters as delimiters |

<a name="module_@zakkudo/query-string/QueryStringError"></a>

<a name="module_@zakkudo/query-string/QueryStringError..QueryStringError"></a>

### @zakkudo/query-string/QueryStringError~QueryStringError ⇐ <code>Error</code> ⏏
Error class used by QueryString for raising errors
generated during parsing or serialization.

**Kind**: Exported class

**Extends**: <code>Error</code>  

* [~QueryStringError](#module_@zakkudo/query-string/QueryStringError..QueryStringError) ⇐ <code>Error</code>
    * [new QueryStringError(message, url)](#new_module_@zakkudo/query-string/QueryStringError..QueryStringError_new)
    * [.url](#module_@zakkudo/query-string/QueryStringError..QueryStringError+url)

<a name="new_module_@zakkudo/query-string/QueryStringError..QueryStringError_new"></a>

#### new QueryStringError(message, url)

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | A message describing the reason for the error. |
| url | <code>String</code> | The related url fragment when the error was generated |

<a name="module_@zakkudo/query-string/QueryStringError..QueryStringError+url"></a>

#### queryStringError.url
The related url fragment when the error was generated

**Kind**: instance property of [<code>QueryStringError</code>](#module_@zakkudo/query-string/QueryStringError..QueryStringError)  
