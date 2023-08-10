eslint . --ext .ts,.tsx
cd ./packages/shared
tsc
cd ../content-script
tsc
cd ../popup
tsc