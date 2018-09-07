# @zakkudo/query-string

Make working with url query-strings enjoyable.

[![Build Status](https://travis-ci.org/zakkudo/query-string.svg?branch=master)](https://travis-ci.org/zakkudo/query-string)
[![Coverage Status](https://coveralls.io/repos/github/zakkudo/query-string/badge.svg?branch=master)](https://coveralls.io/github/zakkudo/query-string?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/zakkudo/query-string/badge.svg)](https://snyk.io/test/github/zakkudo/query-string)
[![Node](https://img.shields.io/node/v/@zakkudo/query-string.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

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

