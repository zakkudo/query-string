<a name="module_QueryString"></a>

## QueryString
Make working with url query-strings enjoyable.

Why use this?

- Consistancy with simplicity
- The instance acts like a plain-old-object
- `JSON.stringify()` will serialize it to json like it was a normal object
- Casting to a string will format it to be directly usable in a query
  Update the properties after initialization and the serialization will reflect the updates
- Complex params are automatically serialized and deserialized from json

Install with:

```console
yarn add @zakkudo/query-string
```

**Throws**:

- <code>QueryStringError</code> On issues during serialization or construction

**Example**  
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
**Example** *(Parsing an invalid query string)*  
```js
import QueryString from '@zakkudo/query-string';
import QueryStringError from '@zakkudo/query-string/QueryStringError';

try {
const query = new QueryString('http://invalid.com/?first=1?second=2')
} catch(e) {
    if (e instanceof QueryStringError) {
        console.error(e.message); // Trying to add duplicate query param when already exists
    }
}
```

* [QueryString](#module_QueryString)
    * [module.exports](#exp_module_QueryString--module.exports) ⏏
        * [new module.exports(data)](#new_module_QueryString--module.exports_new)
        * [.toString()](#module_QueryString--module.exports+toString) ⇒ <code>String</code>

<a name="exp_module_QueryString--module.exports"></a>

### module.exports ⏏
**Kind**: Exported class  
<a name="new_module_QueryString--module.exports_new"></a>

#### new module.exports(data)

| Param | Type | Description |
| --- | --- | --- |
| data | <code>String</code> \| <code>Object</code> \| <code>QueryString</code> | Initial data.  A url string will be parsed, and Object/QueryString instances will be copied. |

<a name="module_QueryString--module.exports+toString"></a>

#### module.exports.toString() ⇒ <code>String</code>
Converts the object into it's serialized query string representation
that can be used in a url.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_QueryString--module.exports)  
**Returns**: <code>String</code> - The serialized representation of the QueryString.  It
will be an empty string if there are no params to serialize.  
