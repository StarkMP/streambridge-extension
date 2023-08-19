#!/bin/bash
cd ./dist
REGEX='"version"[[:space:]]*:[[:space:]]*"[^"]*"'
VERSION=$(grep -oP '(?<="version": ")[^"]*' '../package.json')
sed -i "s/%version%/$VERSION/g" manifest.json