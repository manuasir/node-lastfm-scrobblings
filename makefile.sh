#!/bin/bash
command -v pkg >/dev/null 2>&1 ||  echo >&2 "I require pkg but it's not installed.  Aborting."
command -v npm >/dev/null 2>&1 ||  echo >&2 "I require npm but it's not installed.  Aborting."
echo "Removing old binary file"
rm -f bin/index-linux
echo "Copying package.json to lib/package.json"
cp package.json lib/package.json
echo "Generating code to ECMAScript 5"
npm run build
echo "Copying package.json to dist/package.json"
cp package.json dist/package.json
echo "Building binaries"
pkg -t node10-linux-x64 dist/index.js -o ./bin/index-linux
pkg -t node10-win-x64 dist/index.js -o ./bin/index-win
echo "You can find the binary generated under bin/ directory"
