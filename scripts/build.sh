#!/bin/bash
rm -r ./dist
cd ./packages/content-script
npm run build
mv ./dist ../../
cd ../popup
npm run build
mv ./dist ../../dist/popup
cd ../../
source ./scripts/version.sh