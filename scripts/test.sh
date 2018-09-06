#!/bin/bash

set -e

CURRENT_DIR=$(pwd)
PROJECT_DIR=$(git rev-parse --show-toplevel)

cd $PROJECT_DIR

./scripts/clean.sh
./node_modules/.bin/jest --runInBand "$@"
