#!/usr/bin/env node

const fs = require('fs');

const arguments = process.argv.slice(2);;
const filename = arguments[0];
const contents = String(fs.readFileSync(filename));
const lines = contents.split('\n');

let isIndex = false;

const newContents = lines.filter((l, index) => {
    if (l.startsWith('# ') && lines[index + 2] && lines[index + 2].startsWith('* [')) {
        isIndex = true;
    }

    if (l.startsWith('* [')) {
        isIndex = true;
    } else if (l === '') {
        isIndex = false;
    }

    return !isIndex;
}).map((l, index, lines) => {
    const innerClassOfPrefix = '**Kind**: inner class of';

    if (l.startsWith('## ')) {
        return l + ' ⏏';
    }

    if (l.startsWith(innerClassOfPrefix)) {
        return '**Kind**: Exported class' + l.slice(innerClassOfPrefix.length);
    }

    return l;
}).join('\n').replace(/\n\n+/gm, '\n\n');;

fs.writeFileSync(filename, newContents);

