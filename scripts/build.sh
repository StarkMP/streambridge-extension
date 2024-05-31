#!/bin/bash
rm -r ./dist
cd ./packages/content-script
npm run build
cp -R ./dist ../../
cd ../popup
npm run build
cp -R ./dist ../../dist/popup
cd ../../dist

# Replace version
source ../scripts/version.sh
cd ../

CHROME_FOLDER="streambridge-chrome"
FIREFOX_FOLDER="streambridge-firefox"

cp -R ./dist ./$FIREFOX_FOLDER

# Separate Chrome extension
echo 'Separating Chrome version...'
mv ./dist ./$CHROME_FOLDER
rm ./$CHROME_FOLDER/manifest-firefox.json
mv ./$CHROME_FOLDER/manifest-chrome.json ./$CHROME_FOLDER/manifest.json

# Separate Firefox extension
echo 'Separating Firefox version...'
rm ./$FIREFOX_FOLDER/manifest-chrome.json
mv ./$FIREFOX_FOLDER/manifest-firefox.json ./$FIREFOX_FOLDER/manifest.json

# Move bundles to dist folder
mkdir dist
mv ./$CHROME_FOLDER ./dist/$CHROME_FOLDER
mv ./$FIREFOX_FOLDER ./dist/$FIREFOX_FOLDER

echo 'Extension is successfully built!'