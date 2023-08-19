#!/bin/bash
mv ./dist/popup ./
rm -r ./dist
cd ./packages/content-script
npm run build
mv ./dist ../../
cd ../../dist
mv ../popup ./
cd ../
source ./scripts/version.sh