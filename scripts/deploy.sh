#!/bin/bash

set -e

yarn cover
yarn build
yarn document

cp README.md build/README.md

yarn publish --access public --cwd build --no-git-tag-version
