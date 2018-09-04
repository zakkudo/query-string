#!/bin/sh

yarn clean
./node_modules/.bin/jest --coverage --runInBand
