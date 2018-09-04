#!/bin/bash

set -e

PROJECT_DIR=$(git rev-parse --show-toplevel)
BIN_DIR=$(npm bin)
JSDOC="$BIN_DIR/jsdoc"

$JSDOC -c $PROJECT_DIR/jsdoc.config.json "$@"
./node_modules/.bin/jsdoc2md src/index.js src/QueryStringError.js --module-index-format none --global-index-format none --example-lang js --heading-depth 1 > README.md
