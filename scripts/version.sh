#!/bin/bash
VERSION=$(grep -oP '(?<="version": ")[^"]*' '../package.json')
sed -i "s/%version%/$VERSION/g" manifest-chrome.json
sed -i "s/%version%/$VERSION/g" manifest-firefox.json