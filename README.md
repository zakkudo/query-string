<a name="module_@zakkudo/query-string"></a>

# @zakkudo/query-string
<p>
Make working with url query-strings enjoyable.
</p>

<p>
<a href="https://travis-ci.org/zakkudo/query-string">
    <img src="https://travis-ci.org/zakkudo/query-string.svg?branch=master"
         alt="Build Status" /></a>
<a href="https://coveralls.io/github/zakkudo/query-string?branch=master">
    <img src="https://coveralls.io/repos/github/zakkudo/query-string/badge.svg?branch=master"
         alt="Coverage Status" /></a>
<a href="https://snyk.io/test/github/zakkudo/query-string">
    <img src="https://snyk.io/test/github/zakkudo/query-string/badge.svg"
         alt="Known Vulnerabilities"
         data-canonical-src="https://snyk.io/test/github/zakkudo/query-string"
         style="max-width:100%;" /></a>
</p>

<h3>Why use this?</h3>

- Consistancy with simplicity
- The instance acts like a plain-old-object
- `JSON.stringify()` will serialize it to json like it was a normal object
- Casting to a string will format it to be directly usable in a query
  Update the properties after initialization and the serialization will reflect the updates
- Complex params are automatically serialized and deserialized from json

<h3>Install</h3>

```console
npm install @zakkudo/query-string
```

``` console
yarn add @zakkudo/query-string
```

**Example** *(Initializing with an object)*  
```js
import QueryString from '@zakkudo/query-string';

const query = new QueryString({
  page: 3,
  title: 'awesomeness',
  complex: {'test': 'value'}
});

String(query) // '?page=3&title=awesomeness&complex=%7B%22test%22%3A%22value%22%7D&'
query.toString() // '?page=3&title=awesomeness&complex=%7B%22test%22%3A%22value%22%7D&'

const url = `http://example${query}` //Automatically serializes correctly
```
**Example** *(Initializing with a URL)*  
```js
import QueryString from '@zakkudo/query-string';

const query = new QueryString('http://example?page=3&title=awesomeness');

delete query.page;

String(query) // '?title=awesomeness'
query.toString() // '?title=awesomeness'
```
**Example** *(Parsing an invalid query string with duplicate &#x27;?&#x27;)*  
```js
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

* [@zakkudo/query-string](#module_@zakkudo/query-string)
    * [~QueryString](#module_@zakkudo/query-string..QueryString)
        * [new QueryString(data)](#new_module_@zakkudo/query-string..QueryString_new)
        * [.toString()](#module_@zakkudo/query-string..QueryString+toString) ⇒ <code>String</code>

<a name="module_@zakkudo/query-string..QueryString"></a>

## @zakkudo/query-string~QueryString
**Kind**: inner class of [<code>@zakkudo/query-string</code>](#module_@zakkudo/query-string)  

* [~QueryString](#module_@zakkudo/query-string..QueryString)
    * [new QueryString(data)](#new_module_@zakkudo/query-string..QueryString_new)
    * [.toString()](#module_@zakkudo/query-string..QueryString+toString) ⇒ <code>String</code>

<a name="new_module_@zakkudo/query-string..QueryString_new"></a>

### new QueryString(data)
**Throws**:

- [<code>QueryStringError</code>](#module_@zakkudo/query-string/QueryStringError..QueryStringError) On issues parsing or serializing the configuration


| Param | Type | Description |
| --- | --- | --- |
| data | <code>String</code> \| <code>Object</code> \| <code>QueryString</code> | Initial data.  A url `String` will be parsed, and `Object`/`QueryString` instances will be copied. |

<a name="module_@zakkudo/query-string..QueryString+toString"></a>

### queryString.toString() ⇒ <code>String</code>
Converts the object into its serialized query string representation
that can be used in a url.

**Kind**: instance method of [<code>QueryString</code>](#module_@zakkudo/query-string..QueryString)  
**Returns**: <code>String</code> - The serialized representation of the `QueryString`.  It
will be an empty string if there are no params to serialize.  
<a name="module_@zakkudo/query-string/QueryStringError"></a>

# @zakkudo/query-string/QueryStringError

* [@zakkudo/query-string/QueryStringError](#module_@zakkudo/query-string/QueryStringError)
    * [~QueryStringError](#module_@zakkudo/query-string/QueryStringError..QueryStringError) ⇐ <code>Error</code>
        * [new QueryStringError(message, url)](#new_module_@zakkudo/query-string/QueryStringError..QueryStringError_new)
        * [.url](#module_@zakkudo/query-string/QueryStringError..QueryStringError+url)

<a name="module_@zakkudo/query-string/QueryStringError..QueryStringError"></a>

## @zakkudo/query-string/QueryStringError~QueryStringError ⇐ <code>Error</code>
Error class used by QueryString for raising errors
generated during parsing or serialization.

**Kind**: inner class of [<code>@zakkudo/query-string/QueryStringError</code>](#module_@zakkudo/query-string/QueryStringError)  
**Extends**: <code>Error</code>  

* [~QueryStringError](#module_@zakkudo/query-string/QueryStringError..QueryStringError) ⇐ <code>Error</code>
    * [new QueryStringError(message, url)](#new_module_@zakkudo/query-string/QueryStringError..QueryStringError_new)
    * [.url](#module_@zakkudo/query-string/QueryStringError..QueryStringError+url)

<a name="new_module_@zakkudo/query-string/QueryStringError..QueryStringError_new"></a>

### new QueryStringError(message, url)

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | A message describing the reason for the error. |
| url | <code>String</code> | The related url fragment that generated the error. |

<a name="module_@zakkudo/query-string/QueryStringError..QueryStringError+url"></a>

### queryStringError.url
The related url fragment that generated the error

**Kind**: instance property of [<code>QueryStringError</code>](#module_@zakkudo/query-string/QueryStringError..QueryStringError)  
