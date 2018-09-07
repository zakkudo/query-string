#!/bin/bash

set -e

CURRENT_DIR=$(pwd)
PROJECT_DIR=$(git rev-parse --show-toplevel)

cd $PROJECT_DIR

./node_modules/.bin/eslint src "$@"
